import React from 'react'
import LeftPart from './components/LeftPart'
import RightPart from './components/RightPart'

const App = () => {
  return (
    <div className='h-screen  bg-zinc-900 flex'>
      <LeftPart/>
      <RightPart/>
    </div>
  )
}

export default App