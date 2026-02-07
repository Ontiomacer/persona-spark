import { useState, useCallback } from "react";
import PanelHeader from "@/components/PanelHeader";
import ProfileInput from "@/components/ProfileInput";
import ToneSlider from "@/components/ToneSlider";
import LanguageToggle from "@/components/LanguageToggle";
import ChannelSelection from "@/components/ChannelSelection";
import GenerateButton from "@/components/GenerateButton";
import PersonaAnalysis from "@/components/PersonaAnalysis";
import MessageTabs from "@/components/MessageTabs";
import SimilarProfiles from "@/components/SimilarProfiles";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import { GenerateResponse, MOCK_RESPONSE } from "@/types/outreach";

const loadingTexts = [
  "Analyzing persona…",
  "Matching tone…",
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

  const toneLabel = tone <= 30 ? "formal" : tone <= 70 ? "balanced" : "casual";

  const handleGenerate = useCallback(async () => {
    if (!profileText.trim() || channels.length === 0) return;

    setIsLoading(true);
    setResult(null);
    setLoadingTextIdx(0);

    // Cycle loading texts
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
      // Fallback to mock data
      await new Promise((r) => setTimeout(r, 2500));
      setResult(MOCK_RESPONSE);
    } finally {
      clearInterval(textInterval);
      setIsLoading(false);
    }
  }, [profileText, tone, language, channels, toneLabel]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background bg-gradient-radial relative">
      {/* Subtle animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, hsl(280 80% 60% / 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(220 90% 56% / 0.05) 0%, transparent 50%), radial-gradient(circle at 60% 80%, hsl(320 75% 55% / 0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 h-full flex">
        {/* LEFT PANEL */}
        <div className="w-[380px] shrink-0 h-full border-r border-glass-border bg-surface/50 backdrop-blur-sm overflow-y-auto">
          <div className="p-6 space-y-6">
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

        {/* RIGHT PANEL */}
        <div className="flex-1 h-full overflow-y-auto">
          <div className="p-6 max-w-4xl mx-auto space-y-4">
            {isLoading ? (
              <LoadingState />
            ) : result ? (
              <>
                <PersonaAnalysis persona={result.persona} />
                <MessageTabs data={result} />
                <SimilarProfiles profiles={result.similar_profiles} />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
