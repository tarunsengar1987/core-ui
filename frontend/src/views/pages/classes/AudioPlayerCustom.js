import React, { useRef, useEffect, useState } from 'react'

import Audio from './Audio'
import PlayButton from './PlayButton'
import Seeker from './Seeker'
import Volume from './Volume'
import Alert from '../alert/Alert'
import './styles.css'
import axios from 'axios'

const AudioPlayerCustom = ({
  url,
  pauseDuration,
  class_id,
  lesson_id,
  user_id,
  TempDuration,
  leassonIndex,
  classIndex,
  classId,
  user
}) => {
  const [currentTime, setCurrentTime] = useState(pauseDuration ? pauseDuration : 0)
  const [duration, setDuration] = useState(0)
  const [audioData, setAudioData] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [seekDuration, setSeekDuration] = useState(pauseDuration ? pauseDuration : 0)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const audioRef = useRef(currentTime)
  const handleTrackClick = (position) => {
    audioRef.current.currentTime = position
  }

 

  const handlePuase = () => {
    var data = {
      class_Id: class_id,
      lesson_Id: lesson_id,
      user_Id: user_id,
      duration: TempDuration,
      pauseduration: currentTime,
    }

    var newLessonData = {}
    audioData.map((elem, index) => {
      if (elem.lesson_Id == lesson_id) {
        return (newLessonData = elem)
      }
    })
    if (newLessonData.lesson_Id == data.lesson_Id && newLessonData.user_Id == user.id) {
      console.log(newLessonData.lesson_Id == data.lesson_Id && newLessonData.user_Id == user.id)
      try {
        axios
          .put(`${process.env.REACT_APP_API_URL}/audiorecord/${newLessonData.id}`, data)
          .then((res) => {
            console.log(res.data, 'update')
          })
          .catch((error) => {
            // setAlert(true)
            // setAlertMessage('no any audio data')
            // setTimeout(() => {
            //   setAlert(false)
            // },2000)
          })
      } catch {
        console.log(' no any audio record ')
      }
    } else {
      console.log("clicked")
      try {
        axios
          .post(`${process.env.REACT_APP_API_URL}/audiorecord`, data)
          .then((res) => {
            console.log(res.data, 'neww')
          })
          .catch((error) => {
            // setAlert(true)
            // setAlertMessage('no any audio data')
            // setTimeout(() => {
            //   setAlert(false)
            // },2000)
          })
      } catch {
        console.log(' no any audio record ')
      }
    }
  }
  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/audiorecord`).then((res) => {
        setAudioData(res?.data)
      })
    } catch {
      console.log("can't get data from server please try again ")
    }
  }, [handlePuase])

  useEffect(() => {
    if (isPlaying) {
      setSeekDuration('')
      audioRef.current.play()
      audioRef.current.currentTime = currentTime
    } else {
      audioRef.current.pause()
    }
  }, [audioRef, isPlaying])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [audioRef, volume])

  return (
    <div className="App d-flex">
      <Alert isVisible={alert} message={alertMessage} />
      <div className="media-audio d-flex align-items-center">
        <PlayButton
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          handleStoreDuration={handlePuase}
          lesson_id={lesson_id}
          leassonIndex={leassonIndex}
          classId={classId}
        />
        <Seeker
          currentTime={seekDuration == '' ? currentTime : seekDuration}
          duration={duration}
          handleTrackClick={handleTrackClick}
        />
        <Audio
          track={url}
          ref={audioRef}
          handleDuration={setDuration}
          handleCurrentTime={setCurrentTime}
        />
      </div>
      <div className="volume-setting">
        <Volume volume={volume} setVolume={setVolume} />
      </div>
    </div>
  )
}
export default AudioPlayerCustom
