import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { MovieList } from "../../types/movieslist";

interface MovieCardProps {
  movie: MovieList;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const rating = movie.vote_average / 2;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt=""
        />
        <CardContent
          sx={{
            padding: "7px",
            backgroundColor: "#333333",
            color: "#fff",
            height: "80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginBottom: "unset", fontSize: "1.3em" }}
          >
            {movie.title}
          </Typography>
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="text-feedback"
              value={rating}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
