let position = window.scrollY;
let previousPosition = 0;
let header = document.getElementById("header")

window.addEventListener("scroll", (event) => {
    position = this.scrollY;
    if (position != 0) {
        header.classList.add("hidden")
        header.classList.add("small")
    } else {
        header.classList.remove("small")
        header.classList.remove("hidden")
    }

    if (previousPosition < position) {
        header.classList.add("hidden")
    } else {
        header.classList.remove("hidden")
    }
    previousPosition = position;
});

