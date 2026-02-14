import { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useState } from 'react';
import { FiArrowDown, FiMail } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
    const { theme } = useTheme();
    const [particlesReady, setParticlesReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setParticlesReady(true));
    }, []);

    const particlesOptions = useMemo(() => ({
        fullScreen: { enable: false },
        particles: {
            number: { value: 60, density: { enable: true, area: 900 } },
            color: { value: theme === 'dark' ? '#6366f1' : '#818cf8' },
            shape: { type: 'circle' },
            opacity: { value: { min: 0.1, max: 0.4 }, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'out' } },
            links: {
                enable: true,
                distance: 150,
                color: theme === 'dark' ? '#6366f1' : '#818cf8',
                opacity: 0.15,
                width: 1,
            },
        },
        detectRetina: true,
    }), [theme]);

    const particlesLoaded = useCallback((container) => { }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 ${theme === 'dark'
                    ? 'bg-gradient-to-br from-surface-dark via-[#1a1040] to-surface-dark'
                    : 'bg-gradient-to-br from-surface-light via-indigo-50 to-cyan-50'
                    }`} />
                <div className={`absolute top-20 -left-32 w-96 h-96 rounded-full blur-3xl animate-pulse ${theme === 'dark' ? 'bg-primary/20' : 'bg-primary/10'
                    }`} />
                <div className={`absolute bottom-20 -right-32 w-96 h-96 rounded-full blur-3xl animate-pulse ${theme === 'dark' ? 'bg-accent/20' : 'bg-accent/10'
                    }`} style={{ animationDelay: '2s' }} />
            </div>

            {/* Particles */}
            {particlesReady && (
                <Particles
                    id="hero-particles"
                    className="absolute inset-0 z-[1]"
                    particlesLoaded={particlesLoaded}
                    options={particlesOptions}
                />
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${theme === 'dark'
                            ? 'bg-primary/10 text-primary-light border border-primary/20'
                            : 'bg-primary/5 text-primary-dark border border-primary/15'
                            }`}
                    >
                        👋 Welcome to my portfolio
                    </motion.p>

                    <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-display)] mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Hi, I'm{' '}
                        <span className="gradient-text">Sasikumar Baskar</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className={`text-lg sm:text-xl lg:text-2xl font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}
                    >
                        Computer Science Engineering Student
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg sm:text-xl lg:text-2xl font-medium mb-6"
                    >
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>I work with </span>
                        <TypeAnimation
                            sequence={[
                                'Python', 1500,
                                'GenAI', 1500,
                                'Cloud', 1500,
                                'DevOps', 1500,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="gradient-text font-bold"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className={`text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                    >
                        Motivated CSE student with strong fundamentals in programming and problem solving, seeking internship opportunities.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow flex items-center gap-2"
                        >
                            <FiMail />
                            Contact Me
                        </motion.a>
                        <motion.a
                            href="#about"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-8 py-3.5 rounded-xl font-semibold border transition-all flex items-center gap-2 ${theme === 'dark'
                                ? 'border-white/20 text-white hover:bg-white/5'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <FiArrowDown />
                            Learn More
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${theme === 'dark' ? 'border-white/30' : 'border-gray-400'
                        }`}
                >
                    <motion.div
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
