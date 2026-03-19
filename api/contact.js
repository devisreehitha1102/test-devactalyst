import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

const sanitize = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const normalizeContactBody = (body = {}) => ({
  name: body?.name ?? body?.Name ?? '',
  email: body?.email ?? body?.Email ?? '',
  subject: body?.subject ?? body?.Subject ?? '',
  message: body?.message ?? body?.Message ?? '',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let requestBody = req.body || {};

    if (typeof requestBody === 'string') {
      try {
        requestBody = JSON.parse(requestBody);
      } catch {
        requestBody = {};
      }
    }

    const data = ContactSchema.parse(normalizeContactBody(requestBody));

    const payload = {
      name: sanitize(data.name),
      email: sanitize(data.email),
      subject: sanitize(data.subject),
      message: sanitize(data.message),
      receivedAt: new Date().toISOString(),
    };

    // --- NEW GOOGLE SHEETS FORWARDING LOGIC ---
    // 1. Paste your Google Web App URL here
    const GOOGLE_SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbxtCysmjMVjAQjJJHDUEgorxuRG08eqEOgLqCl1kXhBJOEWo2Pzh_qizVKIiCaq004_/exec';

    // 2. Format the data so Google Apps Script can read it easily
    const formBody = new URLSearchParams();
    formBody.append('Name', payload.name);
    formBody.append('Email', payload.email);
    formBody.append('Subject', payload.subject);
    formBody.append('Message', payload.message);

    // 3. Send the data to Google
    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!googleResponse.ok) {
      const text = await googleResponse.text();
      console.error('Google error:', text);
      throw new Error('Google Sheets request failed');
    }
    // ------------------------------------------

    console.log('contact_submission forwarded successfully', payload);
    return res.status(200).json({ ok: true });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors?.[0]?.message || 'Invalid input' });
    }

    console.error('contact_submission failed', err);
    return res.status(502).json({
      error: 'Unable to submit right now. Please try again in a moment.',
    });
  }
}