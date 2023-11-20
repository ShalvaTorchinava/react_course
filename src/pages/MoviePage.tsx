import ContentBox, { ContentType } from "../components/ContentBox/ContentBox";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams();
  return <ContentBox contentId={id} contentType={ContentType.movies} />;
};

export default MoviePage;