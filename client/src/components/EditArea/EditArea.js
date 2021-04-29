import './EditArea.scss'

const EditArea = props => {

  return (
    <div className="editAreaBackground">
      <div className="EditArea">
        <h1>Edit comment:</h1>
        <input type="text" placeholder="Title here..." />
        <textarea placeholder="Comment here..." /><br />
        <button onClick={props.toggleEditArea}>Close</button>
      </div>
    </div>
  )
}

export default EditArea
