import { useState } from 'react'

import './App.css'
import { MoveProvide } from './context/Move_provider'

function App() {
  const [count, setCount] = useState(0)

  return (
      <MoveProvide>
        <h1>Web Chess</h1>
        
      </MoveProvide>
  )
}

export default App
