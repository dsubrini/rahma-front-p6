const Login = document.getElementById('Login');
const Logout = document.getElementById('Logout');
const nav_bar = document.getElementById('background_header');
const Btn_header = document.getElementById('Btn_header');
const filters = document.querySelector('#portfolio .filters');
const buttonModifier_1 = document.querySelector('.Modifier_1');
const buttonModifier_2 = document.querySelector('.Modifier_2');

const token = localStorage.getItem('token');


if (token) {
    Login.style.display = 'none';
    Logout.style.display = 'block';
    nav_bar.style.display = 'flex';
    buttonModifier_1.style.display = 'flex';
    buttonModifier_2.style.display = 'flex';

} else {
    Login.style.display = 'block';
    Logout.style.display = 'none';  
    filters.innerHTML = " ";
    nav_bar.style.display = 'none';
    buttonModifier_1.style.display = 'none';
    buttonModifier_2.style.display = 'none';
}




// Récupérer le bouton "Modifier" numéro 2
const modifierButton = document.querySelector('.Modifier_2');

// Récupérer le modal
const modal = document.getElementById('modal');

// Fonction pour ouvrir le modal
function openModal() {
    modal.style.display = 'block';
}

// Ajouter un événement de clic pour ouvrir le modal lorsque l'utilisateur clique sur le bouton "Modifier" numéro 2
modifierButton.addEventListener('click', openModal);

//recuperer le bouton de fermeture
const closeButton = document.querySelector('.modal_close');
// fonction pour fermer le modal
function closeModal() {
    modal.style.display = 'none';
}
//ajouter un evenement de clic pour fermer le modal lorsque lutilisateur clique sur le X
closeButton.addEventListener('click', closeModal);



//afficher les images de la modal

// Récupérer l'élément contenant la galerie de photos
const galleryContainer = document.querySelector('.add_Gallery');


// // ajouter l'icone trash

// // Fonction pour créer un conteneur pour chaque image avec l'icône de suppression
// function createImageContainer(photo) {
//     const imageContainer = document.createElement('div');
//     imageContainer.className = 'image_container';
  
//     const imageElement = document.createElement('img');
//     imageElement.src = photo.imageUrl;
  
//     const deleteIcon = document.createElement('i');
//     deleteIcon.className = 'fas fa-trash-can delete_icon'; // Utilisez "fas" au lieu de "fa-solid"
  
//     // Ajouter un événement de clic pour supprimer l'image lorsque l'utilisateur clique sur l'icône
//     deleteIcon.addEventListener('click', () => {
//       // Supprimer l'image du conteneur parent
//       imageContainer.remove();
//     });
  
//     imageContainer.appendChild(imageElement);
//     imageContainer.appendChild(deleteIcon);
  
//     return imageContainer;
//   }
  


 // Récupérer le bouton "Ajouter une photo" dans le premier modal
 const addPhotoButton = document.getElementById('link_photo');


// Récupérer le nouveau modal
const nextModal = document.getElementById('next_modal');

// Fonction pour ouvrir le nouveau modal
function openNextModal() {
  nextModal.style.display = 'block';
}

// Ajouter un événement de clic pour ouvrir le nouveau modal lorsque le bouton est cliqué
addPhotoButton.addEventListener('click', openNextModal);
  
  
  
  
  
  