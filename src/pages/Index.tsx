import { useState, useCallback, useEffect } from "react";
import PanelHeader from "@/components/PanelHeader";
import ProfileInput from "@/components/ProfileInput";
import ToneSlider from "@/components/ToneSlider";
import LanguageToggle from "@/components/LanguageToggle";
import ChannelSelection from "@/components/ChannelSelection";
import GenerateButton from "@/components/GenerateButton";
import IntelligenceGraph from "@/components/graph/IntelligenceGraph";
import RightPanel from "@/components/RightPanel";
import { GenerateResponse, MOCK_RESPONSE } from "@/types/outreach";

const loadingTexts = [
  "Analyzing persona…",
  "Building relationship map…",
  "Generating messages…",
];

const Index = () => {
  const [profileText, setProfileText] = useState("");
  const [tone, setTone] = useState(70);
  const [language, setLanguage] = useState("English");
  const [channels, setChannels] = useState(["email", "linkedin", "whatsapp"]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const toneLabel = tone <= 30 ? "formal" : tone <= 70 ? "balanced" : "casual";

  // Auto-select person node after generation completes
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setSelectedNodeId("person"), 3000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleGenerate = useCallback(async () => {
    if (!profileText.trim() || channels.length === 0) return;

    setIsLoading(true);
    setResult(null);
    setSelectedNodeId(null);
    setLoadingTextIdx(0);

    const textInterval = setInterval(() => {
      setLoadingTextIdx((prev) =>
        prev < loadingTexts.length - 1 ? prev + 1 : prev
      );
    }, 1000);

    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_text: profileText,
          tone: toneLabel,
          channels,
          language: language.toLowerCase(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        throw new Error("Backend error");
      }
    } catch {
      await new Promise((r) => setTimeout(r, 2500));
      setResult(MOCK_RESPONSE);
    } finally {
      clearInterval(textInterval);
      setIsLoading(false);
    }
  }, [profileText, tone, language, channels, toneLabel]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, hsl(280 80% 60% / 0.06) 0%, transparent 50%), radial-gradient(circle at 85% 20%, hsl(220 90% 56% / 0.05) 0%, transparent 50%), radial-gradient(circle at 50% 80%, hsl(320 75% 55% / 0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 h-full flex">
        {/* LEFT SIDEBAR — Controls */}
        <div className="w-[280px] shrink-0 h-full border-r border-glass-border bg-surface/80 backdrop-blur-sm overflow-y-auto">
          <div className="p-5 space-y-5">
            <PanelHeader />
            <div className="h-px bg-glass-border" />
            <ProfileInput value={profileText} onChange={setProfileText} />
            <ToneSlider value={tone} onChange={setTone} />
            <LanguageToggle value={language} onChange={setLanguage} />
            <ChannelSelection selected={channels} onChange={setChannels} />
            <GenerateButton
              onClick={handleGenerate}
              isLoading={isLoading}
              loadingText={loadingTexts[loadingTextIdx]}
              disabled={!profileText.trim() || channels.length === 0}
            />
          </div>
        </div>

        {/* CENTER — Intelligence Graph Canvas */}
        <div className="flex-1 h-full bg-background/40">
          <IntelligenceGraph
            result={result}
            isLoading={isLoading}
            onNodeSelect={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
          />
        </div>

        {/* RIGHT PANEL — Message Intelligence */}
        <div className="w-[380px] shrink-0 h-full border-l border-glass-border bg-surface/80 backdrop-blur-sm">
          <RightPanel
            result={result}
            selectedNodeId={selectedNodeId}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
