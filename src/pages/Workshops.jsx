import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, 
  Clock,
  Users,
  User,
  Star,
  ChevronRight,
  Code,
  Database,
  Smartphone,
  Brain,
  Target,
  Rocket,
  Zap,
  BarChart3,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { GradientButton } from '../components/ui/gradient-button';
import { CtaButton } from '@/components/ui/cta-button';

import { Helmet } from 'react-helmet-async';

const Workshops = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredWorkshop, setHoveredWorkshop] = useState(null);

  const categories = [
    { id: 'all', name: 'All Workshops', icon: <Star className="w-5 h-5" /> },
    { id: 'web', name: 'Web Development', icon: <Code className="w-5 h-5" /> },
    { id: 'mobile', name: 'Mobile Apps', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'data', name: 'Data Science', icon: <Database className="w-5 h-5" /> },
    { id: 'ai', name: 'AI/ML', icon: <Brain className="w-5 h-5" /> },
  ];

  const workshops = [
    {
      id: 1,
      title: 'React Masterclass: Building Modern UIs',
      category: 'web',
      level: 'Intermediate',
      duration: '3 hours',
      participants: 24,
      date: 'Nov 25, 2024',
      time: '2:00 PM - 5:00 PM',
      instructor: 'Sarah Chen',
      description:
        'Deep dive into React hooks, context, and modern patterns for building scalable applications.',
      tags: ['React', 'JavaScript', 'Frontend'],
      icon: Rocket,
    },
    {
      id: 2,
      title: 'Full-Stack App with Node.js & PostgreSQL',
      category: 'web',
      level: 'Advanced',
      duration: '4 hours',
      participants: 18,
      date: 'Nov 28, 2024',
      time: '10:00 AM - 2:00 PM',
      instructor: 'Mike Rodriguez',
      description:
        'Build a complete REST API with authentication, database design, and deployment strategies.',
      tags: ['Node.js', 'PostgreSQL', 'API Design'],
      icon: Zap,
    },
    {
      id: 3,
      title: 'Flutter Mobile Development Bootcamp',
      category: 'mobile',
      level: 'Beginner',
      duration: '5 hours',
      participants: 30,
      date: 'Dec 2, 2024',
      time: '9:00 AM - 2:00 PM',
      instructor: 'Alex Kim',
      description:
        'Create beautiful cross-platform mobile apps with Flutter and Dart programming language.',
      tags: ['Flutter', 'Dart', 'Mobile'],
      icon: Smartphone,
    },
    {
      id: 4,
      title: 'Machine Learning with Python',
      category: 'ai',
      level: 'Intermediate',
      duration: '6 hours',
      participants: 20,
      date: 'Dec 5, 2024',
      time: '10:00 AM - 4:00 PM',
      instructor: 'Dr. Lisa Wang',
      description:
        'Hands-on introduction to ML algorithms, data preprocessing, and model deployment.',
      tags: ['Python', 'Scikit-learn', 'TensorFlow'],
      icon: Brain,
    },
    {
      id: 5,
      title: 'Data Analysis with SQL & Python',
      category: 'data',
      level: 'Beginner',
      duration: '4 hours',
      participants: 25,
      date: 'Dec 8, 2024',
      time: '1:00 PM - 5:00 PM',
      instructor: 'John Martinez',
      description:
        'Learn to extract insights from data using SQL queries and Python data analysis libraries.',
      tags: ['SQL', 'Pandas', 'Data Visualization'],
      icon: BarChart3,
    },
    {
      id: 6,
      title: 'DevOps Fundamentals: Docker & CI/CD',
      category: 'web',
      level: 'Advanced',
      duration: '3.5 hours',
      participants: 15,
      date: 'Dec 12, 2024',
      time: '3:00 PM - 6:30 PM',
      instructor: 'Emma Thompson',
      description:
        'Master containerization and continuous deployment for modern development workflows.',
      tags: ['Docker', 'GitHub Actions', 'AWS'],
      icon: Settings,
    },
  ];

  const filteredWorkshops =
    selectedCategory === 'all'
      ? workshops
      : workshops.filter((workshop) => workshop.category === selectedCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>DevCatalyst | Workshops</title>
        <meta name="description" content="Interactive workshops across web, mobile, data, and AI—learn by building with DevCatalyst." />
      </Helmet>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-cyan-500/30 rounded-full backdrop-blur">
              <Target className="w-5 h-5 text-cyan-300" />
              <span className="text-slate-200 font-medium text-base">Learn by Doing</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 text-slate-100 leading-tight balance hyphens-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Interactive Workshops
            <span className="block mt-2 text-cyan-300">That Transform Skills</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-xl leading-relaxed text-slate-300 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Dive into practical, instructor-led sessions and build real projects to accelerate your
            growth.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-8 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { number: '25+', label: 'Workshops' },
              { number: '500+', label: 'Students Trained' },
              { number: '4.8★', label: 'Average Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.15 }}
              >
                <div className="text-2xl md:text-3xl font-bold mb-1 neon-counter">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight className="w-6 h-6 text-slate-400 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Workshops Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 border ${
                  selectedCategory === category.id
                    ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/40'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 border-slate-800'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Workshops Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredWorkshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  className={`group relative dc-card overflow-hidden transition-all duration-300 cursor-pointer scale-[0.9] md:scale-100`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  onHoverStart={() => setHoveredWorkshop(workshop.id)}
                  onHoverEnd={() => setHoveredWorkshop(null)}
                >
                  {/* Workshop Header */}
                  <div
                    className={`h-28 bg-gradient-to-r from-slate-900 to-slate-800 relative flex items-center justify-center`}
                  >
                    <motion.div
                      className="flex items-center justify-center"
                      animate={hoveredWorkshop === workshop.id ? { scale: 1.08 } : {}}
                      transition={{ duration: 0.25 }}
                    >
                      {(() => {
                        const Icon = workshop.icon;
                        return <Icon className="w-10 h-10 text-cyan-300" />;
                      })()}
                    </motion.div>
                  </div>

                  {/* Workshop Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(workshop.level)}`}
                      >
                        {workshop.level}
                      </span>
                      <div className="flex items-center space-x-1 text-slate-400 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{workshop.participants}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {workshop.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {workshop.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workshop.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-slate-900 text-slate-300 text-xs rounded-md border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Workshop Details */}
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {workshop.time} ({workshop.duration})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Instructor: {workshop.instructor}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link to="/contact" className="block mt-6 group">
<CtaButton className="w-full" size="md" variant="primary">
                        <span className="pr-2">Register Now</span>
                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                      </CtaButton>
                    </Link>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-slate-800 rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-semibold mb-4 text-slate-100">
                Can't Find What <span className="text-cyan-300">You're Looking For?</span>
              </h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Have a specific topic in mind? We regularly add new workshops based on community
                interest. Suggest a workshop and we'll make it happen!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
<CtaButton size="lg" variant="primary">
                    Suggest a Workshop
                  </CtaButton>
                </Link>
                <Link to="/gallery">
                  <GradientButton variant="ghost" size="lg">
                    View Past Workshops
                  </GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Workshops;
