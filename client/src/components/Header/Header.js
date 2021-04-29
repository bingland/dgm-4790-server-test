import './Header.scss'

const Header = props => {

  const setPage = e => {
    console.log(e.target.innerHTML)
    props.setCurPage(e.target.innerHTML)
  }

  return (
    <div className="Header">
      Forum site. Forums:
      <div className="forumLink" onClick={setPage}>Funny</div> | 
      <div className="forumLink" onClick={setPage}>Food</div> | 
      <div className="forumLink" onClick={setPage}>Awww</div> | 
      <div className="forumLink" onClick={setPage}>Programming</div>
      <button className="newCommentBtn"  onClick={props.toggleNewComment}>New Comment</button>
    </div>
  )
}

export default Header
