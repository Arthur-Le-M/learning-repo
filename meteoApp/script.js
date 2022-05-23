inputVille = document.getElementById("villeInput")
boutonValider = document.getElementById('valid')
textVille = document.getElementById('ville')
textTemperature = document.getElementById('temp')
divErr = document.getElementById('erreurContainer')
iconeTemps = document.getElementById('imgState')
body = document.getElementsByTagName('body')[0]

apiLink = "https://goweather.herokuapp.com/weather/"
removeAllChildNodes(divErr);
textVille.style.display = 'none'
textTemperature.style.display = 'none'
iconeTemps.style.display = 'none'

boutonValider.addEventListener('click', ()=>{
    removeAllChildNodes(divErr);
    req = apiLink + inputVille.value
    textVille.textContent = 'Chargement...'
    textVille.style.display = 'block'

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
            iconeTemps.style.display = 'block'
            textVille.textContent = inputVille.value
            //Icone temps
            
            if(value['description'] == "Sunny"){
                iconeTemps.src = "images/sun.png"
            }
            else if(value['description'] == "Rain shower"){
                iconeTemps.src = "images/rain.png"
            }
            else if(value['description'] == "Partly cloudy"){
                iconeTemps.src = "images/partlyCloudy.png"
            }
            else{
                iconeTemps.src = "images/cloud.png"
            }
            //Temperature
            textTemperature.textContent = value['temperature']
            if(tempToInt(value['temperature']) <= 10){
                body.style.backgroundColor = "#a8def7"
            }
            else if(tempToInt(value['temperature']) <= 20){
                body.style.backgroundColor = "#fff1ab"
            }
            else{
                body.style.backgroundColor = "#ffd2ab"
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