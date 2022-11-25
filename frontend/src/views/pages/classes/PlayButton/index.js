import React, { useEffect, useState } from 'react'
import PropTypes, { element } from 'prop-types'
import axios from 'axios'
import { cilAudio, cilLockLocked, cilMediaPause, cilMediaPlay } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function PlayButton({
  isPlaying,
  setIsPlaying,
  handleStoreDuration,
  leassonIndex,
  classId,
  lesson_id,
}) {
  // const [playingId, setPlayingId] = useState([25])
  const [lessonData, setLessonData] = useState([])
  // const [playingIndex, setPlayingIndex] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/lesson/` + classId).then((res) => {
      // console.log(res.data)
      setLessonData(res.data)
    })
  }, [isPlaying])

  useEffect(() => {
    // let temp = []
    var temp =
      JSON.parse(localStorage.getItem('id')) == null ? [] : JSON.parse(localStorage.getItem('id'))
    // if (newtemp !== null) {
    //   temp.push(newtemp)
    // }
    axios.get(`${process.env.REACT_APP_API_URL}/lesson/` + classId).then((res) => {
      setLessonData(res.data)
      if (!temp.includes(res.data[0].id)) {
        temp.push(res.data[0].id)
      }
      localStorage.setItem('id', JSON.stringify(temp))
    })
    let number = 0
    localStorage.setItem('index', JSON.stringify(number))
  }, [])

  const handleCheckHereStatus = () => {
    if (JSON.parse(localStorage.getItem('userData')).role == 1) {
      setIsPlaying(!isPlaying)
    } else {
      if (localStorage.getItem('id').includes(lesson_id)) {
        setIsPlaying(!isPlaying)
        let playinNmber = JSON.parse(localStorage.getItem('index'))
        lessonData.map((element, index) => {
          if (index == playinNmber + 1) {
            let temp = JSON.parse(localStorage.getItem('id'))
            if (!temp.includes(element.id)) {
              temp.push(element.id)
              localStorage.setItem('id', JSON.stringify(temp))
            }
            let newPlayinNmber = playinNmber + 1
            // setPlayingIndex(playingIndex + 1)
            localStorage.setItem('index', JSON.stringify(newPlayinNmber))
          }
        })
      } else {
        alert('hello')
      }
    }
    // setIsPlaying(!isPlaying)
  }
  return isPlaying ? (
    <button
      className="play-pause-btn"
      onClick={() => {
        setIsPlaying(!isPlaying)
        handleStoreDuration()
      }}
    >
      <CIcon icon={cilMediaPause} />
    </button>
  ) : (
    <button
      onClick={() => {
        handleCheckHereStatus()
      }}
    >
      <CIcon icon={cilMediaPlay} />
    </button>
  )
}

PlayButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
}

export default PlayButton
