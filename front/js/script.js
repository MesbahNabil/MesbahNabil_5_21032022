fetch("http://localhost:3000/api/products")
	.then((response) => response.json())
	.then((data) => {
		insertData(data)
	})

// DOM
const items = document.getElementById("items")

function insertData(array) {
	array.forEach((product) => {
		console.log(product.name);
		items.innerHTML += `
	<a href="./product.html?id=${product._id}">
		<article>
			<img src="${product.imageUrl}" alt="${product.altTxt} ">
			<h3 class="productName">${product.name}</h3>
			<p class="productDescription">${product.description}</p>
		</article>
	</a>`
	})
}
