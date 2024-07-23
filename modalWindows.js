let modal = document.getElementById("myModal");
let modalButtons = document.getElementsByClassName("openModalBtn")
/* let red_btn = document.getElementById("openModalBtn");
let black_btn = document.getElementById("openModalBtn"); */
let span = document.getElementsByClassName("close")[0];

for (let i = 0; i < modalButtons.length; i++) {
    let button = modalButtons[i];
    console.log(button)
    console.log(modalButtons.length)
    button.addEventListener("click", function () {
        modal.style.display = "block";
    })
};

span.onclick = function () {
    modal.style.display = "none";
}

console.log(modalButtons)
async function modalContent() {

}