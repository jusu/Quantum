autowatch = 1;
outlets = 2;

var leds = {};
var ramp = [0, 1, 1, 2,  2, 3, 3, 3,  4, 4, 5, 6,  6, 8, 11, 15];

function pos(x, y) {
	var k = x + ':' + y;
	var l = leds[k] = leds[k] || [x, y, 16];
	l[2] = 16;
}

function pos2(x, y) {
	pos(x, y);
	pos(x+1, y);
	pos(x, y+1);
	pos(x+1, y+1);
}

function bang() {
	var toremove = [];

	for (k in leds) {
		l = leds[k];
		l[2]--;
		if (l[2] >= 0) {
			outlet(1, "setcell2d", l[0], l[1], ramp[l[2]] * 17);
			outlet(0, l[0], l[1], ramp[l[2]]);
		} else {
			outlet(1, "setcell2d", l[0], l[1], 0);
			outlet(0, l[0], l[1], 0);
			toremove.push(k);
		}
	}

	toremove.forEach(function(k) {
		delete leds[k];
	});
}

/*
// Another implementation with 'leds' as array.
// The for-loop in bang() is bad here.

autowatch = 1;
outlets = 2;

var ramp = [0, 1, 1, 2,  2, 3, 3, 3,  4, 4, 5, 6,  6, 8, 11, 15];
var leds = [];

for (var n=0; n<256; n++) {
	leds.push(-1);
}

function pos(x, y) {
	leds[y * 16 + x] = 16;
}

function bang() {
	var n;

	for (n=0; n<256; n++) {
		leds[n]--;
		if (leds[n] >= 0) {
			outlet(1, "setcell2d", n % 16, Math.floor(n / 16), ramp[leds[n]] * 17);
		}
	}
}
*/
