import React, { useState, useEffect } from 'react'
import { supabase } from '../dbConnect'
import NavBar from '../components/NavBar'
import BookItem from './BookItem'


function Home() {

    const [books, setBooks] = useState([])
    const [newBook, setNewBook] = useState('')

    useEffect(() => {
        fetchBook()
    }, []);

    const fetchBook = async () => {
        const { data, error } = await supabase
            .from("books")
            .select("*")
            .order("id")
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
    const toggleAvailability = async (id, available) => {
        const { error } = await supabase
            .from("books")
            .update({ available: !available })
            .eq('id', id)
        if (error) {
            console.error("Error changing availability of the book")
        } else {
            fetchBook()
        }
    }
    const deleteBook = async (id) => {
        const { error } = await supabase
            .from("books")
            .delete()
            .eq('id', id)
        if (error) {
            console.error("Error deleting book")
        } else {
            fetchBook()
        }
    };

    console.log(books.length)

    return (
        <div className='mt-28 px-4 lg:px24'>
            <h2 className='text-5xl font-bold text-center'>All Books</h2>
            <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2md:grid-cols-3 grid-cols-1'>
        
                {
                    books.map((book) => (
                        <BookItem
                            key={book.id}
                            book={book}
                        />
                    ))
                }
            </div>
        </div>
    )

}

export default Home
