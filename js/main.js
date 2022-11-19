//variables

let allcontainercart = document.querySelector(".products");
let containerBuycart = document.querySelector(".card-items");
let pricetotal = document.querySelector(".price-total");
let amountproduct = document.querySelector (".count-product");

let buyThings = [];
let totalcard = 0;
let countproduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allcontainercart.addEventListener("click" , addProduct);

    containerBuycart.addEventListener("click", deleteproduct);
}

function addProduct(e) {
    e.preventDefault();

    if(e.target.classList.contains('btn-add-cart')){
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    }
}

function deleteproduct(e){
    if(e.target.classList.contains('delete-product')){
        const deleteId = e.target.getAttribute("data-id");

        buyThings.forEach(value => {
            if( value.id == deleteId){
                let pricereduce = parseFloat(value.price) * parseFloat(value.amount);
                totalcard = totalcard - pricereduce; 
                totalcard = totalcard.toFixed (2);
            }
        })
        buyThings = buyThings.filter(product => product.id !==deleteId);
        
        countproduct--;
        if (buyThings.length === 0){
            pricetotal.innerHTML = 0;
            amountproduct.innerHTML = 0;
        }

    loadHtml();
    }
}


function readTheContent(product){
    const infoProduct = {
        Image: product.querySelector(' div img').src,
        title: product.querySelector(".title").textContent,
        price: product.querySelector(" div p span").textContent,
        id: product.querySelector("a").getAttribute('data-id'),
        amount:1
    }

    totalcard = parseFloat(totalcard) + parseFloat(infoProduct.price);
    totalcard = totalcard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id ===infoProduct.id){
                product.amount++;
                return product;
            }else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countproduct++;
    }

    loadHtml();
}

function loadHtml(){
    clearhtml();
    buyThings.forEach(product => {
        const{Image, title , price, amount, id} = product;
        const row = document.createElement("div");
        row.classList.add("item");
        row.innerHTML =
        `<img src="${Image}" alt="">
                        <div class="item-content">
                            <h5>${title}</h5>
                            <h5 class="cart-price">${price}</h5>
                            <h6>${amount}</h6>
                        </div>
                        <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuycart.appendChild(row);

        pricetotal.innerHTML = totalcard;

        amountproduct.innerHTML = countproduct;
    });
}
function clearhtml(){    
    containerBuycart.innerHTML = '';
}
