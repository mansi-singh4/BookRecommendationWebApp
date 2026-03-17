import { useNavigate } from "react-router-dom";

function BookCard({ book }) {

  const navigate = useNavigate();

  return (
    <div
      className="book-card"
      onClick={() =>
        navigate(`/book/${encodeURIComponent(book.title)}`)
      }
    >

      <img src={book.image} alt={book.title} />

      <h3>{book.title}</h3>

      <p className="author">{book.author}</p>

      <p className="rating">⭐ {book.rating}</p>

    </div>
  );
}

export default BookCard;