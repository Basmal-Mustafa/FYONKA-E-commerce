import React, { useState } from 'react';
import '@/styles/Filter.css';

const Filter = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('LowToHigh');
  const [isPriceRangeVisible, setIsPriceRangeVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);

  const handleFilterChange = () => {
    console.log(`Filtering by price: ${minPrice} - ${maxPrice}, Sorted by: ${sortOption}`);
  };

  return (
    <div className="filter-container">

      {/* Price Range */}
      <div className="filter-option">
        <label className="filter-label" onClick={() => setIsPriceRangeVisible(prev => !prev)}>
          Price Range:
        </label>

        
        {isPriceRangeVisible && (
          <div className="price-range">
            <input
              type="number"
              className="filter-input"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>to</span>
            <input
              type="number"
              className="filter-input"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Sort By */}
      <div className="filter-option">
        <span className="filter-label" onClick={() => setIsSortVisible(prev => !prev)}>Sort By:</span>
        
        {isSortVisible && (
        <select
          className="filter-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="LowToHigh">Low to High</option>
          <option value="HighToLow">High to Low</option>
          <option value="Newest">Newest</option>
          <option value="BestSelling">Best Selling</option>
        </select>
        )}
      </div>


      <button className="filter-btn" onClick={handleFilterChange}>
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
