// Select elements
const form = document.querySelector('form');
const input = document.getElementById('item');
const btn = document.getElementById('addToDo');
const clearBtn = document.getElementById('clearStorage');
const ul = document.querySelector('.taskList');
const displayDate = document.getElementById('dateText');

// Create Today's Date 
const dateObj = new Date();
const day = dateObj.getDate();
const month = dateObj.toLocaleString("default", { month: "long" });
const year = dateObj.getFullYear();

// Add st, nd and rd to date
const nthNumber = (number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Display Date
const todayDate = `${day}${nthNumber(day)} ${month} ${year}`;
displayDate.innerText = `Today's Date is: ${todayDate}`;

function darklight() {
  var bg = document.body;
  bg.classList.toggle("dark-mode");

  var heading = document.querySelector('.heading');
  heading.classList.toggle("dark-mode");

  var subheading = document.querySelector('.subheading');
  subheading.classList.toggle("dark-mode");

  var box = document.getElementById('newTask');
  box.classList.toggle("darkmodebox");

  var inputbox = document.querySelector('input');
  inputbox.classList.toggle("darkmodebox");

  var ulbox = document.querySelector('ul');
  ulbox.classList.toggle("darkmodebox");

  var x = document.getElementById("toggle");
  if (x.innerHTML === '<i class="fa-solid fa-moon"></i>') {
    x.innerHTML = '<i class="fa-solid fa-sun"></i>';
    x.style.backgroundColor = 'ghostwhite';
    x.style.color = 'dimgray';
  } else {
    x.innerHTML = '<i class="fa-solid fa-moon"></i>';
    x.style.backgroundColor = 'dimgray';
    x.style.color = 'ghostwhite';
  };
};

// Check if any items are in local storage
let itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

// Add item (input task) to list
const taskList = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('todo-item');
  ul.appendChild(li);

  // Create Done/Completed button
  const doneBtn = document.createElement('button');
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
  doneBtn.classList.add('checked');
  li.prepend(doneBtn);
  doneBtn.addEventListener('click', function() {
    li.classList.toggle("completed");
  });
};

// Event Listener
btn.addEventListener('click', addToDo);


function addToDo() {
  if (input.value == '') {
    // test if input has a value
    alert('Please enter a value');
  } else { 
  // Push item to local storage
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));

  // Clear Input value
  taskList(input.value);
  input.value = '';
  }
};

data.forEach((item) => {
  taskList(item)
});

clearBtn.addEventListener('click', function () {
  localStorage.clear()
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
});


