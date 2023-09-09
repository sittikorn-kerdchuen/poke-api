import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading';

// components
import AddFav from './components/AddFav'

function App() {
  const [poke, setPoke] = useState("")
  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")
  const [pokeNumb, setPokeNumb] = useState(1)
  const [fav, setFav] = useState([])

  useEffect(() => {
    let abortController = new AbortController()

    const loadPoke = async () => {
      try {
        setloading(true)
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNumb}`);
        setPoke(response.data)
        setError("")

      } catch (error) {
        setError("Something went wrong", error)
      } finally {
        setloading(false)
      }
    }

    loadPoke()

    return () => abortController.abort();
  }, [pokeNumb])

  console.log(poke)

  const prevPoke = () => {
    setPokeNumb(pokeNumb - 1)
  }
  const nextPoke = () => {
    setPokeNumb(pokeNumb + 1)
  }
  const addFav = () => {
    setFav((prevFav) => [...prevFav, poke])
  }

  return (
    <div className='max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        {loading ? <ReactLoading type='bubbles' color='#fff' height={'20%'} width={'20%'} /> :
          <div>
            <h1>{poke?.name}</h1>
            <button onClick={() => addFav()}> Add to favorite </button>
            <br />
            <img src={poke?.sprites?.other?.home.front_default} alt={poke?.name} />
            <ul>
              {poke?.abilities?.map((abil, idx) => (
                <li key={idx}>{abil.ability?.name}</li>
              ))}
            </ul>

            <button onClick={() => prevPoke()}>Prev</button>
            <button onClick={() => nextPoke()}>Next</button>


          </div>
        }
        <div>
          <h2>Your favorite Pokemon</h2>
          { (fav.length > 0) ? <AddFav fav={fav}/> : <div className='flex h-full justify-center items-center'> <p>No favorite pokemon</p> </div> }

        </div>
      </div>

    </div>
  )
}

export default App
