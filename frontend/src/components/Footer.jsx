import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowUp, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
    const { theme } = useTheme();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={`relative py-12 px-4 border-t ${theme === 'dark'
            ? 'bg-surface-dark border-white/5'
            : 'bg-white border-gray-100'
            }`}>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="text-xl font-bold font-[family-name:var(--font-display)]"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="gradient-text">&lt;Sasi</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>kumar /&gt;</span>
                    </motion.a>

                    {/* Copyright */}
                    <p className={`text-sm flex items-center gap-1.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                        © {new Date().getFullYear()} Sasikumar Baskar. Made with
                        <FiHeart className="text-red-500 inline" />
                        All rights reserved.
                    </p>

                    {/* Social + Scroll Top */}
                    <div className="flex items-center gap-3">
                        <motion.a
                            href="https://github.com/Sasikumar-007"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark'
                                ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            <FiGithub size={18} />
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/sasikumar-baskar"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark'
                                ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            <FiLinkedin size={18} />
                        </motion.a>
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20"
                        >
                            <FiArrowUp size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
