const express = require('express');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Email sending endpoint
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your Gmail address
            pass: 'your-app-password'     // Replace with your App Password
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Replace with your Gmail address
        subject: `New Contact Form Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Web scanning endpoint
app.post('/scan-website', async (req, res) => {
    const { url } = req.body;

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Navigate to the URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract the page title
        const title = await page.title();

        // Extract all links
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a')).map(a => ({
                text: a.innerText.trim(),
                href: a.href
            })).filter(link => link.href && link.text);
        });

        // Example interaction: If there's a search bar, search for "AI"
        const searchInput = await page.$('input[type="search"], input[name="q"]');
        let searchResult = null;
        if (searchInput) {
            await searchInput.type('AI');
            await searchInput.press('Enter');
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
            searchResult = await page.evaluate(() => {
                const firstResult = document.querySelector('h1, h2, h3, p');
                return firstResult ? firstResult.innerText : 'No search results found.';
            });
        }

        await browser.close();

        // Send the results back to the client
        res.json({
            title,
            links: links.slice(0, 5), // Limit to 5 links for brevity
            searchResult: searchResult || 'No search performed (no search bar found).'
        });
    } catch (error) {
        console.error('Error scanning website:', error);
        res.status(500).json({ error: 'Failed to scan website' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});