import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { DevTag, GlassCard } from './UI';

export const ParallaxFooter: React.FC = () => {
  return (
    <footer 
        className="fixed bottom-0 left-0 w-full h-[500px] bg-[#050a1f] text-white z-0 flex flex-col justify-center items-center overflow-hidden"
        id="parallax-footer"
    >
        <DevTag label="PARALLAX FOOTER" desc="Fixed Z-0 Reveal Effect" />
        
        {/* Background Texture similar to reference */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div 
                className="absolute inset-0" 
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #4c1d95 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a1f] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Brand Column */}
                <div className="md:col-span-5 space-y-6">
                    <div className="font-serif font-bold text-3xl tracking-wider">
                        ADVANCED<span className="text-purple-400">BIO</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-sm">
                        Restoring independence through advanced nutritional science. 
                        Specifically formulated for the changing physiology of those over 50.
                    </p>
                    <div className="flex gap-4">
                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                            <motion.a 
                                key={i}
                                href="#" 
                                whileHover={{ y: -3, color: '#c084fc' }}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <Icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="md:col-span-3 space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Explore</h4>
                    <ul className="space-y-3">
                        {['Science', 'Ingredients', 'Clinical Studies', 'Reviews', 'Guarantee'].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-purple-400 transition-all duration-300" />
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact / Newsletter */}
                <div className="md:col-span-4 space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Stay Updated</h4>
                    <GlassCard className="p-1 flex items-center bg-white/5 border-white/10">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="bg-transparent border-none outline-none text-white px-4 py-2 w-full text-sm placeholder:text-gray-500"
                        />
                        <button className="p-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white transition-colors">
                            <ArrowUpRight size={18} />
                        </button>
                    </GlassCard>
                    
                    <div className="space-y-2 text-sm text-gray-400 mt-6">
                        <p className="flex items-center gap-3">
                            <Mail size={14} className="text-purple-400" /> support@advancedbio.com
                        </p>
                        <p className="flex items-center gap-3">
                            <Phone size={14} className="text-purple-400" /> 1-800-BIO-HELP
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>© 2024 Advanced Bionutritionals. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
                    <span className="flex items-center gap-2">
                        <ShieldCheck size={12} className="text-green-500" /> Secure SSL
                    </span>
                </div>
            </div>
        </div>
    </footer>
  );
};
