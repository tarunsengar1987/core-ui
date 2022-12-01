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
  const [blockUser, setBlockUser] = useState([])
  const [userClass, setClassCount] = useState('')
  const [user, setUser] = useState()
  const [userData, setUserData] = useState([])
  const [lessonData, setLessonData] = useState([])
  const [totalProgress, setTotalProgress] = useState('')
  const [totalLessonDurationsum, setTotalLessonDurationsum] = useState('')
  const [classData, setClassData] = useState([])
  const [loader, setLoader] = useState(false)
  const [active, setActive] = useState()
  const [tutorialData, setTutorialData] = useState([])
  // const [audioFilterData, setAudioFilterData] = useState([])
  // console.log(activeUsers.length, inviteUsers.length, awaitingAprroveUsers.length)
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
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
        'length===>', res.data.length
        setUserCount(res.data.length)
        // console.log(res.data, '=============================')
        res.data.map((users) => {
          if (users.status == 'active') {
            if (activeUsers.some((activeUsers) => activeUsers.id === users.id)) {
            } else {
              activeUsers.push(users)
            }
          }
          if (users.status == 'Awaiting approval') {
            if (
              awaitingAprroveUsers.some(
                (awaitingAprroveUsers) => awaitingAprroveUsers.id === users.id,
              )
            ) {
            } else {
              awaitingAprroveUsers.push(users)
            }
          }
          if (users.status == 'Invited') {
            if (inviteUsers.some((inviteUsers) => inviteUsers.id === users.id)) {
            } else {
              inviteUsers.push(users)
            }
          }
          if (users.status == 'blocked') {
            if (blockUser.some((blockUser) => blockUser.id === users.id)) {
            } else {
              blockUser.push(users)
            }
          }
        })
      })
    } catch {}
  }

  // console.log('===', inviteUsers, '==',  '-===', )
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
      // setUserData(res.data)
      let sorted = res.data.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      })
      setUserData(sorted)
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
    userData.filter((audio) => {
      return classData.filter((classes) => {
        return tutorialData.filter((tutorial) => {
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
    // tutorialData.filter((tutorial,i) => {
    //   return classData.filter((classes) => {
    //     return userData.filter((audio) => {

    //       if (classes.id === JSON.parse(audio.class_Id)) {
    //         if (tutorial.id === JSON.parse(classes.tutorial_id)) {
    //           if (filterClasses.some((filterClasses) => filterClasses.id === tutorial.id)) {
    //             console.log({filterClasses})
    //             if(filterClasses.length>0){
    //               console.log("audio?.updatedAt",audio?.updatedAt)
    //               filterClasses[i]['latestUpdate']=audio?.updatedAt
    //               return filterClasses
    //             }
    //             // filterClasses.latesUpdate=audio?.updatedAt

    //           } else {
    //             // filterClasses[i]['latestUpdate']=audio?.updatedAt
    //             tutorial['latestUpdate']=audio?.updatedAt

    //             return filterClasses.push(tutorial)
    //           }
    //         }
    //       }
    //     })
    //   })
    // })

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
    const sortedActivities = filterClasses.sort(
      (a, b) => new Date(a.latestUpdate) - new Date(b.latestUpdate),
    )
    // console.log({ sortedActivities })
    // const sortedActivities = filterClasses.sort((a, b) => b.latestUpdate - a.latestUpdate)
    setLessonData(sortedActivities)
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
      setTotalProgress(Math.ceil( (pauseDurationSum / sum) * 100))
    })
  }

  const handleNavigateRecentAudio = (tutorial) => {
    setActive(tutorial.name)
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
      navigate('/tutorial/tutorial-details', {
        state: { classdata: classData, tutorialData: tutorial },
      })
    }, 3000)
  }

  // console.log(lessonData, 'lessonData')
  return (
    <CRow className="dashboardCards">
      <Loader isLoader={loader} />

      {user?.role === '1' ? (
        <CCol md={6} xl={3} xs={12} className="dashboardCards-small">
          <span>
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
                  <div
                    onClick={() => {
                      navigate(`/user`)
                    }}
                    className="dashboardCards-dataList-head"
                  >
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    User
                    <span className="dashboardCards-dataList-no">
                      {userCount == 0 ? 0 : userCount}
                    </span>
                  </div>
                  <div className="dashboardCards-dataInnerList">
                    <div
                      onClick={() => {
                        navigate(`/user/Active`)
                      }}
                    >
                      {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                      <span className="dashboardCards-dataList-no">
                        {activeUsers?.length == 0 ? 0 : activeUsers.length - 1}
                      </span>
                      Active
                    </div>
                    <div
                      className=""
                      onClick={() => {
                        navigate(`/user/Invited`)
                      }}
                    >
                      {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                      <span className="dashboardCards-dataList-no">
                        {inviteUsers.length == 0 ? 0 : inviteUsers.length}
                      </span>
                      Invited
                    </div>
                    <div
                      onClick={() => {
                        navigate(`/user/Awaiting approval`)
                      }}
                    >
                      {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                      <span className="dashboardCards-dataList-no">
                        {awaitingAprroveUsers?.length == 0 ? 0 : awaitingAprroveUsers.length}
                      </span>
                      Awaiting approval
                    </div>
                    <div
                      onClick={() => {
                        navigate(`/user/Block`)
                      }}
                    >
                      {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                      <span className="dashboardCards-dataList-no">
                        {blockUser?.length == 0 ? 0 : blockUser.length}
                      </span>
                      Block
                    </div>
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
      <CCol md={6} xl={3} xs={12} className="dashboardCards-small">
        <span
          onClick={() => {
            navigate(`/tutorial`)
          }}
        >
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={
              <div className="dashboardCards-dataList">
                {/* {userCount}   */}
                <div className="dashboardCards-dataList-head">
                  {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                  Tutorials
                  <span className="dashboardCards-dataList-no">{tutorialCount}</span>
                </div>
              </div>
            }
            // title="Tutorials"
          />
        </span>
      </CCol>

      {user?.role === '1' ? (
        <CCol md={6} xl={3} xs={12} className="dashboardCards-small">
          <span
            onClick={() => {
              navigate(`/setting`)
            }}
          >
            <CWidgetStatsA
              className="mb-4"
              color="danger"
              value={
                <div className="dashboardCards-dataList">
                  <div className="dashboardCards-dataList-head">
                    Settings
                    {/* <span className="dashboardCards-dataList-no"></span> */}
                  </div>
                </div>
              }
              // title="Settings"
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
              <div className="col-12 col-lg-6">
                <div className="card p-4 h-100">
                  {/* {console.log({ totalProgress })} */}
                  <div className="chart-wrapper halfChart">
                    <CChart
                      type="doughnut"
                      data={{
                        labels: ['TotalProgress', 'Total'],
                        datasets: [
                          {
                            backgroundColor: ['#41B883', '#E46651'],
                            data: [totalProgress, 100 - totalProgress],
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card p-4 h-100 cart-right-part">
                  {/* {console.log('lessonData', lessonData)} */}
                  <h4 className="mb-3 visitedVideoTitle">Recently Visited Audio</h4>
                  <ul className="visitedVideoList">
                    {/* {console.log({ active })} */}
                    {lessonData.length > 0
                      ? lessonData.map((item, index) => (
                          <li
                            onClick={() => {
                              handleNavigateRecentAudio(item)
                            }}
                            className={
                              active === item.name
                                ? 'visitedVideoList-item active'
                                : 'visitedVideoList-item'
                            }
                          >
                            {item.name}
                          </li>
                        ))
                      : 'You Did not visit any audio'}
                  </ul>
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
