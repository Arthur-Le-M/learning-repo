

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
            ligne.push("0");
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




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }