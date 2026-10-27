import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(text)
  }

  function handleClear() {
    setText('')
    onSearch('')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn btn-blue">Search</button>
      <button type="button" className="btn btn-grey" onClick={handleClear}>Clear</button>
    </form>
  )
}

export default SearchBar
