import React, { useState, useEffect } from 'react'
import { supabase } from '../dbConnect'
import NavBar from '../components/NavBar'
import BookItem from './BookItem'


function Home() {

    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
    const [newBook, setNewBook] = useState({
        title: '',
        author_id: '',
        description: '',
        genre: 1,
        price: '',
        condition: '',
        image: '',
        created_at: '',
        user_id: '',
        available: true,
      })

    useEffect(() => {
        fetchBook()
    }, []);

    const fetchBook = async () => {
        const { data, error } = await supabase
            .from("books")
            .select("*, authors: book_author(book_id), genrese: genres(genre)")
            .order("book_id")
        if (error) {
            console.error("Error fetching books: ", error)
        } else {
            setBooks(data);
        }
    };
    const fetchGenre = async (genre_id) => {
        const { data, error } = await supabase
            .from("genres")
            .select("genre")
            .eq("genre_id", genre_id)
        if (error) {
            console.error("Error fetching genres: ", error)
        } else {
            setGenres(data);
        }
    };
    const fetchAuthor = async (book_id) => {
        const { data, error } = await supabase
            .from("book_author")
            .select("author_name")
            .eq("book_id", book_id)
        if (error) {
            console.error("Error fetching genres: ", error)
        } else {
            setGenres(data);
        }
    };
    const addBook = async () => {
        const { data, error } = await supabase
          .from('books')
          .insert([newBook])
          .select();
    
        if (error) {
          console.error('Error adding books', error);
        } else if (Array.isArray(data)) {
          setBooks((prevBooks) => [...prevBooks, ...data]);
          setNewBook({
            title: '',
            author_id: '',
            description: '',
            genre: 1,
            price: '',
            condition: '',
            image: '',
            created_at: '',
            user_id: '',
            available: true,
          });
        }
      };
    const toggleAvailability = async (id, available) => {
        const { error } = await supabase
            .from("books")
            .update({ available: !available })
            .eq('book_id', id)
        if (error) {
            console.error("Error changing availability of the book")
        } else {
            fetchBook()
        }
    }
    const deleteBook = async (book_id) => {
        const { error } = await supabase
            .from("books")
            .delete()
            .eq('book_id', book_id)
        if (error) {
            console.error("Error deleting book")
        } else {
            fetchBook()
        }
    };

    console.log(books.length)
    console.log("Genres", authors.length)

    return (
        <>
        <div className='mt-28 px-4 lg:px24'>
            <h2 className='text-5xl font-bold text-center'>All Books</h2>
            <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
                {
                    books.map((book) => (
                        <div key={book.book_id} className='relative'>
                        <BookItem
                            key={book.book_id}
                            book={book}
                        />
                        <button
                className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded'
                onClick={() => deleteBook(book.book_id)}
              >
                Delete
              </button>
                        </div>
                    ))
                }
            </div>
        </div>


        <div class="demo-page">
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <input type='text' placeholder='Book Title' value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
                <input type='text' placeholder='Book Author' value={newBook.author_id} onChange={(e) => setNewBook({ ...newBook, author_id: e.target.value })} />
                <textarea placeholder='Book Description' value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} />
                <input type='number' placeholder='Book Genre' value={newBook.genre} onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })} />
                <input type='number' placeholder='Price' value={newBook.price} onChange={(e) => setNewBook({ ...newBook, price: e.target.value })} />
                <input type='text' placeholder='Book Condition' value={newBook.condition} onChange={(e) => setNewBook({ ...newBook, condition: e.target.value })} />
                <input type='text' placeholder='Image URL' value={newBook.image} onChange={(e) => setNewBook({ ...newBook, image: e.target.value })} />
                <input type='text' placeholder='Created At' value={newBook.created_at} onChange={(e) => setNewBook({ ...newBook, created_at: e.target.value })} />
                <input type='text' placeholder='User ID' value={newBook.user_id} onChange={(e) => setNewBook({ ...newBook, user_id: e.target.value })} />
                {/* Add other input fields */}
                <button style={{ alignItems: 'center' }} onClick={addBook}>
                    Submit
                </button>
                </div>
        </div>
        </>
    )

}

export default Home
