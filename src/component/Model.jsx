import React from 'react'

const Model = ({isVisible,onClose,children}) => {
    if(!isVisible) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
        <div className='modelmodel flex flex-col'>
            <button className='text-lightgray text-xl place-self-end' onClick={onClose}>X</button>
            <div className='bg-white p-2 rounded'>{children}</div>
        </div>
    </div>
  )
}

export default Model