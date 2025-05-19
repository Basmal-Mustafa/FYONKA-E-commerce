import PropTypes from 'prop-types';
import { useCart } from '@/context/CartContext';

Cart.defaultProps = {
  showModal: false,
};

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
};

export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();

  return (
    // showModal && (
      <div
  className={`fixed top-0 right-0 h-full bg-white dark:bg-black z-50 overflow-y-auto transform transition-transform duration-500 ease-in-out
    ${showModal ? 'translate-x-0' : 'translate-x-full'}
    w-full md:w-[50%] sm:w-[30rem] flex flex-col items-center gap-8 p-6 sm:p-10 text-black dark:text-white font-normal uppercase text-sm`}
>
  <h1 className="text-2xl font-bold">Cart</h1>

  <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
    <button
      className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
      onClick={toggle}
    >
      Close
    </button>
  </div>

  <div className="flex flex-col gap-4 w-full">
    {cartItems.map((item) => (
      <div
        key={item.id}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-100 p-3 rounded-lg"
      >
        <div className="flex items-center gap-4">
          <img
            src={item.thumbnail || '/path/to/default-image.jpg'}
            alt={item.title}
            className="rounded-md h-24 w-24 object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-base font-bold">{item.title}</h1>
            <p className="text-gray-600 text-sm">${item.price}</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <button
            className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
            onClick={() => addToCart(item)}
          >
            +
          </button>
          <p>{item.quantity}</p>
          <button
            className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
            onClick={() => removeFromCart(item)}
          >
            -
          </button>
        </div>
      </div>
    ))}
  </div>

  {cartItems.length > 0 ? (
    <div className="flex flex-col justify-center items-center mt-6 gap-2">
      <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
      <button
        className="mt-2 px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded hover:bg-red-500"
        onClick={clearCart}
      >
        Clear cart
      </button>
    </div>
  ) : (
    <h1 className="text-lg font-bold mt-6">Your cart is empty</h1>
  )}
</div>
    // )
  );
}
