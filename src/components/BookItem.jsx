import { Card } from 'flowbite-react'
import "./Book.css"
import React, { useState } from 'react'
import { supabase } from '../dbConnect';

const BookItem = ({ book }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async() => {
    // Assuming you have a function to add the book to the cart
    const newItem = {
      book_id: book.book_id,
      book_title: book.title,
      book_qty: 1, 
      book_price: book.price,
      subtotal: book.price,
      user_id: book.user_id,
    };

    // Insert the cart item into the 'cart' table
    const { data, error } = await supabase.from('cart').insert([newItem]);


  };
  return (
    <>

<div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
                <img src={book.image}
                    alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
                <div class="px-4 py-3 w-72">
                    <span class="text-gray-400 mr-3 uppercase text-xs">{book.author_name}</span>
                    <p class="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
                    <p class="text-sm font-semibold text-black truncate block capitalize">{book.genre_name}</p>
                    <p class="text-sm font-semibold text-black truncate block capitalize">Condition: {book.condition}⭐</p>
                    <div class="flex items-center">
                        <p class="text-lg font-semibold text-black cursor-auto my-3">₹{book.price}</p>
                        
                    </div>
                    <button onClick={addToCart} className='bg-blue-700 font-semibold text-white py-2 rounded w-60'>Add to cart</button>
                </div>
            </a>
        </div>
    </>
  )
}

export default BookItem;