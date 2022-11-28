import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsD,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChart, CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Loader from '../pages/loader/Loader'

const WidgetsDropdown = () => {
  const [tutorialCount, setTutorialCount] = useState('')
  const [userCount, setUserCount] = useState('')
  const [activeUsers, setActiveUser] = useState([])
  const [inviteUsers, setInviteUser] = useState([])
  const [awaitingAprroveUsers, setAwaitingAprroveUser] = useState([])
  const [userClass, setClassCount] = useState('')
  const [user, setUser] = useState()
  const [userData, setUserData] = useState([])
  const [lessonData, setLessonData] = useState([])
  const [totalProgress, setTotalProgress] = useState('')
  const [totalLessonDurationsum, setTotalLessonDurationsum] = useState('')
  const [classData, setClassData] = useState([])
  const [loader, setLoader] = useState(false)
  const [tutorialData, setTutorialData] = useState([])
  // const [audioFilterData, setAudioFilterData] = useState([])
  console.log(activeUsers.length, inviteUsers.length, awaitingAprroveUsers.length)
  const navigate = useNavigate()
  useEffect(() => {
    getTutorials()
    getUsers()
    getClasses()
    const data = JSON.parse(localStorage.getItem('userData'))
    setUser(data)
    getUsersDetails()
  }, [])
  // const navigate = useNavigate()

  const getUsers = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
      'length===>', res.data.length
      setUserCount(res.data.length)
      res.data.map((users) => {
        if (users.status == 'active') {
          if (activeUsers.some((activeUsers) => activeUsers.id === users.id)) {
          } else {
            activeUsers.push(users)
          }
        } else if (users.status == 'Awaiting approval') {
          if (
            awaitingAprroveUsers.some(
              (awaitingAprroveUsers) => awaitingAprroveUsers.id === users.id,
            )
          ) {
          } else {
            awaitingAprroveUsers.push(users)
          }
        } else if (users.status == 'Invited') {
          if (inviteUsers.some((inviteUsers) => inviteUsers.id != users.id)) {
          } else {
            inviteUsers.push(users)
          }
        }
      })
    })
  }
  const getTutorials = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/tutorials`).then((res) => {
      'length===>', res.data.length
      setTutorialCount(res.data.length)
      setTutorialData(res.data)
    })
  }

  const getClasses = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/classes`).then((res) => {
      'length===>', res.data.length
      setClassCount(res.data.length)
      setClassData(res.data)
    })
  }

  const getUsersDetails = () => {
    const data = JSON.parse(localStorage.getItem('userData'))
    let pauseDurationSum = 0
    axios.get(`${process.env.REACT_APP_API_URL}/audiorecord/` + data?.id).then((res) => {
      setUserData(res.data)
      res.data.map((time) => {
        pauseDurationSum += JSON.parse(time.pauseduration)
      })
      getLessonDuration(pauseDurationSum, res.data)
    })
  }
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
      getUserTutorial()
    }, 3000)
  }, [classData])
  const getUserTutorial = () => {
    let filterClasses = []
    tutorialData.filter((tutorial) => {
      return classData.filter((classes) => {
        return userData.filter((audio) => {
          // console.log(audio, 'audio')
          if (classes.id === JSON.parse(audio.class_Id)) {
            if (tutorial.id === JSON.parse(classes.tutorial_id)) {
              if (filterClasses.some((filterClasses) => filterClasses.id === tutorial.id)) {
                return filterClasses
              } else {
                return filterClasses.push(tutorial)
              }
            }
          }
        })
      })
    })

    // console.log(filterClasses, ':filterClasses')
    // tutorialData.filter((tutorial) => {
    //   return filterClasses.filter((classes) => {
    //     if (tutorial.id === JSON.parse(classes.tutorial_id)) {
    //       if(!lessonData.includes(tutorial)){
    //        lessonData.push(tutorial)
    //       }
    //     }
    //   })
    // })
    // console.log(filterClasses, ':filterClasses=====================================  ')
    setLessonData(filterClasses)
  }
  // console.log(lessonData,"=========================")
  const getLessonDuration = (pauseDurationSum, audioData) => {
    axios.get(`${process.env.REACT_APP_API_URL}/lessons`).then(async (res) => {
      let filterAudio = res.data.filter((i) => {
        return audioData.filter((audio) => {
          if (i.id === JSON.parse(audio.lesson_Id)) {
            return i
          }
        })
      })
      // setLessonData(filterAudio)

      let sum = 0
      res?.data?.map((item) => {
        sum += item.duration
      })
      // console.log(lessonData)
      // console.log({ pauseDurationSum, sum })
      setTotalLessonDurationsum(sum)
      setTotalProgress((pauseDurationSum / sum) * 100)
    })
  }

  const handleNavigateRecentAudio = (tutorial) => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)

      navigate('/tutorial/tutorial-details', {
        state: { classdata: classData, tutorialData: tutorial },
      })
    }, 3000)

    //     })
    // })

   
  }
  return (
    <CRow className="dashboardCards">
      <Loader isLoader={loader} />

      {user?.role === '1' ? (
        <CCol sm={6} lg={3} className="dashboardCards">
          <span
            onClick={() => {
              navigate(`/user`)
            }}
          >
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              // values={[
              //   { title: 'User', value: userCount },
              //   { title: 'Active', value: activeUsers?.length == 0 ? 0 : activeUsers.length },
              //   { title: 'Invited', value: inviteUsers?.length == 0 ? 0 : inviteUsers.length },
              //   {
              //     title: 'Awaiting Aprrove',
              //     value: awaitingAprroveUsers?.length == 0 ? 0 : awaitingAprroveUsers.length,
              //   },
              // ]}
              value={
                <div className="dashboardCards-dataList">
                  {/* {userCount}   */}
                  <div>
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    <span className="dashboardCards-dataList-no">
                      {userCount == 0 ? 0 : userCount}
                    </span>{' '}
                    User
                  </div>
                  <div>
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    <span className="dashboardCards-dataList-no">
                      {activeUsers?.length == 0 ? 0 : activeUsers.length}
                    </span>{' '}
                    Active
                  </div>
                  <div className="">
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    <span className="dashboardCards-dataList-no">
                      {inviteUsers.length == 0 ? 0 : inviteUsers.length}
                    </span>{' '}
                    Invited
                  </div>
                  <div>
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    <span className="dashboardCards-dataList-no">
                      {awaitingAprroveUsers?.length == 0 ? 0 : awaitingAprroveUsers.length}
                    </span>{' '}
                    Awaiting Aprrove
                  </div>
                </div>
              }
              // title="Users"
            />
          </span>
        </CCol>
      ) : (
        ''
      )}
      <CCol sm={6} lg={3}>
        <span
          onClick={() => {
            navigate(`/tutorial`)
          }}
        >
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
        </span>
      </CCol>

      {user?.role === '1' ? (
        <CCol sm={6} lg={3}>
          <span
            onClick={() => {
              navigate(`/tutorial`)
            }}
          >
            <CWidgetStatsA
              className="mb-4"
              color="danger"
              value={
                <>
                  0
                  <span className="fs-6 fw-normal">
                    {/* (-23.6% <CIcon icon={cilArrowBottom} />) */}
                  </span>
                </>
              }
              title="Settings"
            />
          </span>
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
                  {/* {console.log({ totalProgress })} */}
                  <div className="chart-wrapper halfChart">
                    <CChart
                      type="doughnut"
                      data={{
                        labels: ['TotalProgress', 'Total'],
                        datasets: [
                          {
                            backgroundColor: ['#41B883', '#E46651'],
<<<<<<< Updated upstream
                            data: [totalProgress, 100 - totalProgress],
=======
                            data: [totalProgress,  100 - totalProgress],
>>>>>>> Stashed changes
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
                  {/* {console.log('lessonData', lessonData)} */}
                  <h4 className="mb-3">Recently Visited Audio</h4>
                  {lessonData.length > 0
                    ? lessonData
                        .slice([0], [10])
                        .map((item, index) => (
                          <p onClick={() => handleNavigateRecentAudio(item)}>{item.name}</p>
                        ))
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
