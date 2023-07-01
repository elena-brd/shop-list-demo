const formInput = document.getElementById('form-input');
const itemInput = document.getElementById('item-input');
const listItems = document.getElementById('list-items');
const filter = document.querySelector('.filter');


const clearBtn = document.getElementById('clear');


function controlFlowFormInput(e) {
    e.preventDefault();

    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please add an item');
        return;
    }
    createItem(newItem);
    // add item to local storage
    addItemToLocalStorage(newItem);
    // reset input
    itemInput.value = '';
}

// new item
function createItem(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    // add to the DOM
    const button = createButton('remove-items btn-remove red-color');
    li.appendChild(button)
    listItems.appendChild(li)
}

// create button
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    const i = createIcon('fa-solid fa-xmark');
    button.appendChild(i);
    return button;
}

// create icon
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// remove all items
function removeAllItems() {
    listItems.innerHTML = '';
    resetUI();
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-items')) {
        confirm('Are you sure?')
        e.target.parentElement.parentElement.remove()
        resetUI();
    }
}


function resetUI() {
    const items = document.querySelectorAll('li')

    if (items.length === 0) {
        clearBtn.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
    }
}

function searchItems(e) {
    const li = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    li.forEach((item => {
        const itemValue = item.firstChild.textContent.toLowerCase()
        if (itemValue.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    }))
}



formInput.addEventListener('submit', controlFlowFormInput);
listItems.addEventListener('click', removeItem);
filter.addEventListener('input', searchItems);
clearBtn.addEventListener('click', removeAllItems);

resetUI();
