import React, { useState } from "react";
import axios from "axios";
// import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();  // ✅ FIXED

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [books, setBooks] = useState([]);

  const searchBooks = async(text)=>{

    setQuery(text);

    if(text.length > 2){

      const res = await axios.get(
        `https://bookrecommendationwebapp.onrender.com/search?query=${encodeURIComponent(text)}`
      );

      setSuggestions(res.data);
    }
  };

  return (

    <div className="container">

      <h1>💗 Your next book, sorted!</h1>

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
            onClick={() => navigate(`/book/${encodeURIComponent(s)}`)}
            className="suggestion"
          >
            {s}
          </div>
        ))}
      </div>

      {/* <div className="book-grid">
        {books.map((b,i)=>(
          <BookCard key={i} book={b}/>
        ))}
      </div> */}

    </div>
  );
}

export default Home;