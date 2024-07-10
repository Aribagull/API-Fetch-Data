document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('productInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchProduct();
        }
    });
});

async function searchProduct() {
    const productName = document.getElementById('productInput').value.trim();
    const url = 'https://yousave.ai/api/search';
    const payload = { product_name: productName };

    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    try {
        const middleDiv = document.querySelector('.midel-div');
        middleDiv.style.display = 'none';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const results = await response.json();
        let ary = results.data.results;
        displayResults(ary);
        if (!ary || ary.length === 0) {
            middleDiv.style.display = 'block';
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerText = 'Failed to retrieve data';
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            const rating = product.rating !== undefined ? product.rating : 0;
            productDiv.innerHTML += `<div class="product-item">
                <h3>${product.title}</h3>
                <img src="${product.thumbnail}" alt="">
                <hr>
                <p>
                    Price Rs. ${product.price} | &#11088; ${rating}
                </p>
            </div>`;
            resultsContainer.appendChild(productDiv);
        });
    } else {
        resultsContainer.innerText = '';
    }
}

displayResults();
