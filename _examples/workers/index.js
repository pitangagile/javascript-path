(function (d, w) {
	// #region Snippets
	const $ = (s, n = d) => n.querySelector(s);
	const $$ = (s, n = d) => [...n.querySelectorAll(s)];
	const f = (num) => (num <= 1) ? 1 : f(num - 1) + f(num - 2);
	// #endregion Snippets

	// #region Web Worker
	const wwPanel = $('#wwCard .card-text small');
	const wwRun = $('#wwCard .btn.run');
	const wwTry = $('#wwCard .btn.try');
	const wwStop = $('#wwCard .btn.stop');

	let webWorker = new Worker('./worker.js');

	wwTry.addEventListener('click', (e) => {
		f(42);
		wwPanel.innerText = `> Finalmente...`;
	});

	wwRun.addEventListener('click', (e) => {
		if (webWorker) {
			webWorker.postMessage('Go!');
			wwPanel.innerHTML = `> ${new Date().toISOString()} <strong>Iniciou</strong>`;
		}
	});

	wwStop.addEventListener('click', (e) => {
		if (webWorker) {
			webWorker.terminate();
			webWorker = undefined;
		}
	});

	webWorker.onmessage = ({
		data
	}) => {
		wwPanel.innerHTML += `<br>> ${new Date().toISOString()} <strong>${data}</strong>`;
	}
	// #endregion Web Worker

	// #region Shared Worker
	if (!!window.SharedWorker) {
		const swwPanel = $('#swwCard .card-text small');
		const swwRun = $('#swwCard .btn.run');
		const swwStop = $('#swwCard .btn.stop');

		let sharedWorker = undefined;

		swwRun.addEventListener('click', (e) => {
			if (!sharedWorker) {
				sharedWorker = new SharedWorker('./shared_worker.js');

				sharedWorker.port.onmessage = ({
					data
				}) => {
					swwPanel.innerHTML += `<br>> ${new Date().toISOString()} <strong>${data}</strong>`;
				}

				swwPanel.innerText = '> Conectado...';
			}
		});

		swwStop.addEventListener('click', (e) => {
			if (sharedWorker) {
				sharedWorker.port.close();
				delete sharedWorker;
			}
		});
	}
	// #endregion Shared Worker

	// #region Service Worker
	const swPanel = $('#swCard .card-text small');
	const swRun = $('#swCard .btn.run');
	const swStop = $('#swCard .btn.stop');
	const swLoad = $('#swCard .btn.load');
	const swUrl = $('#swCard input');
	const swImg = $('#swCard img');

	swRun.addEventListener('click', (e) => {
		// Necessário recarregar a página caso o woeker se torne ativo
		// para garantir seu funcionamento
		navigator.serviceWorker.addEventListener('controllerchange', (e) => {
			window.location.reload()
		});

		navigator.serviceWorker.register('./service_worker.js')
			.then((registration) => {
				// força uma atualização caso idetifique que o script é diferente (em caso de worker já registrado anteriorment)
				registration.update();

				swPanel.innerHTML = `> ${new Date().toISOString()} <strong>Registrado</strong>`;
			}
		);
	});

	swStop.addEventListener('click', (e) => {
		navigator.serviceWorker.getRegistrations().then(function (registrations) {
			for (let registration of registrations) {
				// if(registration.active.scriptURL.indexOf('/service_worker.js') >=0){
				registration.unregister();
				swPanel.innerHTML += `<br>> ${new Date().toISOString()} <strong>Desregistrado</strong>`;
				window.location.reload();
				// 	break;
				// }
			}
		});
	});

	swLoad.addEventListener('click', (e) => {
		swImg.src = swUrl.value;
	});
	// #endregion Service Worker

	// #region Worklet
	const wPanel = $('#wCard .card-text small');
	const wSquare = $('#wCard .square');
	const wButton = $('#wCard .btn');

	wButton.addEventListener('click', (e) => {
		if ('paintWorklet' in CSS) {
			CSS.paintWorklet.addModule('worklet.js');

			wSquare.classList.add('worklet');
		}
	});
	// #endregion Worklet
})(document, window);
