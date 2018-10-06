---
---

var canvas = document.querySelector('canvas')
var gl = canvas.getContext('webgl2', {
	alpha: false,
	depth: false,
	antialias: false
})

var keys = {}
window.addEventListener('keydown', function(e) {
	keys[String.fromCharCode(e.keyCode)] = true
})

window.addEventListener('keyup', function(e) {
	keys[String.fromCharCode(e.keyCode)] = false
})

function resize() {
	canvas.width = document.body.clientWidth
	canvas.height = document.body.clientHeight
	gl.viewport(0, 0, canvas.width, canvas.height)
}
window.addEventListener('resize', resize)
window.addEventListener('load', resize)
resize()

var camera = {
	uniform_pos: 0,
	x: 0,
	y: 0,
	z: -4,
	time: Date.now()
}

function shader(type, id) {
	var name = id + ' shader'
	var code = document.getElementById(id).innerHTML
	console.log(name + ' code:\n' + code)
	
	var shader = gl.createShader(type)
	gl.shaderSource(shader, document.getElementById(id).innerHTML)
	gl.compileShader(shader)
	console.log(name + ' log:\n' + gl.getShaderInfoLog(shader))

	return shader
}

function pixel(x, y, z, r, g, b, a) {
	var data = new Uint8Array([r, g, b, a]);
	gl.texSubImage3D(
		gl.TEXTURE_3D, 0,
		x, y, z,
		1, 1, 1,
		gl.RGBA, gl.UNSIGNED_BYTE,
		data
	)
}

function init() {
	var prog = gl.createProgram()
	var vert = shader(gl.VERTEX_SHADER, 'vertex')
	var frag = shader(gl.FRAGMENT_SHADER, 'fragment')
	gl.attachShader(prog, vert)
	gl.attachShader(prog, frag)
	gl.linkProgram(prog)
	console.log('program log:\n' + gl.getProgramInfoLog(prog))

	gl.detachShader(prog, vert)
	gl.detachShader(prog, frag)
	gl.deleteShader(vert)
	gl.deleteShader(frag)
	gl.useProgram(prog)

	var buf_data = new Int8Array([
		-1, -1,
		+1, -1,
		-1, +1,
		+1, +1
	]);

	var buffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
	gl.bufferData(gl.ARRAY_BUFFER, buf_data, gl.STATIC_DRAW)
	gl.enableVertexAttribArray(0)
	gl.vertexAttribPointer(0, 2, gl.BYTE, false, 0, 0)

	var tex_size = 8
	var tex_data = new Uint8Array(tex_size * tex_size * tex_size * 4)
	tex_data.fill(0)

	var texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_3D, texture)
	gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGBA8, tex_size, tex_size, tex_size)
	gl.texSubImage3D(
		gl.TEXTURE_3D, 0,
		0, 0, 0,
		tex_size, tex_size, tex_size,
		gl.RGBA, gl.UNSIGNED_BYTE,
		tex_data
	)
	pixel(1, 1, 1, 255, 0, 0, 255)
	pixel(3, 1, 1, 0, 255, 0, 255)
	pixel(1, 1, 3, 0, 0, 255, 255)
	pixel(3, 1, 3, 255, 255, 0, 255)

	camera.uniform_pos = gl.getUniformLocation(prog, 'camera_pos')

	gl.clearColor(0, 0, 0, 1)
	draw()
}

function update() {
	var time = Date.now()
	var dt = (time - camera.time) / 1000
	camera.time = time
	var speed = 2 * dt

	if (keys['A']) {
		camera.x -= speed
	}
	if (keys['D']) {
		camera.x += speed
	}
	if (keys['S']) {
		camera.y -= speed
	}
	if (keys['W']) {
		camera.y += speed
	}
	if (keys['Q']) {
		camera.z -= speed
	}
	if (keys['E']) {
		camera.z += speed
	}
}

function draw() {
	update()

	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.uniform3f(camera.uniform_pos, camera.x, camera.y, camera.z)
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

	requestAnimationFrame(draw)
}

init()