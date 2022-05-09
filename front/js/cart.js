// Dataset
let productData = []
// pas de const cart ? Modification du cart donc création d'erreur?

function insertCart(products) {
	let cart = JSON.parse(localStorage.getItem("cart"))
	cartItem = document.getElementById("cart__items")

	cart = cart.map(function (cartLine) {
		let product = products.find(function (p) {
			return p._id == cartLine.id
		})
		cartLine.name = product.name
		cartLine.price = product.price
		cartLine.altTxt = product.altTxt
		cartLine.imageUrl = product.imageUrl
		return cartLine

		console.log(cartLine)
	})

	cart.forEach((item) => {
		cartItem.innerHTML += `
			<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
				<div class="cart__item__img">
						<img src="${item.imageUrl}" alt="${item.altTxt}">
				</div>
				<div class="cart__item__content">
					<div class="cart__item__content__description">
						<h2>${item.name}</h2>
						<p>${item.color}</p>
						<p>${item.price} €</p>
					</div>
						<div class="cart__item__content__settings">
						<div class="cart__item__content__settings__quantity">
							<p class="selectedQuantity" > Qté :  </p>
							<input  id="inputquantity" type="number" class="itemQuantity" name="itemQuantity" min=${0} max=${100} value=${item.qtty}>
						</div>
						<div class="cart__item__content__settings__delete">
							<p class="deleteItem">Supprimer</p>
						</div>
					</div>
			</div>
		</article>`
	})
	return cart
}

function deleteListener() {
	const removeCartItemButtons = document.getElementsByClassName("deleteItem")

	for (let i = 0; i < removeCartItemButtons.length; i++) {
		const buttonDelete = removeCartItemButtons[i]

		buttonDelete.addEventListener("click", function (event) {
			const buttonClicked = event.target
			let article = buttonClicked.closest("article")

			article.remove()
			const productId = article.getAttribute("data-id")
			console.log(productId)
			const color = article.getAttribute("data-color")
			console.log(color)
			let cart = JSON.parse(localStorage.getItem("cart"))
			console.log(cart)

			const newCart = cart.filter(function (item) {
				return !(productId === item.id && color === item.color)
			})
			console.log(newCart)
			localStorage.setItem("cart", JSON.stringify(newCart))

			calculTotalPanier(productData)
		})
	}
}

function calculTotalPanier(products) {
	let cart = JSON.parse(localStorage.getItem("cart"))

	cart = cart.map(function (cartLine) {
		let product = products.find(function (p) {
			return p._id == cartLine.id
		})
		cartLine.price = product.price
		return cartLine
	})
	// console.table(cart)
	let totalPrice = 0
	let totalQuantity = 0
	cart.forEach(function (cartLine) {
		// console.log(cartLine.price)
		totalPrice = totalPrice + cartLine.price * cartLine.qtty
		totalQuantity = totalQuantity + parseInt(cartLine.qtty)
	})

	document.getElementById("totalQuantity").innerHTML = totalQuantity
	document.getElementById("totalPrice").innerHTML = totalPrice
}

function quantityListener() {
	const quantityInput = document.getElementsByClassName("itemQuantity")

	for (let i = 0; i < quantityInput.length; i++) {
		const input = quantityInput[i]

		input.addEventListener("change", function (event) {
			const inputChanged = event.target
			console.log(inputChanged)

			let article = inputChanged.closest("article")
			let productId = article.getAttribute("data-id")
			console.log(productId)
			let color = article.getAttribute("data-color")
			let cart = JSON.parse(localStorage.getItem("cart"))
			let itemFound = cart.find(function (item) {
				console.log(item.qtty)
				return productId === item.id && color === item.color
			})
			itemFound.qtty = inputChanged.value
			localStorage.setItem("cart", JSON.stringify(cart))



			calculTotalPanier(productData)
		})
	}
}

// changeQuantity(productData)
// function changeQuantity(products) {
// 	let cart = JSON.parse(localStorage.getItem("cart"))

// 	cart = cart.map(function (cartLine) {
// 		let product = products.find(function (p) {
// 			return p._id == cartLine.id
// 		})
// 		// cartLine.qtty = product.qtty
// 		return cartLine
// 	})

// 	console.log(cart)
// 	cartItem = document.getElementById("cart__items")
// 	cart.forEach((item) => {
// 		// cartItem.innerHTML += `<input id="inputquantity" type="number" class="itemQuantity" name="itemQuantity" min=${0} max=${100} value=${
// 		// 	item.qtty
// 		// }>
// 		// </div>`
// 		let quantity = item.qtty
// 		console.log(quantity)
// 		quantity.deleteListener("change", quantitychanged)
// 	})

// }

fetch("http://localhost:3000/api/products")
	.then((response) => response.json())
	.then((data) => {
		productData = data
		let cart = insertCart(productData)
		deleteListener()
		quantityListener()

		calculTotalPanier(productData)
	})
