import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

function BookDetail() {

  const { title } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {

    const fetchBook = async () => {

      try {
        const decodedTitle = decodeURIComponent(title);

        const res = await axios.get(
          `https://bookrecommendationwebapp.onrender.com/recommend/${encodeURIComponent(decodedTitle)}`
        );

        if (!res.data || !res.data.book) {
          console.error("Book not found or API error");
          return;
        }

        setBook(res.data.book);
        setSimilar(res.data.recommendations || []);

      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();

  }, [title]);

  // Loading state
  if (!book) {
    return (
      <div className="container">
        <p style={{ color: "white" }}>Loading recommendations... ⏳</p>
      </div>
    );
  }

  return (

    <div className="container">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Search
      </button>

      {/* Main Book */}
      <div className="detail">

        <img
          src={book.image || "https://via.placeholder.com/150"}
          alt={book.title}
        />

        <div>
          <h1>{book.title}</h1>
          <p className="author">{book.author}</p>
          <p className="rating">⭐ {book.rating}</p>
          <p className="description">{book.description}</p>
        </div>

      </div>

      {/* Similar Books */}
      <h2>Similar Books</h2>

      <div className="book-grid">
        {similar.map((b, i) => (
          <BookCard key={i} book={b} />
        ))}
      </div>

    </div>
  );
}

export default BookDetail;