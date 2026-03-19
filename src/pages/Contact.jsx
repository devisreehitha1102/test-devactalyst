import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import Layout from '../components/common/Layout';
import { GradientText } from '../components/ui/animated-hero';
import { GradientButton } from '../components/ui/gradient-button';

import { Helmet } from 'react-helmet-async';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxtCysmjMVjAQjJJHDUEgorxuRG08eqEOgLqCl1kXhBJOEWo2Pzh_qizVKIiCaq004_/exec';

const validatePayload = (payload) => {
  if (payload.name.length < 2) return 'Name must be at least 2 characters.';
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) return 'Please enter a valid email address.';
  if (payload.subject.length < 3) return 'Subject must be at least 3 characters.';
  if (payload.message.length < 10) return 'Message must be at least 10 characters.';
  return '';
};

const submitToGoogleScript = async (payload) => {
  const formBody = new URLSearchParams();
  formBody.append('Name', payload.name);
  formBody.append('Email', payload.email);
  formBody.append('Subject', payload.subject);
  formBody.append('Message', payload.message);

  const fallbackResponse = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });

  if (!fallbackResponse.ok) {
    throw new Error('Submission failed. Please try again.');
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Subject: '',
    Message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        name: formData.Name.trim(),
        email: formData.Email.trim(),
        subject: formData.Subject.trim(),
        message: formData.Message.trim(),
      };

      const validationMessage = validatePayload(payload);
      if (validationMessage) {
        throw new Error(validationMessage);
      }

      let response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      // In local Vite dev, /api routes are unavailable unless using a functions runtime.
      // Fallback directly to Google Apps Script so contact submissions still work.
      if (response.status === 404) {
        await submitToGoogleScript(payload);
        response = { ok: true };
      }

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed. Please try again.');
      }

      setIsSubmitted(true);
      setFormData({
        Name: '',
        Email: '',
        Subject: '',
        Message: '',
      });
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'hello@devcatalyst.dev',
      action: 'mailto:hello@devcatalyst.dev',
      color: 'from-[#07121f] to-[#0a1629]',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      action: '#',
      color: 'from-[#07121f] to-[#0a1629]',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: 'Speak directly with us',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'from-[#07121f] to-[#0a1629]',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      description: 'Come to our office',
      contact: '123 Tech Street, Silicon Valley',
      action: 'https://maps.google.com',
      color: 'from-[#07121f] to-[#0a1629]',
    },
  ];

  const socialLinks = [
    { icon: <Twitter className="w-6 h-6" />, name: 'X (Twitter)', url: 'https://twitter.com/devcatalyst', gradient: 'from-slate-800 to-slate-900', hoverGradient: 'from-cyan-500/20 to-blue-500/20' },
    { icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', url: 'https://linkedin.com/company/devcatalyst', gradient: 'from-blue-900/40 to-blue-800/40', hoverGradient: 'from-blue-500/20 to-blue-600/20' },
    { icon: <Instagram className="w-6 h-6" />, name: 'Instagram', url: 'https://instagram.com/devcatalyst', gradient: 'from-pink-900/40 to-purple-800/40', hoverGradient: 'from-pink-500/20 to-purple-500/20' },
  ];

  const faqs = [
    {
      question: 'How can I join DevCatalyst?',
      answer:
        'Simply fill out our contact form or join one of our upcoming workshops. We welcome developers of all skill levels!',
    },
    {
      question: 'Are your workshops free?',
      answer:
        'Most of our workshops are free for community members. Some advanced workshops may have a small fee to cover materials.',
    },
    {
      question: 'Can I propose a workshop topic?',
      answer:
        "Absolutely! We love hearing from our community. Submit your ideas through our contact form and we'll consider them for future sessions.",
    },
    {
      question: 'Do you offer mentorship programs?',
      answer:
        'Yes, we have both peer-to-peer mentorship and connections with industry professionals. Reach out to learn more!',
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>DevCatalyst | Contact</title>
        <meta name="description" content="Contact DevCatalyst: reach our team via email, chat, or form to get involved or ask questions." />
      </Helmet>
      <div className="select-text">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <motion.div
            className="max-w-6xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-cyan-500/30 rounded-full backdrop-blur">
                <MessageCircle className="w-5 h-5 text-cyan-300" />
                <span className="text-slate-200 font-medium text-base">Get In Touch</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-8 leading-tight balance hyphens-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <span className="text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
                Let's Connect
              </span>
              <span className="block mt-2 text-cyan-300">and Build Together</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-2xl leading-relaxed text-slate-200 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Have questions, ideas, or want to join our community? We'd love to hear from you. Reach
              out through any of the channels below, and let's start building something amazing
              together.
            </motion.p>

            {/* Animated Contact Methods Preview */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center`}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-cyan-300">{method.icon}</div>
                  </motion.div>
                  <h3 className="font-medium text-slate-200 text-sm">{method.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Methods Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Multiple Ways to </span>
                <GradientText>Reach Us</GradientText>
              </h2>
              <p className="text-xl text-slate-200">Choose the method that works best for you</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.action}
                  className="group relative dc-card p-8 transition-all duration-300 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center`}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-cyan-300">{method.icon}</div>
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-3 text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{method.description}</p>
                  <p className="text-cyan-300 font-medium">{method.contact}</p>

                  {/* Hover effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <motion.div
                className="dc-card p-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-6">
                  <span className="text-slate-100">Send us a </span>
                  <span className="text-cyan-300">Message</span>
                </h3>
                {error && (
                  <div className="mb-4 text-red-400 text-sm" role="alert">
                    {error}
                  </div>
                )}

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-white font-medium mb-2">Name</label>
                        <input
                          type="text"
                          name="Name"
                          value={formData.Name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                          placeholder="Your full name"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <label className="block text-white font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                          placeholder="your@email.com"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-white font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        name="Subject"
                        value={formData.Subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
                        placeholder="What's this about?"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-white font-medium mb-2">Message</label>
                      <textarea
                        name="Message"
                        value={formData.Message}
                        onChange={handleInputChange}
                        required
                        minLength={10}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all resize-none"
                        placeholder="Tell us more about your message..."
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <GradientButton
  type="submit"
  variant="accent"
  size="lg"
  className="w-full"
  disabled={isSubmitting}
>
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </GradientButton>
                    </motion.div>
                  </form>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white mb-4">Message Sent!</h4>
                    <p className="text-slate-300">
                      Thanks for reaching out. We'll get back to you soon!
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Info & FAQ */}
              <div className="space-y-8">
                {/* Social Links */}
                <motion.div
                  className="backdrop-blur-sm rounded-3xl p-8 border border-[#14284a] bg-[#07121f]/70"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-6">
                    <span className="text-white">Connect </span>
                    <GradientText gradient="from-blue-400 to-purple-400">With Us</GradientText>
                  </h3>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-4 p-4 rounded-xl transition-all bg-[#07121f]/60 hover:bg-[#07121f]/90 border border-[#14284a]/50 hover:border-cyan-500/30 relative overflow-hidden"
                        whileHover={{ scale: 1.03, x: 5 }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {/* Gradient background on hover */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${social.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <div className={`relative w-10 h-10 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-cyan-300 group-hover:text-cyan-200 transition-colors">{social.icon}</div>
                        </div>
                        <span className="relative text-slate-200 font-medium group-hover:text-white transition-colors">{social.name}</span>
                        {/* Arrow indicator */}
                        <motion.div
                          className="relative ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* FAQ */}
                <motion.div
                  className="backdrop-blur-sm rounded-3xl p-8 border border-[#14284a] bg-[#07121f]/70"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-slate-100">FAQs</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="border-b border-white/10 pb-4 last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                        <p className="text-slate-300 text-sm">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
