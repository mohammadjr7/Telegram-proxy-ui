let position = window.scrollY;
let header = document.getElementById("header")

window.addEventListener("scroll", (event) => {
    position = this.scrollY;
    if (position != 0) {
        header.classList.add("small")
    } else {
        header.classList.remove("small")
    }
});

