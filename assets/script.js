/*
 * Utility
 */
var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
Element.prototype.$add = function(name) {
	var elem = document.createElement(name)
	this.appendChild(elem)
	return elem
}

/*
 * Binary line
 */
var bit_count = 1
window.addEventListener('resize', function() {
	var count = window.innerHeight / $('.bit').offsetHeight
	for (; bit_count < count; ++bit_count) {
		var bit = $('.binary').$add('div')
		bit.className = 'bit'
		bit.innerHTML = Math.floor(Math.random() * 2)
	}
})
window.dispatchEvent(new Event('resize'))

var bit_prev = 0
window.addEventListener('mousemove', function(event) {
	var bits = $$('.bit')
	var index = Math.floor(event.clientY / bits[0].offsetHeight)
	if (index !== bit_prev) {
		var bit = bits[index].innerHTML.trim()
		if (bit === '0') {
			bit = '1'
		} else {
			bit = '0'
		}
		bits[index].innerHTML = bit
		bit_prev = index
	}
})

/*
 * Git repo
 */
function git_callback(response) {
	var data = response.data
	for (var i = 0; i < data.length; ++i) {
		if ('repo' in data[i]) {
			var name = data[i].repo.name
			var git = $('.git')
			git.href = "https://github.com/" + name
			git.innerHTML = name
			break
		}
	}
}

var script = $('body').$add('script')
script.src = 'https://api.github.com/users/matanui159/events?callback=git_callback'