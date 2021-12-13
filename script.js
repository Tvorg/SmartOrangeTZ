let idx = 0;
const muid = () => idx++;


let users = [{
    name: "Саня",
    phone: "+38 (093) 22 33 456",
    id: muid(),
}, {
    name: "Степан",
    phone: "+38 (067) 92 30 056",
    id: muid(),
}, {
    name: "Игорь",
    phone: "+38 (068) 12 13 156",
    id: muid(),
}, {
    name: "Владимир",
    phone: "+38 (095) 52 83 498",
    id: muid(),
}, {
    name: "Анатолий",
    phone: "+38 (097) 33 44 756",
    id: muid(),
}];

function deleteUser(event) {
    const id = event.currentTarget.getAttribute("data-id"); // тип стринг, а в масиве тип намбер
    users = users.filter(item => item.id != id);
    syncUsersList()
}

function finishEditUser () {
    syncUsersList();
}

function editUser(event) {
    const id = event.currentTarget.getAttribute("data-id"); // тип стринг, а в масиве тип намбер
    const user = users.find((user) => user.id == id);
    const ulEl = document.querySelector(`#users_list li[data-id="${id}"]`);

    ulEl.removeChild(ulEl.querySelector('span')); // удаляем имя
    ulEl.removeChild(ulEl.querySelector('span')); // удаляем номер телефона
    const editEl = ulEl.querySelector('button');
    editEl.removeEventListener('click', editUser);
    editEl.innerText = 'Сохранить';
    editEl.addEventListener('click', finishEditUser);

    const nameInputEl = document.createElement('input');
    nameInputEl.value = user.name;
    nameInputEl.onchange = (e) => {
        user.name = e.currentTarget.value;
    };

    const phoneInputEl = document.createElement('input');
    phoneInputEl.value = user.phone;
    phoneInputEl.onchange = (e) => {
        user.phone = e.currentTarget.value;
    };

    ulEl.prepend(phoneInputEl);
    ulEl.prepend(nameInputEl);
}

function renderUser(user) {
   const rootEl = document.createElement("li");
   const nameEl = document.createElement("span");
   const phoneEl = document.createElement("span");
   const editEl = document.createElement("button");
   const deleteEl = document.createElement("button");


   //вносим данные в елементы
   nameEl.innerText = user.name;
   phoneEl.innerText = user.phone;
   editEl.innerText = "Редактировать";
   deleteEl.innerText = "Удалить";

   // Отмечаем элементы идентификатором
    rootEl.setAttribute("data-id", user.id);
    editEl.setAttribute("data-id", user.id);
    deleteEl.setAttribute("data-id", user.id);

   //Добавляем обработчики событий
    deleteEl.addEventListener('click', deleteUser);
    editEl.addEventListener('click', editUser);


   // добавляем элемнты в рутовый элемент
   rootEl.append(nameEl);
   rootEl.append(phoneEl);
   rootEl.append(editEl);
   rootEl.append(deleteEl);

   //Добавляем ли вверх рутового списка
    const listRootEl = document.querySelector("#users_list");
    listRootEl.prepend(rootEl);
}

function syncUsersList() {
    const listRootEl = document.querySelector("#users_list");
    // Удаление всех дочерних элементов
    while (listRootEl.firstChild) {
        listRootEl.removeChild(listRootEl.firstChild);
    }
     users.forEach(function (user){
        renderUser(user);
     })
}

const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    event.currentTarget.reset();

    users.push({name, phone, id: muid()});
    syncUsersList();
    };

window.onload = () => {
    syncUsersList();

    const form = document.getElementById('user_form');

    form.addEventListener('submit', submit);
}