import { useDispatch, useSelector } from "react-redux";
// import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators"
import { deleteBook, toggleFavorite, selectBooks } from "../../redux/slices/booksSlice";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { selectTitleFilter, selectAuthorFilter, selectOnlyFavoriteFilter } from "../../redux/slices/filterSlice";
import "./BookList.css"


const BookList = () => {
    // Подписываемся на состояние
    // const books = useSelector((state) => state.books);
    const books = useSelector(selectBooks);

    const titleFilter = useSelector(selectTitleFilter)
    const authorFilter = useSelector(selectAuthorFilter)
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
    const dispatch = useDispatch();

    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id))
    }

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id))
    }

    const filteredBooks = books.filter((book) => {
        const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
        const mathcesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
        const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
        return matchesTitle && mathcesAuthor && matchesFavorite;
        
    })

    const highlightMatch = (text, filter) => {
        if (!filter) return text;
        const regex = new RegExp(`(${filter})`, 'gi')
        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() == filter.toLowerCase()) {
                return (
                    <span key={i} className="highlight">{substring}</span>
                )
            }
            return substring;
        })
    }

    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No Books Found!</p>
            ) : (
                <ul>
                    {filteredBooks.map((book, i) => (
                        <li key={book.id}>
                            <div className="book-info">
                                {++i}. {highlightMatch(book.title, titleFilter)} by {' '} 
                                <strong>{highlightMatch(book.author, authorFilter)}

                                </strong> ({book.source})
                            </div>
                            <div className="book-actions">
                                <span onClick={() => handleToggleFavorite(book.id)}>
                                    {book.isFavorite ? (
                                        <BsBookmarkStarFill className="star-icon" />
                                    ) : (
                                        <BsBookmarkStar className="star-icon" />
                                    )}
                                </span>

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