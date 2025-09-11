# FreshMart 🛒

A modern, responsive grocery store web application built with Node.js, Express, and MongoDB. FreshMart provides a clean, user-friendly interface for browsing products, managing cart items, and collecting customer feedback.

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with a professional grocery store aesthetic
- **Product Catalog**: Browse through various product categories (Fruits, Vegetables, Dairy, Bakery)
- **Shopping Cart**: Add and manage items in your cart
- **Customer Feedback System**: Submit and view customer feedback with MongoDB storage
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Feedback Display**: View all customer submissions with timestamps

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML5, CSS3, JavaScript
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins, Playfair Display)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port 27017)
- npm (comes with Node.js)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MedYounes004/Shopping-site.git
   cd Shopping-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your local machine:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb/brew/mongodb-community
   
   # On Windows
   net start MongoDB
   
   # On Linux
   sudo systemctl start mongod
   ```

4. **Run the application**
   ```bash
   node server.js
   ```

5. **Access the application**
   Open your browser and navigate to: `http://localhost:3500`

## 📁 Project Structure

```
freshmart/
├── server.js              # Main server file
├── package.json           # Project dependencies
├── package-lock.json      # Dependency lock file
├── views/                 # HTML templates
│   ├── index.html         # Homepage
│   ├── products.html      # Products catalog
│   ├── cart.html          # Shopping cart
│   └── feedback.html      # Feedback form
└── README.md              # Project documentation
```

## 🌐 Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Homepage |
| `/products` | GET | Product catalog |
| `/cart` | GET | Shopping cart |
| `/feedback` | GET | Feedback form |
| `/feedback` | POST | Submit feedback |
| `/view` | GET | View all feedback submissions |

## 💾 Database Schema

### UserInput Collection
```javascript
{
  text: String (required),     // Feedback text
  createdAt: Date (default)    // Timestamp
}
```

## 🎨 Design Features

- **Color Scheme**: Professional green theme (#2e8b57, #3cb371)
- **Typography**: Poppins for body text, Playfair Display for headings
- **Responsive Grid**: CSS Grid and Flexbox layouts
- **Interactive Elements**: Hover effects, smooth transitions
- **Accessibility**: Semantic HTML, proper contrast ratios

## 🔧 Configuration

The application uses the following default configurations:

- **Port**: 3500
- **MongoDB URI**: `mongodb://localhost:27017/StoreFeedback`
- **Database Name**: StoreFeedback
- **Collection**: userinputs

## 📝 Usage

### Adding Products
Currently, the application displays sample products. To add more products, modify the HTML in `views/products.html`.

### Submitting Feedback
1. Navigate to `/feedback`
2. Enter your feedback in the text field
3. Click "Submit Feedback"
4. You'll be redirected to `/view` to see all submissions

### Viewing Feedback
Access `/view` to see all customer feedback submissions with timestamps.

## 🚧 Future Enhancements

- [ ] User authentication system
- [ ] Product management admin panel
- [ ] Shopping cart functionality with checkout
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced filtering and search
- [ ] Product reviews and ratings
- [ ] Inventory management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Cart functionality is currently display-only
- Product data is hardcoded in HTML
- No user session management
- Limited error handling for database operations

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact: freshmarket@example.com

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com/) for product images
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- MongoDB and Express.js communities for excellent documentation

---

**Happy Shopping! 🛍️**
