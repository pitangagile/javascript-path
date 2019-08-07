(function(d, w){
	// #region Snippets
	const $ = (s, n = d) => n.querySelector(s);
	const $$ = (s, n = d) => [...n.querySelectorAll(s)];
	const f = (num) => (num <= 1) ? 1 : f(num - 1) + f(num - 2);
	// #endregion Snippets

	// #region Slide
	w.Reveal.initialize({
		dependencies: [
			{ src: 'node_modules/reveal.js/plugin/highlight/highlight.js', async: true },
			{ src: 'node_modules/reveal.js/plugin/search/search.js', async: true },
			{ src: 'node_modules/reveal.js/plugin/zoom-js/zoom.js', async: true },
			{ src: 'node_modules/reveal.js/plugin/notes/notes.js', async: true },
		],
		transition:'convex',
		hash: true,
		mouseWheel: true,
	});
	// #endregion Slide

	// #region Dedicated Worker
	const dwConsole = $('#dwCard .console small');
	const dwRun = $('#dwCard .btn.run');
	const dwTry = $('#dwCard .btn.try');
	const dwScope = $('#dwCard .btn.scope');
	const dwStop = $('#dwCard .btn.stop');

	let dedicatedWorker = new Worker('./worker.js');

	dedicatedWorker.onmessage = ({data}) => {
		dwConsole.innerHTML += `<br>> ${new Date().toISOString()} <strong>${data}</strong>`;
	}

	dwTry.addEventListener('click', (e) => {
		f(42);
		dwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Finalmente...</strong>`;
	});

	dwRun.addEventListener('click', (e) => {
		if (!dedicatedWorker) {
			dwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Worker já finalizado...</strong>`;
		} else {
			dwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Iniciou</strong>`;
			dedicatedWorker.postMessage({"action": "calculate", "fibonacciN": 42});
		}
	});

	dwScope.addEventListener('click', (e) => {
		if (!dedicatedWorker) {
			dwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Worker já finalizado...</strong>`;
		} else {
			dwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Iniciou</strong>`;
			dedicatedWorker.postMessage({"action": "scope-test", "fibonacciN": 42});
		}
	});

	dwStop.addEventListener('click', (e) => {
		if (dedicatedWorker) {
			dedicatedWorker.terminate();
			dedicatedWorker = undefined;
			dwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Finalizou</strong>`;
		}
	});
	// #endregion Dedicated Worker

	// #region Shared Worker
	const swwConsole = $('#swwCard .console small');
	const swwRun = $('#swwCard .btn.run');
	const swwScope = $('#swwCard .btn.scope');
	const swwStop = $('#swwCard .btn.stop');
	let sharedWorker = new SharedWorker('./shared_worker.js');

	sharedWorker.port.onmessage = ({data}) => {
		swwConsole.innerHTML += `<br>> ${new Date().toISOString()} <strong>${data}</strong>`;
	}

	swwRun.addEventListener('click', (e) => {
		if (sharedWorker) {
			swwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Iniciou</strong>`;
			sharedWorker.port.postMessage({"action": "calculate", "fibonacciN": 42});
		}
	});

	swwScope.addEventListener('click', (e) => {
		if (sharedWorker) {
			swwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Iniciou</strong>`;
			sharedWorker.port.postMessage({"action": "scope-test", "fibonacciN": 42});
		}
	});

	swwStop.addEventListener('click', (e) => {
		if (sharedWorker) {
			sharedWorker.port.close();
			sharedWorker = undefined;
			swwConsole.innerHTML = `> ${new Date().toISOString()} <strong>Finalizou</strong>`;
		}
	});
	// #endregion Shared Worker

	// #region Service Worker
	const swConsole = $('#swCard .console small');
	const swUrl = $('#swCard .url');
	const swLoad = $('#swCard .btn.load');
	const swImg = $('#swCard .img');
	const swRun = $('#swCard .btn.run');
	const swStop = $('#swCard .btn.stop');

	swLoad.addEventListener('click', (e) => { if(swUrl.value) { swImg.src = swUrl.value; } });

	swRun.addEventListener('click', (e) => {
		navigator.serviceWorker.register('./service_worker.js')
		.then((registration) => {
			// força uma atualização caso idetifique que o script é diferente (em caso de worker já registrado anteriorment)
			registration.update();
			swConsole.innerHTML = `> ${new Date().toISOString()} <strong>Registrado</strong>`;
		}
	);
	});

	swStop.addEventListener('click', (e) => {
		navigator.serviceWorker.getRegistrations().then(function (registrations) {
			for (let registration of registrations) registration.unregister();
		});
		swConsole.innerHTML = `> ${new Date().toISOString()} <strong>Desregistrado</strong>`;
	});
	// #endregion Service Worker

	// #region Worklet
	const wSquare = $('#wCard .square');
	const wRun = $('#wCard .btn.run');

	wRun.addEventListener('click', (e) => {
		CSS.paintWorklet.addModule('worklet.js');
	});
	// #endregion Worklet
})(document, window);
