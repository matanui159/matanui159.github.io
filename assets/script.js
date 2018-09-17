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
function resize() {
	var count = window.innerHeight / $('.bit').offsetHeight
	for (; bit_count < count; ++bit_count) {
		var bit = $('.binary').$add('div')
		bit.className = 'bit'
		bit.innerHTML = Math.floor(Math.random() * 2)
	}
}
window.addEventListener('resize', resize)
window.addEventListener('load', resize)
resize()

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
 * Description
 */
function random(list) {
	return list[Math.floor(Math.random() * list.length)]
}

var desc = [
	'happy',
	'bored',
	'weird',
	'crazy',
	'normal',
	'awesome',
	'tired',
	'graphics',
	'edgy'
]
var title = [
	'gamer',
	'student',
	'wizard',
	'psychopath',
	'wannabe',
]
$('.desc span').innerHTML = random(desc) + ' ' + random(title)

/*
 * Git repo
 */
function git_callback(response) {
	var data = response.data
	for (var i = 0; i < data.length; ++i) {
		if ('repo' in data[i]) {
			var repo = data[i].repo.name
			var git = $('.git a')
			git.href = 'https://github.com/' + repo
			git.innerHTML = repo + git.innerHTML
			$('.git').style.display = 'block'
			break
		}
	}
}

var script = $('body').$add('script')
script.src = 'https://api.github.com/users/matanui159/events?callback=git_callback'