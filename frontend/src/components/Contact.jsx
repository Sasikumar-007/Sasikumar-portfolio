import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '');

export default function Contact() {
    const { theme } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(null), 4000);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'Something went wrong');
            setTimeout(() => setStatus(null), 4000);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/50 ${theme === 'dark'
        ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:bg-white/10'
        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-primary/30'
        }`;

    return (
        <section id="contact" className={`py-24 px-4 ${theme === 'dark' ? 'bg-surface-dark-2' : 'bg-gray-50'
            }`}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
                    <p className={`max-w-lg mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div>
                            <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>Let's connect</h3>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white shrink-0">
                                        <FiMail size={18} />
                                    </div>
                                    <div>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                                        <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>sasikumarblogger@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0">
                                        <FiMapPin size={18} />
                                    </div>
                                    <div>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                                        <p className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Tamil Nadu, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>Follow Me</h4>
                            <div className="flex gap-3">
                                <motion.a
                                    href="https://github.com/Sasikumar-007"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${theme === 'dark'
                                        ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                        }`}
                                >
                                    <FiGithub />
                                </motion.a>
                                <motion.a
                                    href="https://www.linkedin.com/in/sasikumar-baskar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${theme === 'dark'
                                        ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                        }`}
                                >
                                    <FiLinkedin />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className={`glass rounded-2xl p-6 sm:p-8 ${theme === 'dark' ? '' : 'bg-white/80 border-gray-200/50'
                            }`}>
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                        }`}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    }`}>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Project Collaboration"
                                    className={inputClass}
                                />
                            </div>

                            <div className="mb-6">
                                <label className={`text-xs font-semibold uppercase tracking-wider mb-1.5 block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    }`}>Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status === 'loading'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FiSend />
                                        Send Message
                                    </>
                                )}
                            </motion.button>

                            {/* Status Messages */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-4 flex items-center gap-2 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm"
                                    >
                                        <FiCheck className="shrink-0" />
                                        Message sent successfully! I'll get back to you soon.
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-4 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm"
                                    >
                                        <FiAlertCircle className="shrink-0" />
                                        {errorMsg || 'Failed to send message. Please try again.'}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
