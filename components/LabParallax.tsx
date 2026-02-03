import React from 'react';
import { DevTag } from './UI';

export const LabParallax: React.FC = () => {
  return (
    <div className="relative w-full text-slate-900 font-sans">
      
      {/* 1. PARALLAX HEADER 
          mimics: header { top: 0; position: fixed; z-index: -1; } 
          We use sticky top-0 + -z-10 to achieve the "content slides over header" effect 
          without hijacking window scroll.
      */}
      <div className="sticky top-0 h-[80vh] w-full -z-10 overflow-hidden flex items-center justify-center bg-gray-900">
        <div className="absolute top-0 left-0 w-full z-50 p-4">
            <DevTag label="LAB MODE" desc="Parallax Scroll Effect Test" />
        </div>
        
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Parallax Header"
        />
        <div className="relative z-10 text-center text-white mix-blend-overlay">
           <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none">
             Scroll<br/>Effect
           </h1>
        </div>
      </div>

      {/* 2. MAIN CONTENT 
          mimics: .content { background: #ededed; z-index: 1; }
          Must be z-10 to slide OVER the header and OVER the footer.
          The marginBottom creates the 'window' for the footer to be revealed.
      */}
      <div className="relative z-10 bg-[#ededed] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] mb-[500px] rounded-t-[3rem] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-32 space-y-24">
            <header className="text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Experimental Section</p>
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-gray-900">The Parallax Layer</h2>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                    This white layer slides over the fixed header above. As you continue scrolling down, the margin at the bottom of this container will act as a "curtain," lifting to reveal the footer fixed underneath.
                </p>
            </header>

            <div className="grid gap-12">
                {[1, 2, 3].map((i) => (
                    <article key={i} className="bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100">
                        <span className="text-6xl font-black text-gray-100 mb-4 block">0{i}</span>
                        <h3 className="text-3xl font-bold mb-4 text-gray-800">Lorem Ipsum Dolor</h3>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </article>
                ))}
            </div>
            
            <div className="text-center pt-12 opacity-50">
                <p className="text-sm uppercase tracking-widest">Keep scrolling to reveal footer</p>
                <div className="w-px h-24 bg-gray-400 mx-auto mt-6" />
            </div>
        </div>
      </div>

      {/* 3. PARALLAX FOOTER 
          mimics: footer { position: fixed; bottom: 0; z-index: -1; }
          We use fixed bottom-0 + z-0. 
          Note: In the main App, we must ensure nothing else has a higher z-index covering this space 
          when the content margin opens up.
      */}
      <div className="fixed bottom-0 left-0 w-full h-[500px] bg-[#1a1a1a] flex flex-col items-center justify-center z-0 text-white pointer-events-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <h2 className="text-[10vw] font-black text-white/5 uppercase tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            Footer
        </h2>
        
        <div className="relative z-10 text-center max-w-lg px-6">
            <h3 className="text-3xl font-bold mb-4">Effect Complete</h3>
            <p className="text-gray-400 text-lg">
                The content layer has scrolled up, revealing this fixed footer layer sitting behind it. This technique creates depth without expensive JavaScript calculations.
            </p>
        </div>
      </div>
      
    </div>
  );
};
