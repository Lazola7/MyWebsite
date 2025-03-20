const fs = require('fs');
const path = require('path');

// Company details
const companyName = "Your Business Name";
const slogan = "Your Catchy Tagline";
const products = [
    { name: "AI Chatbot", price: "$99.99", description: "Automates customer service with AI." },
    { name: "Automation Suite", price: "$149.99", description: "Streamlines business processes." }
];

// Navigation menu template
const navMenu = `
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="webscan.html">Web Scan</a></li>
        </ul>
    </nav>
`;

// Generate index.html
const indexContent = `
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${navMenu}
    <h1>Welcome to ${companyName}</h1>
    <p id="timestamp"></p>
    <p>${slogan}</p>
    <p>Explore our innovative products or use our web scanning tool to interact with the web!</p>
    <button id="magicButton">Click Magic!</button>
    <script src="script.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), indexContent);
console.log('Generated index.html');

// Generate about.html
const aboutContent = `
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${navMenu}
    <h1>About ${companyName}</h1>
    <p>We are dedicated to providing cutting-edge solutions that empower businesses. Our mission is to innovate and deliver value through technology.</p>
    <script src="script.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'about.html'), aboutContent);
console.log('Generated about.html');

// Generate products.html
let productsList = products.map(product => `
    <div class="product">
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>${product.description}</p>
    </div>
`).join('');
const productsContent = `
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${navMenu}
    <h1>Our Products</h1>
    <p>Discover the innovative products offered by ${companyName}.</p>
    ${productsList}
    <script src="script.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'products.html'), productsContent);
console.log('Generated products.html');

// Generate contact.html
const contactContent = `
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${navMenu}
    <h1>Contact Us</h1>
    <p>Have a question or want to collaborate? Fill out the form below to get in touch!</p>
    <form id="contactForm" action="/send-email" method="POST">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" required><br>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required></textarea><br>
        <button type="submit">Send Message</button>
    </form>
    <script src="script.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'contact.html'), contactContent);
console.log('Generated contact.html');

// Generate webscan.html
const webscanContent = `
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    ${navMenu}
    <h1>Web Scan Tool</h1>
    <p>Use our tool to scan and interact with websites. Enter a URL below to get started.</p>
    <form id="webScanForm">
        <label for="url">Website URL:</label><br>
        <input type="url" id="url" name="url" placeholder="https://example.com" required><br>
        <button type="submit">Scan Website</button>
    </form>
    <div id="scanResults">
        <h2>Scan Results</h2>
        <p>Results will appear here...</p>
    </div>
    <script src="script.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'webscan.html'), webscanContent);
console.log('Generated webscan.html');