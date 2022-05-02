const btn = document.getElementById("btn")
body = document.getElementsByTagName('body')[0]
const hexText = document.getElementById('hex')

btn.addEventListener('click', ()=>{
    r = getRandomInt(0, 255)
    g = getRandomInt(0, 255)
    b = getRandomInt(0, 255)
    body.style.backgroundColor = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")"
    hexText.textContent = rgbToHex(r,g,b).toUpperCase()
    if(b+50<255){
        hexText.style.color = rgbToHex(r+50, g+50, b+50)
    }
    else{
        hexText.style.color = rgbToHex(r-50, g-50, b-50)
    }
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}