import React from 'react'
import LeftNavBar from './LeftNavBar'

import { Outlet } from 'react-router-dom'

const Feed = () => {
 
  return (
    <div className='flex'>
      <LeftNavBar/>
      <Outlet />
    </div>
  )
}

export default Feed