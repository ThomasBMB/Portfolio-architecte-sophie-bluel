const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const sectionWorks = document.querySelector(".gallery");

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

const objets = works.filter((work) => {
    return work.categoryId === 1;
});

const appartements = works.filter((work) => {
    return work.categoryId === 2;
});

const hotelsEtRestaurants = works.filter((work) => {
    return work.categoryId === 3;
});

const boutonsFiltre = document.querySelectorAll(".filtre button");

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

//Categories

const selectCategory = document.getElementById('modal-photo-category');

const reponseCategory = fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((category) => {
            const categoryOption = document.createElement('option')
            const categoryLabel = document.createElement('label')

            categoryOption.setAttribute('value', category.id)
            categoryLabel.innerHTML = category.name

            selectCategory.appendChild(categoryOption)
            categoryOption.appendChild(categoryLabel)
        });
    });


//Login

const loginStatus = document.getElementById("login")
const logoutStatus = document.getElementById("logout")
const adminStatus = document.getElementById("admin-logged")
const figureModify = document.getElementById("figure-modify")
const description = document.getElementById("figure-modify-a")
const portfolioModify = document.getElementById("portfolio-l-modify")
const filtreModify = document.querySelector('.filtre')


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









