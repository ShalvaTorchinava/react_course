import React from 'react'
import { useParams } from 'react-router-dom'
import ContentBox, { ContentType } from '../components/ContentBox/ContentBox'

const TVshowPage = () => {
  const {id} = useParams()
  return (
    <ContentBox contentId={id} contentType={ContentType.series}/>
  )
}

export default TVshowPage