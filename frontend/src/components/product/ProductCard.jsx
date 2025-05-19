import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const addProductCart = () => {
    addToCart(product);
    toast.success('Added To Cart!');
  };

  //w-full sm:w-[75%] md:w-[60%] lg:w-[45%] xl:w-[30%] 

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col w-full mx-auto">
      <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
        <div className="aspect-square bg-white flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-contain w-full h-full"
            style={{ maxHeight: '300px' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
        </div>

        <div className="text-center flex flex-col gap-1 px-3 py-1">
          <p className="text-secondary text-xs uppercase truncate">
            {product.description.slice(0, 40)}
          </p>
          <h6 className="text-sm font-bold truncate">{product.name}</h6>
          <p className="text-sm font-semibold">${product.price}</p>
          <p className="text-xs text-gray-500">In Stock: {product.stock}</p>
        </div>
      </Link>

      <div className="text-center mb-3">
        <button
          className="btn text-white text-sm"
          style={{ backgroundColor: "#0f145b" }}
          onClick={addProductCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
