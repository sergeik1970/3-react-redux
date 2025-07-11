const express = require('express');
const cors = require('cors');
const bookData = require('./data/books.json');

const app = express();

app.use(cors());

function getRandomBook() {
    const randomIndex = Math.floor(Math.random() * bookData.length);
    const randomBook = bookData[randomIndex];
    return randomBook;
}

app.get("/random-book", (req, res) => {
    const randomBook = getRandomBook();
    res.json(randomBook);
});

app.get("/random-book-delayed", (req, res) => {
    const randomBook = getRandomBook();
    setTimeout(() => {
        res.json(randomBook);
    }, 2000)

});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Serger is listening on port ${port}`);
})