# Inventory Management Application

This is an inventory management application built with React for the frontend and Laravel for the backend, utilizing MySQL as the database system. The application provides an interactive user interface for managing products and categories in an inventory.

## Frontend

The frontend is developed using React and includes the following key components:

- **Dashboard**: Displays an overview of the inventory with key metrics and statistics.
- **ProductList**: Fetches and displays a list of products from the backend API.
- **ProductForm**: Provides a form for adding or editing product details.
- **Navbar**: Contains navigation links for easy access to different parts of the application.
- **Home**: Serves as the landing page of the application.
- **Products**: Displays the `ProductList` and `ProductForm` components.
- **Reports**: Provides insights and reports on inventory data.

### Installation

To get started with the frontend, follow these steps:

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the necessary dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Backend

The backend is developed using Laravel and includes the following key components:

- **ProductController**: Handles requests related to products, including methods for creating, reading, updating, and deleting products.
- **CategoryController**: Manages requests related to categories.
- **Models**: Defines the structure and relationships for products and categories.
- **Migrations**: Contains the database schema for products and categories.

### Installation

To set up the backend, follow these steps:

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the necessary dependencies:
   ```
   composer install
   ```

3. Set up your environment variables in the `.env` file, including database connection settings.

4. Run the migrations to create the database tables:
   ```
   php artisan migrate
   ```

5. Start the Laravel development server:
   ```
   php artisan serve
   ```

## API Endpoints

The application exposes the following API endpoints:

- `GET /api/products`: Fetch all products.
- `POST /api/products`: Create a new product.
- `PUT /api/products/{id}`: Update an existing product.
- `DELETE /api/products/{id}`: Delete a product.
- `GET /api/categories`: Fetch all categories.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.