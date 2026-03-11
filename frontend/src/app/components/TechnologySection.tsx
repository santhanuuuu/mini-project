import { Cpu, Layers, ScanSearch } from 'lucide-react';
import { motion } from 'motion/react';

export function TechnologySection() {
  const technologies = [
    {
      icon: Cpu,
      title: 'Deep Learning',
      description: 'State-of-the-art neural networks',
    },
    {
      icon: Layers,
      title: 'CNN Architecture',
      description: 'Convolutional neural networks',
    },
    {
      icon: ScanSearch,
      title: 'Image Forensics',
      description: 'Advanced artifact detection',
    },
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="text-5xl font-semibold text-white text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Technology
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {technologies.map((tech, index) => (
            <motion.div 
              key={index} 
              className="flex items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              {/* Tech card */}
              <motion.div 
                className="group relative bg-gradient-to-b from-slate-900/70 to-slate-800/70 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 min-w-[260px]"
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-500"
                />

                <div className="flex flex-col items-center text-center relative z-10">
                  {/* Icon */}
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 relative overflow-hidden"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-500/40 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      animate={{
                        y: [0, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    >
                      <tech.icon className="w-7 h-7 text-blue-400 relative z-10" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {tech.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p 
                    className="text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {tech.description}
                  </motion.p>
                </div>

                {/* Floating particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${20 + i * 15}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Animated separator line */}
              {index < technologies.length - 1 && (
                <motion.div 
                  className="hidden md:block relative mx-4"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                >
                  <div className="w-16 h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50" />
                  <motion.div
                    className="absolute top-1/2 left-0 w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2"
                    animate={{
                      x: [0, 60, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}