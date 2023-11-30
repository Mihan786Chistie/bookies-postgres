import { useState, useEffect } from 'react'
import { supabase } from '../dbConnect'
import NavBar from '../components/NavBar'
import BookItem from './BookItem'


function Home() {

    const [books, setBooks] = useState([])
    const [newBook, setNewBook] = useState('')

    useEffect(() => {
        fetchBook()
    }, [])

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
    }
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
        <div
            className={"flex flex-col flex-grow p-4"}
            style={{ height: "calc(100vh - 11.5rem)" }}
        >
            <div
                className={`p-2 border flex-grow grid gap-2 ${books.length ? "auto-rows-min" : ""
                    } grid-cols-1 h-2/3 overflow-y-scroll first:mt-8`}
            >
                {books.length ? (
                    books.map((book) => (
                        <BookItem
                            key={book.id}
                            book={book}
                        />
                    ))
                ) : (
                    <span
                        className={
                            "h-full flex justify-center items-center"
                        }
                    >
                        You do have any tasks yet!
                    </span>
                )}
            </div>
            
        </div>
    )

}

export default Home
