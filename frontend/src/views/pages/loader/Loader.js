import { CSpinner } from '@coreui/react'
import React from 'react'

export default function Loader({isLoader}) {
  return (
    <>  {isLoader ?
      <div className='lorderModule'>
        <CSpinner  />
      </div>
      : ''}</>
  
  )
}