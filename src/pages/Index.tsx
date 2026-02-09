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
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col transition-colors duration-200">
      <TopNav />
      <div className="flex-1 overflow-hidden relative">
        <div className="relative z-10 h-full flex">
          {/* LEFT COLUMN */}
          <div className="w-[280px] shrink-0 h-full overflow-y-auto p-4 space-y-4">
            <div className="glass-card p-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Zap className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Generate Intelligence</h2>
                  <p className="text-[10px] text-muted-foreground">Paste a profile to analyze</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <ProfileInput value={profileText} onChange={setProfileText} />
            </div>

            <div className="glass-card p-4 space-y-4">
              <ToneSlider value={tone} onChange={setTone} />
              <LanguageToggle value={language} onChange={setLanguage} />
              <ChannelSelection selected={channels} onChange={setChannels} />
            </div>

            <GenerateButton
              onClick={handleGenerate}
              isLoading={isLoading}
              loadingText={loadingTexts[loadingTextIdx]}
              disabled={!profileText.trim() || channels.length === 0}
            />

            <div className="glass-card p-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/30 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/40" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">Running locally</span>
              <span className="text-[10px] text-muted-foreground ml-auto">Offline LLM</span>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full flex flex-col min-w-0">
            {result && (
              <div className="mx-4 mt-4 glass-card p-4 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-foreground/15 bg-card p-[2px]">
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                      <User className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-foreground">{result.persona.name}</h2>
                    <p className="text-sm text-muted-foreground">{result.persona.role} at {result.persona.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Building2, label: result.persona.company },
                      { icon: Globe, label: result.persona.industry },
                      { icon: Briefcase, label: result.persona.seniority },
                    ].map((tag) => (
                      <span
                        key={tag.label}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border border-border bg-muted text-foreground"
                      >
                        <tag.icon className="w-3 h-3" />
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex-1 min-h-0">
              <IntelligenceGraph
                result={result}
                isLoading={isLoading}
                onNodeSelect={setSelectedNodeId}
                selectedNodeId={selectedNodeId}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[360px] shrink-0 h-full border-l border-border overflow-hidden">
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
