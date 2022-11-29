import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <div style={{ padding: '40px 32px' }}>
            <AppContent />
          </div>
        </div>
        <h1>Home</h1>
      </div>
    </div>
  )
}

export default DefaultLayout
