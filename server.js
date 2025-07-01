const express = require('express');
const path = require('path');
const app =  express();
const mongoose= require('mongoose');


/*
function index(req,res){
    res.sendFile(path.join(__dirname,'views','index.html'));
}

app.get('/',index);
*/


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
});

/*
function listening(){
    console.log("listening on port 3500");
}

app.listen(3500,listening);
*/

app.listen(3500,()=>{
    console.log("listening on port 3500");
});


app.get('/cart',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','cart.html'))
});


app.get('/feedback',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','feedback.html'))
});

app.get('/products',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','products.html'))
});


//step2:

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/StoreFeedback');

//Create a simple schema
const userInputSchema = new mongoose.Schema({
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now }
});

//Create model 
const UserInput = mongoose.model('UserInput',userInputSchema);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Route to handle form submission
app.post('/feedback',async (req,res)=>{
    try{
        console.log('Requested body:', req.body);
        const { userText } = req.body;
        console.log('Extracted usertext:', userText);

        const newInput = new UserInput({text:userText});
        await newInput.save();
        res.redirect('/view');
    } catch (err) {
        console.log('Database error:', err);
        res.status(500).send('Error saving to database');
    }
});

// Route to view all submissions
app.get('/view', async (req, res) => {
    try {
      const inputs = await UserInput.find().sort({ createdAt: -1 });
      res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Submissions - FreshMart</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'><path fill='%232e8b57' d='M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z'/></svg>">
    <style>
        /* View Submissions Page - FreshMart Theme */
:root {
    --primary-color: #2e8b57;
    --secondary-color: #3cb371;
    --dark-color: #2d2d2d;
    --light-color: #f8f9fa;
    --accent-color: #ff6b6b;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--dark-color);
    background-color: #f5f5f5;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}


/* Header Styles */
.head-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 1.5rem;
    }
.main-header {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 70;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--primary-color);
    font-weight: 700;
    font-size: 1.5rem;
}

.logo i {
    font-size: 2rem;
}

.main-nav ul {
    display: flex;
    list-style: none;
    gap: 30px;
}

.main-nav a {
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 500;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
}

.main-nav h1 {
      font-size: 2rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;}

.main-nav a:hover {
    color: var(--primary-color);
}

.main-nav a.active {
    color: var(--primary-color);
}

/* Header */
.container h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
    position: relative;
}



/* Submissions List */
.submissions-list {
    list-style: none;
    padding: 0;
    margin-bottom: 40px;
}

.submission-item {
    background-color: var(--light-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.submission-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
}

.submission-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(46, 139, 87, 0.15);
    border-color: var(--primary-color);
}

.submission-text {
    color: var(--dark-color);
    font-size: 1.1rem;
    font-weight: 400;
    margin-bottom: 10px;
    line-height: 1.6;
}

.submission-date {
    color: #666;
    font-size: 0.9rem;
    font-style: italic;
    display: flex;
    align-items: center;
    gap: 5px;
}

.submission-date::before {
    content: '📅';
    font-size: 0.8rem;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #666;
}

.empty-state i {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 20px;
    opacity: 0.6;
}

.empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: var(--dark-color);
}


/* Navigation Breadcrumb */
.breadcrumb {
    background-color: #e8f5e8;
    padding: 15px 0;
    margin-bottom: 30px;
}

.breadcrumb-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
}

.breadcrumb nav {
    font-size: 0.9rem;
}

.breadcrumb a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.breadcrumb span {
    color: #666;
    margin: 0 8px;
}

/* Statistics */
.stats-container {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    text-align: center;
}

.stats-container h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.stats-number {
    font-size: 2rem;
    font-weight: 700;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        margin: 10px;
        padding: 20px 15px;
        border-radius: 8px;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    .submission-item {
        padding: 15px;
    }
    
    .submission-text {
        font-size: 1rem;
    }
    
}

/* Footer */
.main-footer {
    background-color: var(--dark-color);
    color: white;
    padding: 30px 0;
    text-align: center;
}

.main-footer ul {
    list-style-type: none;
}

@media (max-width: 480px) {
    h1 {
        font-size: 1.8rem;
    }
    
    .submission-item {
        padding: 12px;
    }
    
    .stats-number {
        font-size: 1.5rem;
    }
}
    </style>
</head>
<body>
    <header class="main-header">
        <div class="head-container">
            <div class="logo">
                <span class="fas fa-shopping-basket"></span>
                <h1>FreshMart</h1>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="/" class="active"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="/products"><i class="fas fa-store"></i> Products</a></li>
                    <li><a href="/cart"><i class="fas fa-shopping-cart"></i> Cart</a></li>
                    <li><a href="/feedback"><i class="fas fa-comment-dots"></i> Feedback</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <div class="container">
        <h1>Customer Feedback</h1>
        
        <!-- Statistics -->
        <div class="stats-container">
            <h3>Total Submissions</h3>
            <div class="stats-number">${inputs.length}</div>
        </div>

        <!-- Submissions List -->
        ${inputs.length > 0 ? `
            <ul class="submissions-list">
                ${inputs.map(input => `
                    <li class="submission-item">
                        <div class="submission-text">${input.text}</div>
                        <div class="submission-date">${input.createdAt.toLocaleString()}</div>
                    </li>
                `).join('')}
            </ul>
        ` : `
            <div class="empty-state">
                <i class="fas fa-comment-slash"></i>
                <h3>No submissions yet</h3>
                <p>Be the first to share your feedback!</p>
            </div>
        `}
        
    </div>
    <footer class="main-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-col">
                    <h4>FreshMarket</h4>
                    <p>Quality produce since 2010</p>
                    <p>Quality groceries delivered fresh</p>
                </div>
                <div class="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li> (+216) 71-123-789</li>
                        <li> Freshmarket@example.com</li>
                    </ul>
                </div>
            </div>
            <p>&copy; 2023 FreshMart. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
      `);
    } catch (err) {
      res.status(500).send('Error retrieving data');
    }
  });






