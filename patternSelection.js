//
// patternSelection.js -- select from a few patterns using the arc 1
//

autowatch = 1;
outlets = 2;

var LED_NONE    = 0;
var LED_CURRENT = 1;
var LED_SECTOR  = 8;
var LED_CURSOR  = 15;

var MAXPATS  = 20;
var patcount = 1;
var current  = 0;
var cursor   = 0;

// Set number of patterns
function patterns(n) {
	if (n > 0 && n < MAXPATS) {
		patcount = n;
		current = -1;
		cursor = Math.floor(Math.floor(64 / n) / 2);
		delta(0);
	}
}

// Given arc delta, output light map (64 led values)
function delta(d) {
	var map = [];
	var n, led, old;
	var currentStart, currentEnd;
	var halfSector;

	cursor = (cursor + d) % 64;

	if (cursor < 0) {
		cursor = 64 + cursor;
	}

	sectorSize = Math.floor(64 / patcount);

	old = current;
	current = Math.floor(cursor / sectorSize);
	// Extend last sector when uneven division
	if (current >= patcount) {
		current = patcount - 1;
	}

	currentStart = current * sectorSize;
	currentEnd   = (current + 1) * sectorSize;

	for (n=0; n<64; n++) {
		led = LED_NONE;

		if (currentStart <= n && n < currentEnd) {
			led = LED_CURRENT;
		}

		if (n % sectorSize == 0) {
			led = LED_SECTOR;
		}

		// Extend last sector when uneven division
		if (n >= (patcount * sectorSize)) {
			if (current == patcount - 1) {
				led = LED_CURRENT;
			} else {
				led = LED_NONE;
			}
		}

		if (n == cursor) {
			led = LED_CURSOR;
		}

		map.push(led);
	}

	// Rotate map left by half sector
	halfSector = Math.floor(sectorSize / 2);
	for (n=0; n<halfSector; n++) {
		map.push(map.shift());
	}

	if (old != current) {
		outlet(1, current);
	}

	outlet(0, map);
}
