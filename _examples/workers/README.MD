# Javascript Workers
Quando falamos em Workers no javascript, estamos nos referindo as API **Web Worker**, **Shared Worker**, **Service Worker** e **Worklet**.

Workers nada mais são que scripts que mantém-se executando numa thread separada da thread principal do **Browser**, e, por esta característica, são úteis para executar operações que demandam uso intensivo da CPU.

> **Obs¹**: Estas API estão limitadas ao uso do Javascript no **Browser**. No contexto do **NodeJS** existem outras opções de execução de script em threads separadas, como *Worker Thread*, *Child Process* ou *Cluster*, porém foge do escopo proposto e não será coberto aqui nestes exemplos.

> **Obs²**: Como se trata de scripts executados de maneira isolada, é necessário que eles, os workers, estejam em arquivos separados.

## [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker>)
Web Worker (conhecido também como Worker Dedicado ou simplesmente Worker) não possui um caso de uso específico, além da execução de tarefas em background. Ideal para execução de script de longa duração e que não bloqueie a interface do usuário

#### Seu Uso

```JS
/* main.js */

/* Criando um worker */
const worker = new Worker('worker.js');

/* Enviando uma mensagem para o Worker */
worker.postMessage('Hey, worker!');

/* Recebendo uma mensagem do Worker */
worker.onmessage = ({data}) => console.info(`[Main] worker.onmessage: ${data}`);
```

```JS
/* worker.js */

/* Recendo a mensagem do script main.js */
self.onmessage = ({data}) => {
  console.info(`[Worker] self.onmessage: ${data}`);

  /* Enviando mensagem para script main.js */
  self.postMessage("Qual foi!?");
}
```


## [Shared Worker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)
Shared Worker se assemelha muito ao worker anterior em termos de propósitos de uso, porém ao contrário do Worker anterior pode ser acessado por diferentes contextos do browser (aba ou janela diferente, iFrames ou outros workers) desde que estejam no mesmo domínio que o iniciou.

#### Seu Uso

> **Dica:** No chrome, para debugar é necessário inspecionar o Shared Worker individualmente através da URL: **chrome://inspect/#workers**

```JS
/* main.js */

/* Criando um shared worker */
const worker = new SharedWorker('worker.js');

/* Enviando uma mensagem para o shared worker */
worker.port.postMessage('Hey, worker!');

/* Recebendo uma mensagem do shared worker */
worker.port.onmessage = ({data}) => console.info(`[main] worker.onmessage: ${data}`);
```

```JS
/* worker.js */

/* Registrando uma nova conexão */
this.onconnect = function({ports}) {
  /* Só a primeira porta no canal de mensagens do shared worker é usada */
  const port = ports[0];

  /* Recebendo uma mensagem de algum script já conectado */
  port.onmessage = ({data}) => console.info(`[worker] port.onmessage: ${data}`);

  /* Enviando uma mensagem para o script conectado */
  port.postMessage("Qual foi!?");
}
```

## [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
Service Worker é um tipo de worker diferente dos outros que vimos até agora, pois este funciona como um proxy entre o browser e o servidor.

#### Seu Uso
> **Dica:** No chrome, para debugar o Service Worker individualmente basta acessar da URL: **chrome://inspect/#service-workers**
```JS
/* main.js */

navigator.serviceWorker.register('worker.js');
```
```JS
/* worker.js */

// Se o worker for registrado com sucesso
// será feito o download do script e em seguida disparado o vento 'install'
self.addEventListener('install', function(event) {
  // Geralmente usado para configurar o cache
});

// Caso a instalação seja bem sucedida o evento 'activate' é disparado
self.addEventListener('activate', function(event) {
  // Geralmente usado para limpar cache antigo e atualizar o service worker
});

// Ouve as requisições do documento principal
self.addEventListener('fetch', function(event) {
  /* Alterando a resposta */
  event.respondWith('https://i.imgur.com/i56443n.png');
});
```

## [Worklet](https://developer.mozilla.org/en-US/docs/Web/API/Worklet)
Este, assim como o worker anterior, tem propósito de uso bem específico. O Worklet permite que nós, desenvolvedores, possamos acessar partes de baixo nível do pipeline de renderização do brower através de hooks. Além disso ele não pode ser usado para computação arbitrária (como os web e shared workers).

Para entender melhor este worker é necessário conhecer o processo de renderização de páginas no browser. Este é um assunto extenso e que por si só merece ser tratado de maneira isolada pois foge do escopo proposto e não será coberto aqui nestes exemplos. De qualquer modo exponho na imagem a seguir os passo do pipeline que precisamos nos preocupar.

![redering_pipeline](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

Há 4 tipos de Worklets e, assim como o Service Worker, eles não podem ser criados diretamente:
- **PaintWorklet**.
- **AudioWorklet**.
- **AnimationWorklet**.
- **LayoutWorklet**.

#### Seu Uso
*Com fins didáticos, só será usado o **PaintWorklet** como exemplo.*
```JS
/* main.js */

/* Criando um worker */
CSS.paintWorklet.addModule('worklet.js');
```

```JS
/* worklet.js */

registerPaint('CustomGradient', class {
  paint(ctx, size, properties) {
    var gradient = ctx.createLinearGradient(0, 0, 0, size.height / 3);

    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.7, "rgb(210, 210, 210)");
    gradient.addColorStop(0.8, "rgb(230, 230, 230)");
    gradient.addColorStop(1, "white");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height / 3);
  }
});
```

```CSS
/* style.css */

div {
  /* CustomGradient é o nome do Worklet registrado em worklet.js */
  background-image: paint(CustomGradient);
}
```


## Resumindo
- **Worker:** São scripts de propósito genérico com escopo global dedicado.
- **SharedWorker:** São scripts de propósito genérico com escopo global compatilhado.
- **Service Worker:** São proxies entre o browser e a rede.
- **Worklet:** São hooks para interceptação na pipeline de renderização das páginas.

### Referências
- https://developer.mozilla.org/en-US/docs/Web/API/Worker
- https://developer.mozilla.org/en-US/docs/Web/API/-SharedWorker
- https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker
- https://developer.mozilla.org/en-US/docs/Web/API/Worklet
- https://developers.google.com/web/fundamentals/performance/rendering/

**Exemplos*
- https://github.com/GoogleChromeLabs/houdini-samples
- https://squoosh.app/