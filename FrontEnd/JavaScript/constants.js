//Récupération des données

export const reponse = await fetch("http://localhost:5678/api/works");
export const works = await reponse.json();

//Affichage dynamique

export const sectionWorks = document.querySelector(".gallery");

//Filtre

export const objets = works.filter((work) => {
    return work.categoryId === 1;
});

export const appartements = works.filter((work) => {
    return work.categoryId === 2;
});

export const hotelsEtRestaurants = works.filter((work) => {
    return work.categoryId === 3;
});

export const boutonsFiltre = document.querySelectorAll(".filtre button");

//Categories

export const selectCategory = document.getElementById('modal-photo-category');

export const reponseCategory = fetch('http://localhost:5678/api/categories')
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

export const loginStatus = document.getElementById("login")
export const logoutStatus = document.getElementById("logout")
export const adminStatus = document.getElementById("admin-logged")
export const figureModify = document.getElementById("figure-modify")
export const description = document.getElementById("figure-modify-a")
export const portfolioModify = document.getElementById("portfolio-l-modify")
export const filtreModify = document.querySelector('.filtre')
