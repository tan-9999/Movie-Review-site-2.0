import React from "react"

function DetailCard({details}) {
    return (
      <div className="card-grid" style={{ padding: '1em' }}>
        <div className="movie-details">
            <p>
              <i>{details.Genre}</i>
            </p>
            <p>
              <b>Director:</b> {details.Director}
            </p>
            <p>
              <b>Actors:</b> {details.Actors}
            </p>
            <p>{details.Plot}</p>
            <p>
              <b>IMDB:</b> {details.imdbRating}
            </p>
        </div>
      </div>
    )
}

export default DetailCard