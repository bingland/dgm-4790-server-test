import './EditArea.scss'

const EditArea = props => {

  const handleTitleChange = (e) => { props.setCurrentTitle(e.target.value) }
  const handleBodyChange = (e) => { props.setCurrentBody(e.target.value) }

  return (
    <div className="editAreaBackground">
      <div className="EditArea">
        <h1>Edit comment:</h1>
        <input type="text" placeholder="Title here..." value={props.currentTitle} onChange={handleTitleChange} />
        <textarea placeholder="Comment here..." value={props.currentBody} onChange={handleBodyChange}/><br />
        <button onClick={props.toggleEditArea}>Close</button>
      </div>
    </div>
  )
}

export default EditArea
