import { useEffect, useState } from 'react'

const emptyForm = { name: '', phone: '', email: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) {
    errors.name = 'Name is required'
  }
  if (!form.phone.trim()) {
    errors.phone = 'Phone is required'
  } else if (!/^[0-9]{10,15}$/.test(form.phone.trim())) {
    errors.phone = 'Phone must be 10 to 15 digits only'
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Email is not valid'
  }
  return errors
}

function ContactForm({ editingContact, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  // Fill the form when Edit is clicked, clear it when editing ends
  useEffect(() => {
    if (editingContact) {
      setForm({
        name: editingContact.name,
        phone: editingContact.phone,
        email: editingContact.email,
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
    setServerError('')
  }, [editingContact])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    const formErrors = validate(form)
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) {
      return
    }

    const contact = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
    }

    try {
      await onSave(contact)
      setForm(emptyForm)
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data
        if (data.errors) {
          setErrors(data.errors)
        }
        setServerError(data.message || 'Something went wrong')
      } else {
        setServerError('Could not connect to the server')
      }
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingContact ? 'Edit Contact' : 'Add Contact'}</h2>

      {serverError && <p className="error-box">{serverError}</p>}

      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="text" value={form.phone} onChange={handleChange} />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-blue">
          {editingContact ? 'Update' : 'Save'}
        </button>
        {editingContact && (
          <button type="button" className="btn btn-grey" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm
