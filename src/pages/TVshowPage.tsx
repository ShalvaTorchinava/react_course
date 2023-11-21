import { useParams } from 'react-router-dom'
import ContentBox, { ContentType } from '../components/ContentBox/ContentBox'

const TVShowPage = () => {
  const {id} = useParams()
  return (
    <ContentBox contentId={id} contentType={ContentType.series}/>
  )
}

export default TVShowPage