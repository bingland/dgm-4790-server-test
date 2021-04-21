import './App.scss';
import { useQuery, gql } from '@apollo/client';

const App = () => {

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
      { <GetData /> }
    </div>
  )
}

export default App;
