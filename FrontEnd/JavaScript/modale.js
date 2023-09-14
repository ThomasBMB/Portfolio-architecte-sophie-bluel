import {
    modal, modalContent, modalPhoto, modalClose, modalShow, newPhotoBtn, returnBtn, modalPhotoClose,
    titleInput, categorySelect, imageInput, submitButton, inputImage, labelImage, pImage, iconeImage
} from "./constants.js";

//Modale

function showModal() {
    modal.style.display = 'block';
}

function hideModal() {
    modal.style.display = 'none';
}

modalShow.addEventListener('click', showModal);

modalContent.addEventListener('click', function (e) {
    e.stopPropagation();
});
modalPhoto.addEventListener('click', function (e) {
    e.stopPropagation();
});

modalClose.addEventListener('click', hideModal);


modal.addEventListener('click', hideModal);


//Bouton ajouter photo

newPhotoBtn.addEventListener('click', function () {
    modalContent.style.display = 'none';
    modalPhoto.style.display = 'block';
});

returnBtn.addEventListener('click', function () {
    modalContent.style.display = 'flex';
    modalPhoto.style.display = 'none';
})

modalPhotoClose.addEventListener('click', hideModal);


//Ajouter travaux à la modale

const imagesModalContainer = document.querySelector('.gallery-modal')

function createModalWorkFigure(work) {
    const figure = document.createElement('figure')
    const figureCaption = document.createElement('figcaption')
    const figureImage = document.createElement('img')
    const deleteIcon = document.createElement('i')

    figureImage.src = work.imageUrl
    figureImage.alt = work.title
    figureCaption.innerHTML = "éditer"
    figure.setAttribute('data-id', work.id);
    deleteIcon.className = "fa-regular fa-trash-can"

    figure.appendChild(figureImage)
    figure.appendChild(figureCaption)
    figure.appendChild(deleteIcon)

    deleteIcon.addEventListener('click', (event) => {
        event.preventDefault();
        deleteWorkById(work.id);
    });

    return figure;
}

fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((work) => {
            const figure = createModalWorkFigure(work);
            imagesModalContainer.appendChild(figure);
        });
    });


//Supprimer travail

function deleteWorkById(workId) {
    const token = sessionStorage.getItem("Token");
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
    if (confirmation) {
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new error('La supression du travai à echoué.');
                }
                const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
                if (modalWorkToRemove) {
                    modalWorkToRemove.remove();

                    const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
                    if (galleryWorkToRemove) {
                        galleryWorkToRemove.remove();
                    } else {
                        console.error('Élément à supprimer non trouvé dans la galerie principale');
                    }
                } else {
                    console.error('Élément à supprimer non trouvé dans la modale');
                }
            })
            .catch(error => console.error(error));
    }
}


//Supprimer gallerie

function deleteGallery() {
    const token = sessionStorage.getItem("Token");
    const galleryWorks = document.querySelectorAll('.gallery-modal figure, .gallery figure');
    galleryWorks.forEach((galleryWork) => {
        const workId = galleryWork.getAttribute('data-id');
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        galleryWork.remove();
    });
}

document.getElementById("delete-gallery").addEventListener("click", function () {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer la galerie ?");
    if (confirmation) {
        deleteGallery();
    }
});

function checkForm() {
    if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
        submitButton.style.backgroundColor = '#1D6154';
    } else {
        submitButton.style.backgroundColor = '';
    }
}

titleInput.addEventListener('input', checkForm);
categorySelect.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);


//Ajout nouveau travail

const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
    event.preventDefault();

    const token = sessionStorage.getItem("Token");

    const title = document.getElementById("modal-photo-title").value;
    const category = document.getElementById("modal-photo-category").value;
    const image = document.getElementById("image").files[0];


    if (!title || !category || !image) {
        alert('Veuillez remplir tous les champs du formulaire.')
        return;
    }

    if (image.size > 4 * 1024 * 1024) {
        alert("La taille de l'image ne doit pas dépasser 4 Mo.");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(work => {
            const figure = createWorkFigure(work);
            const gallery = document.querySelector('.gallery');
            gallery.appendChild(figure);

            const figureModal = createModalWorkFigure(work);
            const galleryModal = document.querySelector('.gallery-modal');
            galleryModal.appendChild(figureModal);

            alert('Le nouvel travail a été ajouté avec succès.');
        })
        .catch(error => console.error(error));
}


//Preview

inputImage.addEventListener("change", function () {
    const selectedImage = inputImage.files[0];

    const imgPreview = document.createElement("img");
    imgPreview.src = URL.createObjectURL(selectedImage);
    imgPreview.style.maxHeight = "100%";
    imgPreview.style.width = "auto";

    labelImage.style.display = "none";
    pImage.style.display = "none";
    inputImage.style.display = "none";
    iModalImage.style.display = "none";
    document.getElementById("form-photo-div").appendChild(imgPreview);
});