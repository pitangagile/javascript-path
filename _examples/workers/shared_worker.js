const f = (num) => (num <= 1) ? 1 : f(num - 1) + f(num - 2);
let peers = [], counter = 0;

function calculate(n, message) {
  const result = f(n);

	if (message) postMessageToAll(message);
	else postMessageToAll(`Concluído: ${result}`);
}

self.onconnect = function({ports}) {
	// a porta de comunicação sempre será a "0"
	const port = ports[0];
	// guarda a porta de comunicação
	peers.push(port);

	port.onmessage = ({data}) => {
		if(data.action === 'calculate' && data.fibonacciN) {
			calculate(data.fibonacciN);
		}
		else if(data.action === 'scope-test' && data.fibonacciN) {
			while(++counter <= 10) calculate(data.fibonacciN, `Counter ${counter}`);
			counter = 0;
			postMessageToAll("Terminou!");
		}
	}
}

/**
 * Envia mensagem para todas as portas conectadas
 * @param {object} data
 */
function postMessageToAll(data){
	peers.forEach((port) => port.postMessage(data));
}
