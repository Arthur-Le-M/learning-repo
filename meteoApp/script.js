inputVille = document.getElementById("villeInput")
boutonValider = document.getElementById('valid')
textVille = document.getElementById('ville')
textTemperature = document.getElementById('temp')
divErr = document.getElementById('erreurContainer')
body = document.getElementsByTagName('body')[0]

apiLink = "https://goweather.herokuapp.com/weather/"
removeAllChildNodes(divErr);
textVille.style.display = 'none'
textTemperature.style.display = 'none'

boutonValider.addEventListener('click', ()=>{
    removeAllChildNodes(divErr);
    req = apiLink + inputVille.value
    

    //Fetch
    fetch(req)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        if(value["temperature"] == ""){
            erreur = document.createElement('p')
            erreur.textContent = "Veuillez rentrer une ville valide"
            erreur.classList = 'err'
            textVille.style.display = 'none'
            textTemperature.style.display = 'none'
            divErr.appendChild(erreur)
        }
        else{
            textVille.style.display = 'block'
            textTemperature.style.display = 'block'
            textVille.textContent = inputVille.value
            textTemperature.textContent = value['temperature']
            if(tempToInt(value['temperature']) <= 10){
                body.style.backgroundColor = "#cbeaf7"
            }
            else if(tempToInt(value['temperature']) <= 20){
                body.style.backgroundColor = "#ebf7cb"
            }
            else{
                body.style.backgroundColor = "#f7ddcb"
            }
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
        erreur = document.createElement('p')
        erreur.textContent = "Veuillez rentrer une ville valide"
        erreur.classList = 'err'
        textVille.style.display = 'none'
        textTemperature.style.display = 'none'
        divErr.appendChild(erreur)
    });
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function tempToInt(temperature){
    intString = ""
    for(let i = 0; i<temperature.length; i++){
        if(!isNaN(temperature[i]) && temperature[i] != " "){
            intString += temperature[i]
        }
    }
    return parseInt(intString)
}