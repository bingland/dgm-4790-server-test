import './EditArea.scss'
import { gql, useMutation } from '@apollo/client'
import React from 'react'

const EditArea = props => {

  const handleTitleChange = (e) => { props.setCurrentTitle(e.target.value) }
  const handleBodyChange = (e) => { props.setCurrentBody(e.target.value) }

  const EDIT_COMMENT = gql`
    mutation ($title:String!, $body:String!, $id:String!) {
      editComment (id:$id, title:$title, body:$body) {
        title
        body
        forum
        date
        id
      }
    }
  `

  const EditComment = () => {
    const [editComment] = useMutation(EDIT_COMMENT, {
      onCompleted ({editComment}) {
        console.log(editComment)
      }
    })

    return (
      <button onClick={() => {
        editComment({ 
          variables: {
            id: props.currentCommentId,
            title: props.currentTitle,
            body: props.currentBody
          } 
        })
        props.toggleEditArea()
      }}>Submit</button>
    )
  }

  return (
    <div className="editAreaBackground">
      <div className="EditArea">
        <h1>Edit comment:</h1>
        <input type="text" placeholder="Title here..." value={props.currentTitle} onChange={handleTitleChange} />
        <textarea placeholder="Comment here..." value={props.currentBody} onChange={handleBodyChange}/><br />
        <EditComment />
        <button onClick={props.toggleEditArea}>Close</button>
      </div>
    </div>
  )
}

export default EditArea
