import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function BookDetail(){

  const { title } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {

    const fetchBook = async () => {

      const decodedTitle = decodeURIComponent(title);

      const res = await axios.get(
        `https://bookrecommendationwebapp.onrender.com/recommend/${decodedTitle}`
      );

      setBook(res.data.book);
      setSimilar(res.data.recommendations);
    };

    fetchBook();

  }, [title]);

  if(!book) return <p>Loading...</p>;

  return(

    <div className="container">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Search
      </button>

      <div className="detail">

        <img src={book.image} alt={book.title}/>

        <div>
          <h1>{book.title}</h1>
          <p className="author">{book.author}</p>
          <p className="rating">⭐ {book.rating}</p>
          <p className="description">{book.description}</p>
        </div>

      </div>

      <h2>Similar Books</h2>

      <div className="book-grid">
        {similar.map((b,i)=>(
          <BookCard key={i} book={b}/>
        ))}
      </div>

    </div>
  );
}

export default BookDetail;