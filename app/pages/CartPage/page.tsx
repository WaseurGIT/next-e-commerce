'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Page = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem('userId') || '123';
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/carts/${userId}`);
      setCartItems(response.data);
      
      const quantitiesMap: { [key: string]: number } = {};
      response.data.forEach((item: CartItem) => {
        quantitiesMap[item._id] = item.quantity || 1;
      });
      setQuantities(quantitiesMap);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      // Call your delete endpoint
      await axios.delete(`http://localhost:5000/carts/${itemId}`);
      setCartItems(cartItems.filter(item => item._id !== itemId));
      const newQuantities = { ...quantities };
      delete newQuantities[itemId];
      setQuantities(newQuantities);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities({ ...quantities, [itemId]: newQuantity });
    
    axios.patch(`http://localhost:5000/carts/${itemId}`, { quantity: newQuantity })
      .catch(error => console.error('Error updating quantity:', error));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item._id] || 1));
    }, 0);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (quantities[item._id] || 1), 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some amazing products to get started!</p>
          <Link href="/" className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-26 bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-2xl font-semibold text-[#1e40af] mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} item(s) in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center group"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="w-12 h-12 text-blue-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold text-blue-600 mb-4">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg w-fit px-3 py-2">
                      <button
                        onClick={() => updateQuantity(item._id, (quantities[item._id] || 1) - 1)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                        {quantities[item._id] || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, (quantities[item._id] || 1) + 1)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="text-xl font-bold text-blue-600">
                        ${(item.price * (quantities[item._id] || 1)).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-300 group-hover:opacity-100"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between items-center text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div> */}
                <div className="flex justify-between items-center text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold">${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-black text-blue-600">
                    ${(calculateTotal() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Proceed to Checkout
              </button>

              <button className="w-full mt-3 border-2 border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Continue Shopping
              </button>

              {/* <p className="text-center text-sm text-gray-500 mt-4">
                Free shipping on orders over $100
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
