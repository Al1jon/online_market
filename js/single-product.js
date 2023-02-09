const BASE_URL = 'https://63d8d9c474f386d4efdf0611.mockapi.io/';
const elCards = document.querySelector('.cards');
const elTitle = document.querySelector('title');


const id = localStorage.getItem('id');
console.log(id)


function renderPost(product) {
    elTitle.innerHTML = `${product.name}`;
    elCards.innerHTML = '';

    elCards.innerHTML += `
        <div class="h-50 m-2 d-flex bg-white" style="box-shadow:0 0 30px #a9a9a9;">
                <img width = 600px height = 610px; data-id=${product.id} class="image"  src="${product.image}" style="box-shadow:0 0 30px #a9a9a9; alt="${product.name}">
                <div class="p-5">
                <h2 data-id=${product.id} class="name my-3">${product.name}</h2>
                <hr>
                <h4 class="category">category: ${product.category}</h4>
                <h5 class="price ">price: ${product.price}</h5>
                <span class="createdAt my-5">${product.createdAt}</span>
                <p class="description my-5">${product.description}</p>
                <button class="btn btn-info d-block mt-5 mb-2 w-100">Following</button>
                <button class="btn btn-warning w-100">Go back</button>
                </div>
            </div>
`
        ;


}

fetch(BASE_URL + 'Products/' + id)
    .then((res) => res.json())
    .then((data) => {
        renderPost(data)
    })
    .catch((err) => {
        console.log('error')
        alert('xato aniqlandi!')
    })

elCards.addEventListener('click', (event) => {
    if (event.target.className.includes('btn-warning')) {
        window.location.href = 'index.html';

    }
})












