---
---

/*
 * Utility
 */
function $iter(query, callback) {
	var elems = document.querySelectorAll(query);
	for (var i = 0; i < elems.length; ++i) {
		callback(elems[i]);
	}
}

/*
 * Right/Wrong classes
 */
$iter('h3', function(elem) {
	elem.className = elem.innerHTML.toLowerCase();
});

/*
 * Tab replacement
 */
$iter('code', function(elem) {
	elem.innerHTML = elem.innerHTML.replace(/\t/g, '    ');
});