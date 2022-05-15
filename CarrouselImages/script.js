carrousel = document.querySelectorAll('.carrousel')

carrouselActuel = carrousel[0]

images = []
//On stock toute les images dans un tableau
for (let index = 0; index < carrouselActuel.children.length; index++) {
    images.push(carrouselActuel.children[index])
}

//On cache toute les images sauf la première
for(let i=1; i<images.length;i++){
    images[i].style.display = 'none'
}

//Fonction changement d'images
function changementImages(tabImage){
    //Trouver l'image afficher
    indexImagesAfficher = 0
    for(let i=0; i<tabImage.length; i++){
        if(tabImage[i].style.display != "none"){
            indexImagesAfficher = i
            break
        }
    }
    //Cacher cette images et en afficher un autre
    tabImage[indexImagesAfficher].style.display = 'none'
    if(indexImagesAfficher+1 >= tabImage.length){
        tabImage[0].style.display = 'block'
    }
    else{
        tabImage[indexImagesAfficher+1].style.display = 'block'
    }
}

//On execute le code toute les 5 seconde
window.setInterval(function () {
    changementImages(images)
}, 5000)