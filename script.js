const body = document.querySelector('body');
const btnPlay = document.querySelector('#btnPlay');
const sectionGame = document.querySelector('.game');
const questions = document.querySelectorAll('.question');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.overlay__button');

// Variables
const answers = ['test1', 'test2', 'test3', 'test4', 'test5'];
const answerBox = [false, false, false, false];

const monitorPlayBtn = () => {
  btnPlay.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.remove('no-scroll');
    sectionGame.scrollIntoView();
  });
};

const monitorGame = () => {
  sectionGame.addEventListener('click', (e) => {
    const btn = e.target.closest('.game__btn');
    if (!btn) return;

    const btnIndex = Number(btn.getAttribute('data-index'));

    if (!btnIndex) return;

    if (btnIndex === 5 && (answerBox.length < 4 || answerBox.includes(false)))
      return;

    showOverlay(btnIndex);
  });
};

const showOverlay = (modalIndex) => {
  overlay.classList.remove('hidden');
  questions[--modalIndex].classList.remove('hidden');
};

const monitorClose = () => {
  [overlay, btnClose].forEach((element) => {
    element.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === btnClose) {
        overlay.classList.add('hidden');
        questions.forEach((q) => {
          q.querySelector('input').value = '';
          q.querySelector('input').classList.remove('invalid');
          q.classList.add('hidden');
        });
      }
    });
  });
};

const validateForm = (form, answer, callback) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = form.querySelector('input').value.trim().toLowerCase();

    if (value === answer) {
      callback(true);
      return;
    }

    callback(false);
  });

  form.addEventListener('input', () => {
    form
      .querySelectorAll('input')
      .forEach((ele) => e.classList.remove('invalid'));
  });
};

const monitorForm = () => {
  questions.forEach((q, i) => {
    const form = q.querySelector('form');
    validateForm(form, answers[i], (isValid) => {
      answerBox[i] = isValid;

      if (isValid) questions[i].classList.add('flip');

      if (!isValid)
        questions[i].querySelector('input').classList.add('invalid');
    });
  });
};

const init = () => {
  body.classList.add('no-scroll');
  monitorPlayBtn();
  monitorGame();
  monitorForm();
  monitorClose();
};

init();
