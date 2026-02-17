'use client'

/**
 * New Agent Page
 * 
 * Create a new AI agent from a template or from scratch.
 * 
 * Templates:
 * - Real Estate: Lead qualification, property inquiries
 * - Restaurant: Reservations, takeaways
 * - Healthcare: Appointment scheduling
 * - Custom: Start from scratch
 * 
 * @module app/dashboard/new/page
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Template = 'real_estate' | 'restaurant' | 'healthcare' | 'custom'

interface TemplateInfo {
  id: Template
  name: string
  description: string
  icon: string
  color: string
}

const templates: TemplateInfo[] = [
  {
    id: 'real_estate',
    name: 'Real Estate',
    description: 'Qualify leads, book property viewings',
    icon: '🏠',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Table reservations, takeaways',
    icon: '🍽️',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Appointment scheduling, NHS-compatible',
    icon: '🏥',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Build from scratch',
    icon: '✨',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  },
]

export default function NewAgentPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [agentName, setAgentName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async () => {
    if (!selectedTemplate || !agentName.trim()) {
      setError('Please select a template and enter a name')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: agentName,
          template: selectedTemplate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create agent')
      }

      // Redirect to builder
      router.push(`/builder/${data.agent.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create New Agent</h1>
          <p className="text-gray-500 mt-2">
            Choose a template to get started quickly
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Template Selection */}
        {!agentName && (
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template.id)
                  setAgentName(template.name + ' Agent')
                }}
                className={`p-6 border-2 rounded-xl text-left transition-all ${template.color}`}
              >
                <div className="text-3xl mb-3">{template.icon}</div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </button>
            ))}
          </div>
        )}

        {/* Name Input */}
        {selectedTemplate && !agentName && (
          <div className="bg-white border rounded-xl p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Name
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g., Main Receptionist"
              className="w-full px-4 py-2 border rounded-lg"
              autoFocus
            />
          </div>
        )}

        {/* Confirmation */}
        {selectedTemplate && agentName && (
          <div className="space-y-4">
            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Confirm Creation</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Template:</span>
                  <span className="ml-2 font-medium">
                    {templates.find(t => t.id === selectedTemplate)?.name}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Agent Name:</span>
                  <span className="ml-2 font-medium">{agentName}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedTemplate(null)
                  setAgentName('')
                }}
                className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Agent'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
