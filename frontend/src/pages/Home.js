import React, { useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function Home() {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [books, setBooks] = useState([]);

  const searchBooks = async(text)=>{

    setQuery(text);

    if(text.length > 2){

      const res = await axios.get(
    `https://bookrecommendationwebapp.onrender.com/search?query=${text}`      );

      setSuggestions(res.data);
    }
  };

  const getRecommendations = async(title)=>{

    const res = await axios.get(
      `https://bookrecommendationwebapp.onrender.com/recommend/${title}`
);

    setBooks(Array.isArray(res.data) ? res.data : []);
    setSuggestions([]);
    setQuery(title);
  };

  return (

    <div className="container">

      <h1>💗 Book Recommender</h1>

      <input
        type="text"
        placeholder="Search book..."
        value={query}
        onChange={(e)=>searchBooks(e.target.value)}
      />

      <div className="suggestions">
        {suggestions.map((s,i)=>(
          <div
            key={i}
            onClick={()=>getRecommendations(s)}
            className="suggestion"
          >
            {s}
          </div>
        ))}
      </div>

      <div className="book-grid">

        {books.map((b,i)=>(
          <BookCard key={i} book={b}/>
        ))}

      </div>

    </div>
  );
}

export default Home;