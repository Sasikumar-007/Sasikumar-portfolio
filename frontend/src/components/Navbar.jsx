import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'glass shadow-lg shadow-primary/5'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-display)]"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="gradient-text">&lt;Sasi</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>kumar /&gt;</span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-primary ${theme === 'dark'
                                        ? 'text-gray-300 hover:bg-white/5'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            className={`ml-2 p-2.5 rounded-xl transition-colors ${theme === 'dark'
                                    ? 'bg-white/10 text-yellow-400 hover:bg-white/20'
                                    : 'bg-gray-100 text-indigo-600 hover:bg-gray-200'
                                }`}
                        >
                            {theme === 'dark' ? <BsSunFill size={18} /> : <BsMoonStarsFill size={18} />}
                        </motion.button>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg ${theme === 'dark' ? 'text-yellow-400' : 'text-indigo-600'
                                }`}
                        >
                            {theme === 'dark' ? <BsSunFill size={18} /> : <BsMoonStarsFill size={18} />}
                        </button>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`p-2 rounded-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}
                        >
                            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`md:hidden glass border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                            }`}
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                                            ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
