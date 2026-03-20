import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/common/Layout';
import { Github, Instagram, Users, Linkedin } from 'lucide-react';
import { GradientText } from '../components/ui/animated-hero';
import { Helmet } from 'react-helmet-async';

const CORE_TEAM = [
  { name: 'Divyansh Teja Edla ', role: 'President ', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/divyansh-teja-edla-18557b28b',github: 'https://github.com/DIVYANSH-TEJA-09', instagram: '', bio: 'Driven by curiosity, purpose, and the belief that technology can create meaningful change. Passionate about understanding problems deeply, exploring ideas, and collaborating with others to build solutions that make a real-world impact.' },
  { name: 'Dhruv Gannaram', role: 'Vice President', image: '/api/placeholder/300/300', linkedin: 'https://linkedin.com/in/username',github: 'https://github.com/', instagram: 'https://www.instagram.com/', bio: 'Community builder passionate about inclusive tech environments.' },
  { name: 'Sanjay Samala', role: 'Treasurer ', image: '/api/placeholder/300/300',linkedin: 'https://www.linkedin.com/in/sanjaysamala/', github: 'https://github.com/sanjaysam410', instagram: 'https://www.instagram.com/_sanjay.sam?igsh=MXRmZXR0N3lhcHg0bg%3D%3D&utm_source=qr', bio: 'Driven by curiosity, purpose, and the belief that technology can create meaningful change. Passionate about understanding problems deeply, exploring ideas, and collaborating with others to build solutions that make a real-world impact.' },
  { name: 'Parimitha ', role: 'Secretary ', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/doddi-parimitha-a87474301',github: 'https://github.com/parimitha26', instagram: 'https://www.instagram.com/parimitha_.26', bio: 'Computer Science student who loves tech and the energy of a great event. Always excited to create spaces where people, ideas, and innovation meet.' },
  { name: 'Hemaditya Kalakota', role: 'Technical Lead', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/hemadityakalakota',github: 'https://www.github.com/Hemaditya05', instagram: '#', bio: 'Driven by curiosity and innovation.' },
  { name: 'Siddhartha ', role: 'Technical Lead', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/',github: '#', instagram: 'https://www.instagram.com/', bio: '' },
  { name: 'Ch.Bhuvana Sri', role: 'Social Media Head', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/bhuvana-srii',github: 'https://github.com/Bhuvana2605', instagram: 'https://www.instagram.com/bhuvanasri_26', bio: 'Learning, building, and figuring things out one step at a time.' },
  { name: 'Esha Satvase', role: 'Outreach Head', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/eshasatvase',github: 'https://github.com/esha070605', instagram: 'https://www.instagram.com/esha.__.eshu', bio: "I'm the Event Planning and Management Head at AWS Cloud Club and Event Planning Head at DevCatalyst. I manage events, work with teams, while maintaining strong academics and exploring technology through projects. I also run a crochet small business - @_crochetbysha_" },
  { name: 'Ajay', role: 'Chief Editor', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/ajay-puttam',github: 'https://github.com/Ajay-puttam', instagram: 'https://www.instagram.com/oye__ajayyyy._', bio: 'A final year cse undergraduate.' },
];

const TECH_TEAM = [
  { name: 'A.Pranav Sai Sreekanta', role: 'Member', image: '/api/placeholder/300/300',linkedin: 'https://linkedin.com/in/pranav-sai-sreekanta-ajjarapu-89236032a', github: 'https://github.com/apranavsai07', instagram: 'https://www.instagram.com/a_pranav_07', bio: 'Curious about how things work, driven to make them better. Focused on building practical systems that create real-world impact. Using AI/ML and code to turn ideas into real solutions.'},
  { name: 'Girish Panchariya', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/girish-panchariya-405713286',github: 'https://github.com/Girishp12113', instagram: 'https://www.instagram.com/_avegna_', bio: 'Driven by curiosity and innovation.' },
  { name: 'Yadoji Sri Avegna', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/yadoji-sri-avegna-0684a0381',github: '#', instagram: 'https://www.instagram.com/_avegna_', bio: 'Sri Avegna from IT Department 1st yr, Member of Dev Catalyst. Like to play football, watch movies, play videogames. Inspire Manak Awardee 2022-23. Have knowledge in Python, C and MySQL.' },
  { name: 'Suchir', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/b-sai-suchir-1629733b1',github: 'https://github.com/suchirsai686-lgtm', instagram: 'https://www.instagram.com/sai_suchir', bio: 'Passionate about learning and exploring.' },
  { name: 'Srihasini', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/srihasini-lakkoju-8165b8393',github: 'https://github.com/Srihasini-26', instagram: 'https://www.instagram.com/srihasini_09_', bio: "I'm a 1st-year CSE student who likes exploring technology and working with teams on projects." },
  { name: 'Jasthi Raj Likhit', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/raj-likhit-jasthi/',github: 'https://github.com/Raj-Likhit', instagram: '#', bio: 'Passionate about Cybersecurity. I enjoy swimming and playing games.' },
  { name: 'P.Devi Sreehitha', role:'Member', image: 'api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/devi-sreehitha/',github: 'https://github.com/devisreehitha1102', instagram: 'https://www.instagram.com/devi_sreehitha_7659/', bio: 'Pursuing IT and interested in learning web development and debugging.'},
  { name: 'Ganji Phani Chandra', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/ganji-phani-chandra-730809380',github: 'https://github.com/OphioPhani', instagram: 'https://www.instagram.com/2h4ni_', bio: 'CSE student passionate about web development, cyber security, problem solving and building impactful tech solutions. Always eager to learn and contribute to innovative projects.' },
];

const SOCIAL_MEDIA = [
  { name: 'Peta Supratik', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://linkedin.com/in/supratik-peta-442b3537a',github: 'https://github.com/supratikpeta7', instagram: 'https://www.instagram.com/esha.__.eshu', bio: 'Passionate about tech, always trying to create original content.' },
  { name: 'Nikhilesh Basham', role: 'Member', image: '/api/placeholder/300/300',linkedin: 'https://linkedin.com/in/nikhilesh-basham-603a593b5', github: '#', instagram: 'https://www.instagram.com/nikhileshbasham', bio: 'Student at Matrusri Engineering college.' },
  { name: 'Akshara reddy', role: 'Member', image: '/api/placeholder/300/300',linkedin: 'https://www.linkedin.com/in/akshara-reddy-56a26535b', github: 'https://github.com/Akshara1067', instagram: 'https://www.instagram.com/aksharareddy_', bio: 'I am Akshara, passionate in learning new technology and innovation. I can adapt quickly and also focusing on improving my communication skills. For now I am exploring various fields of technology.' },
  { name: 'Thanvi', role: 'Member', image: '/api/placeholder/300/300',linkedin: 'https://www.linkedin.com/in/thanvi-miryala-5385a7367/', github: '#', instagram: 'https://www.instagram.com/thanveei_', bio: 'Creative and curious, with a love for learning and trying new things. Enjoys collaborating with others and bringing fresh ideas to life. Always excited to grow, contribute, and be part of a vibrant community!' },
];

const EVENT_PLANNING = [
  { name: 'Kranthi Kodati', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/kranthi-kodati-6b973232b',github: '#', instagram: 'https://www.instagram.com/kranthi_kodati', bio: "I'm a curious and creative individual who enjoys solving problems and exploring new ideas. I actively participate in clubs, contribute to events, and like learning things in a hands-on, innovative way." },
  { name: 'Vinuthna Athimamula', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/vinuthna-athimamula',github: 'https://www.github.com/in/Vinuthna-Athimamula', instagram: 'https://www.instagram.com/vinuthna__26', bio: "I'm a curious and creative individual who enjoys solving problems and exploring new ideas. I actively participate in clubs, contribute to events, and like learning things in a hands-on, innovative way." },
  { name: 'VAISHNAV CHALLA', role: 'Member', image: '/api/placeholder/300/300',linkedin: 'https://linkedin.com/in/vaishnav-challa-958b13399', github: '#', instagram: 'https://www.instagram.com/vaishnavchalla3101', bio: 'Driven and curious individual with a passion for learning, creativity, and making an impact.' },
  { name: 'Yashwanth Reddy Molgara', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://linkedin.com/in/YashwanthReddyMolgara',github: 'https://github.com/Yashwanth5115', instagram: 'https://www.instagram.com/yashwanth_5115', bio: 'A Computer Science student driven by creativity and unconventional thinking. I enjoy breaking down problems and building unique ideas that go beyond traditional solutions.' },
  { name: 'Chiluveru Dikshitha', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://linkedin.com/in/dikshitha-chiluveru',github: 'https://github.com/dikshitha-dev', instagram: 'https://www.instagram.com/dikshitha_05', bio: 'A Computer Science student driven by creativity and unconventional thinking. I focus on turning creative concepts into real and impactful outcomes.' },
  { name: 'Bharath pathi', role: 'Member', image: '/api/placeholder/300/300',linkedin: 'https://www.linkedin.com/in/bharath-naidu-61a2b5399/', github: '#', instagram: 'https://www.instagram.com/bharath_naidu_.30', bio: 'Lazyy' },
  { name: 'Sai Karthikeyan Koduri', role: 'Member', image: '/api/placeholder/300/300',linkedin: 'https://www.linkedin.com/in/sai-karthikeyan-koduri/', github: 'https://github.com/karthikeyankoduri', instagram: 'https://www.instagram.com/k4rth1keyan', bio: 'I like Agentic AI and Automation.' },
];

const VISION_MAKERS = [
  { name: 'Kranthi Kodati', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://www.linkedin.com/in/kranthi-kodati-6b973232b',github: '#', instagram: 'https://www.instagram.com/kranthi_kodati', bio: "I'm a curious and creative individual who enjoys solving problems and exploring new ideas." },
  { name: 'Bavana N', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'http://linkedin.com/in/bavana-narvaneni-944783341',github: 'https://github.com/bavna1', instagram: 'https://www.instagram.com/bav_naahh', bio: "Hey, I'm Bavana, a 2nd-year CSE student exploring tech and figuring out what I want to build the hard way. Badminton keeps me sane." },
  { name: 'Podisetty Mani Lithish', role: 'Member', image: '/api/placeholder/300/300', linkedin: 'https://linkedin.com/in/manilithishpodisetty',github: 'https://github.com/manilithishpodisetty', instagram: 'https://www.instagram.com/manilithish_1211', bio: 'I am currently pursuing my first year of BE, with a keen interest in technology and innovation. I am eager to learn, improve my skills, and gain practical experience.' },
  { name: 'Katamreddy sai', role: 'Editing team', image: '/api/placeholder/300/300', linkedin: '#', bio: "I'm a 2nd year student of CSE branch D section." },
];

const Card = ({ m, isExpanded, onToggle }) => {
  return (
    <div
  className={`dc-card flex flex-col items-center text-center cursor-pointer p-5 md:p-6 transition-all duration-300 self-start ${
    isExpanded ? 'ring-2 ring-cyan-500/40' : ''
  }`}
  onClick={onToggle}
>
      <h3 className="text-xl md:text-2xl font-bold text-white">{m.name}</h3>
      <p className="text-cyan-300 font-medium mb-2 text-base md:text-lg">{m.role}</p>

      {/* Bio — pure CSS max-height, no framer-motion here */}
      <div
        style={{
          maxHeight: isExpanded ? '300px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          width: '100%',
        }}
      >
        {m.bio && (
          <p className="text-slate-300 text-sm md:text-base mt-2 mb-3">
            {m.bio}
          </p>
        )}
      </div>

      {/* Social Icons */}
      <div
        className="flex items-center gap-3 mt-3"
        onClick={(e) => e.stopPropagation()}
      >
        {m.linkedin && m.linkedin !== '#' && (
          <a href={m.linkedin} target="_blank" rel="noreferrer"
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Linkedin className="w-5 h-5 text-white" />
          </a>
        )}
        {m.github && m.github !== '#' && (
          <a href={m.github} target="_blank" rel="noreferrer"
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Github className="w-5 h-5 text-white" />
          </a>
        )}
        {m.instagram && m.instagram !== '#' && (
          <a href={m.instagram} target="_blank" rel="noreferrer"
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <Instagram className="w-5 h-5 text-white" />
          </a>
        )}
      </div>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
const Section = ({ title, members }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="relative py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 accent-heading">
          {title}
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {members.map((m, index) => (
            <Card
              key={`${title}-${index}`}
              m={m}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Team = () => {
  return (
    <Layout>
      <Helmet>
        <title>DevCatalyst | Team</title>
        <meta name="description" content="Meet the DevCatalyst team: builders, mentors, and designers driving the community." />
      </Helmet>

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
          <h1 className="text-4xl md:text-7xl font-bold mt-6 text-white leading-tight">
            <span>Meet the </span>
            <GradientText>People</GradientText>
            <span> behind DevCatalyst</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mt-6 max-w-3xl mx-auto">
            Passionate builders, mentors, and designers driving our mission forward.
          </p>
        </motion.div>
      </section>

      <Section title="Core Team" members={CORE_TEAM} />
      <Section title="Technical Team" members={TECH_TEAM} />
      <Section title="Social Media" members={SOCIAL_MEDIA} />
      <Section title="Event Planning" members={EVENT_PLANNING} />
      <Section title="Vision Makers" members={VISION_MAKERS} />
    </Layout>
  );
};

export default Team;
