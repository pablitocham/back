const buttonGet = document.getElementById("button-get");
const buttonSet = document.getElementById("seter");

buttonGet.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("/getCookie")
        .then((res) => res.json())
        .then((data) => console.log(data));
});

const buttonDelete = document.getElementById("button-delete");
buttonDelete.addEventListener("click", (e) => {

    fetch("/deleteCookie")
        .then((res) => res.json())
        .then((data) => console.log(data.message));
});

