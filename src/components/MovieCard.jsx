import { useState,useEffect } from "react";
import DetailCard from "./DetailCard";
import Card from "./Card";
import { ApiContext } from "../context/apiContext";

const ApiKey = "api-key";

function MovieCard({searchName}) {
  const [movieList, setMovieList] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [movieDetailsMap, setMovieDetailsMap] = useState(new Map());

  const fetchApiData = async (name) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${name}&apikey=${ApiKey}`);
      const data = await response.json();
      if (!data.Search) {
        setMovieList([]);
        return;
      }
      setMovieList(data.Search.slice(0, 10));
    } catch (err) {
      console.error("Error fetching movies:", err.message);
    }
  };

  const handleSearch = (value) => {
    if (!value.trim()) {
      return;
    }
    fetchApiData(value.trim());
  };

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedArray");
    if (storedLikes) {
      setLikedMovies(JSON.parse(storedLikes));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("likedArray", JSON.stringify(likedMovies));
  }, [likedMovies]);

  useEffect(() => {
  if (searchName) {
    handleSearch(searchName);
  }
}, [searchName]);


   const fetchMovieDetails = async (imdbID) => {
    if (movieDetailsMap.has(imdbID)) {
      return movieDetailsMap.get(imdbID);
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${ApiKey}`);
      const data = await response.json();
      setMovieDetailsMap(prev => new Map(prev).set(imdbID, data));
      return data;
    } catch (err) {
      console.error("Error fetching movie details:", err.message);
      return null;
    }
  };


  const toggleLike = (imdbID) => {
    setLikedMovies(prev =>
      prev.includes(imdbID)
        ? prev.filter(id => id !== imdbID)
        : [...prev, imdbID]
    );
  };

  const handleCardClick = async (imdbID) => {
    if (expandedMovieId === imdbID) {
      setExpandedMovieId(null);
    } else {
      await fetchMovieDetails(imdbID);
      setExpandedMovieId(imdbID);
    }
  };

    return (
      <ApiContext value={{ fetchApiData, fetchMovieDetails }}>
      
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
                  {isExpanded && details ? (
                    <DetailCard details={details} />
                    ) : (
                    <>
                      <button
                        className="AddLikedBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(movie.imdbID);
                        }}
                      >
                        {isLiked ? "✓" : "+"}
                      </button>
                      <Card movie={movie}/>
                    </>
                  )}
              </div>
            );
          })}
        </div>
        </ApiContext>
    )
}

export default MovieCard