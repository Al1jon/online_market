const BASE_URL = 'https://63d8d9c474f386d4efdf0611.mockapi.io/';

const elCards = document.querySelector('.cards');
const elInput = document.querySelector('#search-input');
const elForm = document.querySelector('.form');
const elAddForm = document.querySelector('.add-form');
const elInpImg = document.querySelector('#img');
const elInpName = document.querySelector('#name');
const elInpCategory = document.querySelector('#category');
const elInpPrice = document.querySelector('#price');
const elInpDate = document.querySelector('#date');
const elBtnAdd = document.querySelector('#btn-add');
const elModalImg = document.querySelector('.modal-img');


function renderPost(array) {
    elCards.innerHTML = '';
    array.forEach(post => {
        elCards.innerHTML += `
        <div class="card w-25 m-2" style="box-shadow:0 0 30px #a9a9a9;">
                <img data-id=${post.id} class="image"  src="${post.image}" alt="${post.name}">
                <div class="p-2">
                <h2 data-id=${post.id} class="name">${post.name}</h2>
                <h4 class="category">${post.category}</h4>
                <h5 class="price">price: ${post.price}</h5>
                <h6 class="createdAt">${post.createdAt}</h6>
                <button data-id="${post.id}" class="btn btn-danger">Delete</button>
                <button data-id="${post.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning m-2">Edite</button>
                </div>
            </div>
`
    });
}

var Data;
fetch(BASE_URL + 'Products')
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        renderPost(data)
        Data = data;
    })
    .catch((err) => {
        console.log('error')
        alert('xato aniqlandi!')
    })

elCards.addEventListener('click', (event) => {

    if (event.target.className.includes('image') || event.target.className.includes('name')) {

        const id = event.target.dataset.id;
        console.log(id)
        localStorage.setItem('id', id);
        window.location.href = 'single-product.html';

    };
    const target = event.target;
    // console.log(target)

    if (target.className.includes('btn-danger')) {

        fetch(BASE_URL + 'Products' + '/' + target.dataset.id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);

            })
            .catch((err) => {
                console.log('error')
                alert('xato aniqlandi!')
            })
    };

    if (target.className.includes('btn-warning')) {
        elAddForm.classList = 'd-none';
        elForm.classList = 'd-block';
        let id = target.dataset.id;
        Data.forEach(post => {
            if (id == post.id) {
                elModalImg.src = post.image
                elInpImg.value = post.image;
                elInpName.value = post.name;
                elInpCategory.value = post.category;
                elInpPrice.value = post.price;
                elInpDate.value = post.createdAt;
            }
        });
        elForm.addEventListener('submit', (event) => {

            // event.preventDefault();

            let post = {
                createdAt: elInpDate.value,
                name: elInpName.value,
                image: elInpImg.value,
                category: elInpCategory.value,
                price: elInpPrice.value,

            }
            fetch(BASE_URL + 'Products' + id, {
                method: 'PUT',
                body: JSON.stringify(post),

            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);

                })
                .catch((err) => {
                    console.log('error')
                    alert('xato aniqlandi!')
                })

            console.log(JSON.stringify(post),);

        })

    }
    renderPost(Data)
})

elBtnAdd.addEventListener('click', () => {
    elForm.classList = 'd-none';
    elAddForm.classList = 'd-block';
    elModalImg.src = '';
    elInpImg.value = '';
    elInpName.value = '';
    elInpCategory.value = '';
    elInpPrice.value = '';
    elInpDate.value = '';
})

elAddForm.addEventListener('submit', (event) => {

    // event.preventDefault();

    let post = {
        createdAt: elInpDate.value,
        name: elInpName.value,
        image: elInpImg.value,
        category: elInpCategory.value,
        price: elInpPrice.value,

    }
    fetch(BASE_URL + 'Products', {
        method: 'POST',
        body: JSON.stringify(post),

    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

        })
        .catch((err) => {
            console.log('error')
            alert('xato aniqlandi!')
        })

    console.log(JSON.stringify(post),);

})

elInput.addEventListener('input', () => {
    let newData = [];
    let value = elInput.value;
    Data.forEach(product => {     

        if (product.name.toLowerCase().includes(value.toLowerCase())) {
            newData.push(product);
        }
    }); 
    renderPost(newData);
})








































































