import React, { useRef, useEffect, useState } from 'react'

import Audio from './Audio'
import PlayButton from './PlayButton'
import Seeker from './Seeker'
import Volume from './Volume'

import './styles.css'
import axios from 'axios'

const AudioPlayerCustom = ({
  url,
  pauseDuration,
  class_id,
  lesson_id,
  user_id,
  TempDuration,
  audioData,
  leassonIndex,
  classIndex,
  classId,
}) => {
  const [currentTime, setCurrentTime] = useState(pauseDuration ? pauseDuration : 0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [seekDuration, setSeekDuration] = useState(pauseDuration ? pauseDuration : 0)
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
    if (newLessonData.lesson_Id == data.lesson_Id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/audiorecord/${newLessonData.id}`, data)
        .then((res) => {
          console.log(res.data, 'update')
        })
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/audiorecord`, data).then((res) => {
        console.log(res.data, 'neww')
      })
    }
  }

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
