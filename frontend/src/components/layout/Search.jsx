import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResponsiveSearch = ({ open, setOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (query.length > 1) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/products`);
        const products = response.data.data;
  
        const lowerQuery = query.toLowerCase();
  
        const filtered = products.filter((product) => {
          const name = product.name?.toLowerCase() || "";
          const category = product.categoryId?.name?.toLowerCase() || "";
          const description = product.description?.toLowerCase() || "";
  
          return (
            name.includes(lowerQuery) ||
            category.includes(lowerQuery) ||
            description.includes(lowerQuery)
          );
        });
  
        setSuggestions(filtered);
      } catch (error) {
        console.error("Error fetching search suggestions: ", error);
        toast.error('Failed to search products');
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };
  
  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  return (
    <div
      className={`
        fixed top-0 right-0 h-full bg-white dark:bg-black z-50 overflow-y-auto transform transition-transform duration-500 ease-in-out
        ${open ? 'translate-x-0' : 'translate-x-full'}
        w-full md:w-[50%] sm:w-[30rem] flex flex-col items-center gap-8 p-6 sm:p-10 text-black dark:text-white font-normal uppercase text-sm
      `}
    >
      <h1 className="text-2xl font-bold uppercase">Search</h1>

      <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
        <button
          onClick={() => setOpen(false)}
          className="px-3 py-2 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 bg-gray-800"
        >
          Close
        </button>
      </div>

      <input
        type="text"
        placeholder="Search for products..."
        className="w-full p-4 rounded-xl text-black text-base outline-none"
        value={searchQuery}
        onChange={handleChange}
      />

      {loading ? (
        <div className="flex justify-center items-center w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0f145b]"></div>
        </div>
      ) : (
        <ul className="w-full flex flex-col gap-2">
          {suggestions.length > 0 ? (
            suggestions.map((product) => (
              <li
                key={product._id}
                className="bg-gray-100 p-3 rounded-lg text-sm flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <Link
                  to={`/product/${product._id}`}
                  onClick={() => setOpen(false)}
                  className="flex justify-between items-center w-full text-black dark:text-white"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </div>
                  <span>${product.price}</span>
                </Link>
              </li>
            ))
          ) : searchQuery.length > 1 ? (
            <li className="text-sm text-gray-500">No products found</li>
          ) : null}
        </ul>
      )}
    </div>
  );
};

export default ResponsiveSearch;
