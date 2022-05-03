const btn = document.getElementById("btnGenerer")
var textMdp = document.getElementById("mdp")
const erreurContainer = document.getElementById("erreurContainer")
const inputMaj = document.getElementById("inputMaj")
const inputMin = document.getElementById("inputMin")
const inputCarSpec = document.getElementById("inputCarSpec")
const inputNumber = document.getElementById("inputNumber")
const mdpLength = document.getElementById("inputLenght")

textMdp.textContent = ""
mdpLength.value = 15
inputMaj.checked = true
inputMin.checked = true
inputCarSpec.checked = true
inputNumber.checked = true
removeAllChildNodes(erreurContainer)

btn.addEventListener('click', ()=>{
    removeAllChildNodes(erreurContainer)
    if(inputMaj.checked==false && inputMin.checked==false && inputCarSpec.checked==false && inputNumber.checked==false){
        var err = document.createElement("p")
        err.classList.add("erreur")
        err.textContent = "Au moins une case doit être coché"
        erreurContainer.appendChild(err)
    }
    else if(mdpLength.value<1 || mdpLength.value>60){
        var err2 = document.createElement("p")
        err2.classList.add("erreur")
        err2.textContent = "La taille doit être comprise entre 1 et 60"
        erreurContainer.appendChild(err2)
    }
    else{
        textMdp.textContent = genererMotDePasse(mdpLength.value, inputMaj.checked, inputMin.checked, inputCarSpec.checked, inputNumber.checked);
    }
})


function genererMotDePasse(longueur, MajB=true, MinB=true, SpecCharB=true, NumberB=true){
    min = "abcdefghijklmnopqrstuvwxyz";
    maj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    specChar = "-_%:;?!";
    number = "1234567890";
    tabChar = [];
    mdp = ""
    if(MajB == true){
        tabChar.push(maj);
    }
    if(MinB==true){
        tabChar.push(min);
    }
    if(SpecCharB==true){
        tabChar.push(specChar);
    }
    if(NumberB==true){
        tabChar.push(number);
    }
    
    for(i=0; i<longueur;i++){
        numTabUse = getRandomInt(0, tabChar.length);
        carUse = getRandomInt(0, tabChar[numTabUse].length);
        mdp += tabChar[numTabUse][carUse];
    }
    return(mdp);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}