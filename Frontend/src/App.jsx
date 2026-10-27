import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import ContactList from './components/ContactList.jsx'
import { getContacts, searchContacts, addContact, updateContact, deleteContact } from './api.js'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [editingContact, setEditingContact] = useState(null)
  const [searchName, setSearchName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts('')
  }, [])

  async function loadContacts(name) {
    setError('')
    try {
      const res = name.trim() ? await searchContacts(name) : await getContacts()
      setContacts(res.data)
    } catch (err) {
      setError('Could not load contacts. Make sure the backend is running.')
    }
    setLoading(false)
  }

  function handleSearch(name) {
    setSearchName(name)
    loadContacts(name)
  }

  // Throws on failure so ContactForm can show the error messages
  async function handleSave(contact) {
    if (editingContact) {
      await updateContact(editingContact.id, contact)
      setEditingContact(null)
    } else {
      await addContact(contact)
    }
    loadContacts(searchName)
  }

  async function handleDelete(contact) {
    if (!window.confirm(`Delete contact "${contact.name}"?`)) {
      return
    }
    try {
      await deleteContact(contact.id)
      if (editingContact && editingContact.id === contact.id) {
        setEditingContact(null)
      }
      loadContacts(searchName)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('Could not delete contact.')
      }
    }
  }

  return (
    <div>
      <header className="header">
        <h1>Digital Contact Book</h1>
      </header>

      <main className="container">
        <ContactForm
          editingContact={editingContact}
          onSave={handleSave}
          onCancel={() => setEditingContact(null)}
        />

        <SearchBar onSearch={handleSearch} />

        {error && <p className="error-box">{error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ContactList
            contacts={contacts}
            searchName={searchName}
            onEdit={setEditingContact}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}

export default App
