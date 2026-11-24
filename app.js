import {users} from "./data.js";

const userswrapperEl = document.querySelector('.users-container');

function updateUi(arr){
    arr.forEach((item)=> {
        let {name,id,role,isActive,email}=item;
         const nameParts = name.trim().split(/\s+/);
    const initials = (
      (nameParts[0]?.[0] || '') + (nameParts[1]?.[0] || '')
    ).toUpperCase();

        userswrapperEl.innerHTML +=`
         <div class="user-card">
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
                >${ isActive ? "Faol" : "noFaol"}</span
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

  formEl.addEventListener('submit', (e)=>{
  e.preventDefault();

  let formData =new FormData(e.target);
  const name= formData.get('name').trim();
    const email= formData.get('email').trim();
    if(!name){
      alert('Ism va Familyani togri kiritng');
      document.querySelector('#userName').focus();
      formEl.reset();
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
     id: Math.max(...users.map(user => user.id), 0) + 1,
    // id:formData.get('id'),
    name:formData.get('name'),
    email:formData.get('email'),
    role: formData.get('role'),
    isActive:formData.get('isActive') ? true : false,
  };
  console.log(UserData);
  formEl.reset();

 })
