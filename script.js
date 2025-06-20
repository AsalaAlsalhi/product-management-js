// DOM Elements
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// Mode and temporary index for update
let mood = 'create';
let tmp;

// Data Array
let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

// Get Total Price
function getTotal() {
  if (price.value !== '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = 'Total';
    total.style.background = '#ba1334';
  }
}

// Clear Form Inputs
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// Show Data in Table
function showData() {
  getTotal();
  let table = '';
  dataPro.forEach((item, i) => {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.taxes}</td>
        <td>${item.ads}</td>
        <td>${item.discount}</td>
        <td>${item.total}</td>
        <td>${item.category}</td>
        <td><button onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deleteData(${i})">Delete</button></td>
      </tr>
    `;
  });
  document.getElementById('tbody').innerHTML = table;

  let deleteAllBtn = document.getElementById('deleteAll');
  deleteAllBtn.innerHTML = dataPro.length ? `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>` : '';
}

// Create or Update Product
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: +count.value,
    category: category.value.toLowerCase(),
  };

  if (!title.value || !price.value || !category.value) {
    alert('Title, Price, and Category are required.');
    return;
  }
  if (newPro.count > 100) {
    alert('Count must be 100 or less.');
    return;
  }

  if (mood === 'create') {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) dataPro.push(newPro);
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
  }

  clearData();
  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
};

// Delete Single Product
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
}

// Delete All Products
function deleteAll() {
  localStorage.clear();
  dataPro = [];
  showData();
}

// Update Product
function updateData(i) {
  let item = dataPro[i];
  title.value = item.title;
  price.value = item.price;
  taxes.value = item.taxes;
  ads.value = item.ads;
  discount.value = item.discount;
  category.value = item.category;
  getTotal();
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({ top: 0, behavior: 'smooth' });
}

// Search
let searchMood = 'title';

function getSearchMood(id) {
  let search = document.getElementById('search');
  searchMood = id === 'searchTitle' ? 'title' : 'category';
  search.placeholder = `Search by ${searchMood}`;
  search.value = '';
  search.focus();
  showData();
}

function searchData(value) {
  let table = '';
  dataPro.forEach((item, i) => {
    if (item[searchMood].includes(value.toLowerCase())) {
      table += `
        <tr>
          <td>${i}</td>
          <td>${item.title}</td>
          <td>${item.price}</td>
          <td>${item.taxes}</td>
          <td>${item.ads}</td>
          <td>${item.discount}</td>
          <td>${item.total}</td>
          <td>${item.category}</td>
          <td><button onclick="updateData(${i})">Update</button></td>
          <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
      `;
    }
  });
  document.getElementById('tbody').innerHTML = table;
}

// Initial render
showData();