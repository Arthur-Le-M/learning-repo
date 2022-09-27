

//Modèle
var taillePlateau;
var plateau = [];

var bombe = "B";
var drapeau = "D";


function creerTableau(dimension){
    plateau = [];
    for(var i=0;i<dimension;i++){
        ligne = [];
        for(var y=0;y<dimension;y++){
            ligne.push(0);
        }
        plateau.push(ligne);
    }
    return plateau;
}

function placerBombe(plateau, indX, indY){
    plateau[indX][indY] = "B";
}

function placerDrapeau(plateau, indX, indY){
    plateau[indX][indY] = "D";
}

function placerAleatoireBombes(plateau, cliqueX, cliqueY, nbBombe){
    var coordX;
    var coordY;
    for(var i=0;i<nbBombe;i++){
        while(true){
            //On définit une coordonnée aléatoire
            coordX = getRandomInt(0,9);
            coordY = getRandomInt(0,9);

            if(coordX != cliqueX && coordY !=cliqueY && plateau[coordX][coordY]!="B"){
                placerBombe(plateau, coordX, coordY);
                break;
            }
        }
    }
}

function calculeNbBombeAutour(plateau, x, y){
    var nbBombe = plateau[x][y];
    var coordX = x-1;
    var coordY = y-1;
    for(var i=0;i<3;i++){
        if(coordX>=0 && coordX<plateau.length){
            for(var j=0;j<3;j++){
                if(coordY>=0 && coordY<plateau.length){
                    if(plateau[coordX][coordY]=='B'){
                        nbBombe += 1;
                    }
                }
                coordY += 1
            }
        }
        coordY=y-1
        coordX +=1
    }
    return nbBombe;
}

function calculeChiffreCases(plateau){
    for(var i =0; i<plateau.length; i++){
        for(var y=0; y<plateau.length; y++){
            if(plateau[i][y]!= 'B'){
                plateau[i][y] = calculeNbBombeAutour(plateau, i, y)
            }
        }
    }
}

function affichagePlateau(plateau){
    for(var i = 0;i<plateau.length;i++){
        var ligne = ""
        for(var y=0;y<plateau.length;y++){
            ligne += plateau[i][y].toString() + " "
        }
        console.log(ligne)
    }
}

function preparerPartie(nbCase){
    plateau = creerTableau(nbCase);
    placerAleatoireBombes(plateau, 6, 5, 10);
    calculeChiffreCases(plateau);
    affichagePlateau(plateau)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

