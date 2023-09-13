const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

const sectionWorks = document.querySelector(".gallery");

const objets = works.filter((work) => {
    return work.categoryId === 1;
});

const appartements = works.filter((work) => {
    return work.categoryId === 2;
});

const hotelsEtRestaurants = works.filter((work) => {
    return work.categoryId === 3;
});


//const workCategorieId = works.map(work => work.categoryId);


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



const boutonsFiltre = document.querySelectorAll(".filtre button");

for (let i = 0; i < boutonsFiltre.length; i++) {
    boutonsFiltre[i].addEventListener("click", (event) => {
        const IdBouton = event.target.id;
        console.log(IdBouton)
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













//getCategoryId()

/* const categoryObjets = works.filter(function (workCategory){
    return workCategory.categoryId === 1;
})
console.log(categoryObjets)

const categoryAppartements = works.filter(function (workCategory){
    return workCategory.categoryId === 2;
})
console.log(categoryAppartements) */


