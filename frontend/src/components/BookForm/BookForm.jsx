import { useState } from "react";
import { useDispatch } from "react-redux";
// Внешняя библиотека для создания уникальных идентификаторов
import { v4 as uuidv4 } from 'uuid';
import { addBook } from "../../redux/books/actionCreators";

import "./BookForm.css"

const BookForm = () => {
    const [title, setTitle] = useState("")
    const [autor, setAutor] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (title && autor) {
            const book = {
                title: title,
                autor: autor,
                id: uuidv4()
            }
            
            dispatch(addBook(book))
            
            setTitle("")
            setAutor("")
        }
    }
    return (
        <div className="app-block book-form">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="title">Autor: </label>
                    <input type="text" id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}

export default BookForm;