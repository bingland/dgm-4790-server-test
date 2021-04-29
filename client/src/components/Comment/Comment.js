import './Comment.scss'

const Comment = props => {

  return (
    <div className="Comment">
      <h1>Hi i'm a comment</h1>
      <h2>38205273952035 - 12:30pm 1/3/2021</h2>
      <p>Wow this forum is really really cool!!!! I can leave comments here.</p>
      <button onClick={props.toggleEditArea}>Edit</button>
      <button onClick={props.toggleDeleteConfirm}>Delete</button>
    </div>
  )
}

export default Comment
