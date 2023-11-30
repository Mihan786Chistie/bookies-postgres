
const BookItem = ({ book }) => {
    return (
        <div class="w-[300px] rounded-md border">
            <img
                src={book.image}
                alt={book.title}
                class="h-[200px] w-full rounded-md object-cover"
            />
            <div class="p-4">
                <h1 class="text-lg font-semibold">{book.title}</h1>
                <p class="mt-3 text-sm text-gray-600">{book.author}</p>
                <p class="mt-3 text-sm text-gray-600">Condition: {book.condition}⭐</p>
                <p class="mt-3 text-sm font-semibold">₹ {book.price}</p>
                
            </div>
        </div>

    )
}

export default BookItem;