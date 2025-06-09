# Inventory Management Application

This is an inventory management application built with React for the frontend and Laravel for the backend, using MySQL as the database system. The application provides an interactive user interface for managing products and categories in an inventory.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is built using React and includes the following components and pages:

- **Components**
  - `Dashboard.jsx`: Displays an overview of the inventory with key metrics.
  - `ProductList.jsx`: Fetches and displays a list of products from the backend API.
  - `ProductForm.jsx`: Provides a form for adding or editing product details.
  - `Navbar.jsx`: Contains navigation links for the application.

- **Pages**
  - `Home.jsx`: The landing page of the application.
  - `Products.jsx`: Displays the `ProductList` and `ProductForm` components.
  - `Reports.jsx`: Provides insights and reports on inventory data.

- **Services**
  - `api.js`: Contains functions for making API calls to the backend.

### Backend

The backend is built using Laravel and includes the following components:

- **Controllers**
  - `ProductController.php`: Handles requests related to products.
  - `CategoryController.php`: Manages requests related to categories.

- **Models**
  - `Product.php`: Represents the product model and defines the database structure.
  - `Category.php`: Represents the category model and defines the database structure.

- **Database Migrations**
  - `create_products_table.php`: Migration for creating the products table.
  - `create_categories_table.php`: Migration for creating the categories table.

- **Routes**
  - `api.php`: Defines the API routes for the application.

## Getting Started

### Prerequisites

- Node.js and npm for the frontend
- PHP and Composer for the backend
- MySQL for the database

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   composer install
   ```

4. Set up the database:
   - Create a new MySQL database.
   - Update the `.env` file in the backend directory with your database credentials.

5. Run the migrations to create the necessary tables:
   ```
   php artisan migrate
   ```

6. Start the frontend development server:
   ```
   npm start
   ```

7. Start the backend server:
   ```
   php artisan serve
   ```

## Usage

- Access the application in your web browser at `http://localhost:3000` for the frontend.
- The backend API will be available at `http://localhost:8000/api`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.