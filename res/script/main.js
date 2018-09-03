function $(query) {
	return document.querySelector(query)
}

window.addEventListener("resize", function() {
	$(".earth").height = $(".earth").width
})

window.addEventListener("load", function() {
	window.dispatchEvent(new Event("resize"))
	earth_init()
})