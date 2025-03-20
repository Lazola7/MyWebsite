const fs = require('fs');
const cron = require('node-cron');
const cheerio = require('cheerio');
const { execSync } = require('child_process');

function updateTimestamp() {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return;
        }

        const $ = cheerio.load(data);
        $('#timestamp').remove();
        const timestamp = `<p id="timestamp">Last updated: ${new Date().toLocaleString()}</p>`;
        $('h1').after(timestamp);

        fs.writeFile('index.html', $.html(), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to index.html:', err);
                return;
            }
            console.log('Website updated with new timestamp!');
        });
    });
}

cron.schedule('0 0 * * *', () => {
    console.log('Running daily website generation...');
    try {
        execSync('node generateWebsite.js');
        console.log('Website files generated successfully.');
        updateTimestamp();
        execSync('git add .');
        execSync('git commit -m "Daily website update"');
        execSync('git push origin main');
        console.log('Changes pushed to GitHub.');
    } catch (error) {
        console.error('Error during daily update:', error);
    }
});

console.log('Automation script running...');