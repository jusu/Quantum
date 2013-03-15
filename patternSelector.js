autowatch = 1;

var current = [];
var nth = 0;

function change(pattern) {
	current = pattern.split('\n');
	changePat();
}

function changePat() {
	outlet(0, current[nth]);
}

// XXX messages to set arc sections
// XXX arc press will change the pattern

var arc1position = 0;

