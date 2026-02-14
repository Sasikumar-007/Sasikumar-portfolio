import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiBookOpen } from 'react-icons/fi';
import { HiAcademicCap } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';

const education = [
    { degree: 'B.E CSE', place: 'S.A Engineering College (Anna University)', score: 'CGPA: 8.21', year: '2024–2028', icon: HiAcademicCap },
    { degree: 'Higher Secondary (12th)', place: '', score: '78%', year: '', icon: FiBookOpen },
    { degree: 'Secondary (10th)', place: '', score: '80%', year: '', icon: FiBookOpen },
];

const certifications = [
    { title: 'Programming in Python Level 1 & 2', issuer: 'Infosys Springboard' },
    { title: 'Python Essentials', issuer: 'Cisco' },
];

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6 },
};

export default function About() {
    const { theme } = useTheme();

    return (
        <section id="about" className={`py-24 px-4 ${theme === 'dark' ? 'bg-surface-dark' : 'bg-white'
            }`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div {...fadeInUp} className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Education Timeline */}
                    <motion.div {...fadeInUp}>
                        <h3 className={`text-xl font-bold mb-8 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                            <HiAcademicCap className="text-primary text-2xl" />
                            Education
                        </h3>
                        <div className="space-y-6 relative">
                            <div className={`absolute left-4 top-2 bottom-2 w-0.5 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
                                }`} />
                            {education.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                    className="relative pl-12"
                                >
                                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                                        <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-surface-dark' : 'bg-white'
                                            }`} />
                                    </div>
                                    <div className={`glass rounded-xl p-5 hover:glow transition-all duration-300 ${theme === 'dark' ? '' : 'bg-gray-50/80 border-gray-200/50'
                                        }`}>
                                        <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>{item.degree}</h4>
                                        {item.place && (
                                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                }`}>{item.place}</p>
                                        )}
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-sm font-semibold text-primary">{item.score}</span>
                                            {item.year && (
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
                                                    }`}>{item.year}</span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Internship & Certifications */}
                    <div className="space-y-10">
                        {/* Internship */}
                        <motion.div {...fadeInUp}>
                            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                <FiBriefcase className="text-primary text-xl" />
                                Internship
                            </h3>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`glass rounded-xl p-6 hover:glow transition-all duration-300 ${theme === 'dark' ? '' : 'bg-gray-50/80 border-gray-200/50'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xl shrink-0">
                                        ☁️
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>Google Cloud Virtual Internship</h4>
                                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                            }`}>2025 — Hands-on experience with Google Cloud Platform services and tools.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Certifications */}
                        <motion.div {...fadeInUp}>
                            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                <FiAward className="text-primary text-xl" />
                                Certifications
                            </h3>
                            <div className="space-y-4">
                                {certifications.map((cert, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.15, duration: 0.5 }}
                                        whileHover={{ scale: 1.02 }}
                                        className={`glass rounded-xl p-5 hover:glow transition-all duration-300 ${theme === 'dark' ? '' : 'bg-gray-50/80 border-gray-200/50'
                                            }`}
                                    >
                                        <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>{cert.title}</h4>
                                        <p className="text-sm text-primary mt-1">{cert.issuer}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
