import { useState, useCallback, useEffect } from "react";
import TopNav from "@/components/TopNav";
import ProfileInput from "@/components/ProfileInput";
import ToneSlider from "@/components/ToneSlider";
import LanguageToggle from "@/components/LanguageToggle";
import ChannelSelection from "@/components/ChannelSelection";
import GenerateButton from "@/components/GenerateButton";
import IntelligenceGraph from "@/components/graph/IntelligenceGraph";
import RightPanel from "@/components/RightPanel";
import { GenerateResponse, MOCK_RESPONSE } from "@/types/outreach";
import { User, Building2, Globe, Briefcase, Zap } from "lucide-react";

const loadingTexts = [
  "Detecting persona…",
  "Detecting company…",
  "Mapping interests…",
  "Generating messages…",
  "Adding similar personas…",
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
    }, 800);

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
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-hidden relative">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 15% 50%, hsl(280 80% 60% / 0.06) 0%, transparent 50%), radial-gradient(circle at 85% 20%, hsl(220 90% 56% / 0.05) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 h-full flex">
          {/* LEFT COLUMN — Profile Input Controls */}
          <div className="w-[280px] shrink-0 h-full overflow-y-auto p-4 space-y-4">
            {/* Profile Card */}
            <div className="glass-card p-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Generate Intelligence</h2>
                  <p className="text-[10px] text-muted-foreground">Paste a profile to analyze</p>
                </div>
              </div>
              <div className="h-px bg-glass-border" />
              <ProfileInput value={profileText} onChange={setProfileText} />
            </div>

            {/* Controls Card */}
            <div className="glass-card p-4 space-y-4">
              <ToneSlider value={tone} onChange={setTone} />
              <LanguageToggle value={language} onChange={setLanguage} />
              <ChannelSelection selected={channels} onChange={setChannels} />
            </div>

            {/* Generate */}
            <GenerateButton
              onClick={handleGenerate}
              isLoading={isLoading}
              loadingText={loadingTexts[loadingTextIdx]}
              disabled={!profileText.trim() || channels.length === 0}
            />

            {/* Status badge */}
            <div className="glass-card p-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
              </span>
              <span className="text-xs font-medium" style={{ color: "hsl(142 71% 45%)" }}>Running locally</span>
              <span className="text-[10px] text-muted-foreground ml-auto">Offline LLM</span>
            </div>
          </div>

          {/* CENTER — Graph + Profile Header */}
          <div className="flex-1 h-full flex flex-col min-w-0">
            {/* Target Profile Header Card */}
            {result && (
              <div className="mx-4 mt-4 glass-card p-4 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/80 via-accent/60 to-secondary/70 p-[2px] shadow-lg shadow-primary/20">
                    <div className="w-full h-full rounded-full bg-background/90 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-foreground">{result.persona.name}</h2>
                    <p className="text-sm text-muted-foreground">{result.persona.role} at {result.persona.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Building2, label: result.persona.company, color: "secondary" },
                      { icon: Globe, label: result.persona.industry, color: "primary" },
                      { icon: Briefcase, label: result.persona.seniority, color: "accent" },
                    ].map((tag) => (
                      <span
                        key={tag.label}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border bg-${tag.color}/10 text-${tag.color} border-${tag.color}/20`}
                      >
                        <tag.icon className="w-3 h-3" />
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Intelligence Graph Canvas */}
            <div className="flex-1 min-h-0">
              <IntelligenceGraph
                result={result}
                isLoading={isLoading}
                onNodeSelect={setSelectedNodeId}
                selectedNodeId={selectedNodeId}
              />
            </div>
          </div>

          {/* RIGHT COLUMN — Messages + Persona */}
          <div className="w-[360px] shrink-0 h-full border-l border-glass-border overflow-hidden">
            <RightPanel
              result={result}
              selectedNodeId={selectedNodeId}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
