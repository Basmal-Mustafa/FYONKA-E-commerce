import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    stock: '',
    color: ''
  });
  const [images, setImages] = useState({
    image1: { preview: null, file: null, isExisting: false },
    image2: { preview: null, file: null, isExisting: false },
    image3: { preview: null, file: null, isExisting: false },
    image4: { preview: null, file: null, isExisting: false }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const productRes = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (productRes.data.product) {
          setProduct(productRes.data.product);
          setFormData({
            name: productRes.data.product.name,
            description: productRes.data.product.description,
            categoryId: productRes.data.product.categoryId?._id || '',
            price: productRes.data.product.price,
            stock: productRes.data.product.stock,
            color: productRes.data.product.color || ''
          });
          
          // Set existing images
          const existingImages = productRes.data.product.images || [];
          const newImages = { ...images };
          existingImages.forEach((img, index) => {
            if (index < 4) {
              newImages[`image${index + 1}`] = { 
                preview: img, 
                file: null,
                isExisting: true 
              };
            }
          });
          setImages(newImages);
        }

        // Fetch categories
        const categoriesRes = await axios.get('http://localhost:5000/api/categories');
        if (categoriesRes.data.data) {
          setCategories(categoriesRes.data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load product data');
      }
    };

    fetchData();
  }, [id]);

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
          [imageKey]: { 
            preview: reader.result, 
            file: file,
            isExisting: false 
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("color", formData.color);

      // Add new images if they exist
      Object.keys(images).forEach((imageKey) => {
        if (images[imageKey].file) {
          formDataToSend.append("images", images[imageKey].file);
        }
      });

      // Add existing images that weren't changed
      Object.keys(images).forEach((imageKey) => {
        if (images[imageKey].isExisting && !images[imageKey].file) {
          formDataToSend.append("existingImages", images[imageKey].preview);
        }
      });

      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.message) {
        toast.success('Product updated successfully');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f145b]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Image Upload Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['image1', 'image2', 'image3', 'image4'].map((imageKey) => (
            <div key={imageKey} className="border rounded-lg p-4">
              <label className="block text-sm font-medium mb-2">Product Image {imageKey.slice(-1)}</label>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {images[imageKey].preview ? (
                  <img
                    src={images[imageKey].preview}
                    alt={`Product ${imageKey}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, imageKey)}
                className="mt-2 w-full"
              />
            </div>
          ))}
        </div>

        {/* Product Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#0f145b] text-white rounded hover:bg-[#0a0d3f] disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;