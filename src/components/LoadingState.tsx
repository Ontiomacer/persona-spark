import { useEffect, useState } from "react";

const loadingSteps = [
  "Analyzing profile…",
  "Matching tone…",
  "Extracting persona signals…",
  "Generating messages…",
];

const LoadingState = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6">
      {/* Animated orb */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-30 animate-pulse-glow blur-xl absolute inset-0" />
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-60 animate-float flex items-center justify-center relative">
          <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent animate-spin" style={{ animationDuration: "3s" }} />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2 text-center">
        {loadingSteps.map((text, i) => (
          <div
            key={i}
            className={`text-sm font-mono transition-all duration-500 ${
              i < step
                ? "text-muted-foreground/50 line-through"
                : i === step
                ? "text-primary font-medium"
                : "text-muted-foreground/20"
            }`}
          >
            {i === step && (
              <span className="inline-block mr-2 animate-pulse">▸</span>
            )}
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
