import { motion } from 'framer-motion';
import { FiCode, FiGlobe, FiDatabase, FiGitBranch, FiCloud, FiTool } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const skillCategories = [
    {
        title: 'Languages',
        icon: FiCode,
        skills: ['Python', 'C', 'Java', 'JavaScript'],
        gradient: 'from-violet-500 to-purple-600',
    },
    {
        title: 'Web',
        icon: FiGlobe,
        skills: ['HTML', 'CSS'],
        gradient: 'from-cyan-500 to-blue-600',
    },
    {
        title: 'Database',
        icon: FiDatabase,
        skills: ['SQL'],
        gradient: 'from-emerald-500 to-green-600',
    },
    {
        title: 'DevOps',
        icon: FiGitBranch,
        skills: ['Git', 'GitHub', 'Jenkins', 'Docker'],
        gradient: 'from-orange-500 to-red-600',
    },
    {
        title: 'Cloud',
        icon: FiCloud,
        skills: ['Google Cloud Platform'],
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        title: 'Tools',
        icon: FiTool,
        skills: ['VS Code'],
        gradient: 'from-pink-500 to-rose-600',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function Skills() {
    const { theme } = useTheme();

    return (
        <section id="skills" className={`py-24 px-4 ${theme === 'dark' ? 'bg-surface-dark-2' : 'bg-gray-50'
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
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skillCategories.map((cat) => (
                        <motion.div
                            key={cat.title}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className={`group relative glass rounded-2xl p-6 overflow-hidden cursor-default transition-all duration-300 hover:glow ${theme === 'dark' ? '' : 'bg-white/80 border-gray-200/50'
                                }`}
                        >
                            {/* Gradient border glow on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cat.gradient} flex items-center justify-center text-white text-xl mb-4`}>
                                    <cat.icon />
                                </div>
                                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>{cat.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                                                    ? 'bg-white/5 text-gray-300 group-hover:bg-white/10'
                                                    : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                                                }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
