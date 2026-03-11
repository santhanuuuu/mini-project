import { Upload, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DetectionSectionProps {
  onAnalyze: (file: File) => void;
}

export function DetectionSection({ onAnalyze }: DetectionSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <section id="detection" className="py-32 px-6 relative">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Glassmorphism card with glow */}
          <div className="relative group">
            {/* Animated glow effect */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-40"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Card */}
            <motion.div 
              className="relative bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Upload area */}
              <motion.div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`border-2 border-dashed rounded-2xl p-16 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-gray-500 bg-black/20'
                }`}
                animate={{
                  borderColor: dragActive ? '#3b82f6' : '#4b5563',
                }}
              >
                {/* Ripple effect on drag */}
                <AnimatePresence>
                  {dragActive && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500/20"
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                />
                
                <div className="flex flex-col items-center justify-center gap-6 relative z-10">
                  <AnimatePresence mode="wait">
                    {previewUrl ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05, rotateZ: 2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-64 rounded-xl shadow-2xl"
                          />
                        </motion.div>
                        <motion.p 
                          className="text-gray-400 mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {selectedFile?.name}
                        </motion.p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                      >
                        <motion.div 
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6"
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(59, 130, 246, 0.3)',
                              '0 0 40px rgba(168, 85, 247, 0.4)',
                              '0 0 20px rgba(59, 130, 246, 0.3)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Upload className="w-10 h-10 text-gray-400" />
                          </motion.div>
                        </motion.div>
                        <div className="text-center">
                          <p className="text-xl text-gray-300 mb-2">
                            Drop your image here or click to browse
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports PNG, JPG, JPEG
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Detect button */}
              <motion.div 
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={handleAnalyze}
                  disabled={!selectedFile}
                  className={`group relative inline-flex items-center gap-3 px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 overflow-hidden ${
                    selectedFile
                      ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 text-white'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={selectedFile ? { scale: 1.05 } : {}}
                  whileTap={selectedFile ? { scale: 0.98 } : {}}
                  style={selectedFile ? { backgroundSize: '200% 100%' } : {}}
                  animate={selectedFile ? {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  } : {}}
                  transition={{
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  {selectedFile && (
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 0.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  <Sparkles className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Detect Deep Fake</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}