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
    axios
      .get(`${process.env.REACT_APP_API_URL}/progress/` + location?.state?.userdata?.id)
      .then((res) => {
        debugger
        setTotalProgressUser(res.data.data)
      })
  }

  const getUsersDetails = () => {
    let pauseDurationSum = 0
    axios
      .get(`${process.env.REACT_APP_API_URL}/audiorecord/` + location?.state?.userdata?.id)
      .then((res) => {
        debugger
        // res.data.map((item) => {
        //   axios
        //   .get(`${process.env.REACT_APP_API_URL}/lesson/` + item.lesson_Id)
        //   .then((res) => {
        //     debugger
        //   })
        // })
        setAudioData(res.data)
        res.data.map((time) => {
          pauseDurationSum += JSON.parse(time.pauseduration)
        })
        getLessonDuration(pauseDurationSum)
      })
  }

  const getLessonDuration = (pauseDurationSum) => {
    axios.get(`${process.env.REACT_APP_API_URL}/lessons`).then(async (res) => {
      setLessonData(res.data)
      let sum = 0
      res?.data?.map((item) => {
        sum += item.duration
      })
      setTotalLessonDurationsum(sum)
      setTotalProgress((pauseDurationSum / sum) * 100)
    })
  }

  console.log('totalProgress', totalProgress)

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light dashboardPage">
        <div className="dashboardPage__root">
          <AppHeader />
          <div className="dashboardPage__inner">
            <div className="userProgressList">
              {console.log('totalProgressUser', totalProgressUser)}
              { totalProgressUser.length > 0
                    ? totalProgressUser.map((item) => (
                <>
                  {' '}
                  <div className="userProgressList-item">
                    <div className="userProgressList-itemInfo">
                      <h5 className="userProgressList-itemTitle"><b>Tutorial Name:</b> {item.tutorial}</h5>
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
                            data: [item.completed_percentage,   100 -item.completed_percentage ],
                          },
                        ],
                      }}
                    />
                  </div>
                </>
              )): <h5 className="userProgressList-itemTitle">This User Did not visit any audio</h5> }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
