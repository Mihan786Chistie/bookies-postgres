// CartPage.js
import { useEffect, useState } from "react";
import { supabase } from "../dbConnect";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase.from("cart").select("*");
      if (error) {
        console.error("Error fetching cart items:", error.message);
      } else {
        setCartItems(data || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  const deleteBook = async (book_id) => {
    const { error } = await supabase
        .from("cart")
        .delete()
        .eq('book_id', book_id)
    if (error) {
        console.error("Error deleting book")
    } else {
        fetchBook()
    }
};

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-5">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.cart_id} className="mb-5 p-4 border rounded-md">
              <p className="text-xl font-bold">{item.book_title}</p>
              <p>Quantity: {item.book_qty}</p>
              <p>Price: ₹{item.book_price}</p>
              <p>Subtotal: ₹{item.subtotal}</p>
              <button className='bg-red-500 text-white p-2 rounded'
                onClick={() => deleteBook(item.book_id)}>Delete</button>
            </div>
          ))}
          <div className="text-xl font-bold mt-5">
            Total: ₹
            {cartItems.reduce((total, item) => total + item.subtotal, 0)}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
