import React from 'react'
import ContentBox from '../components/ContentBox/ContentBox'
import { useParams } from 'react-router-dom'


const Test = () => {
  const {id} = useParams()
  return (
    <ContentBox movieId={id}/>
  )
}

export default Test