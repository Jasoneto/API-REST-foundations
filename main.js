const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_NLWIzci8PXeLSiUesKGTnQqjAT2ZfNWsrPTeGD6ekndKKsEy6FtsU81dkfja2RJf';

const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_NLWIzci8PXeLSiUesKGTnQqjAT2ZfNWsrPTeGD6ekndKKsEy6FtsU81dkfja2RJf';

const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_NLWIzci8PXeLSiUesKGTnQqjAT2ZfNWsrPTeGD6ekndKKsEy6FtsU81dkfja2RJf`;


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
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    cat1.src = data[0].url;
    cat2.src = data[1].url;

    btn1.onclick = () => saveFavouriteCat(data[0].id);
    btn2.onclick = () => saveFavouriteCat(data[1].id);
    }
}

async function loadFavouriteCats() {
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
    console.log('Favourites')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "There was a mistake" + res.status + data.message;
    } else {
        const section = document.getElementById('favouriteCats');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favourite cats');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Remove cat from favorites');

            img.src = cat.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteCat(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavouriteCat(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });

    const data = await res.json();

    console.log('save')
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "There was a mistake:" + res.status + data.message;
    } else {
        console.log('Cat saved in favourites')
        loadFavouriteCats();
    }
}

async function deleteFavouriteCat(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "There was a mistake" + res.status + data.message;
    } else {
        console.log('Cat deleted from favourites')
        loadFavouriteCats();
    }
}

loadRandomCats();
loadFavouriteCats();
