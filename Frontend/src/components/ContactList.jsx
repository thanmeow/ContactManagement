function ContactList({ contacts, searchName, onEdit, onDelete }) {
  if (contacts.length === 0) {
    if (searchName.trim()) {
      return <p className="info-message">No contact found with that name.</p>
    }
    return <p className="info-message">No contacts saved yet. Add your first contact using the form above.</p>
  }

  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr key={contact.id}>
            <td>{index + 1}</td>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td>
              <button className="btn btn-blue btn-small" onClick={() => onEdit(contact)}>
                Edit
              </button>
              <button className="btn btn-red btn-small" onClick={() => onDelete(contact)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ContactList
