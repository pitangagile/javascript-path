self.oninstall = (e) => {
	// self.skipWaiting();
};

// Chamado quando o service worker for ativado
self.onactivate = (e) => {
	// Força o controle na página atual sem necessitar de refresh
	// see: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
	self.clients.claim();
};

// Ouve as requisições do documento principal
self.onfetch = (e) => {
	if(e.request.destination === 'image'){
		e.respondWith(fetch('https://i.imgur.com/i56443n.png'));
	}
};
