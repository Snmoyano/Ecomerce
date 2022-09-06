import { products } from "./src/js/data.js";
const conteinerStore=document.querySelector(".conteiner__store")
const asideCartBody=document.querySelector(".aside__cart-body")

let cart={}

let html=``
products.forEach(({id,nombre,precio,imagen,stock})=>{
    html+=`
            <div class="conteiner__store__card">
                <div class="conteiner__store__card-img">
                    <img src="${imagen}" alt="${nombre}">
                </div>
                <div class="conteiner__store__card-body" id="${id}">
                    <h3>${nombre}</h3>
                    <p>$${precio}</p>
                    <p>Stock:${stock}</p>
                    <button class="btn__add">AGREGAR</button>
                </div>
            </div>
            `
})
conteinerStore.innerHTML=html


const iconCart=document.querySelector("#iconCart")
const contentCart=document.querySelector("#contentCart")

iconCart.addEventListener("click",(e)=>{
    contentCart.classList.toggle("aside__cart-show")
})

function printProductsInCart() {
    let html=``
    const total=document.querySelector("#total")
    const productsTotal=document.querySelector("#productsTotal")
    let contCart=0;
    let sumTotal=0;
    const arrayCart=Object.values(cart)
    arrayCart.forEach(({id,nombre,imagen,amount,precio})=>{
    html+=`
            <div class="item__cart">
                <div class="item__cart-img">
                    <img src="${imagen}" alt="${nombre}">
                </div>
                <h4 class="item__cart-tittle">${nombre}</h4>
                <div class="item__cart-options" id="${id}">
                    <i class='bx bxs-message-square-minus'></i>
                    <span id="amount">${amount}</span>
                    <i class='bx bxs-message-square-add'></i>
                    <i class='bx bxs-trash-alt'></i>
                </div>

            </div>
        `
        contCart+=amount
        sumTotal+=amount*precio 
    })
    asideCartBody.innerHTML=html;
    total.textContent=sumTotal;
    productsTotal.textContent=contCart
}

conteinerStore.addEventListener("click",(e)=>{
    if (e.target.classList.contains("btn__add")) {
        const idProduct=+e.target.parentElement.id
        const findProduct=products.find((item)=>item.id===idProduct);
        if (cart[idProduct] && cart[idProduct].amount<cart[idProduct].stock) {
            cart[idProduct].amount++;

        } else if (!cart[idProduct]) {
            cart[idProduct]=findProduct
            cart[idProduct].amount=1;
        }
        printProductsInCart()
    };

})

asideCartBody.addEventListener("click",(e)=>{
    if (e.target.classList.contains("bxs-message-square-minus")) {
        const idProduct=+e.target.parentElement.id;
        if (cart[idProduct].amount>1) {
            cart[idProduct].amount--; 
        }
        
    }
    if (e.target.classList.contains("bxs-message-square-add")) {
        const idProduct=+e.target.parentElement.id;
        if (cart[idProduct].amount<cart[idProduct].stock) {
            cart[idProduct].amount++; 
        }
        
    }
    if (e.target.classList.contains("bxs-trash-alt")) {
        const idProduct=+e.target.parentElement.id;
        delete cart[idProduct];
    }
    printProductsInCart()
})
