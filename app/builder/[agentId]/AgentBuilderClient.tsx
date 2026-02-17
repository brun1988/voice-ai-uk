/**
 * Voice AI UK - Agent Builder Client Component
 * 
 * Client-side component for building AI agents.
 * Handles form state and interactive features.
 * 
 * @module app/builder/[agentId]/AgentBuilderClient
 */

"use client";

import { useState } from "react";
import { Agent, KnowledgeBase, PhoneNumber } from "@prisma/client";

type AgentWithRelations = Agent & {
  knowledgeBase: KnowledgeBase | null;
  phoneNumbers: PhoneNumber[];
};

interface AgentBuilderClientProps {
  agent: AgentWithRelations;
}

/**
 * Agent Builder Client Component
 * 
 * Allows editing agent configuration including:
 * - Name and description
 * - Voice settings
 * - Greeting message
 * - Flow configuration
 */
export default function AgentBuilderClient({ agent }: AgentBuilderClientProps) {
  const [name, setName] = useState(agent.name);
  const [description, setDescription] = useState(agent.description || "");
  const [greeting, setGreeting] = useState(agent.greeting || "");
  const [saving, setSaving] = useState(false);

  /**
   * Save agent changes
   */
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, greeting }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save");
      }
      
      alert("Agent saved!");
    } catch (error) {
      alert("Failed to save agent");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Agent</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Agent Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Greeting Message
          </label>
          <textarea
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
            rows={2}
            placeholder="Hello! This is [Business Name]..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
