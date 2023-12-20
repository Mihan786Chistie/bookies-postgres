import React, { useState, useEffect } from 'react'
import { supabase } from '../dbConnect'
import NavBar from '../components/NavBar'
import BookItem from './BookItem'

function SellBook() {
    const [books, setBooks] = useState([])
    const [newBook, setNewBook] = useState('')

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
            .from("books")
            .insert([{ title: newTitle, author: newAuthor, description: newDescription, genre: newGenre, price: newPrice, condition: newCondition, image: newImage, created_at: newCreatedAt, user_id: newUserId, available: true }])
            .select()
        if (error) {
            console.error("Error adding books")
        } else if (Array.isArray(data)) {
            setBooks(prevBooks => [...prevBooks, ...data]);
            setNewBook('')
        }
    }


    return (
        <div class="demo-page">
            <section>
                <div class="href-target" id="input-types"></div>
                <h1>

                    Input types
                </h1>
                <p>All available input types are included</p>

                <div class="nice-form-group">
                    <label>Text</label>
                    <input type="text" placeholder="Your name" value="" />
                </div>

                <div class="nice-form-group">
                    <label>Emaild</label>
                    <input type="email" placeholder="Your email" value="" />
                </div>

                <div class="nice-form-group">
                    <label>Phonenumber</label>
                    <input type="tel" placeholder="Your phonenumber" value="" />
                </div>

                <div class="nice-form-group">
                    <label>Url</label>
                    <input type="url" placeholder="www.google.com" value="" />
                </div>

                <div class="nice-form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Your password" />
                </div>

                <div class="nice-form-group">
                    <label>Search</label>
                    <input type="search" placeholder="Search all the things" value="" />
                </div>

                <div class="nice-form-group">
                    <label>Disabled field</label>
                    <input type="text" disabled placeholder="Your name" value="" />
                </div>
                <details>
                    <summary>
                        <div class="toggle-code">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                            Toggle code
                        </div>
                    </summary>
                    <script src="https://gist.github.com/nielsVoogt/e25c9c8f2b8456bbd1239b775d21333f.js"></script>
                </details>
            </section>
        </div>
    )
}

export default SellBook