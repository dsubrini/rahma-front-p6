const galleryElement = document.querySelector('.gallery');
const filtersElement = document.querySelector('.filters');
const formSelectElement = document.querySelector('#filters_options');
const galleryModalElement = document.querySelector('.add_Gallery');

let worksList = [];
let categoriesList = [];
let filtersSelected = 'all';

let categories = [
  {
    id: 1,
    name: 'objets',
  },
  {
    id: 2,
    name: 'Appartements',
  },
  {
    id: 3,
    name: 'Hotels & restaurants',
  },
];

const getWorks = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    worksList = data;
    createGallery(worksList);
    createoptionsSelectForm(categories);
    createGalleryModalElements(worksList);
  } catch (error) {
    console.error(error);
  }
};
const removeExistingProjects = () => {
  const existingProjects = document.querySelectorAll('.gallery figure');
  existingProjects.forEach((Project) => {
    Project.remove();
  });
};

const createGallery = (worksList) => {
  // Supprime les projets existants de la galerie
  removeExistingProjects();

  // Maintenant, vous pouvez ajouter les nouveaux projets à la galerie
  galleryElement.innerHTML = ' ';
  worksList.forEach((work) => {
    const figureElement = document.createElement('figure');
    const galleryImg = document.createElement('img');
    const galleryFigCaption = document.createElement('figcaption');

    galleryImg.crossOrigin = 'anonymous';
    galleryImg.src = work.imageUrl;
    galleryImg.alt = work.title;

    galleryFigCaption.innerHTML = work.title;

    figureElement.setAttribute('data-id', work.id);
    figureElement.append(galleryImg);
    figureElement.append(galleryFigCaption);
    galleryElement.append(figureElement);
  });
};

// Fonction pour récupérer les photos de portfolio
async function createGalleryModalElements(data) {
  // Afficher les photos dans le modal
  data.forEach((work) => {
    const divElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const deleteIcon = document.createElement('i');
    const editParagraph = document.createElement('p');

    deleteIcon.className = 'fas fa-trash-can delete_icon';
    imageElement.src = work.imageUrl;

    deleteIcon.addEventListener('click', () => {
      console.log(work.id);
    });
    editParagraph.textContent = 'éditer';

    divElement.style.position = 'relative';

    divElement.appendChild(imageElement);
    divElement.appendChild(deleteIcon);
    divElement.appendChild(editParagraph);
    galleryModalElement.appendChild(divElement);

    // Add the event listener to deleteIcon
    deleteIcon.addEventListener('click', () => {
      console.log(work.id);
      const confirmDelete = confirm(
        'Voulez-vous vraiment supprimer ce travail ?'
      );

      if (confirmDelete) {
        deleteWork(work.id);
      }
    });
  });
}
async function deleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 204) {
      console.log('Travail supprimé avec succès');
      // Vous pouvez maintenant rafraîchir la galerie pour afficher les travaux mis à jour.
      getWorks();
    } else {
      console.error('Erreur lors de la suppression du travail');
    }
  } catch (error) {
    console.error(error);
  }
}

const createFilteredWorksList = (categoryId) => {
  if (categoryId === 'all') {
    createGallery(worksList);
  } else {
    const filteredList = worksList.filter((work) => {
      return work.categoryId === Number(categoryId);
    });
    createGallery(filteredList);
  }
};
const createoptionsSelectForm = (optionsList) => {
  // Vérifier que formSelectElement n'est pas null avant de continuer
  if (formSelectElement) {
    formSelectElement.innerHTML = '';
    const optionOne = document.createElement('option');
    optionOne.value = 'all';
    optionOne.innerHTML = 'Tous';

    formSelectElement.appendChild(optionOne);

    optionsList.forEach((category) => {
      const optionElement = document.createElement('option');
      optionElement.value = category.id;
      optionElement.innerHTML = category.name;

      formSelectElement.appendChild(optionElement);
    });
  }
};

const getCategories = async () => {
  try {
    const reponse = await fetch('http://localhost:5678/api/categories');
    const data = await reponse.json();
    categoriesList = data;
    console.log(categoriesList);
    getWorks();
  } catch (error) {
    console.error(error);
  }
};

// Appel des fonctions pour récupérer les données du back-end et créer la galerie

getCategories();

// recuperer l'ID de la categorie et rendre mes bouttons fonctionnels

const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const categoryId = button.dataset.categoryId;
    filtersSelected = categoryId;
    createFilteredWorksList(filtersSelected);
  });
});
