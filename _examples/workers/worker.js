const f = (num) => (num <= 1) ? 1 : f(num - 1) + f(num - 2);
let counter = 0;

function calculate(n, message) {
  const result = f(n);

	if (message) self.postMessage(message);
	else self.postMessage(`Concluído: ${result}`);
}

self.onmessage = ({data}) => {
  if(data.action === 'calculate' && data.fibonacciN) {
    calculate(data.fibonacciN);
	}
	else if(data.action === 'scope-test' && data.fibonacciN) {
		while(++counter <= 10) calculate(data.fibonacciN, `Counter ${counter}`);
		counter = 0;
		self.postMessage("Terminou!");
  }
}
