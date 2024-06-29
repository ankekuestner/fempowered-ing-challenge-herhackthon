
const progress = (value) => {
   document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
}

let steps = document.getElementsByClassName('step');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let submitBtn = document.getElementById('submit-btn');
let form = document.getElementsByTagName('form')[0];
let preloader = document.getElementById('preloader-wrapper');
let bodyElement = document.querySelector('body');
let successDiv = document.getElementById('success');

form.onsubmit = () => false;

let current_step = 0;
const stepCount = steps.length - 1;

const updateStep = () => {
   for (let i = 0; i <= stepCount; i++) {
       steps[i].classList.toggle('d-block', i === current_step);
       steps[i].classList.toggle('d-none', i !== current_step);
   }
   prevBtn.classList.toggle('d-none', current_step === 0);
   nextBtn.classList.toggle('d-none', current_step === stepCount);
   submitBtn.classList.toggle('d-none', current_step !== stepCount);
   progress((100 / stepCount) * current_step);
};

nextBtn.addEventListener('click', () => {
   if (current_step < stepCount) {
       current_step++;
       updateStep();
   }
});

prevBtn.addEventListener('click', () => {
   if (current_step > 0) {
       current_step--;
       updateStep();
   }
});

submitBtn.addEventListener('click', () => {
   preloader.classList.add('d-block');

   const timer = ms => new Promise(res => setTimeout(res, ms));

   timer(3000)
       .then(() => {
           bodyElement.classList.add('loaded');
       })
       .then(() => {
           updateStep(); // Hide the last step
           successDiv.classList.remove('d-none');
           successDiv.classList.add('d-block');
           preloader.classList.remove('d-block'); // Hide the preloader after submission
       });
});

// Initial setup
updateStep();
