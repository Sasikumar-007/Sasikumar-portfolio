import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const projects = [
    {
        title: 'AI-Powered MCP Server',
        description: 'An intelligent Model Context Protocol server leveraging GenAI capabilities for advanced natural language processing and automated task handling.',
        techStack: ['Python', 'GenAI', 'FastAPI', 'LLM'],
        github: 'https://github.com/Sasikumar-007',
        demo: '#',
        gradient: 'from-violet-500 to-purple-600',
    },
    {
        title: 'AI-Powered Parallax Website',
        description: 'A visually stunning parallax-scrolling website with AI-driven features and real-time data storage using Firebase integration.',
        techStack: ['JavaScript', 'Firebase', 'AI', 'CSS3'],
        github: 'https://github.com/Sasikumar-007',
        demo: '#',
        gradient: 'from-cyan-500 to-blue-600',
    },
    {
        title: 'Online Voting System',
        description: 'A secure online voting platform built with Python, featuring CI/CD pipelines with Jenkins and Docker for automated deployment.',
        techStack: ['Python', 'Docker', 'Jenkins', 'CI/CD'],
        github: 'https://github.com/Sasikumar-007',
        demo: '#',
        gradient: 'from-emerald-500 to-teal-600',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Projects() {
    const { theme } = useTheme();

    return (
        <section id="projects" className={`py-24 px-4 ${theme === 'dark' ? 'bg-surface-dark' : 'bg-white'
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
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </motion.div>

                {/* Project Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            variants={cardVariants}
                            whileHover={{ y: -12 }}
                            className="group relative"
                        >
                            {/* Gradient border */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />

                            <div className={`relative h-full glass rounded-2xl p-6 flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-surface-dark-2' : 'bg-white border border-gray-200'
                                }`}>
                                {/* Top gradient bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`} />

                                <div className="flex items-center gap-3 mb-4 mt-2">
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${project.gradient} flex items-center justify-center text-white text-lg`}>
                                        🚀
                                    </div>
                                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>{project.title}</h3>
                                </div>

                                <p className={`text-sm leading-relaxed mb-5 flex-grow ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    }`}>{project.description}</p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className={`px-2.5 py-1 rounded-md text-xs font-medium ${theme === 'dark'
                                                ? 'bg-primary/10 text-primary-light'
                                                : 'bg-primary/5 text-primary-dark'
                                                }`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-3 mt-auto">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                                            ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        <FiGithub />
                                        GitHub
                                    </motion.a>
                                    <motion.a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20"
                                    >
                                        <FiExternalLink />
                                        Live Demo
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
