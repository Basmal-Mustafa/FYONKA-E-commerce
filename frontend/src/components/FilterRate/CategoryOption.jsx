import React, { useState, useEffect } from 'react';
import CategoryFilter from '@/components/FilterRate/Category';
import ProductCard from '@/components/product/ProductCard';

const CategoryOption = () => {
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Replace with actual API call
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter((product) => product.category.toLowerCase() === category);

  return (
    <div>
      <CategoryFilter selectedCategory={category} onChangeCategory={setCategory} />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryOption;
