let counter = 0,
	interval;

this.onmessage = function({data}) {
	console.info("[Worker] onmessage: ", data);

	//simula processamento intenso
	f(42);
	/* Enviando mensagem para script main.js */
	this.postMessage("Terminou!");

	// Para mostrar que o contexto é dedicado
	// if(!interval){
	// 	interval = setInterval(() => {
	// 		this.postMessage(`[Worker] Counter ${++counter}`);

	// 		if(counter == 20) {
	// 			counter = 0;
	// 			clearInterval(interval);
	// 		}
	// 	}, 1000);
	// }
	}

const f = (num) => (num <= 1) ? 1 : f(num - 1) + f(num - 2);
