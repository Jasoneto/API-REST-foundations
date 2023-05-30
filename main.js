console.log('Hello, kittens lovers');

const URL = 'https://api.thecatapi.com/v1/images/search?limit=10';

// fetch(URL) //fetch returns a promise, and a promise is resolve with a '.then'
//     .then(response => response.json()) //the answer we get with fetch, is transform in a javascript object
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url
//     });

async function myCat () {
    const response = await fetch(URL);
    const data = await response.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
}

const myButton = document.querySelector('button');
myButton.onclick = myCat;
