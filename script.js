function $(name) {
	return document.getElementsByClassName(name)[0]
}

var canvas = $("sine")
var ctx = canvas.getContext("2d")

var sin_amp = canvas.width / 4
var sin_off = 0
function mousemove(event) {
	var width = canvas.width
	var height = canvas.height
	if (event) {
		sin_amp = event.clientX / window.innerWidth * width / 2
		sin_off = event.clientY
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.strokeStyle = "#F24"
	ctx.beginPath()
	for (var y = 0; y < height; y += 2) {
		ctx.lineTo(width / 2 + Math.cos((y - sin_off) / 64) * sin_amp, y)
	}
	ctx.stroke()
}
window.addEventListener("mousemove", mousemove)

function resize() {
	canvas.height = window.innerHeight
	mousemove()
}
window.addEventListener("resize", resize)
resize()