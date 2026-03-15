import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { DetectionSection } from './components/DetectionSection';
import { ResultSection } from './components/ResultSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TechnologySection } from './components/TechnologySection';
import { Footer } from './components/Footer';

export default function App() {
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [result, setResult] = useState<'real' | 'fake' | null>(null);
  const [confidence, setConfidence] = useState<number>(0);

  const detectionRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleUploadClick = () => {
    detectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // CONNECTED TO RENDER BACKEND
  const handleAnalyze = async (file: File) => {
    setAnalysisStatus("analyzing");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("https://mini-project-1-skru.onrender.com/predictImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Backend response:", data);

      const prediction = data.result === 0 ? "real" : "fake";

      setResult(prediction);
      setConfidence(95);
      setAnalysisStatus("complete");

    } catch (error) {
      console.error(error);
      setAnalysisStatus("idle");
    }
  };

  // Scroll to result when analysis completes
  useEffect(() => {
    if (analysisStatus === 'complete') {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  }, [analysisStatus]);

  return (
    <motion.div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection onUploadClick={handleUploadClick} />

      <div ref={detectionRef}>
        <DetectionSection onAnalyze={handleAnalyze} />
      </div>

      <div ref={resultRef}>
        <ResultSection
          status={analysisStatus}
          result={result}
          confidence={confidence}
        />
      </div>

      <HowItWorksSection />
      <TechnologySection />
      <Footer />
    </motion.div>
  );
}