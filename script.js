function $(name, list) {
	var result = document.getElementsByClassName(name)
	if (list) {
		return result
	} else {
		return result[0]
	}
}

/*
 * Binary line
 */
var bit_count = 1
window.addEventListener("resize", function() {
	var count = window.innerHeight / $("bit").offsetHeight
	for (; bit_count < count; ++bit_count) {
		console.log()
		var bit = document.createElement("div")
		bit.className = "bit"
		bit.innerHTML = Math.floor(Math.random() * 2)
		$("binary").appendChild(bit)
	}
})
window.dispatchEvent(new Event("resize"))

var bit_prev = 0
window.addEventListener("mousemove", function(event) {
	var bits = $("bit", true)
	var index = Math.floor(event.clientY / bits[0].offsetHeight)
	if (index !== bit_prev) {
		var bit = bits[index].innerHTML.trim()
		if (bit === "0") {
			bit = "1"
		} else {
			bit = "0"
		}
		bits[index].innerHTML = bit
		bit_prev = index
	}
})

/*
 * Git repo
 */
function gitcallback(response) {
	console.log(response)
	var data = response.data
	for (var i = 0; i < data.length; ++i) {
		if (data[i].type === "PushEvent") {
			var name = data[i].repo.name
			var gitlink = $("gitlink")
			gitlink.innerHTML = name
			gitlink.href = "https://github.com/" + name
			$("footer").style.display = "block"
			break
		}
	}
}

var script = document.createElement("script")
script.src = "https://api.github.com/users/matanui159/events?callback=gitcallback"
document.body.appendChild(script)