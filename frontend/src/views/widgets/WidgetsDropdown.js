import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChart, CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import axios from 'axios'

const WidgetsDropdown = () => {
  const [tutorialCount, setTutorialCount] = useState('')
  const [userCount, setUserCount] = useState('')
  const [userClass, setClassCount] = useState('')
  const [user, setUser] = useState()
  const [userData, setUserData] = useState([])
  const [lessonData, setLessonData] = useState([])
  const [totalProgress, setTotalProgress] = useState('')
  const [totalLessonDurationsum, setTotalLessonDurationsum] = useState('')

  useEffect(() => {
    getTutorials()
    getUsers()
    getClasses()
    const data = JSON.parse(localStorage.getItem('userData'))
    setUser(data)
    getUsersDetails()
  }, [])

  const getUsers = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
      'length===>', res.data.length
      setUserCount(res.data.length)
    })
  }
  const getTutorials = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/tutorials`).then((res) => {
      'length===>', res.data.length
      setTutorialCount(res.data.length)
    })
  }

  const getClasses = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/classes`).then((res) => {
      'length===>', res.data.length
      setClassCount(res.data.length)
    })
  }

  const getUsersDetails = () => {
    const data = JSON.parse(localStorage.getItem('userData'))
    let pauseDurationSum = 0
    axios.get(`${process.env.REACT_APP_API_URL}/audiorecord/` + data?.id).then((res) => {
      debugger
      setUserData(res.data)
      res.data.map((time) => {
        pauseDurationSum += JSON.parse(time.pauseduration)
      })
      getLessonDuration(pauseDurationSum)
    })
  }

  const getLessonDuration = (pauseDurationSum) => {
    axios.get(`${process.env.REACT_APP_API_URL}/lessons`).then(async (res) => {
      debugger
      res.data.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      })
      setLessonData(res.data)
      let sum = 0
      res?.data?.map((item) => {
        sum += item.duration
      })
      setTotalLessonDurationsum(sum)
      setTotalProgress((pauseDurationSum / sum) * 100)
    })
  }

  return (
    <CRow className="dashboardCards">
      {console.log('useruseruser', user)}
      {user?.role === '1' ? (
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {userCount}
                <span className="fs-6 fw-normal">
                  {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                </span>
              </>
            }
            title="Users"
          />
        </CCol>
      ) : (
        ''
      )}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              {tutorialCount}{' '}
              <span className="fs-6 fw-normal">{/* (84.7% <CIcon icon={cilArrowTop} />) */}</span>
            </>
          }
          title="Tutorials"
        />
      </CCol>

      {user?.role === '1' ? (
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={
              <>
                0{' '}
                <span className="fs-6 fw-normal">
                  {/* (-23.6% <CIcon icon={cilArrowBottom} />) */}
                </span>
              </>
            }
            title="Settings"
          />
        </CCol>
      ) : (
        ''
      )}
      <CCol xs={12}>
        {user?.role === '2' ? (
          <div>
            <div className="row">
              <div className="col-md-6">
              <div className="card p-4 h-100">
                <h4>Line</h4>
                <div className="chart-wrapper halfChart">
                  <CChart
                    type="doughnut"
                    data={{
                      labels: ['TotalProgress', 'Total'],
                      datasets: [
                        {
                          backgroundColor: ['#41B883', '#E46651'],
                          data: [totalProgress, 100],
                        },
                      ],
                    }}
                  />
                </div>
                <hr />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card p-4 h-100 cart-right-part">
                  {console.log('lessonData', lessonData)}
                  <h4 className='mb-3'>Recently Visited Audio</h4>
                  {lessonData.length > 0
                    ? lessonData
                        .slice([0], [10])
                        .map((item, index) => <p>{item.name}</p>)
                    : 'You Did not visit any audio'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
