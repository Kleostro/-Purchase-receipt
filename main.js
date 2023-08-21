// создать массивы
let productArr = ['Кофе', 'Молоко', 'Сахар'];
let countArr = [1, 3, 2];
let priceArr = [540, 120, 80];

// создать функцию для создания кнопки
const createButton = (text, className) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(className);
  return button;
}

// создать функцию для создания инпута
const createInput = (type, placeholder, className) => {
  const input = document.createElement('input');
  input.classList.add(className);
  input.type = type;
  input.placeholder = placeholder;
  return input;
}

// создать элемент списка
const createProductItem = (index, product, count, price) => {
  // создать элемент списка
  const listItem = document.createElement('li');
  listItem.classList.add('list-shopping__item');

  // создать порядковый номер
  const number = document.createElement('span');
  number.classList.add('index');
  number.textContent = index + 1;

  // создать блок наименования товара
  const nameBox = document.createElement('div');
  nameBox.classList.add('name-box');

  // создать подпись блока наименования товара
  const nameBoxTitle = document.createElement('span');
  nameBoxTitle.classList.add('name-box__title');
  nameBoxTitle.textContent = 'Название';

  // создать спан с наименованием товара
  const nameBoxSpan = document.createElement('span');
  nameBoxSpan.classList.add('name-box__text');
  nameBoxSpan.textContent = product;

  nameBox.append(nameBoxTitle, nameBoxSpan);

  // создать блок количества товара
  const countBox = document.createElement('div');
  countBox.classList.add('count-box');

  // создать подпись блока количества товара
  const countBoxTitle = document.createElement('span');
  countBoxTitle.classList.add('count-box__title');
  countBoxTitle.textContent = 'Кол-во';

  // создать спан с количеством товара
  const countBoxSpan = document.createElement('span');
  countBoxSpan.classList.add('count-box__text');
  countBoxSpan.textContent = count

  countBox.append(countBoxTitle, countBoxSpan);

  // создать блок ценой товара
  const priceBox = document.createElement('div');
  priceBox.classList.add('price-box');

  // создать подпись блока цены товара
  const priceBoxTitle = document.createElement('span');
  priceBoxTitle.classList.add('price-box__title');
  priceBoxTitle.textContent = 'Цена';

  // создать спан с ценой товара
  const priceBoxSpan = document.createElement('span');
  priceBoxSpan.classList.add('price-box__text');
  priceBoxSpan.textContent = `${price} руб`;

  priceBox.append(priceBoxTitle, priceBoxSpan);

  // создать блок с общей стоимостью товара
  const fullPriceBox = document.createElement('div');
  fullPriceBox.classList.add('full-price-box');

  // создать подпись блока с общей стоимостью товара
  const fullPriceBoxTitle = document.createElement('span');
  fullPriceBoxTitle.classList.add('full-price-box__title');
  fullPriceBoxTitle.textContent = 'Общая цена';

  // создать спан с общей стоимостью товара
  const fullPriceBoxSpan = document.createElement('span');
  fullPriceBoxSpan.classList.add('full-price-box__text');

  // посчитать общую стоимость товара
  fullPriceBoxSpan.textContent = `${count * price} руб`;

  fullPriceBox.append(fullPriceBoxTitle, fullPriceBoxSpan);

  // создать кнопку изменения данных товара
  const changeProductBtn = createButton('Изменить', 'change-btn');

  changeProductBtn.addEventListener('click', () => {
    let productValue = prompt('Введите название товара', product);
    let countValue = Number(prompt('Введите кол-во товара', count));
    let priceValue = Number(prompt('Введите цену товара', price));

    productArr[index] = productValue;
    countArr[index] = countValue;
    priceArr[index] = priceValue;

    // отрисовать список с обновленными данными
    render(productArr, countArr, priceArr)
  })

  // создать кнопку удаления данных товара
  const removeProductBtn = createButton('Удалить', 'remove-btn');

  removeProductBtn.addEventListener('click', () => {

    if (confirm(`Вы уверены, что хотите удалить товар "${product}"`)) {
      productArr.splice(index, 1);
      countArr.splice(index, 1);
      priceArr.splice(index, 1);
    }

    // отрисовать список с обновленными данными
    render(productArr, countArr, priceArr)
  })

  listItem.append(number, nameBox, countBox, priceBox, fullPriceBox, changeProductBtn, removeProductBtn);

  return listItem
}

// создать заголовок
const title = document.createElement('h1');
title.textContent = 'Чек покупки';
title.classList.add('title');

// создать блок для ввода
const inputsBox = document.createElement('div');
inputsBox.classList.add('inputs-wrapper');


// использование функций для создания инпутов и кнопок
const productInp = createInput('text', 'Название товара', 'input');
const countInp = createInput('number', 'Количество', 'input');
const priceInp = createInput('number', 'Цена', 'input');
const addBtn = createButton('Добавить', 'add-btn');

// создать список покупок
const listShopping = document.createElement('ul');
listShopping.classList.add('list-shopping');


// обработать клик по кнопке добавления товара
addBtn.addEventListener('click', () => {
  let productValue = productInp.value
  let countValue = Number(countInp.value);
  let priceValue = Number(priceInp.value);

  productArr.push(productValue);
  countArr.push(countValue);
  priceArr.push(priceValue);

  render(productArr, countArr, priceArr);

  productInp.value = '';
  countInp.value = '';
  priceInp.value = '';
})
inputsBox.append(productInp, countInp, priceInp, addBtn);

// Итоговая стоимость
const totalPriceBox = document.createElement('div');
totalPriceBox.classList.add('total-price-box');

const totalPriceTitle = document.createElement('span');
totalPriceTitle.classList.add('total-price-box__title');
totalPriceTitle.textContent = "Итоговая стоимость:"

const totalPriceValue = document.createElement("span");
totalPriceValue.classList.add("total-price-box__text");
totalPriceValue.textContent = "0 руб";

totalPriceBox.append(totalPriceTitle, totalPriceValue);

const render = (arrProduct, arrCount, arrPrice) => {
  listShopping.innerHTML = ''

  if (arrProduct.length === 0) {
    let notProducts = document.createElement('li');
    notProducts.classList.add("product-list__not-product");
    notProducts.textContent = "Товары не добавлены";

    listShopping.append(notProducts)

    totalPriceValue.textContent = `0 руб`;

    return
  }

  let totalPrice = 0 // счетчик итоговой стоимости

  for (let i = 0; i < arrProduct.length; i++) {
    let listItem = createProductItem(i, arrProduct[i], arrCount[i], arrPrice[i]);

    listShopping.append(listItem);

    totalPrice = totalPrice + (arrCount[i] * arrPrice[i])
  }

  totalPriceValue.textContent = `${totalPrice} руб`;
}
render(productArr, countArr, priceArr)

document.body.append(title, inputsBox, listShopping, totalPriceBox)
