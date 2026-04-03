import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import MovieDetails from "./pages/MovieDetails"; // you'll create this page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesPage />} />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;