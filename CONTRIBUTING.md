# Diretrizes de Contribuição

[Início](README.md)

Observe que este projeto é lançado com um [Código de Conduta do Colaborador](contributor-code-of-conduct.md). Ao participar deste projeto, você concorda em cumprir seus termos.

## Como contribuir

Se você quiser contribuir, comece pesquisando as [issues](https://github.com/pitangagile/javascript-path/issues) e os [pull requests](https://github.com/pitangagile/javascript-path/pulls) para ver se alguém levantou uma ideia ou pergunta similar.

Se você não vê sua ideia listada e acha que ela se encaixa nos objetivos deste guia, siga um destes procedimentos:

* **Se sua contribuição for pequena,** como uma correção de erro de digitação, abra um pull request.

* **Se a sua contribuição for importante,** como um novo guia ou exemplo, comece por abrir uma issue primeiro. Dessa forma, outras pessoas podem analisar a discussão antes de você fazer qualquer trabalho.

> Caso você não saiba como abrir um pull request [veja aqui](https://github.com/firstcontributions/first-contributions/blob/master/translations/README.pt_br.md).

## Checklists

### Subindo um exemplo

0. Abra uma issue explicando o que você vai fazer;

1. Adicione seu exemplo como subpasta do diretório [`_examples`](https://github.com/pitangagile/javascript-path/tree/master/_examples);

	1.1. Caso o seu exemplo pertença a alguma categoria, adicione ele dentro da categoria;

	1.2. Caso não exista a categoria, faça a sugestão da nova categoria na issue que você abriu;

2. Crie um `.md` mínimo explicando o seu exemplo. Esse `.md` pode ser usado como descrição do seu PR. [Veja um exemplo](_examples/contributing/contributingExample/contributingExample.md).

	2.1 Este arquivo precisa ter os links para voltar para o `README.md`, como link para o início, e outro com o link para `examples.md`, como link para voltar;

	**Exemplo:**
	```markdown
	# Exemplos

	[Início](../../../README.md) |
	[Exemplos](../../../examples.md)
	...
	```

2. Referencie o seu exemplo no `examples.md`
	> [Veja na prática](examples.md)

	**Exemplo:**
	```markdown
	## Categoria

	* [Exemplo de Contribuição](_examples/contributing/contributingExample/contributingExample.md)
	...
	```
