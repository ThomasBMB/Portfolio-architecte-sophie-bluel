const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function getWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        const sectionWorks = document.querySelector(".gallery");

        const workElement = document.createElement("figure");
        workElement.dataset.id = works[i].id;

        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;

        const nomElement = document.createElement("figcaption");
        nomElement.innerText = work.title;

        sectionWorks.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(nomElement);

    }
}

//function filter(works) {}

getWorks(works)

