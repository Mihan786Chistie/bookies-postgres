import { useEffect, useState } from "react";
import { supabase } from "../dbConnect";

function NavBar() {

    const [cartCount, setCartCount] = useState([]);

    useEffect(() => {
        // Fetch the cart count when the component mounts
        fetchCartCount();
      }, []);

      const fetchCartCount = async () => {
            const { data, error } = await supabase
              .from('cart')
              .select('*')
        if(error) {
          console.error('Unexpected error:', error.message);
        }else{
            setCartCount(data);
        }
    };
    return (
        <>
            <div className="relative w-full bg-white top-50">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center space-x-2">
                        <span className="font-normal">Bookies</span>
                    </div>
                    <div className="hidden grow items-start lg:flex">
                        <ul className="ml-12 inline-flex space-x-8">
                            <li>
                                <a
                                    href="/"
                                    className="text-sm font-normal text-gray-800 hover:text-gray-900"
                                >
                                    Shop
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/sell"
                                    className="text-sm font-normal text-gray-800 hover:text-gray-900"
                                >
                                    Sell a Book
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden lg:block">
                        <a href="/login">
                        <button
                            type="button"
                            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Sign Up
                        </button>
                        </a>
                    </div>
                    <a href="/cart" className="relative">
              {/* Cart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6 cursor-pointer"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h10a2 2 0 0 0 2-1.61L19 6H6"></path>
              </svg>

              {/* Cart count bubble */}
              
                <div className="absolute top-0 left-6 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cartCount.length}
                </div>
              
            </a>
                    <div className="lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="h-6 w-6 cursor-pointer"
                        >
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavBar;