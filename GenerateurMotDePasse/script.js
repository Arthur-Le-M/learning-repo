const btn = document.getElementById("btnGenerer")
var textMdp = document.getElementById("mdp")
const erreurContainer = document.getElementById("erreurContainer")
const inputMaj = document.getElementById("inputMaj")
const inputMin = document.getElementById("inputMin")
const inputCarSpec = document.getElementById("inputCarSpec")
const inputNumber = document.getElementById("inputNumber")
const mdpLength = document.getElementById("inputLenght")
const btnSave = document.getElementById("btnSauvegarder")
var popup = document.getElementById("popup")
btnAnnulerPopup = document.getElementById("btnClose")
btnValiderPopup = document.getElementById("btnValider")
inputSaveMDP = document.getElementById('inputNameMdp')

textMdp.textContent = ""
mdpLength.value = 15
inputMaj.checked = true
inputMin.checked = true
inputCarSpec.checked = true
inputNumber.checked = true
removeAllChildNodes(erreurContainer)
closePopup(popup)


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
        textMdp.style.color = "#333333"
        textMdp.textContent = genererMotDePasse(mdpLength.value, inputMaj.checked, inputMin.checked, inputCarSpec.checked, inputNumber.checked);
    }
})

textMdp.addEventListener('click', ()=>{
    textMdp.style.color = "#42f569"
    var message = document.createElement("p")
    message.classList.add("message")
    message.textContent = "Copié !"
    erreurContainer.appendChild(message)
    navigator.clipboard.writeText(textMdp.textContent)
})

btnSave.addEventListener('click', ()=>{
    if(textMdp.textContent != ""){
        openPopup(popup)
    }
    else{
        var message = document.createElement("p")
        textMdp.style.color = '#1f84ff'
        message.classList.add("erreur")
        message.textContent = "Il faut d'abord générer un mot de passe"
        erreurContainer.appendChild(message)
    }
    
})

btnAnnulerPopup.addEventListener('click', ()=>{
    closePopup(popup)
})

btnValiderPopup.addEventListener('click', ()=>{
    removeAllChildNodes(erreurContainer)
    var message = document.createElement("p")
    textMdp.style.color = '#1f84ff'
    message.classList.add("messageSave")
    message.textContent = "Ce mot de passe à été sauvegarde sous le nom " + inputSaveMDP.value
    erreurContainer.appendChild(message)
    inputSaveMDP.value = ""
    //Sauvegarder dans la bd
    closePopup(popup)
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

function openPopup(e){
    e.style.display = 'flex'
    
}

function closePopup(e){
    e.style.display = 'none'
}