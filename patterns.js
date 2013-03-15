autowatch = 1;

var pats = new Dict('patterns');

var lastKey = '?';

r = new RegExp(' ', 'g');

function get(x, y) {
	lastKey = x + "-" + y;

	var val = pats.get(lastKey) || '';
	val = val.replace(r, '\n');
	
	outlet(0, val);
}

function set(pattern) {
	pats.set(lastKey, pattern);
	pats.export_json('patterns.json');
}
