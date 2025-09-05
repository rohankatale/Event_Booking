import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/common';
import { Background3D } from '../components/3d/Background3D';
import { ArrowRight, Calendar, Users, Zap } from 'lucide-react';

// New Feature Component for alternating layout
const FeatureSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}> = ({ icon, title, description, image, reverse = false }) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="lg:w-1/2"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-purple-400">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-lg text-white/70 leading-relaxed">{description}</p>
      <Button variant="glass" size="md" className="mt-6">
        Learn More <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ once: true }}
      className="lg:w-1/2"
    >
      <Card variant="glass" className="p-4 card-hover">
        <img src={image} alt={title} className="rounded-lg shadow-2xl" />
      </Card>
    </motion.div>
  );

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {content}
      {imageContent}
    </div>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { number: '10,000+', label: 'Events Created' },
    { number: '50,000+', label: 'Happy Users' },
    { number: '100+', label: 'Cities Worldwide' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Background3D />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Experience Events
              <br />
              <span className="gradient-text">Like Never Before</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mt-6">
              Discover, create, and manage events with our beautiful, intuitive platform. 
              Connect with people and create unforgettable memories.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/events')}
                className="px-12 py-4 text-lg neon-glow"
              >
                Explore Events
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => navigate('/signup')}
                className="px-12 py-4 text-lg"
              >
                Create Account
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Card variant="glass" className="p-8 card-hover">
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/60 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternating Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-24">
            <FeatureSection
              icon={<Calendar size={24} />}
              title="Discover & Create"
              description="Find amazing events happening near you or online. From concerts to conferences, we have it all. Host your own events with our intuitive event creation tools and manage everything in one place."
              image="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            />
            <FeatureSection
              icon={<Zap size={24} />}
              title="Effortless Registration"
              description="Register for events with just a click. Our streamlined process ensures you can secure your spot in seconds. Keep track of all your upcoming events in a personalized dashboard."
              image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              reverse
            />
            <FeatureSection
              icon={<Users size={24} />}
              title="Engage Your Community"
              description="Connect with attendees, send updates, and build a community around your events. Our platform provides the tools you need to create a lasting impact and foster engagement."
              image="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" className="p-12 neon-glow-subtle">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                  Join thousands of event creators and attendees who trust EventFlow.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="px-10 py-4 text-lg"
                >
                  Get Started For Free
                </Button>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};