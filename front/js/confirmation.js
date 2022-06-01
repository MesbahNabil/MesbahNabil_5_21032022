const params = new URLSearchParams(window.location.search)
const urlId = params.get("id")

const displayId = document.getElementById("orderId")

displayId.innerHTML += `${urlId}`
