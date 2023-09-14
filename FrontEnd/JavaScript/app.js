import {
    works, sectionWorks, objets, appartements, hotelsEtRestaurants, boutonsFiltre, loginStatus,
    logoutStatus, adminStatus, figureModify, description, portfolioModify, filtreModify
} from "./constants.js";

//Affichage dynamique

function getWorks(currentWorks) {

    for (let i = 0; i < currentWorks.length; i++) {

        const work = currentWorks[i];

        const workElement = document.createElement("figure");
        workElement.dataset.id = currentWorks[i].id;

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;

        const nomElement = document.createElement("figcaption");
        nomElement.innerText = work.title;

        sectionWorks.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(nomElement);

    };
};

getWorks(works);

//Filtre

for (let i = 0; i < boutonsFiltre.length; i++) {
    boutonsFiltre[i].addEventListener("click", (event) => {
        const IdBouton = event.target.id;
        switch (IdBouton) {
            case '0':
                sectionWorks.innerHTML = "";
                getWorks(works)
                break
            case '1':
                sectionWorks.innerHTML = "";
                getWorks(objets)
                break
            case '2':
                sectionWorks.innerHTML = "";
                getWorks(appartements)
                break
            case '3':
                sectionWorks.innerHTML = "";
                getWorks(hotelsEtRestaurants)
                break

        };
    });
};


//Login

if (JSON.parse(sessionStorage.getItem("isConnected"))) {
    loginStatus.style.display = 'none'
    logoutStatus.style.display = 'block'
    adminStatus.style.display = 'flex'
    figureModify.style.display = 'flex'
    portfolioModify.style.display = 'flex'
    filtreModify.style.display = 'none'
    description.style.display = 'flex'

} else {
    loginStatus.style.display = 'block'
    logoutStatus.style.display = 'none'
    adminStatus.style.display = 'none'
    figureModify.style.display = 'none'
    portfolioModify.style.display = 'none'
    filtreModify.style.display = 'flex'
    description.style.display = 'none'
}

//Reset de la connexion
logoutStatus.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isConnected");
    window.location.replace("index.html");
});









