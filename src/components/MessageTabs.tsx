import { useState } from "react";
import { Mail, Linkedin, MessageCircle } from "lucide-react";
import MessageCard from "./MessageCard";
import SubjectLines from "./SubjectLines";
import { GenerateResponse } from "@/types/outreach";

interface MessageTabsProps {
  data: GenerateResponse;
}

const tabs = [
  { id: "email" as const, label: "Email", icon: Mail },
  { id: "linkedin" as const, label: "LinkedIn", icon: Linkedin },
  { id: "whatsapp" as const, label: "WhatsApp", icon: MessageCircle },
];

const variantLabels = ["A", "B", "C"];

const MessageTabs = ({ data }: MessageTabsProps) => {
  const [activeTab, setActiveTab] = useState<"email" | "linkedin" | "whatsapp">("email");

  const messages = data.messages[activeTab];

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 rounded-lg bg-muted/30 border border-border">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === id
                ? "bg-muted text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {messages.map((msg, i) => (
          <MessageCard
            key={`${activeTab}-${i}`}
            variant={variantLabels[i]}
            message={msg}
            score={data.scores[i] || 75}
            delay={i * 150}
          />
        ))}
      </div>

      {activeTab === "email" && <SubjectLines subjects={data.subjects} />}
    </div>
  );
};

export default MessageTabs;
