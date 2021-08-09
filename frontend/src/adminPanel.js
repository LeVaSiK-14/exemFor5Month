const ENDPOINT = 'http://localhost:1717';
const adminList = document.querySelector('.admin__list');

const burgerBtn = document.querySelector('.burger2');
const modalBurger = document.querySelector('.modal-burger2');
const closeModalBurgerBtn = document.querySelector('.cross-black');

const addItemBtn = document.querySelector('.add_pastry');
const modalAddItem = document.querySelector('.modal__add_item');


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
	adminList.innerHTML = '';
	items.forEach(element => {
		const admItemContainer = createElement('div', 'admin_item__container');

		const admName = createElement('div', 'admName');
		const admNameText = createElement('p', 'admNameText', element.name);
		const admNamePen = createElement('img', 'admNamePen');
		admNamePen.setAttribute('src', '../img/pen.svg');
		admNamePen.setAttribute('id', element.id);
		admName.append(admNameText, admNamePen);

		const admPrice = createElement('div', 'admPrice');
		const admPriceText = createElement('p', 'admPriceText', `price:`);
		const admPricePrice = createElement('p', 'admPricePrice', `$ ${element.cost}`);
		const admPricePen = createElement('img', 'admPricePen');
		admPricePen.setAttribute('src', '../img/pen.svg');
		admPricePen.setAttribute('id', element.id);
		admPrice.append(admPriceText, admPricePrice, admPricePen);

		const admStock = createElement('div', 'admStock');
		const admStockText = createElement('p', 'admStockText', `in stock:`);
		const admStockMinus = createElement('img', 'admStockMinus');
		admStockMinus.setAttribute('src', '../img/minus.svg');
		admStockMinus.setAttribute('id', element.id);
		const admStockStock = createElement('p', 'admStockStock', `${element.inStock}`);
		const admStockPlus = createElement('img', 'admStockPlus');
		admStockPlus.setAttribute('src', '../img/plus.svg');
		admStockPlus.setAttribute('id', element.id);
		admStock.append(admStockText, admStockMinus, admStockStock, admStockPlus);

		const admDelete = createElement('img', 'admDelete');
		admDelete.setAttribute('src', '../img/backet.svg');
		admDelete.setAttribute('id', element.id);

		admItemContainer.append(admName, admPrice, admStock, admDelete);

		admDelete.addEventListener('click', async () => {
			let id = element.id
			await fetch(`${ENDPOINT}/pastry/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json' 
				},
				body: JSON.stringify({id})
			})
			.then(res => res.json())
			getData('pastry').then(renderItems);
		});

		admStockPlus.addEventListener('click', async() => {
			let id = element.id;
			let elemStock = element.inStock += 1;
			const elemObj = {
				inStock: elemStock,
			};
			await fetch(`${ENDPOINT}/pastry/update/${id}`, {
				method: "PUT",
				headers: {
					'Content-type': 'application/json' 
				},
				body: JSON.stringify(elemObj),
			});
		});

		admStockMinus.addEventListener('click', async() => {
			let id = element.id;
			let elemStock = element.inStock -= 1;
			const elemObj = {
				inStock: elemStock,
			};
			await fetch(`${ENDPOINT}/pastry/update/${id}`, {
				method: "PUT",
				headers: {
					'Content-type': 'application/json' 
				},
				body: JSON.stringify(elemObj),
			});
		});

		admPricePen.addEventListener('click', async() => {
			admPrice.remove();
			const updAdmPrice = createElement('div', 'updAdmPrice');
			const inputPrice = createElement('input', 'inputPrice');
			inputPrice.setAttribute('value', element.cost);
			const checkPrice = createElement('img', 'checkPrice');
			checkPrice.setAttribute('src', '../img/check.svg');
			updAdmPrice.append(inputPrice, checkPrice);
			admItemContainer.insertBefore(updAdmPrice, admStock);

			checkPrice.addEventListener('click', async () => {
				let id = element.id;
				const elemObj = {
					cost: Number(inputPrice.value),
				};

				await fetch(`${ENDPOINT}/pastry/update/${id}`, {
					method: "PUT",
					headers: {
						'Content-type': 'application/json' 
					},
					body: JSON.stringify(elemObj),
				});
				updAdmPrice.remove();
				const admPrice = createElement('div', 'admPrice');
				const admPriceText = createElement('p', 'admPriceText', `price:`);
				const admPricePrice = createElement('p', 'admPricePrice', `$ ${element.cost}`);
				const admPricePen = createElement('img', 'admPricePen');
				admPricePen.setAttribute('src', '../img/pen.svg');
				admPricePen.setAttribute('id', element.id);
				admPrice.append(admPriceText, admPricePrice, admPricePen);
				admItemContainer.insertBefore(admPrice, admStock);
			});
		});

		admNamePen.addEventListener('click', async() => {
			admName.remove();
			const updAdmName = createElement('div', 'updAdmName');
			const inputName = createElement('input', 'inputName');
			inputName.setAttribute('value', element.name);
			const checkName = createElement('img', 'checkName');
			checkName.setAttribute('src', '../img/check.svg');
			updAdmName.append(inputName, checkName);
			admItemContainer.insertBefore(updAdmName, admPrice);

			checkName.addEventListener('click', async () => {
				let id = element.id;
				const elemObj = {
					name: inputName.value,
				};

				await fetch(`${ENDPOINT}/pastry/update/${id}`, {
					method: "PUT",
					headers: {
						'Content-type': 'application/json' 
					},
					body: JSON.stringify(elemObj),
				});
				updAdmName.remove();
				const admName = createElement('div', 'admName');
				const admNameText = createElement('p', 'admNameText', element.name);
				const admNamePen = createElement('img', 'admNamePen');
				admNamePen.setAttribute('src', '../img/pen.svg');
				admNamePen.setAttribute('id', element.id);
				admName.append(admNameText, admNamePen);
				admItemContainer.insertBefore(admName, admPrice);
			});
		});

		adminList.append(admItemContainer);
	});
};


function toggleModalBurgers() {
	modalBurger.classList.toggle("show-modal-burger");
};

burgerBtn.addEventListener('click', toggleModalBurgers);
closeModalBurgerBtn.addEventListener('click', toggleModalBurgers);

getData('pastry').then(renderItems);


const renderAddModal = () => {
	modalAddItem.classList.toggle('modal__visible_item');
};

addItemBtn.addEventListener('click', () => {
	renderAddModal();
	createNewItem()
} );

function windowOnClickModal(event) {
    if(event.target === modalAddItem){
        renderAddModal();
    };
};

window.addEventListener("click", windowOnClickModal);

const createNewItem = async() => {
	const createItemBtn = document.querySelector('.form_send');

	const inputName = document.querySelector('.name-input');
	const inputImage = document.querySelector('.image-input');
	const inputInStock = document.querySelector('.inStock-input');
	const inputIngredients = document.querySelector('.ingredients-input');
	const inputCost = document.querySelector('.cost-input');

	const nameError = document.querySelector('.nameError');
	const imageError = document.querySelector('.imageError');
	const inStockError = document.querySelector('.inStockError');
	const ingredientsError = document.querySelector('.ingredientsError');
	const costError = document.querySelector('.costError');


	createItemBtn.addEventListener('click', () => {
		
		let submitBtn = true;

			if(inputName.value.length < 3){
				submitBtn = false;
				nameError.innerHTML = 'Введите корректное имя!';
				return;
			}else{
				submitBtn = true;
				nameError.innerHTML = '';
			};

			if(inputImage.value.length < 10){
				submitBtn = false;
				imageError.innerHTML = 'Введите корректный url!';
				return;
			}else{
				submitBtn = true;
				imageError.innerHTML = '';
			};

			if(inputInStock.value < 0 || inputInStock.value === ''){
				submitBtn = false;
				inStockError.innerHTML = 'Введите корректное количество!';
				return;
			}else{
				submitBtn = true;
				inStockError.innerHTML = '';
			};

			if(inputIngredients.value.length < 10){
				submitBtn = false;
				ingredientsError.innerHTML = 'Введите корректно ингредиенты!';
				return;
			}else{
				submitBtn = true;
				ingredientsError.innerHTML = '';
				console.log(inputIngredients.value.split(' '))
			};

			if(inputCost.value < 0 || inputCost.value === ''){
				submitBtn = false;
				costError.innerHTML = 'Введите корректную цену!';
				return;
			}else{
				submitBtn = true;
				costError.innerHTML = '';
			};

		
		if(submitBtn){
			const itemObj = {
				name: inputName.value,
				inStock: Number(inputInStock.value),
				cost: Number(inputCost.value),
				ingredients: inputIngredients.value.split(' '),
				image: inputImage.value
			};
			const createPost = async() => {
				let response = await fetch(`${ENDPOINT}/pastry/create`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(itemObj)
				});
				let result = await response.json();
				console.log(result)
			};
			createPost()
		};
	});
};