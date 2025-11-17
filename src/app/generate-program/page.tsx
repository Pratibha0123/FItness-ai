"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AI_Assistants from "@/assets/ai_coach.png";

// ------------------- FIXED TYPES -------------------
interface ChatMessage {
  role: "assistant" | "user" | "system";
  content: string;
}

interface VapiMessage {
  type: string;
  transcript?: string;
  transcriptType?: string;
  role?: "assistant" | "user" | "system";
}

// ---------------------------------------------------

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // ---------------- FIXED ERROR HANDLING ----------------
  useEffect(() => {
    const originalError = console.error;

    console.error = function (msg: unknown, ...args: unknown[]) {
      const msgStr = typeof msg === "string" ? msg : "";
      const argStr = args[0] && typeof args[0] === "string" ? args[0] : "";

      if (
        msgStr.includes("Meeting has ended") ||
        argStr.includes("Meeting has ended")
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return;
      }
      return originalError.call(console, msg, ...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Redirect after end
  useEffect(() => {
    if (callEnded) {
      const timer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [callEnded, router]);

  // ---------------- FIXED MESSAGE HANDLER ----------------
  const handleMessage = (message: VapiMessage) => {
    if (message.type === "transcript" && message.transcriptType === "final") {
      setMessages((prev) => [
        ...prev,
        {
          role: message.role || "assistant",
          content: message.transcript || "",
        },
      ]);
    }
  };

  // VAPI EVENTS
  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    const handleError = (error: unknown) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  // ------------------- FIXED CALL TOGGLE -------------------
  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    } else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        // System message
        setMessages([
          {
            role: "system",
            content: "🔗 Connecting to CodeFlex AI... please wait.",
          },
        ]);

        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            full_name: fullName,
            user_id: user?.id,
          },
        });

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `👋 Hi ${fullName}! I'm CodeFlex AI, your fitness coach. Let's create your personalized program.`,
          },
        ]);

        setConnecting(false);
        setCallActive(true);
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);

        // Error message
        setMessages([
          {
            role: "system",
            content: "❌ Failed to connect. Please try again later.",
          },
        ]);
      }
    }
  };

  // ----------------------------------------------------------------

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-mono">
            <span>Generate Your </span>
            <span className="text-primary uppercase">Fitness Program</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Have a voice conversation with our AI assistant to create your personalized plan
          </p>
        </div>

        {/* TWO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI CARD */}
          <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* AI AVATAR */}
              <div className="relative size-32 mb-4">
                <Image
                  src={AI_Assistants}
                  alt="AI Assistant"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h2 className="text-xl font-bold text-foreground">CodeFlex AI</h2>
              <p className="text-sm text-muted-foreground mt-1">Fitness & Diet Coach</p>

              {/* Speaking indicator */}
              <div
                className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                  isSpeaking ? "border-primary" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {isSpeaking
                    ? "Speaking..."
                    : callActive
                    ? "Listening..."
                    : callEnded
                    ? "Redirecting..."
                    : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          {/* USER CARD */}
          <Card className="bg-card/90 backdrop-blur-sm border overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              <div className="relative size-32 mb-4">
                <Image
                  src={user?.imageUrl || "/default-user.png"}
                  alt="User"
                  width={128}
                  height={128}
                  className="size-full object-cover rounded-full"
                />
              </div>

              <h2 className="text-xl font-bold text-foreground">You</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {user ? `${user.firstName} ${user.lastName || ""}` : "Guest"}
              </p>
            </div>
          </Card>
        </div>

        {/* MESSAGE BOX */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto"
          >
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">
                    {msg.role === "assistant"
                      ? "CodeFlex AI"
                      : msg.role === "system"
                      ? "System"
                      : "You"}
                    :
                  </div>
                  <p className="text-foreground">{msg.content}</p>
                </div>
              ))}

              {callEnded && (
                <div className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-primary mb-1">System:</div>
                  <p>Your fitness program has been created! Redirecting…</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CALL BUTTON */}
        <div className="w-full flex justify-center">
          <Button
            className={`w-40 text-xl rounded-3xl ${
              callActive
                ? "bg-destructive"
                : callEnded
                ? "bg-green-600"
                : "bg-primary"
            } text-white`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {callActive
              ? "End Call"
              : connecting
              ? "Connecting..."
              : callEnded
              ? "View Profile"
              : "Start Call"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateProgramPage;
