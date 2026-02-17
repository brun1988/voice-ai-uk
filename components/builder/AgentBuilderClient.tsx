'use client'

/**
 * Agent Builder Client Component
 * 
 * Interactive builder for configuring AI agents.
 * 
 * Sections:
 * 1. Settings - Name, description, voice
 * 2. Flow - Conversation flow designer
 * 3. Knowledge - Upload documents, FAQs
 * 4. Test - Try the agent
 * 
 * @module components/builder/AgentBuilderClient
 */

import { useState } from 'react'
import { Agent, KnowledgeBase } from '@prisma/client'

type AgentWithRelations = Agent & {
  knowledgeBase: KnowledgeBase | null
}

// Tabs in the builder
type BuilderTab = 'settings' | 'flow' | 'knowledge' | 'test'

interface Props {
  agent: AgentWithRelations
}

export default function AgentBuilderClient({ agent }: Props) {
  const [activeTab, setActiveTab] = useState<BuilderTab>('settings')
  const [saving, setSaving] = useState(false)
  const [agentData, setAgentData] = useState(agent)

  const tabs: { id: BuilderTab; label: string; icon: string }[] = [
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'flow', label: 'Flow', icon: '🔀' },
    { id: 'knowledge', label: 'Knowledge', icon: '📚' },
    { id: 'test', label: 'Test', icon: '🧪' },
  ]

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agentData),
      })
      if (response.ok) {
        alert('Saved!')
      }
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{agentData.name}</h1>
            <p className="text-sm text-gray-500">
              {agentData.status === 'draft' ? 'Draft' : 'Active'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Deploy
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'settings' && (
          <SettingsTab agent={agentData} setAgent={setAgentData} />
        )}
        {activeTab === 'flow' && <FlowTab agent={agentData} />}
        {activeTab === 'knowledge' && <KnowledgeTab agent={agentData} />}
        {activeTab === 'test' && <TestTab agent={agentData} />}
      </div>
    </div>
  )
}

/**
 * Settings Tab - Basic configuration
 */
function SettingsTab({ 
  agent, 
  setAgent 
}: { 
  agent: AgentWithRelations
  setAgent: (data: any) => void 
}) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Agent Name
        </label>
        <input
          type="text"
          value={agent.name}
          onChange={(e) => setAgent({ ...agent, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={agent.description || ''}
          onChange={(e) => setAgent({ ...agent, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="What does this agent do?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Greeting Message
        </label>
        <textarea
          value={agent.greeting || ''}
          onChange={(e) => setAgent({ ...agent, greeting: e.target.value })}
          rows={2}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Hello, thank you for calling..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Voice
        </label>
        <select
          value={agent.voiceId || ''}
          onChange={(e) => setAgent({ ...agent, voiceId: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select a voice</option>
          <option value="rachel">Rachel (Female, UK)</option>
          <option value="adam">Adam (Male, UK)</option>
          <option value="sam">Sam (Neutral)</option>
        </select>
      </div>
    </div>
  )
}

/**
 * Flow Tab - Conversation flow designer
 */
function FlowTab({ agent }: { agent: AgentWithRelations }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Conversation Flow</h3>
      
      {agent.flowData ? (
        <div className="p-4 bg-gray-50 rounded-lg">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(agent.flowData, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-4">No flow configured yet</p>
          <p className="text-sm">Use the visual builder to create a conversation flow</p>
        </div>
      )}
      
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          Open Visual Builder
        </button>
        <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          Use Prompt
        </button>
      </div>
    </div>
  )
}

/**
 * Knowledge Tab - Knowledge base management
 */
function KnowledgeTab({ agent }: { agent: AgentWithRelations }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-2">Drag and drop files here</p>
          <p className="text-sm text-gray-400">PDF, TXT, DOC up to 10MB</p>
          <button className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            Browse Files
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">FAQs</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              placeholder="Question"
              className="flex-1 px-3 py-2 border rounded"
            />
            <input
              placeholder="Answer"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
              ✕
            </button>
          </div>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            + Add FAQ
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Website Import</h3>
        <input
          type="url"
          placeholder="https://your-website.com"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button className="mt-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          Import
        </button>
      </div>
    </div>
  )
}

/**
 * Test Tab - Test the agent
 */
function TestTab({ agent }: { agent: AgentWithRelations }) {
  const [testing, setTesting] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])

  const startTest = () => {
    setTesting(true)
    setTranscript(['Connecting to agent...', 'Agent: Hello, how can I help?'])
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Test Call</h3>
        
        {!testing ? (
          <button
            onClick={startTest}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start Test Call
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-600">Connected</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-auto">
              {transcript.map((line, i) => (
                <div key={i} className="mb-2">{line}</div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
