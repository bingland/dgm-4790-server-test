import './Header.scss'
import { useQuery, gql } from '@apollo/client'
import React from 'react'
import { customRandom } from 'nanoid'

const Header = props => {

  const GET_FORUM_NAMES_IDS = gql`
    query {
      forums {
        id
        name
      } 
    }
  `

  const setPage = e => {
    console.log(e.target.getAttribute('data-id'))
    props.setCurId(e.target.getAttribute('data-id'))
  }

  const GetForums = () => {
    const { loading, error, data } = useQuery(GET_FORUM_NAMES_IDS)

    if (loading) return <p>Loading Forums...</p>
    if (error) return <p>Error :(</p>

    return (
      <React.Fragment>
        {data.forums.map((forum, index) => (
          <div className={forum.id === props.curId ? "forumLink active" : "forumLink"} onClick={setPage} data-id={forum.id} key={index}>{forum.name}</div>
        ))}
      </React.Fragment>
    )
  }

  return (
    <div className="Header">
      <div className="wrapper">
        <div className="alignLeft">
          <div className="logoText">Forum Site</div>
          <GetForums />
        </div>
        <button className="newCommentBtn"  onClick={props.toggleNewComment}>New Comment</button>
      </div>
    </div>
  )
}

export default Header
