import React, { useEffect, useState } from 'react';
import axios from 'axios';  
// import { BackendUrl, Currency } from '../App'; 
import { toast } from 'react-toastify';
import { assests } from '../../assets/Assests'
import { useNavigate } from 'react-router-dom'; 
import './ProductsList.css';  

const ProductsList = () => {
    const [list, setList] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [removing, setRemoving] = useState(false); 
    const navigate = useNavigate(); 
  
    const fetchList = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data.data) {
          setList(response.data.data);
        } else {
          toast.error('Error displaying products');
        }
      } catch (err) {
        toast.error('Error fetching the list');
        setError('Error fetching the list');
      } finally {
        setLoading(false);
      }
    };
  
    const removeProduct = async (id) => {
      setRemoving(true);
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (response.data.message) {
          toast.success('Product removed successfully.');
          await fetchList();
        } else {
          toast.error('Error removing the product');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error removing the product');
      } finally {
        setRemoving(false);
      }
    };
  
    useEffect(() => {
      fetchList();
    }, []);
  
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && list.length > 0 ? (
          <div>
            <p className='text-xl font-serif text-[#0f145b] font-medium mb-6'>
              All Products ({list.length})
            </p>
  
            <div className='flex flex-col gap-2'>
              <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-slate-700 text-slate-200 text-sm '>
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b className='text-center'>Action</b>
                <b className='text-center'>Edit</b>
              </div>
            </div>
  
            {list.map((item) => (
              <li key={item._id} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-3 px-2 border text-sm relative'>
                <img 
                  className='w-14 h-14 object-contain' 
                  src={item.images[0]} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/56x56?text=No+Image';
                  }}
                />
                <p className='text-[#0f145b]'>{item.name}</p>
                <p className='text-[#0f145b]'>{item.categoryId?.name || 'Uncategorized'}</p>
                <p className='text-[#0f145b]'>${item.price}</p>
  
                <img
                  onClick={() => !removing && removeProduct(item._id)}
                  title='Delete'
                  className={`w-4 cursor-pointer md:m-auto md:static absolute top-5 right-10 ${removing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  src={assests.cancel}
                  alt="Remove"
                />
  
                <button
                  onClick={() => navigate(`/admin/edit-product/${item._id}`)}
                  className="text-blue-600 underline cursor-pointer text-sm md:m-auto"
                >
                  Edit
                </button>
              </li>
            ))}
  
            {removing && <p>Removing product, please wait...</p>}
          </div>
        ) : !loading && !error && (
          <p>No products available</p>
        )}
      </div>
    );
  };
  
  export default ProductsList;
  