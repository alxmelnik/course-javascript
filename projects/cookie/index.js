/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// const removeButton = homeworkContainer.querySelectorAll('.remove-btn');
const list = homeworkContainer.querySelector('.list');
// const items = homeworkContainer.querySelectorAll('.item');

// куки в map()
const cookies = document.cookie
  .split('; ')
  .filter(Boolean)
  .reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev.set(name, value);

    return prev;
  }, new Map());

// console.log(cookies);

let filter = '';

drawTable();

filterNameInput.addEventListener('input', function () {
  filter = filterNameInput.value;

  // console.log(filterNameInput.value);

  drawTable();
});

addButton.addEventListener('click', () => {
  if (addNameInput.value === false || addValueInput.value === false) {
    return;
  }

  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  cookies.set(addNameInput.value, addValueInput.value);

  drawTable();

  addNameInput.value = '';
  addValueInput.value = '';
});

listTable.addEventListener('click', (e) => {
  const role = e.target.dataset.role;
  const cookieName = e.target.dataset.cookieName;

  if (role === 'remove-cookie') {
    cookies.delete(cookieName);
    document.cookie = `${cookieName}=deleted; max-age=0`;
    drawTable();
  }
});

// // удалить строку
// removeButton.forEach(function (btn, i) {
//   btn.addEventListener('click', function () {
//     items[i].remove();
//   });
// });

// нарисовать таблицу

function drawTable() {
  const fragment = document.createDocumentFragment();

  list.innerHTML = '';

  for (const [name, value] of cookies) {
    // console.log(filter)

    if (filter && !name.includes(filter) && !value.includes(filter)) {
      continue;
    }

    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    const valueTd = document.createElement('td');
    const removeTd = document.createElement('td');
    const removeBtn = document.createElement('button');

    tr.classList.add('item');

    nameTd.classList.add('name');
    nameTd.textContent = name;

    valueTd.classList.add('value');
    valueTd.textContent = value;

    removeBtn.dataset.role = 'remove-cookie';
    removeBtn.dataset.cookieName = name;
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Удалить';

    tr.appendChild(nameTd);
    tr.appendChild(valueTd);
    tr.appendChild(removeTd);

    removeTd.appendChild(removeBtn);

    fragment.appendChild(tr);

    list.appendChild(fragment);
  }
}
