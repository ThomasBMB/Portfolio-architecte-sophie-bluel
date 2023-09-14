//Récupération des données

export const reponse = await fetch("http://localhost:5678/api/works");
export const works = await reponse.json();


//Affichage dynamique

export const sectionWorks = document.querySelector(".gallery");


//Filtre


const worksToFilter = works;

export const objets = worksToFilter.filter((work) => {
    return work.categoryId === 1;
});

export const appartements = worksToFilter.filter((work) => {
    return work.categoryId === 2;
});

export const hotelsEtRestaurants = worksToFilter.filter((work) => {
    return work.categoryId === 3;
});

export const boutonsFiltre = document.querySelectorAll(".filtre button");


//Categories

export const selectCategory = document.getElementById('modal-photo-category');

export const reponseCategory = fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        selectCategory.innerHTML = ''
        console.log(data)

        data.forEach((category) => {

            const categoryOption = document.createElement('option')


            categoryOption.setAttribute('value', category.id)
            categoryOption.innerHTML = category.name

            selectCategory.appendChild(categoryOption)

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


//Modale

export const modal = document.querySelector('#modal');
export const modalContent = document.querySelector('#modal-content');
export const modalPhoto = document.querySelector('#modal-photo');
export const modalClose = document.querySelector('#modal-close');
export const modalShow = document.querySelector('#modal-trigger');


//Bouton ajouter photo

export const newPhotoBtn = document.querySelector('#new-photo');
export const returnBtn = document.querySelector('#modal-return');
export const modalPhotoClose = document.querySelector("#modal-photo-close");


//Supprimer galerie

export const titleInput = document.getElementById('modal-photo-title');
export const categorySelect = document.getElementById('modal-photo-category');
export const imageInput = document.getElementById('image');
export const submitButton = document.getElementById('modal-valider');

//Preview

export const inputImage = document.getElementById("image");
export const labelImage = document.getElementById("label-image");
export const pImage = document.querySelector("#form-photo-div > p");
export const iconeImage = document.querySelector("#iModalImage");