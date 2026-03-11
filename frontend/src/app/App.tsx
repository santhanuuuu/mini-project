import { useState, useRef } from 'react';
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

  const handleUploadClick = () => {
    detectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyze = async (file: File) => {
    setAnalysisStatus('analyzing');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://127.0.0.1:8000/predictImage", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.result === "Real") {
        setResult("real");
        setConfidence(95);
      } else if (data.result === "Fake") {
        setResult("fake");
        setConfidence(95);
      } else {
        setResult(null);
        setConfidence(0);
      }

      setAnalysisStatus('complete');

    } catch (error) {
      console.error("Error connecting to backend:", error);
      setAnalysisStatus('idle');
    }
  };

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
      
      <ResultSection 
        status={analysisStatus} 
        result={result} 
        confidence={confidence}
      />
      
      <HowItWorksSection />
      <TechnologySection />
      <Footer />
    </motion.div>
  );
}