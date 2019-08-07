/**
 * Evento disparado na instalação do worker
 */
self.oninstall = (e) => {
	// ...
};

/**
 * Evento disparado quando o worker estiver pronto para controlar os clientes
 */
self.onactivate = (e) => {
	// ...
};

/**
 * Evento disparado sempre que houver uma requisição
 */
self.onfetch = (e) => {
	if(e.request.destination === 'image'){
		e.respondWith(fetch('https://i.imgur.com/i56443n.png'));
	}
};
