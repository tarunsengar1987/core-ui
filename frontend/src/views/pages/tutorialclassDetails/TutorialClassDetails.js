import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import Alert from '../alert/Alert'
import Classes from '../classes/Class'

export default function TutorialClassDetails() {
  const location = useLocation()
  const [alertMessage, setAlertMessage] = useState('')
  const [alert, setAlert] = useState(false)

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <div>
          <Alert  isVisible={alert} message={alertMessage} />

            <AppHeader />
            <div className="dashboardPage__inner">
              <div className="dashboardPage__head"></div>

              <div className="tutorialDetailsModule">
                <div className="tutorialDetailsModule__header">
                  <h4 className="tutorialDetailsModule__title">
                    {location?.state?.tutorialData?.name}
                  </h4>
                  <p>{location?.state?.tutorialData?.descriptions}</p>
                </div>

                <div className="tutorialDetailsList">
                  <Classes
                    classdata={location?.state?.classdata}
                    tutorialData={location?.state?.tutorialData}
                    setAlertMessage={setAlertMessage}
                    setAlert={setAlert}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
