

// Jeu du Morpion

function creerPlateau(){
    var plateau = []
    for(var i=0; i<3; i++){
        var ligne = []
        for(var y=0; y<3; y++){
            ligne.push(" ")
        }
        plateau.push(ligne)
    }
    return plateau
}

function placer(plateau, signeJoueur, x, y){
        plateau[x][y] = signeJoueur
}

function verifVictoire(signeJoueur, x, y){
    //Horizontal
    if(x == 0){
        //verif des deux cases de gauches
    }
    else if(x == 1){
        //verif de la case de droite et de la case de gauche
    }
    else if(x == 2){
        //verif des deux cases de droites
    }
    
}
