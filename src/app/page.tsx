"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "ai", text: "Welcome to Fitness AI! 💪 Ask me anything about workouts, diet, or motivation." },
  ]);
  const [input, setInput] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const dummyReplies: Record<string, string> = {
    hello: "Hey champ! Ready to crush your fitness goals today? 🔥",
    workout: "Try push-ups, squats, and planks for a killer bodyweight workout!",
    diet: "Stick to high protein, complex carbs, and healthy fats. Fuel your gains! 🥗",
    motivation: "Remember why you started. Small progress is still progress. 🚀",
    default: "I'm here to help with fitness, diet, or motivation tips. Ask away!",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const reply =
        dummyReplies[lowerInput as keyof typeof dummyReplies] ||
        dummyReplies.default;

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 600);

    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex h-screen items-center justify-center relative">
      {/* Background Image */}
      <div
  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
  style={{ backgroundImage: "url('/gym-upscaled.png')" }}
></div>


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Chatbox */}
      <div
        className="relative z-10 w-full max-w-lg p-6 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-lg bg-white/10 text-white flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">🏋️ Fitness AI</h1>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500/80"
                  : "mr-auto bg-gray-800/70"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none text-sm"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
