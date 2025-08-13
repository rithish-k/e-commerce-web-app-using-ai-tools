import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../assets/headphones.jpeg';
import img2 from '../assets/laptopstand.jpeg';
import img3 from '../assets/smartwatch.jpeg';
import img4 from '../assets/speaker.jpeg';

function Main() {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, image: img1 },
    { id: 2, name: "Smart Watch", price: 89.99, image: img3 },
    { id: 3, name: "Bluetooth Speaker", price: 39.99, image: img4 },
    { id: 4, name: "Laptop Stand", price: 24.99, image: img2 }
  ];

  return (
    <div className="container mt-5">
      <header className="mb-4 text-center">
        <h1>🛒 MyShop</h1>
        <p className="text-muted">Your one-stop shop for awesome products</p>
      </header>

      <div className="row">
        {products.map(product => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
