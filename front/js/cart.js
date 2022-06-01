// Dataset
let productData = []

function insertCart(products) {
	cartItem = document.getElementById("cart__items")
	if (!localStorage.getItem("cart")) {
		localStorage.setItem("cart", "[]")
	}
	let cart = JSON.parse(localStorage.getItem("cart"))

	cart = cart.map(function (cartLine) {
		let product = products.find(function (p) {
			return p._id == cartLine.id
		})
		cartLine.name = product.name
		cartLine.price = product.price
		cartLine.altTxt = product.altTxt
		cartLine.imageUrl = product.imageUrl
		return cartLine
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
				// console.log(item.qtty)
				return productId === item.id && color === item.color
			})
			if (parseInt(inputChanged.value) <= 0) {
				return
			}
			itemFound.qtty = parseInt(inputChanged.value)

			localStorage.setItem("cart", JSON.stringify(cart))

			calculTotalPanier(productData)
		})
	}
}

// Validations et Regular Expressions (RegEx)
// suppression de required dans le html
function ValidateFirstName() {
	const firstName = document.getElementById("firstName").value
	if (firstName.length < 2) {
		const errorMsg = document.getElementById("firstNameErrorMsg")
		errorMsg.innerHTML = `Veuillez renseigner ce champ.`

		return false
	}
	return true
}
// console.log("teste first name ", ValidateFirstName())

function ValidateLastName() {
	const lastName = document.getElementById("lastName").value
	if (lastName.length < 2) {
		const errorMsg = document.getElementById("lastNameErrorMsg")
		errorMsg.innerHTML = `Veuillez renseigner ce champ.`

		return false
	}

	return true
}
function ValidateAddress(address) {
	const addressForm = document.getElementById("address").value
	// const addressFormat = /^[a-zA-Z0-9\s,.'-]{3,}$/
	// if (addressForm.match(addressFormat)) {
	// 	return true
	// }
	if (addressForm.length < 2) {
		const errorMsg = document.getElementById("addressErrorMsg")
		errorMsg.innerHTML = `Veuillez renseigner ce champ.`
		return false
	}
	return true
}

function ValidateCity() {
	const city = document.getElementById("city").value
	if (city.length < 2) {
		const errorMsg = document.getElementById("cityErrorMsg")
		errorMsg.innerHTML = `Veuillez renseigner ce champ.`
		return false
	}

	return true
}

function ValidateEmail(email) {
	email = document.getElementById("email").value

	const emailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	if (email.match(emailFormat)) {
		return true
	} else {
		const errorMsg = document.getElementById("emailErrorMsg")
		errorMsg.innerHTML = `Veuillez renseigner ce champ.`
		console.log("wrong email")
		return false
	}
}

// creation d'un objet du nouvel utilisateur

const form = document.getElementById("userForm")
// console.log(form)
const contact = {
	firstName: document.getElementById("firstName").value,
	lastName: document.getElementById("lastName").value,
	adress: document.getElementById("address").value,
	city: document.getElementById("city").value,
	email: document.getElementById("email").value,
	order: document.getElementById("order"),
}
// console.log(contact)

// Dans product.js
// Expects request to contain:
//  * contact: {
//  *   firstName: string,
//  *   lastName: string,
//  *   address: string,
//  *   city: string,
//  *   email: string
//  * }
//  * products: [string] <-- array of product _id

function makeRequestBody() {
	const body = {
		contact: {
			firstName: document.getElementById("firstName").value,
			lastName: document.getElementById("lastName").value,
			address: document.getElementById("address").value,
			city: document.getElementById("city").value,
			email: document.getElementById("email").value,
		},

		products: JSON.parse(localStorage.getItem("cart")).map((item) => item.id),
	}

	return body
}

form.addEventListener("submit", function (e) {
	e.preventDefault()
	let cart = JSON.parse(localStorage.getItem("cart"))
	if (ValidateFirstName() && ValidateLastName() && ValidateAddress() && ValidateCity() && ValidateEmail() && cart.length > 0) {
		fetch("http://localhost:3000/api/products/order", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(makeRequestBody()),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				localStorage.clear()

				document.location.href = "confirmation.html?id=" + data.orderId
			})
			.catch((error) => console.log(error))
	} else {
		console.log("erreur")
	}
})

fetch("http://localhost:3000/api/products")
	.then((response) => response.json())
	.then((data) => {
		productData = data
		let cart = insertCart(productData)
		deleteListener()
		quantityListener()

		calculTotalPanier(productData)
	})
