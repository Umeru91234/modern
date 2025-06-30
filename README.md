# Restaurant Management System

A complete restaurant management system with PHP backend and React frontend.

## Features

- **Authentication**: Secure login system for admin and staff
- **Menu Management**: Add, edit, and delete menu items
- **Table Management**: Manage restaurant tables and their status
- **Order Management**: Place, track, and complete orders
- **Staff Management**: Manage restaurant staff information
- **Dashboard**: Overview of restaurant operations

## Setup Instructions

### Backend Setup (PHP)

1. **Install XAMPP** or any PHP server with MySQL
2. **Start Apache and MySQL** services
3. **Create Database**:
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Import the `restaurant_database.sql` file
4. **Copy PHP files** to your web server directory (e.g., `C:\xampp\htdocs\restaurant_api\`)

### Frontend Setup (React)

1. **Install Node.js** (https://nodejs.org/)
2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
3. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`
4. **Build for production**:
   \`\`\`bash
   npm run build
   \`\`\`

### Configuration

1. **Database Configuration**: Update `config.php` with your database credentials
2. **API URL**: Update the API base URL in `src/api.js` if needed

### Default Login Credentials

- **Username**: admin
- **Password**: password123

## File Structure

\`\`\`
restaurant-system/
├── PHP Backend/
│   ├── config.php
│   ├── login.php
│   ├── get_menu_items.php
│   ├── add_menu_item.php
│   ├── delete_menu_item.php
│   ├── get_tables.php
│   ├── add_table.php
│   ├── update_table_status.php
│   ├── delete_table.php
│   ├── get_orders.php
│   ├── place_order.php
│   ├── complete_order.php
│   ├── delete_order.php
│   ├── get_staff.php
│   ├── add_staff.php
│   └── delete_staff.php
├── React Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── Database/
    └── restaurant_database.sql
\`\`\`

## Technologies Used

- **Backend**: PHP, MySQL, PDO
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: MySQL
- **Server**: Apache (XAMPP)

## API Endpoints

- `POST /login.php` - User authentication
- `GET /get_menu_items.php` - Get all menu items
- `POST /add_menu_item.php` - Add new menu item
- `DELETE /delete_menu_item.php` - Delete menu item
- `GET /get_tables.php` - Get all tables
- `POST /add_table.php` - Add new table
- `POST /update_table_status.php` - Update table status
- `DELETE /delete_table.php` - Delete table
- `GET /get_orders.php` - Get all orders
- `POST /place_order.php` - Place new order
- `POST /complete_order.php` - Complete order
- `DELETE /delete_order.php` - Delete order
- `GET /get_staff.php` - Get all staff
- `POST /add_staff.php` - Add new staff
- `DELETE /delete_staff.php` - Delete staff

## Support

For any issues or questions, please check the configuration and ensure all services are running properly.
