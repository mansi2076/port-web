import { motion } from 'framer-motion';
import { useState } from 'react';

const skills = [
  {
    category: 'Programming',
    items: [
      { name: 'Java', level: 85, icon: '☕' },
      { name: 'JavaScript', level: 80, icon: '📜' }
    ]
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', level: 85, icon: '⚛️' },
      { name: 'Tailwind CSS', level: 85, icon: '🎨' },
      { name: 'Node.js', level: 80, icon: '🟢' },
      { name: 'Express.js', level: 75, icon: '🚀' },
      { name: 'HTML/CSS', level: 90, icon: '🖥️' }
    ]
  },
  {
    category: 'Databases',
    items: [
      { name: 'MySQL', level: 80, icon: '🐬' },
      { name: 'MongoDB', level: 75, icon: '🍃' }
    ]
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 85, icon: '🔧' },
      { name: 'GitHub', level: 85, icon: '🐙' },
      { name: 'Visual Studio Code', level: 80, icon: '📝' }
    ]
  },
  {
    category: 'Foundations',
    items: [
      { name: 'OOPs', level: 85, icon: '🔄' },
      { name: 'DBMS', level: 80, icon: '🗃️' },
      { name: 'Operating System', level: 75, icon: '💻' },
      { name: 'Data Structures', level: 85, icon: '🧩' }
    ]
  },
  {
    category: 'Soft Skills',
    items: [
      { name: 'Communication', level: 90, icon: '💬' },
      { name: 'Teamwork', level: 85, icon: '🤝' },
      { name: 'Problem Solving', level: 90, icon: '🧠' }
    ]
  }
];

const Skills = () => {
  const [expandedCategory, setExpandedCategory] = useState('Programming');

  return (
    <section id="skills" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            My expertise across different technology domains
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-28 space-y-2">
              {skills.map((category) => (
                <motion.button
                  key={category.category}
                  onClick={() => setExpandedCategory(category.category)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    expandedCategory === category.category
                      ? 'bg-slate-800 border-l-4 border-cyan-400 font-semibold text-white'
                      : 'text-slate-400 hover:bg-slate-700/40'
                  }`}
                >
                  {category.category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="lg:w-3/4">
            <div className="relative h-auto min-h-[300px]">
              {skills.map((category) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: expandedCategory === category.category ? 1 : 0,
                    y: expandedCategory === category.category ? 0 : 10
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
                    expandedCategory === category.category ? 'block' : 'hidden'
                  }`}
                >
                  <h3 className="text-2xl font-bold text-slate-200 mb-6">
                    {category.category}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-cyan-500/30 transition-shadow border border-slate-700 hover:border-cyan-500/40"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-2xl shadow-inner">
                            {skill.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
                            <div className="w-full bg-slate-700 rounded-full h-2 relative overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              ></motion.div>
                            </div>
                            <div className="text-right text-sm text-slate-400 mt-1">
                              {skill.level}%
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
