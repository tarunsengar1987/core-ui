import { CAlert } from '@coreui/react'
import React from 'react'

export default function Alert({message, isVisible}) {
  return (
    <div className='alertModel'>
     {!isVisible ? "" : <CAlert color="primary">{message}</CAlert>}
    </div>
  )
}
