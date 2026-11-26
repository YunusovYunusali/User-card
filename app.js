import {users} from "./data.js";

const userswrapperEl = document.querySelector('.users-container');

function updateUi(arr){
  userswrapperEl.innerHTML = "";
    arr.forEach((item)=> {
        let {name,id,role,isActive,email}=item;
         const nameParts = name.trim().split(/\s+/);
    const initials = (
      (nameParts[0]?.[0] || '') + (nameParts[1]?.[0] || '')
    ).toUpperCase();

        userswrapperEl.innerHTML +=`
  <div class="user-card" data-id="${id}">
  <div class="user-card__actions">
    <button onclick= "UpdateUser(${id})" type="button" class="user-card__edit" aria-label="Edit ${name}">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>
      </svg>
    </button>



    <button onclick="deleteUser(${id})" type="button" class="user-card__delete" data-delete-id="${id}" aria-label="Delete ${name}">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        <line x1="10" x2="10" y1="11" y2="17"/>
        <line x1="14" x2="14" y1="11" y2="17"/>
      </svg>
    </button>


  </div>
  <div class="user-card__header">
    <div class="user-card__avatar">${initials}</div>

    <div class="user-card__info">
      <h3 class="user-card__name">${name}</h3>
      <p class="user-card__email">${email}</p>
    </div>
  </div>

  <div class="user-card__footer">
    <span class="user-card__role">${role}</span>
    <span class="user-card__status user-card__status--active"
      >${isActive ? "Faol" : "noFaol"}</span
    >
  </div>
</div>
        `
        
    });
   
}
 updateUi(users);


 const ModalEl =document.querySelector('.modal-overlay');
 const BtnEl =document.querySelector('.add-users');
 const CloseBtn=document.querySelector('.modal__close');
 
  BtnEl.addEventListener('click',()=>{
    editingUserId = null;
formEl.reset();

    ModalEl.classList.remove('hidden');
  })

  CloseBtn.addEventListener('click',()=>{
    ModalEl.classList.add('hidden');
  })
 document.addEventListener('keydown',(e)=>{
  if(e.key === 'Escape'){
     ModalEl.classList.add('hidden');
  }
 })
 ModalEl.addEventListener('click', (e) => {
  if (e.target === ModalEl) {
    ModalEl.classList.add('hidden');
    formEl.reset();
  }
});


const formEl=document.querySelector('.modal__form');
   let editingUserId = null;

  formEl.addEventListener('submit', (e)=>{
  e.preventDefault();

  let formData =new FormData(e.target);
  const name= formData.get('name').trim();
    const email= formData.get('email').trim();
    if(!name){
      alert('Ism va Familyani togri kiritng');
      document.querySelector('#userName').focus();
      formEl.reset();
      ModalEl.classList.add('hidden');
      return;
    }
//     const newUser = {
//   id: Math.max(...users.map(user => user.id), 0) + 1,
//   name,
//   email,
//   role: formData.get('role'),
//   isActive: formData.get('isActive') ? true : false,
// };

// users.push(newUser);
// updateUi([newUser]); // Yangi kartani ekranga chiqaradi
// formEl.reset();
// ModalEl.classList.add('hidden');
  let UserData ={
    id: editingUserId !== null
  ? editingUserId
  : Math.max(...users.map(user => user.id), 0) + 1,
    //  id: Math.max(...users.map(user => user.id), 0) + 1,
    // id:formData.get('id'),
    name:formData.get('name'),
    email:formData.get('email'),
    role: formData.get('role'),
    isActive:formData.get('isActive') ? true : false,
  };
  // users.push(UserData);
  if (editingUserId !== null) {
  const index = users.findIndex(item => item.id === editingUserId);
  users[index] = UserData;
  editingUserId = null;
} else {
  users.push(UserData);
}
  updateUi(users)
  console.log(UserData);
  formEl.reset();
  ModalEl.classList.add('hidden');

 })


 window.deleteUser = function(id){
  let findUser = users.findIndex((item)=> item.id == id);
  users.splice(findUser,1)
  updateUi(users)
 };


  window.UpdateUser = function(id){
  let findUser = users.findIndex((item)=> item.id == id);
  const user = users[findUser];
  if (!user) return;

  editingUserId = id;
  document.querySelector('#userName').value = user.name;
  document.querySelector('#userEmail').value = user.email;
  document.querySelector('#userRole').value = user.role;
  document.querySelector('#userIsActive').checked = user.isActive;
  ModalEl.classList.remove('hidden');
  // users.splice(findUser,1);
  // updateUi(users)

 };

 
 console.log(editingUserId);
 