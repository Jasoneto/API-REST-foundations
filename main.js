console.log('Hello, kittens lovers');

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_NLWIzci8PXeLSiUesKGTnQqjAT2ZfNWsrPTeGD6ekndKKsEy6FtsU81dkfja2RJf';

// fetch(URL) //fetch returns a promise, and a promise is resolve with a '.then'
//     .then(response => response.json()) //the answer we get with fetch, is transform in a javascript object
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url
//     });

async function reload() {
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log(data)
    const cat1 = document.getElementById('cat1');
    const cat2 = document.getElementById('cat2');
    const cat3 = document.getElementById('cat3');

    cat1.src = data[0].url;
    cat2.src = data[1].url;
    cat3.src = data[2].url;
}

reload();
