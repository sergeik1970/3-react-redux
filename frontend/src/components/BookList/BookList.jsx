import { useSelector } from "react-redux";
import "./BookList.css"

const BookList = () => {
    // Подписываемся на состояние
    const books = useSelector((state) => state.books);
    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No Books Found!</p>
            ) : (
                <ul>
                    {books.map((book, i) => (
                        <li key={i}>
                            <div className="book-info">
                                {++i}. {book.title} by <strong>{book.autor}</strong>
                                </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default BookList;