import { useEffect, useState } from "react";
import DetailCard from "../components/DetailCard";
import Card from "../components/Card";
// import useApi from "./context/apiContext"

const ApiKey = "#";

function Liked() {
  const [movieList, setMovieList] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]); 
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [movieDetailsMap, setMovieDetailsMap] = useState(new Map()); 

  // const { fetchApiData  , fetchMovieDetails } = useApi()


  useEffect(() => {
    const storedLikes = localStorage.getItem("likedArray");
    if (storedLikes) {
      const savedIds = JSON.parse(storedLikes);
      setLikedMovies(savedIds);

      savedIds.forEach((id) => {
        fetchApiData(id);
      });
    }
  }, []);

  // Save updated likedMovies to localStorage on change
  useEffect(() => {
    localStorage.setItem("likedArray", JSON.stringify(likedMovies));
  }, [likedMovies]);
  
  const fetchApiData = async (id) => {  
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${ApiKey}`
      );
      const data = await response.json();

      if (data && data.Response === "True") {
        setMovieList((prev) => [...prev, data]);
      }
    } catch (err) {
      console.error("Error fetching movie:", err.message);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    if (movieDetailsMap.has(imdbID)) {
      return movieDetailsMap.get(imdbID);
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${ApiKey}`
      );
      const data = await response.json();
      setMovieDetailsMap((prev) => new Map(prev).set(imdbID, data));
      return data;
    } catch (err) {
      console.error("Error fetching details:", err.message);
      return null;
    }
  };

  const toggleLike = (imdbID) => {
    setLikedMovies((prev) =>
      prev.includes(imdbID)
        ? prev.filter((id) => id !== imdbID)
        : [...prev, imdbID]
    );
  };

  const handleCardClick = async (imdbID) => {
    if (expandedMovieId === imdbID) {
      setExpandedMovieId(null); // collapse
    } else {
      await fetchMovieDetails(imdbID);
      setExpandedMovieId(imdbID); // expand
    }
  };

  return (
    <>
        <h1>API Test Page</h1>
      <h2>Movies Liked!</h2>
      <div className="card-grid">
        {movieList.length === 0 && <p>No movies found.</p>}
        {movieList.map((movie) => {
          const isLiked = likedMovies.includes(movie.imdbID);
          const isExpanded = expandedMovieId === movie.imdbID;
          const details = movieDetailsMap.get(movie.imdbID);

          return (
            <div
              key={movie.imdbID}
              className="card movie-card"
              onClick={() => handleCardClick(movie.imdbID)}
            >
              <button
                className="AddLikedBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(movie.imdbID);
                }}
              >
                {isLiked ? "✓" : "+"}
              </button>

              {isExpanded && details ? (
                <DetailCard details={details} />
              ) : (
                <Card movie={movie} />
              )}
            </div>
          );
        })}
      </div>
      <br />
    </>
  );
}

export default Liked;
