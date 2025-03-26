const fs = require('fs');
const cron = require('node-cron');

// Basic automation example
cron.schedule('* * * * *', () => {
  console.log('🤖 Auto-updating website...');
  fs.appendFileSync('index.html', `\n<!-- Updated: ${new Date()} -->`);
});