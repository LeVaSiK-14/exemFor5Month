const ENDPOINT = 'http://localhost:1717';
const listOfPastry = document.querySelector('.list_of_pastrys');
const cartCountHtml = document.querySelector('.cart__count');
const cartList = document.querySelector('.cart__list');



const cartBtn = document.querySelector('.cart');
const modalCart = document.querySelector('.modal-cart');
const closeModalCartBtn = document.querySelector('.cross');

const burgerBtn = document.querySelector('.burger');
const modalBurger = document.querySelector('.modal-burger');
const closeModalBurgerBtn = document.querySelector('.cross-black');

let cart = [];
let cartCount = 0;
let allPriceCart = 0;
cartCountHtml.textContent = cartCount;

const getData = async(route) => {
    const data = await fetch(`${ENDPOINT}/${route}`);
    return await data.json();
};

const createElement = (tag, className, text, innerHTML) => {
    const element = document.createElement(tag);
    if(className) element.className = className;
    if(text) element.textContent = text;
    if(innerHTML) element.innerHTML += innerHTML;
    return element;
};

const renderItems = (items) => {
    listOfPastry.innerHTML = '';
    items.forEach(element => {
        const itemContainer = createElement('div', 'item');
        const itemDivImg = createElement('div', 'item-div-img');
        const itemInStock = element.inStock > 0 ? "good" : "bad";
        const itemInStockText = element.inStock > 0 ? "Add to cart" : "Not avaliable";
        const itemName = createElement('h4', 'item-name', element.name);
        const itemImage = createElement('img', 'item-img');
        itemImage.setAttribute("src", element.image);
        const itemIngredients = createElement('p', 'item-ingredients', (element.ingredients).join(', '));
        const itemCost = createElement('p', 'item-cost', `$${element.cost}`);

        const itemBtn = createElement('button', `item-addBtn ${itemInStock}`, `${itemInStockText}`);
        itemBtn.setAttribute('id', element.id);
        element.inStock > 0 ? itemBtn.disabled = false : itemBtn.disabled = true;
        
        itemDivImg.append(itemImage);
        itemContainer.append(itemDivImg, itemName, itemIngredients, itemCost, itemBtn);
        

        itemBtn.addEventListener('click', () => {
            const idItem = itemBtn.getAttribute('id');
            items.find((elem) => {
                if(elem.id === idItem){
                    if(cart.includes(elem)){
                        let c = elem.count;
                        elem.count = c + 1;
                        cartCount += 1;
                        cartCountHtml.textContent = cartCount;
                        allPriceCart = allPriceCart + elem.cost;
                    }else{
                        elem.count = 1;
                        cart.push(elem);
                        cartCount += 1;
                        cartCountHtml.textContent = cartCount;
                        allPriceCart = allPriceCart + elem.cost;
                    };
                };
            });
            renderCart();
        });
        listOfPastry.append(itemContainer);
    });
};


const renderCart = () => {
    cartList.innerHTML = '';
    cart.forEach((element) => {
        const cartItemContainer = createElement('div', 'cart_item__container');
        const cartItemName = createElement('h4', 'cart_item__name', element.name);
        const cartItemCount = createElement('p', 'cart_item__count', `${element.count} items`);
        const cartItemCost = createElement('p', 'cart_item__cost', `$ ${element.cost}`);
        
        
        cartItemContainer.append(cartItemName, cartItemCount, cartItemCost);
        cartList.append(cartItemContainer);
    });
    if(cart.length > 0){
        const hR = createElement('hr', 'cart_hr');
        const cartLeftCost = createElement('h4', 'cart_left__cost', `Total:`);
        const cartRightCost = createElement('h4', 'cart_right__cost', `$ ${(Math.round((allPriceCart)*100)/100)}`);
        const cartAllCost = createElement('div', 'cart_all__cost');
        cartAllCost.append(cartLeftCost, cartRightCost)
        cartList.append(hR, cartAllCost);
    }else{
        const cartIsEmpty = createElement('p', 'cart_isEmpty', 'Cart is empty');
        cartList.append(cartIsEmpty);
    }
    
};
renderCart();

function toggleModalCart() {
	modalCart.classList.toggle("show-modal");
};

function toggleModalBurger() {
	modalBurger.classList.toggle("show-modal-burger");
};


cartBtn.addEventListener('click', toggleModalCart);
closeModalCartBtn.addEventListener('click', toggleModalCart);

burgerBtn.addEventListener('click', toggleModalBurger);
closeModalBurgerBtn.addEventListener('click', toggleModalBurger);


getData('pastry').then(renderItems);