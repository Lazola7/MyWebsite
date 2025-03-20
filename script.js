// Magic Button on index.html
const magicButton = document.getElementById('magicButton');
if (magicButton) {
    magicButton.addEventListener('click', function() {
        alert('Magic happened!');
    });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        setTimeout(() => {
            alert('Thank you for your message! We’ll get back to you soon.');
        }, 500);
    });
}

// Web scan form submission
const webScanForm = document.getElementById('webScanForm');
if (webScanForm) {
    webScanForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const url = document.getElementById('url').value;
        const scanResultsDiv = document.getElementById('scanResults');

        try {
            const response = await fetch('/scan-website', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `url=${encodeURIComponent(url)}`
            });

            const data = await response.json();

            if (data.error) {
                scanResultsDiv.innerHTML = `<h2>Scan Results</h2><p>Error: ${data.error}</p>`;
            } else {
                const linksList = data.links.map(link => `<li><a href="${link.href}" target="_blank">${link.text}</a></li>`).join('');
                scanResultsDiv.innerHTML = `
                    <h2>Scan Results</h2>
                    <p><strong>Page Title:</strong> ${data.title}</p>
                    <p><strong>Links Found:</strong></p>
                    <ul>${linksList}</ul>
                    <p><strong>Search Result for "AI":</strong> ${data.searchResult}</p>
                `;
            }
        } catch (error) {
            scanResultsDiv.innerHTML = `<h2>Scan Results</h2><p>Error: Failed to scan website.</p>`;
        }
    });
}