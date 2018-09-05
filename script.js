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

var mouse_x = 0
var mouse_y = 0
window.addEventListener("mousemove", function(event) {
	var bits = $("bit", true)
	for (var i = 0; i < bits.length; ++i) {
		var rect = bits[i].getBoundingClientRect()
		if (mouse_y < rect.top || mouse_y > rect.bottom) {
			if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
				var bit = bits[i].innerHTML.trim()
				if (bit === "0") {
					bit = "1"
				} else {
					bit = "0"
				}
				bits[i].innerHTML = bit
			}
		}
	}

	mouse_x = event.clientX
	mouse_y = event.clientY
})