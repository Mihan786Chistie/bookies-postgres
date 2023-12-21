import React, { useState, useEffect } from 'react'
import { supabase } from '../dbConnect'
import NavBar from '../components/NavBar'
import BookItem from './BookItem'
import "./SellBook.css"

function SellBook() {
    const [books, setBooks] = useState([])
    var date = new Date();

    // Get year, month, and day part from the date
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day; 
    const [newBook, setNewBook] = useState({
        title: '',
        author_id: 2,
        description: '',
        author_name: '',
        genre_name: '',
        genre: 3,
        price: 0,
        condition: 1,
        image: '',
        created_at: formattedDate,
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
            author_id: 2,
            description: '',
            author_name: '',
            genre_name: '',
            genre: 3,
            price: 0,
            condition: 1,
            image: '',
            created_at: formattedDate,
            user_id: '',
            available: true,
          });
        }
      };


    return (
        <div class="scrollable-container">
        <div class="wrapper">
                <h2>Sell your Book</h2>
                <form>
                    <div class="input-box">
                        <input type="text" placeholder="Enter Book Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
                    </div>
                    <div class="input-box">
                        <input type="text" placeholder="Enter Book Author" value={newBook.author_name} onChange={(e) => setNewBook({ ...newBook, author_name: e.target.value })} />
                    </div>
                    <div class="input-box">
                        <textarea placeholder="Enter Book Description" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} />
                    </div>
                    <div class="input-box">
                        <input type="text" placeholder="Enter Book Genre" value={newBook.genre_name} onChange={(e) => setNewBook({ ...newBook, genre_name: e.target.value })} />
                    </div>
                    <div class="input-box">
                        <input type="number" placeholder="Enter Book Price" value={newBook.price} onChange={(e) => setNewBook({ ...newBook, price: e.target.value })} />
                    </div>
                    <div class="input-box">
                        <input type="number" placeholder="Enter Book Condition" min="1" max="5" value={newBook.condition} onChange={(e) => setNewBook({ ...newBook, condition: e.target.value })} />
                    </div>
                    <div class="input-box">
                        <input type="text" placeholder="Enter Book Image" value={newBook.image} onChange={(e) => setNewBook({ ...newBook, image: e.target.value })} />
                    </div>
                    <div class="input-box">
                        <input type="text" placeholder="Enter User Id" value={newBook.user_id} onChange={(e) => setNewBook({ ...newBook, user_id: e.target.value })} />
                    </div>
                    <div class="input-box button">
                        <button type="button" onClick={addBook}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
            </div>
    )
}

export default SellBook