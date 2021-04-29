import './ForumWelcome.scss'

const ForumWelcome = props => {

  return (
    <div className="ForumWelcome">
      <h1 div className="forumName">{props.curPage}</h1>
      <p>Welcome to the {props.curPage} forum! Description</p>
    </div>
  )
}

export default ForumWelcome
