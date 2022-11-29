import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppHeader, AppSidebar } from 'src/components'

export default function UserProgress() {
  const [audioData, setAudioData] = useState([])
  const [lessonData, setLessonData] = useState([])
  const [totalProgress, setTotalProgress] = useState('')
  const [totalLessonDurationsum, setTotalLessonDurationsum] = useState('')
  const [totalProgressUser, setTotalProgressUser] = useState([])

  const location = useLocation()
  debugger

  useEffect(() => {
    getUsersDetails()
    getProgress()
  }, [])

  const getProgress = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/progress/` + location?.state?.userdata?.id)
        .then((res) => {
          setTotalProgressUser(res?.data?.data)
        })
        .catch((error) => {
          console.log(error.response.data.message)
        })
    } catch {
      console.log("can't get data from server please try again ")
    }
  }

  const getUsersDetails = () => {
    let pauseDurationSum = 0
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/audiorecord/` + location?.state?.userdata?.id)
        .then((res) => {
          setAudioData(res.data)
          res.data.map((time) => {
            pauseDurationSum += JSON.parse(time.pauseduration)
          })
          getLessonDuration(pauseDurationSum)
        })
    } catch {
      console.log("can't get data from server please try again ")
    }
  }

  const getLessonDuration = (pauseDurationSum) => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/lessons`).then(async (res) => {
        setLessonData(res.data)
        let sum = 0
        res?.data?.map((item) => {
          sum += item.duration
        })
        setTotalLessonDurationsum(sum)
        setTotalProgress((pauseDurationSum / sum) * 100)
      })
    } catch {
      console.log("can't get data from server please try again ")
    }
  }

  console.log('totalProgress', totalProgress)

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light dashboardPage">
        <div className="dashboardPage__root">
          <AppHeader />
          <div className="dashboardPage__inner">
            <div className="user-progress-detail card">
              <div className="table-responsive">
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Duration</CTableHeaderCell>
                      <CTableHeaderCell>Pause Duration</CTableHeaderCell>
                      {/* <CTableHeaderCell>totalProgress</CTableHeaderCell> */}
                      <CTableHeaderCell>Progress</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {audioData.length > 0
                      ? audioData.map((item, index) => {
                          return (
                            <>
                              {/* <div className="">
                        {' '}
                        <div style={{ color: 'black' }}>Duration:{item.duration}</div>
                        <div style={{ color: 'black' }}>Pause Duration:{item.pauseduration}</div>
                        <div style={{ color: 'black' }}>totalProgress:{totalProgress}</div>
                      </div> */}

                              <CTableRow>
                                <CTableDataCell>asas</CTableDataCell>
                                <CTableDataCell>{item.duration}</CTableDataCell>
                                <CTableDataCell>{item.pauseduration}</CTableDataCell>
                                {/* <CTableDataCell>{totalProgress}</CTableDataCell> */}
                                <CTableDataCell>
                                  {(item.pauseduration / item.duration) * 100}
                                </CTableDataCell>
                              </CTableRow>
                            </>
                          )
                        })
                      : 'You Did not visit any audio'}
                  </CTableBody>
                </CTable>
              </div>
              <div className="userProgressList">
                {console.log('totalProgressUser', totalProgressUser)}
                {totalProgressUser.length > 0 ? (
                  totalProgressUser.map((item) => (
                    <>
                      {' '}
                      <div className="userProgressList-item">
                        <div className="userProgressList-itemInfo">
                          <h5 className="userProgressList-itemTitle">
                            <b>Tutorial Name:</b> {item.tutorial}
                          </h5>
                          <p>{item.tutorial}</p>
                        </div>
                        {console.log('totalProgressUser', item.tutorial)}
                        <CChart
                          type="doughnut"
                          data={{
                            // labels: ['TotalProgress', 'Total'],
                            datasets: [
                              {
                                backgroundColor: ['#41B883', '#E46651'],
                                data: [item.completed_percentage, 100 - item.completed_percentage],
                              },
                            ],
                          }}
                        />
                      </div>
                    </>
                  ))
                ) : (
                  <h5 className="userProgressList-itemTitle">This User Did not visit any audio</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
