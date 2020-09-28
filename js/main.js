document.addEventListener("DOMContentLoaded", function() {
	let goods = [
		{
			title: 'Овсяная каша с фруктами',
			price: 25,
			imageUrl: 'i/im1.jpg',
			category: '1',
			id: 0
		},
		{
			title: 'Яичница глазунья с овощами на сковородке',
			price: 25,
			imageUrl: 'i/im2.jpg',
			category: '1',
			id: 1
		},
		{
			title: 'Сет азербайджанский завтрак',
			price: 30,
			imageUrl: 'i/im3.jpg',
			category: '1',
			id: 2
		},
		{
			title: 'Яичница с помидорами по-бакински',
			price: 45,
			imageUrl: 'i/im4.jpg',
			category: '1',
			id: 3
		},
		{
			title: 'Сырники со сметаной',
			price: 45,
			imageUrl: 'i/im5.jpg',
			category: '1',
			id: 4
		},
		{
			title: 'Шпинатный крем-суп',
			price: 50,
			imageUrl: 'i/im6.jpg',
			category: '2',
			id: 5
		},
		{
			title: 'Суп Пити',
			price: 85,
			imageUrl: 'i/im7.jpg',
			category: '2',
			id: 6
		},
		{
			title: 'Борщ украинский',
			price: 95,
			imageUrl: 'i/im8.jpg',
			category: '2',
			id: 7
		},
		{
			title: 'Суп Кюфта Бозбаш',
			price: 100,
			imageUrl: 'i/im9.jpg',
			category: '2',
			id: 8
		},
		{
			title: 'Картофель фри',
			price: 125,
			imageUrl: 'i/im10.jpg',
			category: '3',
			id: 9
		},
		{
			title: 'Картофель по-домашнему',
			price: 135,
			imageUrl: 'i/im11.jpg',
			category: '3',
			id: 10
		},
		{
			title: 'Рис с овощами',
			price: 150,
			imageUrl: 'i/im12.jpg',
			category: '3',
			id: 11
		}
	];
	let qty = 0,
		summary = 0,
		filteredGoodsAr;

	const productBox = document.querySelector('.products-box');
	const selectCategoryBox = document.querySelector('.select-box');
	const selectCategoryEl = selectCategoryBox.querySelector('select');
	const selectPriceBox = document.querySelector('.price-select-box');
	const selectPriceEl = selectPriceBox.querySelector('select');

	goods.map(item => {
		productBox.appendChild(createItem(item));
	});

	function createItem (goodsItem) {
		let item = document.createElement('div');
		item.classList.add('product-box__item');
		let itemTitle = document.createElement('h3');
		item.setAttribute("data-id", goodsItem.id);
		itemTitle.classList.add('product-box__title');
		itemTitle.textContent = goodsItem.title;
		item.appendChild(itemTitle);
		let productBox = document.createElement('div');
		productBox.classList.add('product-box__img');
		let dishImage = new Image();
		dishImage.src = goodsItem.imageUrl;
		dishImage.classList.add('img-fluid');
		productBox.appendChild(dishImage);
		item.appendChild(productBox);
		let productboxMeta = document.createElement('div');
		productboxMeta.classList.add('product-box__meta');
		let price = document.createElement('p');
		price.textContent = goodsItem.price + ' грн.';
		productboxMeta.appendChild(price);
		let quantity = document.createElement('div');
		quantity.classList.add('qty');
		let input = document.createElement('input');
		input.setAttribute("type", "number");
		input.setAttribute("min", "0");
		input.classList.add('qty__item');
		quantity.appendChild(input);
		let span = document.createElement('span');
		span.innerHTML = ' Кол.';
		quantity.appendChild(span)
		productboxMeta.appendChild(price);
		productboxMeta.appendChild(quantity);
		item.appendChild(productboxMeta);
		let submitButton = document.createElement('button');
		submitButton.innerHTML = "Добавить";
		submitButton.classList.add('product-box__btn');
		productboxMeta.appendChild(submitButton);
		let buttons = [...document.querySelectorAll('.product-box__btn')];

		buttons.map(button => {
			button.addEventListener('click', addItemToCart);
		})

		return item;
	}

	function addItemToCart (){
		let box = this.closest('.product-box__item');
		let qtyItem = Number(box.querySelector('.qty__item').value);
		let id = box.dataset.id;
		let price = goods[id].price;
		qty = qty + qtyItem;

		summary = summary + price*qtyItem;

		let qtyItemBox = document.getElementsByClassName('red-info')[0];
		let summaryBox = document.getElementsByClassName('red-info')[1];
		qtyItemBox.textContent = '';
		summaryBox.textContent = '';

		qtyItemBox.insertAdjacentHTML('beforeend', qty);
		summaryBox.insertAdjacentHTML('beforeend', summary);
		let input = box.querySelector('.qty__item');
		input.value = ''
	}

	selectCategoryEl.addEventListener('change', () => {
		drawNewItems()
	});

	selectPriceEl.addEventListener('change', () => {
		drawNewItems()
	});

	const checkoutButton = document.querySelector('.btn-check');
	checkoutButton.addEventListener('click', function(){
		showModal();
	});

	function drawNewItems (){
		filteredGoodsAr = filterGoods('category', selectCategoryEl.value, goods);
		let newFilteredGoodsAr = filterGoods('price', selectPriceEl.value, filteredGoodsAr);

		productBox.textContent = '';
		newFilteredGoodsAr.forEach(item => {
			productBox.appendChild(createItem(item));
		})
	}

	function filterGoods (filter, value, goods) {
		let goodsAr = [...goods];
		return goodsAr.filter(item => {
			if (filter === 'price') {
				return value !== '0' ? item.price <= Number(value) : item;
			} else if (filter === 'category') {
				return value !== '0' ? item.category === value : item;
			}
		});
	}

	function createModal (){
		let modalWrapper, modal, form, nameTitle, nameInput,
			emailTitle, emailInput, buttonSubmit;

		modalWrapper = document.createElement('div');
		modalWrapper.classList.add('modal-wrapper');
		modal = document.createElement('div');
		modal.classList.add('modal-w');
		modalWrapper.appendChild(modal);
		form = document.createElement('form');
		modal.appendChild(form);
		nameTitle = document.createElement('label');
		nameTitle.textContent = 'Имя';
		form.appendChild(nameTitle);
		nameInput = document.createElement('input');
		nameInput.name = 'name';
		form.appendChild(nameInput);
		emailTitle = document.createElement('label');
		emailTitle.textContent = 'Email';
		form.appendChild(emailTitle);
		emailInput = document.createElement('input');
		emailInput.setAttribute("name", 'email');
		nameInput.classList.add('form-control');
		emailInput.classList.add('form-control');
		form.appendChild(emailInput);
		buttonSubmit = document.createElement('button');
		buttonSubmit.textContent = "Отправить";
		buttonSubmit.classList.add('btn', 'btn-submit');
		buttonSubmit.setAttribute("type", 'button');
		form.appendChild(buttonSubmit);
		form.setAttribute("name", 'userForm');
		buttonSubmit.addEventListener('click', validateForm);

		return modalWrapper;
	}

	function showModal(){
		const modal = createModal();
		document.getElementsByTagName('body')[0].appendChild(modal);
	}

	function createThanksPopup (){
		let text, modal, okBtn
		text = document.createElement('div');
		text.classList.add('thanks-text');
		text.textContent = 'Спасибо!';
		modal = document.querySelector('.modal-w');
		modal.appendChild(text);
		okBtn = document.createElement('button');
		modal.appendChild(okBtn);
		okBtn.textContent = 'Закрыть';
		okBtn.classList.add('btn', 'btn-ok');
		okBtn.addEventListener('click', function(){
			removeModal();
			clearCartInfo()
		});
	}

	function clearModal(){
		document.userForm.remove()
	}

	function removeModal(){
		document.querySelector('.modal-wrapper').remove();
	}

	function clearCartInfo(){
		document.querySelectorAll('.red-info')[0].innerHTML='ХХХ';
		document.querySelectorAll('.red-info')[1].innerHTML='ХХХ';
	}

	function showThanksPopup (){
		createThanksPopup();
	}

	function validateForm(){
			if( document.userForm.name.value == "" ) {
				alert( "Please provide your name!" );
				document.userForm.name.focus() ;

			}

			if( document.userForm.email.value == "" ) {
				alert( "Please provide your Email!" );
				document.userForm.email.focus() ;

			} else {
				clearModal();
				showThanksPopup();
			}
	}
});
