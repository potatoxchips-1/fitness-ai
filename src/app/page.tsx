"use client";
import { useState } from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I'm your fitness buddy 💪. Ask me anything about workouts, diet, or motivation!" }
  ]);
  const [input, setInput] = useState("");

  const responses: Record<string, string> = {
    hello: "Hey! Ready to smash your fitness goals today?",
    workout: "Try 20 pushups, 15 squats, and a 1-minute plank for a quick routine!",
    diet: "Focus on protein-rich foods 🍗🥚 and whole carbs like oats & rice for energy.",
    motivation: "Remember: small progress every day leads to big results! Keep going 🚀",
    default: "I’m not sure about that, but stay consistent and you’ll see results!"
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { from: "user", text: input };
    const lower = input.toLowerCase();
    let reply = responses.default;

    if (lower.includes("hello") || lower.includes("hi")) reply = responses.hello;
    else if (lower.includes("workout")) reply = responses.workout;
    else if (lower.includes("diet")) reply = responses.diet;
    else if (lower.includes("motivation")) reply = responses.motivation;

    const botMessage: Message = { from: "bot", text: reply };
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">🏋️ Fitness AI Buddy</h1>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl max-w-[80%] ${
                msg.from === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-xl p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about workouts, diet..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
