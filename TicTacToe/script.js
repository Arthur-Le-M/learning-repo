tabCases = document.querySelectorAll('.case')
tabCasesConv = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1],
                [1, 2], [2, 0], [2, 1], [2, 2]]
body = document.getElementsByTagName('body')[0]
boutonPlay = document.getElementById('buttonPlay')
plateauJeu = document.getElementById('tableau')
indicJoueur = document.getElementById('indicateurJoueur')

//Initialisation
indicJoueur.style.display = "none"
plateauJeu.style.display = "none"



//Bouton Play
boutonPlay.addEventListener('click', ()=>{
    joueurEnCours = ["1"]
    p = creerPlateau()
    indicJoueur.textContent = "Joueur " + joueurEnCours[0]
    if(joueurEnCours[0] == "1"){
        indicJoueur.style.color = "#ff0000"
    }
    else{
        indicJoueur.style.color ="#006eff"
    }
    indicJoueur.style.display = "block"
    plateauJeu.style.display = "block"
    boutonPlay.style.display = 'none'
})


//Affichage Morpion

joueurEnCours = ["1"]
for(i = 0; i<tabCases.length; i++){
        (function(index){
            tabCases[index].addEventListener('click', function cliqueCase(){
                if(p[tabCasesConv[index][0]][tabCasesConv[index][1]] == "empty"){
                    jouerJoueur(joueurEnCours, index)
                    changementJoueur(joueurEnCours)
                }
                
            })
        }(i))
    }

function jouerJoueur(numJoueur, index){
    if(numJoueur[0] == "1"){
        placer(p, "x", tabCasesConv[index][0], tabCasesConv[index][1])
        tabCases[index].style.backgroundColor = "#ff0000"
        indicJoueur.textContent = "Joueur 2"
        indicJoueur.style.color ="#006eff"
        if (verifVictoire(p, "x", tabCasesConv[index][0], tabCasesConv[index][1])){
        body.style.backgroundColor = "#ffc7c7"
        }
    }
    else{
        placer(p, "o", tabCasesConv[index][0], tabCasesConv[index][1])
        tabCases[index].style.backgroundColor = "#006eff"
        indicJoueur.textContent = "Joueur 1"
        indicJoueur.style.color = "#ff0000"
        if (verifVictoire(p, "o", tabCasesConv[index][0], tabCasesConv[index][1])){
        body.style.backgroundColor = "#7db1ff"
        }
    }
    
}

function changementJoueur(numJoueur){
    if(numJoueur[0] == "1"){
        numJoueur[0] = "2"
        console.log("changement " + numJoueur[0])
    }
    else{
        numJoueur[0] = "1"
        console.log("changement " + numJoueur[0])
    }
    
}

// Jeu du Morpion

function creerPlateau(){
    var plateau = []
    for(var i=0; i<3; i++){
        var ligne = []
        for(var y=0; y<3; y++){
            ligne.push("empty")
        }
        plateau.push(ligne)
    }
    return plateau
}

function placer(plateau, signeJoueur, x, y){
        if(plateau[x][y] =="empty"){
            plateau[x][y] = signeJoueur
            return true
        }
        else{
            return false
        }
}



function verifLigneVictoire(plateau, signeJoueur, numLigne){
    if(numLigne >= 0 && numLigne < plateau.length){
        var victoire = true
        for(var i = 0; i<plateau.length; i++){
            if(plateau[numLigne][i] != signeJoueur){
                victoire = false
            }
        }
    }
    return victoire
}

function verifColonneVictoire(plateau, signeJoueur, numColonne){
    if(numColonne >= 0 && numColonne < plateau.length){
        var victoire = true
        for(var i = 0; i<plateau.length; i++){
            if(plateau[i][numColonne] != signeJoueur){
                victoire = false
            }
        }
    }
    return victoire
}

function verifDiagonaleVictoire(plateau, signeJoueur){
    //Diagonal 1
    var victoire = true
    for(var i = 0; i<plateau.length; i++){
        if(plateau[i][i] != signeJoueur){
            victoire = false
        }
    }
    if(victoire != true){
        //Diagonal 2
        victoire = true
        var y = plateau.length-1
        for(var i = 0; i<plateau.length; i++){
            if(plateau[y][i] != signeJoueur){
                victoire = false
            }
            y--
        }
    }
    return victoire    
}

function verifVictoire(plateau, signeJoueur, x, y){
    //Horizontal
    if(verifLigneVictoire(plateau, signeJoueur, x) || verifColonneVictoire(plateau, signeJoueur, y) || verifDiagonaleVictoire(plateau, signeJoueur)){
        return true
    }
    else{
        return false
    }
}


function jouerJeu(){
    //Définition des signes
    signeJoueur1 = prompt("Joueur 1, choisissez votre signe : ")
    signeJoueur2 = prompt("Joueur 2, choisissez votre signe : ")

    //Création du plateau
    p = creerPlateau()
    victoire = ""

    //Début du jeu
    while(victoire == ""){
        while(true){
            x = prompt("Joueur 1, choisissez la ligne sur laquelle vous allez placer votre signe : ")
            y = prompt("Joueur 1, choisissez la colonne sur laquelle vous allez placer votre signe : ")
            if(p[x][y] =="empty"){
                break
            }
            else{
                console.log("La case est déjà prise !")
            }
        }
        
        placer(p, signeJoueur1, x, y)
        if(verifVictoire(p, signeJoueur1, x, y)){
            victoire == "Joueur 1"
            break
        }
        console.log(p)
        while(true){
            x = prompt("Joueur 2, choisissez la ligne sur laquelle vous allez placer votre signe : ")
            y = prompt("Joueur 2, choisissez la colonne sur laquelle vous allez placer votre signe : ")
            if(p[x][y] =="empty"){
                break
            }
            else{
                console.log("La case est déjà prise !")
            }
        }
        

        placer(p, signeJoueur2, x, y)
        if(verifVictoire(p, signeJoueur2, x, y)){
            victoire == "Joueur 2"
            break
        }
        console.log(p)
    }

    console.log(victoire)
    
}

