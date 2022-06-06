// Recupération API
fetch("http://localhost:3000/api/products")
	.then((response) => response.json())
	.then((data) => {
		insertProducts(data)
	})

// DOM
const itemImg = document.getElementById("item_img")
const itemName = document.getElementById("title")
const itemDescription = document.getElementById("description")
const itemPrice = document.getElementById("price")
const itemColors = document.getElementById("colors")
const itemQuantity = document.getElementById("quantity")

// urlsearchparams pour eviter slice()
const params = new URLSearchParams(window.location.search)
const urlId = params.get("id")
// console.log(urlId)

function insertProducts(data) {
	data.forEach((obj) => {
		// console.log(obj._id)
		// console.log(dataId.match(urlId))
		if (obj._id.match(urlId)) {
			// console.log(obj)
			itemImg.innerHTML = `<img src="${obj.imageUrl}" alt="${obj.altTxt}">`

			itemDescription.innerHTML = obj.description
			itemName.innerHTML = obj.name
			itemPrice.innerHTML = obj.price

			const colorsOptions = obj.colors
			// console.log(colorsOptions)
			colorsOptions.forEach(
				(colorsOptionsSelection) =>
					(itemColors.innerHTML += `<option value="${colorsOptionsSelection}">${colorsOptionsSelection}</option>`)
			)
		}
	})
}

const carts = document.getElementById("addToCart")
// console.log(carts)

const arrayCartData = []

carts.addEventListener("click", function (event) {
	const selectedItem = {
		id: urlId,
		name: itemName.innerHTML,
		color: itemColors.value,
		qtty: parseInt(itemQuantity.value),
	}

	// S'il n'y a pas de couleur ou de quantié
	if (selectedItem.color == "colorsList" || selectedItem.qtty <= 0) {
		return null
	}

	// Si le panier n'existe pas alors crée un panier
	if (!localStorage.getItem("cart")) {
		localStorage.setItem("cart", "[]")
	}

	// console.log("Le localstorage n'est pas vide.")
	const cart = JSON.parse(localStorage.getItem("cart"))

	const filteredResults = cart.find(function (cart) {
		// si le nom et la couleur correspondent à un objet dans cart avec filter
		return cart.color == selectedItem.color && cart.name == selectedItem.name
	})

	if (filteredResults) {
		// le produit existe déjà
		filteredResults.qtty += selectedItem.qtty
	} else {
		// Sinon Créer l'item dans le panier

		cart.push(selectedItem)
	}

	localStorage.setItem("cart", JSON.stringify(cart))
})
