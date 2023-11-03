//appel API works
fetch("http://localhost:5678/api/works").then(response => {
    return response.json();
    }).then(works => {
        //appel fonction pour inserer valeurs dans le HTML
        insertValues(works);
    }).catch(error => {
        console.log(error);
    });


// Fonction qui insére les valeurs dans le HTML
function insertValues(works) {
    // déclaration du SET
    let Categories = new Set();
    //récuperer section projet
    let projetElement = document.getElementById("idProjet");
    //titre de la section
    let divTitle = document.createElement("div");
    let nouveauTitre = document.createElement("h2");
    nouveauTitre.textContent = "Mes Projets";
    divTitle.appendChild(nouveauTitre);
    projetElement.appendChild(divTitle);
    //rajout des boutons
    let divButton = document.createElement("div");

    
    //bouton tous
    let divTous   = document.createElement("button");
    //rajout classe CSS tous
    divTous.classList.add("tous");
    //rajout du texte du bouton
    divTous.textContent =  "Tous";

    divTous.addEventListener("click", function () {  
      let oFilter ={
        id:0,
        name:"Tous"
       }
       filterWorks(oFilter);
    });

    //rajout du bouton sous le div
    divButton.appendChild(divTous);
    // Récupérer la section portofolio
    let parentElement = document.getElementById("portfolio");
    //préparer Div Gallery
    let nouvelleDiv = document.createElement("div");
    //rajouter class  gallery au div
    nouvelleDiv.classList.add("gallery");
    //rajouter div à la section
    parentElement.appendChild(nouvelleDiv);
    //boucle sur la reponse API
    Object.entries(works).forEach(([key, value]) => {
        //stocker les différents catégories dans un SET
        if(Categories.size === 0){
            Categories.add(JSON.stringify(value.category));
            let divCatButton = document.createElement("button");
            divCatButton.textContent = `${value.category.name}`;

            divCatButton.addEventListener("click", function () {
                let oFilter ={
                    id:`${value.category.id}`,
                    name:`${value.category.name}`
                   }
                   filterWorks(oFilter);
              });


            divButton.appendChild(divCatButton);
            projetElement.appendChild(divButton);
        }else{
            for (let item of Categories){
                console.log(item);
                if(Categories.has(JSON.stringify(value.category)) === false){
                    Categories.add(JSON.stringify(value.category));
                    let divCatButton = document.createElement("button");
                    divCatButton.textContent = `${value.category.name}`;
                    divCatButton.addEventListener("click", function () {
                        let oFilter ={
                            id:`${value.category.id}`,
                            name:`${value.category.name}`
                           }
                           filterWorks(oFilter);
                      });

                    divButton.appendChild(divCatButton);
                    projetElement.appendChild(divButton);
                }
            }
        }
        // créer balise figure
        let figure = document.createElement("figure");
        //rajouter balise img
        let img = document.createElement("img");
        img.src = `${value.imageUrl}`;
        img.alt = `${value.title}`;
        figure.appendChild(img);
        //rajouter balise figCaption
        let figCaption = document.createElement("figcaption");
        figCaption.innerHTML = `${value.title}`;
        figure.appendChild(figCaption);
        //rajouter figure sous le div
        nouvelleDiv.appendChild(figure);
    });
  console.log(Categories);
}

function filterWorks(oFilter){
    alert("id: " + oFilter.id + " name: " + oFilter.name); 
}



