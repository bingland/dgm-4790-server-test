import './ForumWelcome.scss'

const ForumWelcome = props => {

  return (
    <div className="ForumWelcome">
      <h1 className="forumName">{props.name}</h1>
      <p>{props.description}</p>
    </div>
  )
}

export default ForumWelcome
