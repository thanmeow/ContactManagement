import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

export function getContacts() {
  return api.get('/contacts')
}

export function searchContacts(name) {
  return api.get('/contacts/search', { params: { name } })
}

export function addContact(contact) {
  return api.post('/contacts', contact)
}

export function updateContact(id, contact) {
  return api.put(`/contacts/${id}`, contact)
}

export function deleteContact(id) {
  return api.delete(`/contacts/${id}`)
}
