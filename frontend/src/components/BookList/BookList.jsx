import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../../redux/books/actionCreators"
import "./BookList.css"

const BookList = () => {
    // Подписываемся на состояние
    const books = useSelector((state) => state.books);
    const dispatch = useDispatch();

    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id))
    }
    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No Books Found!</p>
            ) : (
                <ul>
                    {books.map((book, i) => (
                        <li key={book.id}>
                            <div className="book-info">
                                {++i}. {book.title} by <strong>{book.autor}</strong>
                            </div>
                            <div className="book-actions">
                                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default BookList;