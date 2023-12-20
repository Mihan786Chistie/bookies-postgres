import { Card } from 'flowbite-react'
import "./Book.css"
import React from 'react'

const BookItem = ({ book }) => {
  
  return (
    <>
      {/* <div className="card">
        <img src={book.image} alt={book.title} />
        <article>By {book.author}</article>
        <h3>{book.title}</h3>
        <p>Condition: {book.condition}</p>
        <h3>Rs. {book.price}</h3>
      </div> */}


{/* <div class="card">
    <div class="card-img"><div class="img">
      <img src={book.image} alt={book.title} />
      </div></div>
    <div class="card-title">{book.title}</div>
    <div class="card-subtitle">Condition: {book.condition}</div>
    <hr class="card-divider"/>
    <div class="card-footer">
        <div class="card-price"><span>₹</span> {book.price}</div>
        <button class="card-btn">
        </button>
    </div>
</div> */}

{/* <div id="list-th">
      <div class="book read">
        <div class="cover">
          <img src={book.image}/>
        </div>
        <div class="description">
          <p class="title">{book.title}<br/>
            <span class="author">{book.authr}</span></p>
        </div>
      </div>
      </div> */}

{/* <div class="product-card" id="product-card1">
  <div class="main">
    <img  src={book.image} alt={book.title} id="main-image1"/>
    <div class="price" id="price1">₹{book.price}</div>
    <div class="inline-block">
    <h3>Large</h3>
    <h2>{book.title}</h2>
    </div>
    
  </div>
  <div class="details" id="details1">
    <div class="detail">
      <p class="type">Author: </p>
      <p class="description">{}</p>
    </div>
    <div class="detail">
      <p class="type">Genre: </p>
      <p class="description">{book.genre}</p>
    </div>
    <div class="detail">
      <p class="type">Condition: </p>
      <p class="description">{book.condition}</p>
    </div>
  </div>
</div> */}

<div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
                <img src={book.image}
                    alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
                <div class="px-4 py-3 w-72">
                    <span class="text-gray-400 mr-3 uppercase text-xs">{book.genrese.genre}</span>
                    <p class="text-lg font-bold text-black truncate block capitalize">{book.title}</p>
                    <div class="flex items-center">
                        <p class="text-lg font-semibold text-black cursor-auto my-3">₹{book.price}</p>
                    </div>
                </div>
            </a>
        </div>
    </>
  )
}

export default BookItem;