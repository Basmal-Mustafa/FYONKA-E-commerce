import React, { useState, useEffect } from 'react';
import { assests } from '../../assets/Assests'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';  

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState({
    image1: { preview: null, file: null },
    image2: { preview: null, file: null },
    image3: { preview: null, file: null },
    image4: { preview: null, file: null }
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Check if user is logged in and is admin
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    const token = user.role;
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.data) {
          setCategories(response.data.data);
          if (response.data.data.length > 0) {
            setCategoryId(response.data.data[0]._id);
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          toast.error('Error fetching categories');
        }
      }
    };
    fetchCategories();
  }, [navigate]);

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload an image in PNG, JPG, or JPEG format.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => ({
          ...prevImages,
          [imageKey]: { preview: reader.result, file: file },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("color", color);

      Object.keys(images).forEach((imageKey) => {
        if (images[imageKey].file) {
          formData.append("images", images[imageKey].file);
        }
      });

      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.message) {
        toast.success("Product Added Successfully.");
        setName('');
        setDescription('');
        setImages({
          image1: { preview: null, file: null },
          image2: { preview: null, file: null },
          image3: { preview: null, file: null },
          image4: { preview: null, file: null }
        });
        setPrice('');
        setStock('');
        setColor('');
        navigate('/admin/products');
      } else {
        toast.error('Error adding product');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong while uploading.');
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmitHandler} className='container mt-5'>
      {loading ? (
        <div className='text-center'>
          <div className="spinner-border" role="status"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className='mb-2 text-sm font-medium textAdd'>Upload Image</p>
            <div className='row g-2'>
              {['image1', 'image2', 'image3', 'image4'].map((imageKey, index) => (
                <div className="col-3" key={index}>
                  <label htmlFor={imageKey} className="d-flex flex-column align-items-center">
                    <div className='border bg-light p-3 d-flex flex-column justify-content-center align-items-center'>
                      {images[imageKey].preview ? (
                        <img src={images[imageKey].preview} className='w-100' alt="Uploaded" style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'cover' }} />
                      ) : (
                        <>
                          <img src={assests.upload} className='w-25' alt="Upload Icon" />
                          <p className='text-muted' style={{ fontSize: '12px' }}>Upload image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id={imageKey}
                      hidden
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => handleImageChange(e, imageKey)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='mb-3'>
            <p className='text-sm font-medium mb-2 textAdd'>Product Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder='Type here...'
              required
              className='form-control custom-shadow'
            />
          </div>

          <div className='mb-3'>
            <p className='text-sm font-medium mb-2 textAdd'>Product Description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='Write content here...'
              required
              className='form-control'
            />
          </div>

          <div className='d-flex gap-3 flex-wrap'>
            <div className="mb-3">
              <p className='text-sm font-medium mb-2 textAdd'>Product Category</p>
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
                className='form-select'>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <p className='text-sm font-medium mb-2 textAdd'>Product Price</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                placeholder='100'
                required
                className='form-control p-2'
              />
            </div>

            <div className="mb-3">
              <p className='text-sm font-medium mb-2 textAdd'>Stock</p>
              <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                type="number"
                placeholder='10'
                required
                className='form-control p-2'
              />
            </div>

            <div className="mb-3">
              <p className='text-sm font-medium mb-2 textAdd'>Color</p>
              <input
                onChange={(e) => setColor(e.target.value)}
                value={color}
                type="text"
                placeholder='Red'
                className='form-control p-2'
              />
            </div>
          </div>

          <button type='submit' className='btn btn-dark'>
            Upload
          </button>
        </>
      )}
    </form>
  );
}

export default AddProduct;
