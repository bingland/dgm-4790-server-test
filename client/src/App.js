import './App.scss';
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client';

import ForumWelcome from './components/ForumWelcome/ForumWelcome'
import Header from './components/Header/Header'
import Comment from './components/Comment/Comment'
import NewComment from './components/NewComment/NewComment'
import EditArea from './components/EditArea/EditArea'
import DeleteConfirm from './components/DeleteConfirm/DeleteConfirm'

const App = () => {

  const [curPage, setCurPage] = useState('Landing')
  // modal togglers
  const [showNewComment, setShowNewComment] = useState(false)
  const [showEditArea, setShowEditArea] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const toggleNewComment = () => {
    setShowNewComment(!showNewComment)
  }
  const toggleEditArea = () => {
    setShowEditArea(!showEditArea)
  }
  const toggleDeleteConfirm = () => {
    setShowDeleteConfirm(!showDeleteConfirm)
  }

  const GET_DATA = gql`
    query {
      deserts {
        id
        type
        name
        ppu
      }
    }
  `

  const GetData = () => {
    const { loading, error, data } = useQuery(GET_DATA)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(data)

    return data.deserts.map(({ id, type, name, ppu }) => (
      <div key={id}>
        <p>
          Type: {type}
          Name: {name}
          PPU: {ppu}
        </p>
      </div>
    ))
  }

  return (
    <div className="App">
      { showNewComment && (
        <NewComment toggleNewComment={toggleNewComment} />
      )}
      { showEditArea && (
        <EditArea toggleEditArea={toggleEditArea} />
      )}
      { showDeleteConfirm && (
        <DeleteConfirm toggleDeleteConfirm={toggleDeleteConfirm} />
      )}
      <Header setCurPage={setCurPage} toggleNewComment={toggleNewComment}/>
      <ForumWelcome curPage={curPage} />
      <div className="comments">
        <Comment toggleEditArea={toggleEditArea} toggleDeleteConfirm={toggleDeleteConfirm} />
        <Comment toggleEditArea={toggleEditArea} toggleDeleteConfirm={toggleDeleteConfirm} />
      </div>
    </div>
  )
}

export default App;
