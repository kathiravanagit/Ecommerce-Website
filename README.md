# E-Commerce Application

A full-stack e-commerce application built with React.js frontend and Node.js/Express backend, featuring product browsing, shopping cart functionality, and order management.

## 🚀 Features

- **Product Catalog**: Browse and search through products
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add/remove items, adjust quantities
- **Order Management**: Place and track orders
- **Responsive Design**: Mobile-friendly user interface
- **Database Integration**: MongoDB for data persistence

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **React Router DOM** - Client-side routing
- **React Toastify** - Toast notifications
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── app.js                 # Main server file
│   ├── package.json
│   ├── seedData.js           # Database seeding
│   ├── config/
│   │   ├── config.env        # Environment variables
│   │   └── connectDatabase.js # Database connection
│   ├── controllers/
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── orderModel.js
│   │   └── productModel.js
│   ├── routes/
│   │   ├── order.js
│   │   └── product.js
│   └── data/
│       └── products.json     # Sample product data
├── frontend/
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── images/           # Product images
│   └── src/
│       ├── App.js
│       ├── components/
│       │   ├── Header.js
│       │   ├── Footer.js
│       │   ├── ProductCard.js
│       │   ├── Search.js
│       │   └── AddressForm.js
│       └── pages/
│           ├── Home.js
│           ├── ProductDetail.js
│           └── Cart.js
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-ecommerce
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Configuration

1. **Database Setup**
   - Ensure MongoDB is running on your local machine
   - Default connection: `mongodb://localhost:27017/`

2. **Environment Variables**
   - Backend configuration is in `backend/config/config.env`
   - Default settings:
     ```
     PORT=8000
     NODE_ENV=production
     DB_URL=mongodb://localhost:27017/
     ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

#### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run prod
   ```
   The application will be available at `http://localhost:8000`

### Using VS Code Tasks

You can use the pre-configured VS Code task to start the development server:
- Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- Type "Tasks: Run Task"
- Select "Start Development Server"

## 📡 API Endpoints

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/product/:id` - Get product by ID

### Orders
- `POST /api/v1/order` - Create new order
- `GET /api/v1/orders` - Get all orders

## 🎯 Usage

1. **Browse Products**: Visit the home page to see all available products
2. **Search**: Use the search functionality to find specific products
3. **Product Details**: Click on any product to view detailed information
4. **Add to Cart**: Add items to your shopping cart
5. **Manage Cart**: View and modify cart contents
6. **Place Order**: Complete your purchase through the cart page

## 🛠️ Development

### Adding New Products
- Add product data to `backend/data/products.json`
- Run the seed script to populate the database
- Place product images in `frontend/public/images/products/`

### Customizing Styles
- Modify `frontend/src/App.css` and `frontend/src/index.css`
- Component-specific styles can be added to individual component files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the database URL in `config.env`

2. **Port Already in Use**
   - Change the PORT value in `backend/config/config.env`
   - Kill any processes using the default ports

3. **Frontend Build Issues**
   - Clear node_modules and reinstall dependencies
   - Check for any missing dependencies

### Support

If you encounter any issues, please check the console logs for error messages and ensure all dependencies are properly installed.

---

Built with ❤️ using React and Node.js

