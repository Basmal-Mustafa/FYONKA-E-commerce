import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/FilterRate/Category';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartItems, addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('LowToHigh');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data.data) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  // 🧠 Filtering Logic
  useEffect(() => {
    let updated = [...products];

    // 1. Category filter
    if (selectedCategory !== 'all') {
      updated = updated.filter(product =>
        product.categoryId?.name?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // 2. Price range filter
    if (minPrice !== '') {
      updated = updated.filter(product => product.price >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      updated = updated.filter(product => product.price <= parseFloat(maxPrice));
    }

    // 3. Sorting
    if (sortOption === 'LowToHigh') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'HighToLow') {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Newest') {
      updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'BestSelling') {
      // Since we don't have sales data, we'll sort by stock (assuming lower stock means more popular)
      updated.sort((a, b) => a.stock - b.stock);
    }

    setFilteredProducts(updated);
  }, [products, selectedCategory, minPrice, maxPrice, sortOption]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f145b]"></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center text-center'>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
