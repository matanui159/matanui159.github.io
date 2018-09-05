function $(name, list) {
	var result = document.getElementsByClassName(name)
	if (list) {
		return result
	} else {
		return result[0]
	}
}

var bit_count = 1
function resize() {
	var count = window.innerHeight / $("bit").offsetHeight
	for (; bit_count < count; ++bit_count) {
		console.log()
		var bit = document.createElement("div")
		bit.className = "bit"
		bit.innerHTML = Math.floor(Math.random() * 2)
		$("binary").appendChild(bit)
	}
}
window.addEventListener("resize", resize)
resize()

var bit_prev = 0
window.addEventListener("mousemove", function(event) {
	var bits = $("bit", true)
	var index = Math.floor(event.clientY / bits[0].offsetHeight)
	if (index !== bit_prev) {
		var bit = bits[index].innerHTML
		if (bit === "0") {
			bit = "1"
		} else {
			bit = "0"
		}
		bits[index].innerHTML = bit
		bit_prev = index
	}
})