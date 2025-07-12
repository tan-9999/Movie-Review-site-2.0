import React from "react"

function Card({movie}) {
    return (
        <>
          <img src={movie.Poster} alt="Movie Poster" style={{ width: "100%" }} />
          <div className="container">
            <h4><b>{movie.Title}</b></h4>
            <p>{movie.Year}</p>
          </div>
        </>
    )
}

export default Card