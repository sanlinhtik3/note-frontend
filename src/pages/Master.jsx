import React from 'react'

const Master = ({ children, title }) => {
  return (
    <div className='grid grid-cols-2'>
        <div className=" h-screen bg-slate-200">
            <h1>{title}</h1>
        </div>
          <div className=" h-screen bg-slate-600">
            { children }
        </div>
    </div>
  )
}

export default Master;