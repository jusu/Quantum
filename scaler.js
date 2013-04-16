// extremely simple auto-scaledown of x-range parameter.
// When balls are off the right side, scale the number down a bit.

autowatch = 1;

b = 2.5;
a = b;

function base(x) {
	b = 2.5;
	a = b;
}

function x(x) {
	if (x >= 16) {
		a -= 0.003;
	}
	outlet(0, a);
}

function change() {
	a = b;
	outlet(0, a);
}
