import './Comment.scss'

const Comment = props => {

  const dateToEnglish = (dateInput) => {
    let newDate = new Date(dateInput * 1)
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let month = months[newDate.getMonth()]
    let date = newDate.getDate()
    let year = newDate.getFullYear()
    let time = `${month} ${date}, ${year}`
    return time
  }

  return (
    <div className="Comment">
      <h1>{props.comment.title}</h1>
      <h2>{dateToEnglish(props.comment.date)} - ID: {props.comment.id}</h2>
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
