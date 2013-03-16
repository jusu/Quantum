autowatch = 1;

outlets = 3;

var pats = new Dict('patterns');

var lastKey = '?';
var lastValue = '';

r = new RegExp(' ', 'g');

// Get pattern set from dictionary for x,y
function get(x, y) {
	var val, len;

	lastKey = x + "-" + y;

	val = pats.get(lastKey) || '';
	val = val.replace(r, '\n');

	lastValue = val;

	len = val.split('\n').length;

	outlet(1, len);
	outlet(0, val);
}

// Set pattern set for last retrieved x,y
function set(pattern) {
	pats.set(lastKey, pattern);
	pats.export_json('patterns.json');

	lastValue = pattern.replace(r, '\n');
}

// Select nth pattern from last retrieved set
function selectPattern(nth) {
	if (lastValue.length) {
		var arr = lastValue.split('\n');
		if (nth >= 0 && nth < arr.length) {
			outlet(2, arr[nth]);
		}
	}
}
