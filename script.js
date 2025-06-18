let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

console.log(title,price,taxes,ads,discount,total,count,category,submit)

//get total
function getTotal(){
    
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background ='#a00d02';
    }else {
        total.innerHTMLHTML='';
        total.style.background ='#a00d02';
    }

}

//create  product 
let dataPro;

if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro =[];
}

submit.onclick = function(){
    let newPro= {
        title:title.value,
        price:price.value,
        taxex:taxex.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,

        
    }
    dataPro.push(newPro)
    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(newPro)
}

//clear 

function clearData(){
        title.value='';
        price.value='';
        taxex.value='';
        ads.value='';
        discount.value ='';
        total.innerHTML='';
        Count.value='';
        category.value='';
}

// read
function showData(){
    let table='';
    for(let i=0; i< dataPro.length;i++){
        table = dataPro[i];
        console.log(table)
    }

    document.getElementById('tbody').innerHTML = table;
}
showData()

//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
