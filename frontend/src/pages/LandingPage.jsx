import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Shield, Bug, ArrowRight, Github } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="glow-mesh"></div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full glass text-sm font-semibold text-blue-400 mb-6 inline-block border border-blue-500/30">
            Powered by LLaMA 3.3
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            Review Code Like a <br />
            <span className="gradient-text text-glow">Senior Engineer</span>
          </h1>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Elevate your code quality with instant, AI-powered feedback. Detect bugs, optimize performance, and learn best practices in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStart}
              className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              Start Your Review <ArrowRight size={20} />
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              className="glass px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-white/5 transition-colors"
            >
              <Github size={20} /> View on GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-blue-400" />}
            title="Instant Analysis"
            description="Get feedback on your code in real-time. No more waiting for manual reviews."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Shield className="text-purple-400" />}
            title="Deep Bug Detection"
            description="Our AI identifies complex logical flaws and security vulnerabilities before they reach production."
            delay={0.3}
          />
          <FeatureCard 
            icon={<Code2 className="text-emerald-400" />}
            title="Refactoring Pro"
            description="Receive fully optimized code snippets that follow clean code principles and patterns."
            delay={0.4}
          />
        </div>
      </section>

      {/* Stats/Social Proof (Optional placeholder) */}
      <section className="py-20 text-center">
        <div className="glass p-12 rounded-3xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Trusted by developers worldwide</h2>
          <div className="flex justify-center gap-12 mt-8 opacity-50 grayscale hover:grayscale-0 transition-all">
             {/* Simple logos placeholder */}
             <div className="font-bold text-2xl italic">GOOGLE</div>
             <div className="font-bold text-2xl italic">META</div>
             <div className="font-bold text-2xl italic">VERCEL</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="glass p-8 rounded-3xl hover:border-blue-500/50 transition-all group"
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </motion.div>
);

export default LandingPage;
