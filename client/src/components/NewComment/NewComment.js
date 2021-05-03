import './NewComment.scss'
import { useQuery, gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const NewComment = props => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [forum, setForum] = useState('prompt')
  const [forumId, setForumId] = useState('')

  const handleTitle = (e) => { setTitle(e.target.value) }
  const handleBody = (e) => { setBody(e.target.value) }
  const handleForum = (e) => { 
    setForum(e.target.value)
    let newFormId = [...e.target.children].find(child => child.innerHTML === e.target.value).getAttribute('data-id')
    console.log(newFormId)
    setForumId(newFormId) 
  }

  const GET_FORUM_NAMES_IDS = gql`
    query {
      forums {
        id
        name
      } 
    }
  `

  const ADD_COMMENT = gql`
    mutation ($title:String!, $body:String!, $forum:String!) {
      addComment(title:$title, body:$body, forum:$forum) {
        title
        body
        forum
        date
        id
      }
    }
  `

  const GetForumOptions = () => {
    const { loading, error, data } = useQuery(GET_FORUM_NAMES_IDS)

    if (loading) return <p>Loading Forums...</p>
    if (error) return <p>Error :(</p>

    return (
      <React.Fragment>
        {data.forums.map((forum, index) => (
          <option data-id={forum.id} key={index}>{forum.name}</option>
        ))}
      </React.Fragment>
    )
  }

  const PostComment = () => {
    const [addComment] = useMutation(ADD_COMMENT, {
      onCompleted ({addComment}) {
        console.log(addComment)
      }
      // refetchQueries: [
      //   { query: GET_FORUM_DATA }
      // ]
    })

    return (
      <React.Fragment>
        <button 
        onClick={() => {
          if(title !== '' && body !== '' && forum !== 'prompt' && forumId !== '') {
            console.log(`Adding comment: ${title} - ${body} - ${forumId}`)
            addComment({ variables: {title: title, body: body, forum: forumId} })
            props.toggleNewComment()
          }
        }}>Submit</button>
      </React.Fragment>
    )
  }

  return (
    <div className="newCommentBackground">
      <div className="NewComment">
        <h1>Add a new comment:</h1>
        <input type="text" placeholder="Title here..." onChange={handleTitle} value={title} />
        <textarea placeholder="Comment here..." onChange={handleBody} value={body} /><br />
        <p>Select a forum:</p>
        <select className="selectedForum" onChange={handleForum} value={forum} >
          <option value="prompt" disabled>Select Forum</option>
          <GetForumOptions />
        </select>
        <PostComment />
        <button onClick={props.toggleNewComment}>Close</button>
      </div>
    </div>
  )
}

export default NewComment
