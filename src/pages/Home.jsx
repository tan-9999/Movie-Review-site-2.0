import { useState, useEffect } from "react";
import '../style.css';
import DetailCard from "../components/DetailCard";
import MovieCard from "../components/MovieCard";


function Home() {

  const [searchTerm, setSearchTerm] = useState("");// for search bar
  
  
  return (
    <>
        <h1>API Test Page</h1>
        <h2>Movies Description Site</h2>
      
        <div id="api-response">
        <input type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}/>

      </div>
          <MovieCard searchName={searchTerm}/>

      <br /><br />
    </>
  );
}

export default Home;
