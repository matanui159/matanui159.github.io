function $(name) {
	return document.getElementsByClassName(name)[0]
}

function resize() {
	var earth = $("earth")
	earth.width = earth.parentElement.offsetWidth
	earth.height = earth.width
	gl.viewport(0, 0, earth.width, earth.height)
}
window.addEventListener("resize", resize)

/*
 * Earth rendering
 */
function compile_shader(type, name) {
	var shader = gl.createShader(type)
	gl.shaderSource(shader, $(name).innerHTML)
	gl.compileShader(shader)
	console.log(gl.getShaderInfoLog(shader))
	gl.attachShader(program, shader)
}

function draw(time) {
	var uniform = gl.getUniformLocation(program, "time")
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.uniform1f(uniform, (time / 10000) % 1)
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
	requestAnimationFrame(draw)
}

var gl = $("earth").getContext("webgl");
var program = gl.createProgram()
compile_shader(gl.VERTEX_SHADER, "vertex")
compile_shader(gl.FRAGMENT_SHADER, "fragment")
gl.linkProgram(program)
console.log(gl.getProgramInfoLog(program))
gl.useProgram(program)

var buffer_data = new Int8Array([
	-1, -1,
	-1, +1,
	+1, -1,
	+1, +1
])

var buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, buffer_data, gl.STATIC_DRAW)
var attr = gl.getAttribLocation(program, "vpos")
gl.enableVertexAttribArray(attr)
gl.vertexAttribPointer(attr, 2, gl.BYTE, false, 0, 0)
resize()
requestAnimationFrame(draw)

/*
 * Asset loading
 */
var images = [
	{
		name: "day",
		format: "jpg",
		default: [0.1, 0.2, 0.3, 1.0]
	},
	{
		name: "night",
		format: "jpg",
		default: [0.0, 0.0, 0.0, 1.0]
	},
	{
		name: "normal",
		format: "jpg",
		default: [0.0, 0.0, 1.0, 1.0]
	},
	{
		name: "spec",
		format: "jpg",
		default: [0.0, 0.0, 0.0, 1.0]
	}
]

var frame = gl.createFramebuffer()
gl.bindFramebuffer(gl.FRAMEBUFFER, frame)
for (var i = 0; i < images.length; ++i) {
	var image = images[i]
	var texture = gl.createTexture()
	gl.activeTexture(gl.TEXTURE0 + i)
	gl.bindTexture(gl.TEXTURE_2D, texture)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

	var color = image.default
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
	gl.clearColor(color[0], color[1], color[2], color[3])
	gl.clear(gl.COLOR_BUFFER_BIT)

	var uniform = gl.getUniformLocation(program, "i" + image.name)
	gl.uniform1i(uniform, i)
}
gl.deleteFramebuffer(frame)
gl.clearColor(0, 0, 0, 0)

function load_image(index) {
	if (index < images.length) {
		var image = images[index]
		var img = new Image;
		img.addEventListener("load", function() {
			gl.activeTexture(gl.TEXTURE0 + index)
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
			load_image(index + 1)
		})
		img.src = "earth/" + image.name + "." + image.format
	}
}
load_image(0)