// extremely simple auto-scaledown of x-range parameter.
// When balls are off the right side, scale the number down a bit.

autowatch = 1;

b = 2.5;
a = b;
lim = 16

function base(x) {
	b = 2.5;
	a = b;
}

function limit(n) {
	if (n > 0) {
		lim = n;
	}
}

function x(x) {
	if (x >= lim) {
		a -= 0.003;
	}
	outlet(0, a);
}

function change() {
	a = b;
	outlet(0, a);
}
