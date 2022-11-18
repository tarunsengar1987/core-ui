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
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import axios from 'axios'

const WidgetsDropdown = () => {
  const [tutorialCount, setTutorialCount] = useState('')
  const [userCount, setUserCount] = useState('')
  const [userClass, setClassCount] = useState('')
  const [user, setUser] = useState()
  useEffect(() => {
    getTutorials()
    getUsers()
    getClasses()
    const data = JSON.parse(localStorage.getItem('userData'))
    setUser(data)
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
    axios.get(`${process.env.REACT_APP_API_URL}/api/classes`).then((res) => {
      'length===>', res.data.length
      setClassCount(res.data.length)
    })
  }

  return (
    <CRow className="dashboardCards">
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

            // chart={
            //   <CChartLine
            //     className="mt-3 mx-3"
            //     style={{ height: '70px' }}
            //     data={{
            //       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //       datasets: [
            //         {
            //           label: 'My First dataset',
            //           backgroundColor: 'transparent',
            //           borderColor: 'rgba(255,255,255,.55)',
            //           pointBackgroundColor: getStyle('--cui-primary'),
            //           data: [65, 59, 84, 84, 51, 55, 40],
            //         },
            //       ],
            //     }}
            //     options={{
            //       plugins: {
            //         legend: {
            //           display: false,
            //         },
            //       },
            //       maintainAspectRatio: false,
            //       scales: {
            //         x: {
            //           grid: {
            //             display: false,
            //             drawBorder: false,
            //           },
            //           ticks: {
            //             display: false,
            //           },
            //         },
            //         y: {
            //           min: 30,
            //           max: 89,
            //           display: false,
            //           grid: {
            //             display: false,
            //           },
            //           ticks: {
            //             display: false,
            //           },
            //         },
            //       },
            //       elements: {
            //         line: {
            //           borderWidth: 1,
            //           tension: 0.4,
            //         },
            //         point: {
            //           radius: 4,
            //           hitRadius: 10,
            //           hoverRadius: 4,
            //         },
            //       },
            //     }}
            //   />
            // }
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

          // chart={
          //   <CChartLine
          //     className="mt-3"
          //     style={{ height: '70px' }}
          //     data={{
          //       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          //       datasets: [
          //         {
          //           label: 'My First dataset',
          //           backgroundColor: 'rgba(255,255,255,.2)',
          //           borderColor: 'rgba(255,255,255,.55)',
          //           data: [78, 81, 80, 45, 34, 12, 40],
          //           fill: true,
          //         },
          //       ],
          //     }}
          //     options={{
          //       plugins: {
          //         legend: {
          //           display: false,
          //         },
          //       },
          //       maintainAspectRatio: false,
          //       scales: {
          //         x: {
          //           display: false,
          //         },
          //         y: {
          //           display: false,
          //         },
          //       },
          //       elements: {
          //         line: {
          //           borderWidth: 2,
          //           tension: 0.4,
          //         },
          //         point: {
          //           radius: 0,
          //           hitRadius: 10,
          //           hoverRadius: 4,
          //         },
          //       },
          //     }}
          //   />
          // }
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

            // chart={
            //   <CChartBar
            //     className="mt-3 mx-3"
            //     style={{ height: '70px' }}
            //     data={{
            //       labels: [
            //         'January',
            //         'February',
            //         'March',
            //         'April',
            //         'May',
            //         'June',
            //         'July',
            //         'August',
            //         'September',
            //         'October',
            //         'November',
            //         'December',
            //         'January',
            //         'February',
            //         'March',
            //         'April',
            //       ],
            //       datasets: [
            //         {
            //           label: 'My First dataset',
            //           backgroundColor: 'rgba(255,255,255,.2)',
            //           borderColor: 'rgba(255,255,255,.55)',
            //           data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
            //           barPercentage: 0.6,
            //         },
            //       ],
            //     }}
            //     options={{
            //       maintainAspectRatio: false,
            //       plugins: {
            //         legend: {
            //           display: false,
            //         },
            //       },
            //       scales: {
            //         x: {
            //           grid: {
            //             display: false,
            //             drawTicks: false,
            //           },
            //           ticks: {
            //             display: false,
            //           },
            //         },
            //         y: {
            //           grid: {
            //             display: false,
            //             drawBorder: false,
            //             drawTicks: false,
            //           },
            //           ticks: {
            //             display: false,
            //           },
            //         },
            //       },
            //     }}
            //   />
            // }
          />
        </CCol>
      ) : (
        ''
      )}
    </CRow>
  )
}

export default WidgetsDropdown
