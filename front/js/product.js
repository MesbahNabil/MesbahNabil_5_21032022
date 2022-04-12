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

carts.addEventListener("click", function (event) {
	// console.log("clicked")
	// console.log(itemQuantity.value)
	// console.log(itemColors.value)
	// console.log(localStorage)
	localStorage.setItem("cartQuantity", itemQuantity.value)
	localStorage.setItem("cartColor", itemColors.value)
})
	


	
