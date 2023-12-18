import { Card } from 'flowbite-react'

const BookItem = ({ book }) => {
    return (
        <>
            <img
                src={book.image}
                alt={book.title}
                />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><p>{book.title}</p></h5>
                <p class="mt-3 text-sm text-gray-600">{book.author}</p>
                <p class="mt-3 text-sm text-gray-600">Condition: {book.condition}⭐</p>
                <p class="mt-3 text-sm font-semibold">₹ {book.price}</p>
                
        </>
    )
}

export default BookItem;