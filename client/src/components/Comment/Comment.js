import './Comment.scss'

const Comment = props => {

  return (
    <div className="Comment">
      <h1>{props.comment.title}</h1>
      <h2>{props.comment.id} - {props.comment.date}</h2>
      <p>{props.comment.body}</p>
      <button onClick={() => {
        props.toggleEditArea()
        props.setCurrentTitle(props.comment.title)
        props.setCurrentBody(props.comment.body)
        props.setCurrentCommentId(props.comment.id)
      }}>Edit</button>
      <button onClick={() => {
        props.toggleDeleteConfirm()
        props.setCurrentCommentId(props.comment.id)
      }}>Delete</button>
    </div>
  )
}

export default Comment
