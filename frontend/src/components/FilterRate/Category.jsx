import React, { useState, useEffect } from 'react';
import '@/styles/CategoryFilter.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryFilter = ({
  selectedCategory,
  onChangeCategory,
  onPriceChange,
  onSortChange
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('LowToHigh');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        if (response.data.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handlePriceChange = (newMin, newMax) => {
    setMinPrice(newMin);
    setMaxPrice(newMax);
    onPriceChange(newMin, newMax);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0f145b]"></div>
      </div>
    );
  }

  return (
    <div className='catFilter'>
      {/* Category */}
      <div className="category-filter flex flex-col justify-center items-center">
        <label htmlFor="category-select" className="category-label">Choose Category</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onChangeCategory(e.target.value)}
          className="category-dropdown w-50"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name.toLowerCase()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-option">
        <label className="filter-label">Price Range:</label>
        <div className="price-range flex justify-center items-center">
          <input
            type="number"
            className="filter-input"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
          />
          <span>to</span>
          <input
            type="number"
            className="filter-input"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handlePriceChange(minPrice, e.target.value)}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="filter-option flex flex-col items-center">
        <label className="filter-label">Sort By:</label>
        <select
          className="filter-select w-50"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            onSortChange(e.target.value);
          }}
        >
          <option value="LowToHigh">Low to High</option>
          <option value="HighToLow">High to Low</option>
          <option value="Newest">Newest</option>
          <option value="BestSelling">Best Selling</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
