"use client";

import React, { useState } from "react";

export default function AICareerChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I am your AI Career Guide. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "I'm here to help with your career questions! (AI response placeholder)" }
      ]);
    }, 800);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">AI Career Chat</h2>
      <div className="h-64 overflow-y-auto mb-4 bg-gray-50 p-3 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs text-sm shadow
                ${msg.sender === "ai" ? "bg-blue-100 text-blue-900" : "bg-green-100 text-green-900"}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ask your career question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
