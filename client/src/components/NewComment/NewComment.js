import './NewComment.scss'

const NewComment = props => {

  return (
    <div className="newCommentBackground">
      <div className="NewComment">
        <h1>Add a new comment:</h1>
        <input type="text" placeholder="Title here..." />
        <textarea placeholder="Comment here..." /><br />
        <button onClick={props.toggleNewComment}>Close</button>
      </div>
    </div>
  )
}

export default NewComment
