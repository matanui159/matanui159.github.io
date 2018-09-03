function shader_compile(program, type, query) {
	var shader = gl.createShader(type)
	gl.shaderSource(shader, $(query).innerHTML)
	gl.compileShader(shader)
	console.log(gl.getShaderInfoLog(shader))
	gl.attachShader(program, shader)
}

function earth_init() {
	gl = $(".earth").getContext("webgl");

	var program = gl.createProgram()
	shader_compile(program, gl.VERTEX_SHADER, ".vertex")
	shader_compile(program, gl.FRAGMENT_SHADER, ".fragment")
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

	requestAnimationFrame(earth_draw)
}

function earth_draw(time) {
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
	requestAnimationFrame(earth_draw)
}