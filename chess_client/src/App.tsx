import { Toaster } from 'react-hot-toast'
import './App.css'
import { Board } from './components/Board' 
import { MoveProvide } from './contexts/Move_Provider'

function App() {
  return (
      <MoveProvide>
        <h1>Ajedrez</h1>
        <Board />
        <Toaster 
            position='bottom-right'
            reverseOrder={false}
        />
      </MoveProvide>
  )
}

export default App