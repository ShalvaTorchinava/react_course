import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/NotFound/NotFound";
import Movies from "./pages/Movies";
import TVshows from "./pages/TVshows";
import MoviePage from "./pages/MoviePage";


const App = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "90vh"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/tvshows" element={<TVshows />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
