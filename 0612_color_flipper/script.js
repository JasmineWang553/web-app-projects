const btn = document.getElementsByClassName("btn")[0]
const rgb = document.getElementById("rgb")

function randnum() {
    return Math.floor(Math.random() * 256)
}

btn.addEventListener("click", () => {
    const str = `rgb(${randnum()}, ${randnum()}, ${randnum()})`;
    document.body.style.background = str;
    rgb.innerText = str;
})