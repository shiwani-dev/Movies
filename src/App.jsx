import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import MovieDetails from "./pages/MovieDetails"; // you'll create this page

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<MoviesPage />} />

        {/* Details page for each movie */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;