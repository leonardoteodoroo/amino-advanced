import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
    onScrollToOffer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToOffer }) => {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border-subtle bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 font-serif font-bold text-xl tracking-wider text-text-primary">
                        ADVANCED<span className="text-brand-navy">BIO</span>
                    </div>
                    <div className="hidden md:block">
                        <button
                            onClick={onScrollToOffer}
                            className="px-6 py-2 rounded-full bg-action-primary hover:bg-action-hover text-white transition-all text-sm font-bold uppercase tracking-widest shadow-md hover:shadow-lg"
                        >
                            Check Availability
                        </button>
                    </div>
                    <div className="md:hidden text-text-primary">
                        <button aria-label="Open menu">
                            <Menu />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
