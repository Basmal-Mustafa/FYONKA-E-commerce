import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '@/context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (response.data.product) {
          setProduct(response.data.product);
        } else {
          toast.error('Product not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f145b]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-5">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.images[selectedImage]} 
            alt={product.name} 
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <div className="d-flex mt-3 overflow-auto">
            {product.images.map((img, index) => (
              <img 
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`img-thumbnail me-2 cursor-pointer ${selectedImage === index ? 'border-primary' : ''}`}
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text-muted">{product.categoryId?.name || 'Uncategorized'}</p>
          <div className="d-flex align-items-center mb-3">
            <span className="badge bg-success me-2">{product.stock} in stock</span>
            <span className="text-muted">Color: {product.color}</span>
          </div>
          <h3 className="text-primary">${product.price}</h3>
          <p className="my-4">{product.description}</p>
          
          <div className="d-flex gap-3">
            <button 
              className="btn btn-primary px-4 py-2"
              onClick={() => dispatch({ type: "Add", product })}
            >
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary px-4 py-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;