import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResultSectionProps {
  status: 'idle' | 'analyzing' | 'complete';
  result: 'real' | 'fake' | null;
  confidence?: number;
}

export function ResultSection({ status, result, confidence }: ResultSectionProps) {
  if (status === 'idle') return null;

  return (
    <AnimatePresence>
      <motion.section 
        className="py-16 px-6"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated background glow */}
            <motion.div
              className={`absolute inset-0 ${
                result === 'real' 
                  ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
                  : result === 'fake'
                  ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10'
                  : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
              }`}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Analysis Status */}
            <div className="text-center mb-8 relative z-10">
              <motion.h3 
                className="text-2xl font-semibold text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Analysis Status
              </motion.h3>
              
              <AnimatePresence mode="wait">
                {status === 'analyzing' && (
                  <motion.div 
                    key="analyzing"
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-12 h-12 text-blue-500" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-gray-400">Analyzing image with deep learning models...</p>
                      
                      {/* Animated progress dots */}
                      <motion.div className="flex justify-center gap-2 mt-4">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {status === 'complete' && result && (
                  <motion.div 
                    key="complete"
                    className="space-y-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Result icon and text */}
                    <div className="flex flex-col items-center gap-4">
                      {result === 'real' ? (
                        <>
                          <motion.div 
                            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center relative"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                              delay: 0.2 
                            }}
                          >
                            {/* Pulse rings */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-green-500/30"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                type: "spring",
                                delay: 0.3,
                                stiffness: 200 
                              }}
                            >
                              <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </motion.div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <p className="text-sm text-gray-400 mb-2">Result</p>
                            <motion.p 
                              className="text-3xl font-semibold text-green-500"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              Authentic Image
                            </motion.p>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <motion.div 
                            className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center relative"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                              delay: 0.2 
                            }}
                          >
                            {/* Warning pulse */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-red-500/30"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                type: "spring",
                                delay: 0.3,
                                stiffness: 200 
                              }}
                            >
                              <AlertTriangle className="w-12 h-12 text-red-500" />
                            </motion.div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <p className="text-sm text-gray-400 mb-2">Result</p>
                            <motion.p 
                              className="text-3xl font-semibold text-red-500"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              Deep Fake Detected
                            </motion.p>
                          </motion.div>
                        </>
                      )}
                    </div>

                    {/* Confidence score */}
                    {confidence && (
                      <motion.div 
                        className="pt-6 border-t border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <p className="text-sm text-gray-400 mb-2">Confidence</p>
                        <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              result === 'real'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : 'bg-gradient-to-r from-red-500 to-orange-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${confidence}%` }}
                            transition={{ 
                              duration: 1.5,
                              delay: 0.8,
                              ease: "easeOut" 
                            }}
                          />
                        </div>
                        <motion.p 
                          className="text-right text-white mt-2 font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          {confidence.toFixed(1)}%
                        </motion.p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}