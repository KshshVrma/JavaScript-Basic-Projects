let firstTimeClick = true;
let tasks = 0;
let completed = 0;

//selectors of the dom nodes even in the dosument manipulation in this project

let uiNodes = {
  mainItem: 'main',
  presentation: '.presentation',
  topHeading: '.top__section__heading',
  topInput: '.top__section__input',
  inputButton: '.input__type__button',
  parentList: 'ul',
  mainHeader: '.main__header',
  mainHeaderCompleted: '.completed',
  ballon: '.ballon',
};

//function responsible for readin input value text
let readInputValue = () => document.querySelector(uiNodes.topInput).value;

//function responsible for formatting header text
let updateTaskMessage = () => {
  document.querySelector(uiNodes.mainHeader).textContent = `${
    tasks > 0 ? tasks : 'No'
  } task${tasks <= 1 ? '' : 's'} recorded`;
  document.querySelector(uiNodes.mainHeaderCompleted).textContent = `${
    completed > 0 ? completed : 'No'
  }  task${completed <= 1 ? '' : 's'} completed`;
};

//function responsible for addition of new task
let addNewTaskInterface = (task) => {
  let listSnippet = `<li class="main__list__item">
  ${task}
  <div class="btn-wrapper">
    <button class="button-marker check">
      <i class="fas fa-check"></i>
    </button>
    <button class="button-marker button-marker--modified">
      <i class="fas fa-times"></i>
    </button>
  </div>
</li>`;
  document
    .querySelector(uiNodes.parentList)
    .insertAdjacentHTML('beforeend', listSnippet);
};

//function responsible for updating task number
let updateTasks = () => {
  tasks++;
};

//function responsible for clearing input field
let clearInput = () => {
  document.querySelector(uiNodes.topInput).value = '';
};

//event listener for trigerring animation and handlin button input
document.querySelector(uiNodes.inputButton).addEventListener('click', (e) => {
  if (firstTimeClick) {
    Array.from(
      document.querySelectorAll(
        `${uiNodes.mainItem},${uiNodes.presentation},${uiNodes.topHeading},${uiNodes.topInput}`
      )
    ).forEach((e) => {
      e.style.animationPlayState = 'running';
    });
    firstTimeClick = false;
    updateTaskMessage();
  }
  let input = readInputValue();
  if (input) {
    addNewTaskInterface(input);
    updateTasks();
    updateTaskMessage();
    clearInput();
  }
});

let date = () => {
  let months = [
    ' January',
    ' February',
    'March',
    ' April',
    'May',
    ' June',
    'July',
    ' August',
    ' September',
    '  October',
    'November',
    ' December',
  ];
  let daysWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let currentDate = new Date();
  console.log(currentDate.getUTCDate());
  let htmlSnippet = `<h2 class="top__section__heading">${
    daysWeek[currentDate.getDay() - 1]
  },${currentDate.getUTCDate()}th ${months[currentDate.getUTCMonth()]}</h2>`;
  console.log(htmlSnippet);
  document
    .querySelector('.top__section')
    .insertAdjacentHTML('afterbegin', htmlSnippet);
};
date();
//event listener for completing and deleting tasks

document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.closest('.check')) {
    document
      .querySelector('.check')
      .parentNode.parentNode.parentNode.removeChild(
        document.querySelector('.check').parentNode.parentNode
      );
    completed += 1;
    tasks -= 1;
    updateTaskMessage();
  } else if (e.target.closest('.button-marker--modified')) {
    document
      .querySelector('.button-marker--modified')
      .parentNode.parentNode.parentNode.removeChild(
        document.querySelector('.button-marker--modified').parentNode.parentNode
      );
    tasks -= 1;
    updateTaskMessage();
  }
});
