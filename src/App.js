import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";

import { useMatchMedia } from "./hooks/";

import Navigation from "./components/Navigation/Navigation";
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";
import SearchBar from "./components/SearchBar/SearchBar";
import Footer from "./components/Footer/Footer";

import Discover from "./pages/Discover/Discover";
import Movies from "./pages/Movies/Movies";
import Trending from './pages/Trending/Trending'
import Genre from "./pages/Genre/Genre";
import Movie from "./pages/Movie/Movie";
import Watchlist from "./pages/Watchlist/Watchlist";
import Search from "./pages/Search/Search";
import NotFound from "./pages/NotFound/NotFound";

function App() {

  const isDesktop = useMatchMedia("(min-width: 64em)");
  
  return (
    <Router>
      {isDesktop ? <Navigation /> : <MobileNavigation />}
      <main id="main-content">
      {isDesktop ? <SearchBar /> : null}
        <Routes>
          <Route exact path="/" element={<Navigate to="/discover" />} />
          <Route exact path="/discover" element={<Discover />} />
          <Route exact path="/:category" element={<Movies />} />
          <Route exact path="/trending" element={<Trending />} />
          <Route exact path="/genre/:genre" element={<Genre />} />
          <Route exact path="/search/:query" element={<Search />} />
          <Route exact path="/movie/:id" element={<Movie />} />
          <Route exact path="/watchlist" element={<Watchlist />} />
          <Route exact path="*" element={<Navigate to="/404" />} />
          <Route exact path="/404" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
