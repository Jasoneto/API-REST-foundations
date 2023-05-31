const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_NLWIzci8PXeLSiUesKGTnQqjAT2ZfNWsrPTeGD6ekndKKsEy6FtsU81dkfja2RJf';

const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_NLWIzci8PXeLSiUesKGTnQqjAT2ZfNWsrPTeGD6ekndKKsEy6FtsU81dkfja2RJf';

const spanError = document.getElementById('error')

// fetch(URL) //fetch returns a promise, and a promise is resolve with a '.then'
//     .then(response => response.json()) //the answer we get with fetch, is transform in a javascript object
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url
//     });

async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "There was a mistake" + res.status;
    } else {
    const cat1 = document.getElementById('cat1');
    const cat2 = document.getElementById('cat2');

    cat1.src = data[0].url;
    cat2.src = data[1].url;
    }
}

async function loadFavouriteCats() {
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
    console.log('Favourites')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "There was a mistake" + res.status + data.message;
    }
}

async function saveFavouriteCats() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 'b2e'
        }),
    });

    const data = await res.json();

    console.log('save')
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "There was a mistake" + res.status + data.message;
    }
}

loadRandomCats();

loadFavouriteCats();
