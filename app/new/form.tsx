'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from './img_upload'

// ...

export default function HealthForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [header, setHeader] = useState<string | null>(null)
  const [icon, setIcon] = useState<string | null>(null)
  const [timeEdited, setTimeEdited] = useState<string | null>(null)

  const getHealthData = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('health')
        .select(`title, description, header, icon, time_edited`)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setTitle(data.title)
        setDescription(data.description)
        setHeader(data.header)
        setIcon(data.icon)
        setTimeEdited(data.time_edited) // Assuming time_edited is already formatted correctly
      }
    } catch (error) {
      alert('Error loading health data!')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    getHealthData()
  }, [user, getHealthData])

  async function updateHealth({
    title,
    description,
    header,
    icon,
  }: {
    title: string | null
    description: string | null
    header: string | null
    icon: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('health').upsert({
        title,
        description,
        header,
        icon,
        time_edited: new Date().toISOString(),
      })
      if (error) throw error
      alert('Health data updated!')
    } catch (error) {
      alert('Error updating health data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">

      {/* ... */}

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="header">Header</label>
        <input
          id="header"
          type="text"
          value={header || ''}
          onChange={(e) => setHeader(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="icon">Icon</label>
        <input
          id="icon"
          type="text"
          value={icon || ''}
          onChange={(e) => setIcon(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateHealth({ title, description, header, icon })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      {/* ... */}
    </div>
  )
}