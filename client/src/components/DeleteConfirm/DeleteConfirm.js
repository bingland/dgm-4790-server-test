import './DeleteConfirm.scss'

const DeleteConfirm = props => {

  return (
    <div className="deleteConfirmBackground">
      <div className="DeleteConfirm">
        <h1>Delete comment?</h1>
        <button onClick={props.toggleDeleteConfirm}>Close</button>
        <button onClick={props.toggleDeleteConfirm}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteConfirm
