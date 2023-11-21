import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/NotFound/NotFound";
import Movies from "./pages/Movies/Movies";
import TVshows from "./pages/TVShows/TVShows";
import MoviePage from "./pages/MoviePage";
import TVshowPage from "./pages/TVShowPage";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./helpers/theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Header />
        <main style={{ minHeight: "90vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/tvs" element={<TVshows />} />
            <Route path="/tvs/:id" element={<TVshowPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
