import './NewComment.scss'

const NewComment = props => {

  return (
    <div className="newCommentBackground">
      <div className="NewComment">
        Add a new comment: <input type="text" placeholder="Comment here..." />
        <button>Close</button>
      </div>
    </div>
  )
}

export default NewComment
