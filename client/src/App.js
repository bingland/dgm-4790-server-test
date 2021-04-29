import './App.scss';
import { useState } from 'react'
import { useQuery, gql } from '@apollo/client';

import ForumWelcome from './components/ForumWelcome/ForumWelcome'
import Header from './components/Header/Header'
import Comment from './components/Comment/Comment'

const App = () => {

  const [curPage, setCurPage] = useState('Landing')

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
      <Header setCurPage={setCurPage} />
      {curPage}
      <ForumWelcome />
      <div className="comments">
        <Comment />
        <Comment />
      </div>
    </div>
  )
}

export default App;
