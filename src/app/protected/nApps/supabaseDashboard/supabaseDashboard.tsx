


'use client'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/supabase/types'

// Initialize Supabase client
const supabase: SupabaseClient<Database> = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Define the Test table row type
interface TestRow {
  id: number
  created_at: string
  text: string
}

const SupabaseDashboard: React.FC = () => {
  const [data, setData] = useState<TestRow[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [newText, setNewText] = useState<string>('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState<string>('')

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('test').select('*').order('id', { ascending: true })
    if (error) {
      setError(error.message)
    } else {
      setData(data as TestRow[])
    }
    setLoading(false)
  }

  // Handle input change for new text
  const handleNewTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
  }

  // Handle form submission to insert new row
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!newText.trim()) {
      setError('Text field cannot be empty.')
      return
    }
    const { error } = await supabase.from('test').insert({ text: newText })
    if (error) {
      setError(error.message)
    } else {
      setNewText('')
      fetchData()
    }
  }

  // Handle delete action
  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('test').delete().eq('id', id)
    if (error) {
      setError(error.message)
    } else {
      fetchData()
    }
  }

  // Handle edit action
  const handleEdit = (id: number, currentText: string) => {
    setEditingId(id)
    setEditText(currentText)
  }

  // Handle edit input change
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value)
  }

  // Handle edit form submission
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (editingId === null) {
      setError('No item is being edited.')
      return
    }
    if (!editText.trim()) {
      setError('Text field cannot be empty.')
      return
    }
    const { error } = await supabase.from('test').update({ text: editText }).eq('id', editingId)
    if (error) {
      setError(error.message)
    } else {
      setEditingId(null)
      setEditText('')
      fetchData()
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Supabase Test Table</h1>

      {/* Display error message */}
      {error && (
        <div style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* Form to add new entry */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px', textAlign: 'center' }}>
        <input
          type="text"
          value={newText}
          onChange={handleNewTextChange}
          placeholder="Enter text"
          style={{
            padding: '10px',
            width: '60%',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </form>

      {/* Display loading state */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Created At</th>
              <th style={tableHeaderStyle}>Text</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} style={{ textAlign: 'center' }}>
                <td style={tableCellStyle}>{row.id}</td>
                <td style={tableCellStyle}>{new Date(row.created_at).toLocaleString()}</td>
                <td style={tableCellStyle}>
                  {editingId === row.id ? (
                    <form onSubmit={handleEditSubmit}>
                      <input
                        type="text"
                        value={editText}
                        onChange={handleEditChange}
                        style={{
                          padding: '5px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          width: '80%'
                        }}
                      />
                    </form>
                  ) : (
                    row.text
                  )}
                </td>
                <td style={tableCellStyle}>
                  {editingId === row.id ? (
                    <button
                      onClick={handleEditSubmit}
                      style={{
                        padding: '5px 10px',
                        marginRight: '5px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#008CBA',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(row.id, row.text)}
                      style={{
                        padding: '5px 10px',
                        marginRight: '5px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#FFA500',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(row.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#f44336',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// Inline styles for table
const tableHeaderStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2'
}

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px'
}

export default SupabaseDashboard