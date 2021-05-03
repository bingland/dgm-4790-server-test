import './App.scss';
import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';

import ForumWelcome from './components/ForumWelcome/ForumWelcome'
import Header from './components/Header/Header'
import Comment from './components/Comment/Comment'
import NewComment from './components/NewComment/NewComment'
import EditArea from './components/EditArea/EditArea'
import DeleteConfirm from './components/DeleteConfirm/DeleteConfirm'

const App = () => {

  const [curId, setCurId] = useState('0000')
  // modal togglers
  const [showNewComment, setShowNewComment] = useState(false)
  const [showEditArea, setShowEditArea] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  // current selected state
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentBody, setCurrentBody] = useState('')
  const [currentCommentId, setCurrentCommentId] = useState('')

  const toggleNewComment = () => { setShowNewComment(!showNewComment) }
  const toggleEditArea = () => { 
    setShowEditArea(!showEditArea) 
    setCurrentCommentId()
  }
  const toggleDeleteConfirm = () => { setShowDeleteConfirm(!showDeleteConfirm) }

  const GET_FORUM_DATA = gql`
    query ($id: String) {
      forum(id: $id) {
        id
        name
        description
        comments {
          id
          title
          date 
          body
          forum
        }
      } 
    }
  `

  const GetForumData = () => {
    console.log('GetForumData')
    const { loading, error, data } = useQuery(GET_FORUM_DATA, {
      variables: {
        "id": curId
      }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    console.log(data.forum[0])
    let forum = data.forum[0]

    return (
      <React.Fragment>
        <ForumWelcome name={forum.name} description={forum.description} />
        <div className="comments">
          {forum.comments.map((comment, index) => (
            <Comment 
              key={index}
              toggleEditArea={toggleEditArea} 
              toggleDeleteConfirm={toggleDeleteConfirm} 
              comment={comment} 
              setCurrentTitle={setCurrentTitle}
              setCurrentBody={setCurrentBody}
              currentCommentId={currentCommentId}
              setCurrentCommentId={setCurrentCommentId}
            />
          ))}
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className="App">
      { showNewComment && (
        <NewComment toggleNewComment={toggleNewComment} />
      )}
      { showEditArea && (
        <EditArea 
          toggleEditArea={toggleEditArea} 
          currentTitle={currentTitle}
          currentBody={currentBody}
          setCurrentTitle={setCurrentTitle}
          setCurrentBody={setCurrentBody}
          currentCommentId={currentCommentId}
        />
      )}
      { showDeleteConfirm && (
        <DeleteConfirm 
          toggleDeleteConfirm={toggleDeleteConfirm} 
          currentCommentId={currentCommentId}
        />
      )}

      <Header setCurId={setCurId} curId={curId} toggleNewComment={toggleNewComment}/>
      <GetForumData/>
    </div>
  )
}

export default App;
