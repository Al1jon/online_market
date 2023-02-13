const elForm = document.querySelector('.inputs');
const inputEmail = document.querySelector('#input-email');
const inputPassword = document.querySelector('#input-password');
const errorEmail = document.querySelector('.error-email');
const errorPassword = document.querySelector('.error-password');


elForm.addEventListener(('submit'), (evt) => {

    evt.preventDefault();
   
    if (inputEmail.value.length == 0) {
        Email.textContent = 'Emailni kiriting !';
        const timer = setTimeout(() => {
            errorEmail.textContent = '';
            clearTimeout(timer);
        }, 3000);
    }
    else if (inputPassword.value.length < 6) {
        errorPassword.textContent = `6 ta dan ko'proq simvol kiriting !`;
        const timer = setTimeout(() => {
            errorPassword.textContent = '';
            clearTimeout(timer);
        }, 3000);
    }
    let user = {
        email: inputEmail.value,
        password: inputPassword.value
    }
    fetch("https://reqres.in/api/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data =>{
            // console.log(data)
            if(data.token){
                window.location.href = 'index.html';
            }
        } )
        .catch(data => alert('xato bor'))

});


























