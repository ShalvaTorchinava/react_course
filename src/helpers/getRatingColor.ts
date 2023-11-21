import { MovieDetailsProps } from '../types/movies';
import { SerieDetailsProps } from '../types/tvshows';

const getRatingColor = (movie: MovieDetailsProps | null, serie: SerieDetailsProps | null) => {
    if (movie) {
        const value = +movie.vote_average.toFixed(1) * 10;
        if (value === 0) {
          return "#494949";
        }
        if (value <= 30) {
          return "#d11313";
        }
        if (value <= 50) {
          return "#d15f13";
        }
        if (value <= 75) {
          return "#d1ab13";
        }
        if (value <= 100) {
          return `#13d116`;
        }
      } else if (serie) {
        const value = +serie.vote_average.toFixed(1) * 10;
        if (value === 0) {
          return "#494949";
        }
        if (value <= 30) {
          return "#d11313";
        }
        if (value <= 50) {
          return "#d15f13";
        }
        if (value <= 75) {
          return "#d1ab13";
        }
        if (value <= 100) {
          return `#13d116`;
        }
      } else {
        return "#494949";
      }
}

export default getRatingColor