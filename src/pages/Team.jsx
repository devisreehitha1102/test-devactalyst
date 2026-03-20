import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import { Github, Instagram, Users } from 'lucide-react';
import { GradientText } from '../components/ui/animated-hero';

const CORE_TEAM = [
  { name: 'Alex Chen', role: 'Founder & CEO', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Full-stack developer with 5+ years building scalable applications.' },
  { name: 'Sarah Kim', role: 'Head of Community', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Community builder passionate about inclusive tech environments.' },
  { name: 'Mike Rodriguez', role: 'Technical Lead', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Senior engineer specializing in modern web technologies and mentorship.' },
  { name: 'Priya Nair', role: 'Design Engineer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Design systems and motion enthusiast crafting delightful experiences.' },
];

const TECH_TEAM = [
  { name: 'John Doe', role: 'Frontend Engineer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'React, TypeScript, and animations.' },
  { name: 'Jane Smith', role: 'Backend Engineer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'APIs, databases, infrastructure.' },
  { name: 'Liam Patel', role: 'Fullstack Engineer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Bridging UI and services.' },
  { name: 'Emma Davis', role: 'DevOps Engineer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'CI/CD and cloud deployments.' },
  { name: 'Noah Johnson', role: 'Mobile Developer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Flutter, React Native.' },
  { name: 'P.Devi Sreehitha', role:'Member', github:'https://github.com/devisreehitha1102', instagram:'https://www.instagram.com/devi_sreehitha_7659/', bio:'Pursuing IT in 1st year and interested in web development and debugging.'}
  { name: 'Olivia Wilson', role: 'UI Engineer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Design systems and accessibility.' },
];

const SOCIAL_MEDIA = [
  { name: 'Ava Brown', role: 'Social Media Lead', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Strategy and storytelling.' },
  { name: 'Isabella Garcia', role: 'Content Creator', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Shorts, reels, and posts.' },
  { name: 'Sophia Miller', role: 'Community Manager', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Engagement and support.' },
  { name: 'Mia Martinez', role: 'Graphics Designer', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Visuals that pop.' },
  { name: 'Charlotte Anderson', role: 'Copywriter', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Compelling CTAs and copy.' },
];

const EVENT_PLANNING = [
  { name: 'Amelia Thomas', role: 'Events Lead', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Workshops and logistics.' },
  { name: 'Harper Jackson', role: 'Coordinator', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Schedules and vendors.' },
  { name: 'Evelyn White', role: 'Volunteer Manager', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'People and processes.' },
  { name: 'Abigail Harris', role: 'Sponsorships', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Partners and perks.' },
  { name: 'Emily Clark', role: 'Operations', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'On-site execution.' },
  { name: 'Ethan Lewis', role: 'Stage Manager', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Run of show.' },
  { name: 'Benjamin Walker', role: 'AV Specialist', image: '/api/placeholder/300/300', github: '#', instagram: '#', bio: 'Sound and lighting.' },
];

import { Helmet } from 'react-helmet-async';

const Team = () => {
  return (
    <Layout>
      <Helmet>
        <title>DevCatalyst | Team</title>
        <meta name="description" content="Meet the DevCatalyst team: builders, mentors, and designers driving the community." />
      </Helmet>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 pt-24">
        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-cyan-500/30 rounded-full text-slate-200 backdrop-blur">
            <Users className="w-5 h-5 text-cyan-300" />
            Our Team
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mt-6 text-white leading-tight balance hyphens-auto">
            <span>Meet the </span>
            <GradientText>People</GradientText>
            <span> behind DevCatalyst</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mt-6 max-w-3xl mx-auto">
            Passionate builders, mentors, and designers driving our mission forward.
          </p>
        </motion.div>
      </section>

      {/* Team Sections */}
      <Section title="Core Team" members={CORE_TEAM} />
      <Section title="Technical Team" members={TECH_TEAM} />
      <Section title="Social Media" members={SOCIAL_MEDIA} />
      <Section title="Event Planning" members={EVENT_PLANNING} />
    </Layout>
  );
};

const Card = ({ m }) => (
  <motion.div
    className="group relative dc-card p-5 md:p-6 flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-32 h-32 md:w-36 md:h-36 mb-5">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/20 blur-2xl" />
      <img src={m.image} alt={m.name} loading="lazy" decoding="async" className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border border-white/20" />
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-white">{m.name}</h3>
    <p className="text-cyan-300 font-medium mb-3 text-base md:text-lg">{m.role}</p>
    {m.bio && <p className="text-slate-300 text-sm md:text-base mb-5 clamp-2 md-unclamp">{m.bio}</p>}
    <div className="flex items-center gap-4">
      <a href={m.github} aria-label={`${m.name} on GitHub`} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors touch-target" target="_blank" rel="noreferrer">
        <Github className="w-5 h-5 text-white" />
      </a>
      <a href={m.instagram} aria-label={`${m.name} on Instagram`} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors touch-target" target="_blank" rel="noreferrer">
        <Instagram className="w-5 h-5 text-white" />
      </a>
    </div>
  </motion.div>
);

const Section = ({ title, members }) => (
  <section className="relative py-14 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 accent-heading">
        {title}
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-6 md:gap-10">
        {members.map((m) => (
          <Card key={`${title}-${m.name}`} m={m} />
        ))}
      </div>
    </div>
  </section>
);

export default Team;
