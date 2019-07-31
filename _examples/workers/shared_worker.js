let peers = [],
	counter = 0,
	interval;

this.onconnect = function({ports}) {
	const port = ports[0];

	peers.push(port);

	// Para mostrar que o contexto é compartilhado
	if(!interval){
		interval = setInterval(() => {
			postMessageToAll(`${++counter}`);

			if(counter == 20) {
				counter = 0;
				clearInterval(interval);
			}
		}, 1000);
	}
}

/**
 * Envia mensagem para todas as portas conectadas
 * @param {object} data
 */
function postMessageToAll(data){
	peers.forEach((port) => port.postMessage(data));
}
