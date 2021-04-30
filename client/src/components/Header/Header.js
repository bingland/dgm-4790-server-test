import './Header.scss'
import { useQuery, gql } from '@apollo/client'
import React from 'react'

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
          <div className="forumLink" onClick={setPage} data-id={forum.id} key={index}>{forum.name}</div>
        ))}
      </React.Fragment>
    )
  }

  return (
    <div className="Header">
      Forum site. Forums:
      <GetForums />
      <button className="newCommentBtn"  onClick={props.toggleNewComment}>New Comment</button>
    </div>
  )
}

export default Header
