import React, { useEffect, useState } from 'react'
import PropTypes, { element } from 'prop-types'
import axios from 'axios'

function PlayButton({
  isPlaying,
  setIsPlaying,
  handleStoreDuration,
  leassonIndex,
  classId,
  lesson_id,
}) {
  const [playingId, setPlayingId] = useState([25])
  // const [lessonData, setLessonData] = useState([])
  // const [playingIndex, setPlayingIndex] = useState(0)
  console.log(playingId)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/lesson/` + classId).then((res) => {
      console.log(res.data)
      setLessonData(res.data)
    })
  }, [isPlaying])

  const handleCheckHereStatus = () => {
    //  if(playingId.includes(lesson_id)){
    //   setIsPlaying(!isPlaying)
    //    lessonData.map((element,index)=>{
    //     if(index == playingIndex+1){
    //       console.log(element.id)
    //       playingId.push(element.id)
    //       setPlayingIndex(playingIndex+1)
    //     }
    //    })
    //  }else{
    //   alert("hello")
    //  }
    //  if(){
    //  }else{
    //   alert("please play first video")
    //  }
    setIsPlaying(!isPlaying)
  }
  return isPlaying ? (
    <button
      onClick={() => {
        setIsPlaying(!isPlaying)
        handleStoreDuration()
      }}
    >
      pause
    </button>
  ) : (
    <button
      onClick={() => {
        handleCheckHereStatus()
      }}
    >
      play
    </button>
  )
}

PlayButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
}

export default PlayButton
