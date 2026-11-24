import {students} from "./data.js";

const userswrapperEl = document.querySelector('.users-container');


function updateUi(arr){
    arr.forEach((item)=> {
        const {fullName, id, age, course, grade, isGraduated} = item;
        const nameParts = fullName.trim().split(/\s+/);
        const initials = (
          (nameParts[0]?.[0] || '') + (nameParts[1]?.[0] || '')
        ).toUpperCase();

        userswrapperEl.innerHTML +=`
         <div class="user-card" data-id="${id}">
            <div class="user-card__header">
              <div class="user-card__avatar">${initials}</div>
              <div class="user-card__info">
                <h3 class="user-card__name">${fullName}</h3>
                <p class="user-card__email">${course}</p>
              </div>
            </div>

            <div class="user-card__footer">
              <span class="user-card__role">${age} yosh · Ball: ${grade}</span>
              <span class="user-card__status user-card__status--${isGraduated ? "active" : "inactive"}"
                >${isGraduated ? "Bitirgan" : "O'qiyapti"}</span
              >
            </div>
          </div>
        `
        
    });
   
}
 updateUi(students);

const modalEl = document.querySelector('.modal-overlay');
const addStudentButton = document.querySelector('.add-users');
const closeButton = document.querySelector('.modal__close');
const formEl = document.querySelector('.modal__form');

function closeModal() {
    modalEl.classList.add('hidden');
}

addStudentButton.addEventListener('click', () => {
    modalEl.classList.remove('hidden');
});

closeButton.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

modalEl.addEventListener('click', (event) => {
    if (event.target === modalEl) {
        closeModal();
    }
});

formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const fullName = String(formData.get('fullName') || '').trim();
    const course = String(formData.get('course') || '').trim();

    if (!fullName) {
        alert('Ism va familiyani kiriting.');
        document.querySelector('#studentFullName').focus();
        return;
    }

    if (!course) {
        alert('Kurs nomini kiriting.');
        document.querySelector('#studentCourse').focus();
        return;
    }
let UserStudent={
     id: Math.max(...students.map(student => student.id), 0) + 1,
    // id: formData.get('id'),
    fullName:formData.get('fullName'),
    age:formData.get('age'),
    course:formData.get('course'),
    grade:formData.get('grade'),
    isGraduated:formData.get('isGraduated') ? 'Bitirgan' :`O'qiyapti`,

};
   
   console.log(UserStudent);
   
    formEl.reset();
    closeModal();
});
