const cervejaLager = {
    tipo: 'Lager',
    descricao: 'São as cervejas de baixa fermentação. Elas são feitas com um levedo que age sob baixas temperaturas e na parte inferior do tanque de fermentação',
    combinacao: [' frango assado', 'peixe', 'churrasco', 'batata frita', 'pizza '],
    infoVenda: {
        marca: 'Cerveja Fürstenberg Premium Lager',
        preco: 'R$ 9,90',
        estabelecimento: 'cervejaria Fürstenberg'
    }
    
};
const cervejaPilsen = {
    tipo: 'Pilsen',
    descricao: 'Cerveja transparente, clara e leve no paladar.',
    combinacao: [' nozes', 'castanha', 'castanha do Pará', 'amêndoas', 'amendoim '],
    infoVenda: {
        marca: 'Praga Premium Pils Czech',
        preco: 'R$ 14,90',
        estabelecimento: 'cervejaria Privovar Samson'
    }
}
const cervejaBock = {
    tipo: 'Bock',
    descricao: 'Avermelhada, bastante maltada e com teor alcoólico alto.',
    combinacao: ['carne de porco', 'salsichas alemãs', 'queijo gorgonzola'],
    infoVenda: {
        marca: 'Ayinger Celebrator',
        preco: 'R$ 23,90',
        estabelecimento: 'cervejaria Brauerei Aying'
    }
}

const cervejaAle = {
    tipo: 'Ale',
    descricao: 'O levedo com que é produzida age em temperaturas mais elevadas e na superfície do líquido, por isso, elas também são chamadas cervejas de alta fermentação',
    combinacao: ['pizza de calabresa', 'bolo de carne', 'hamburguer'],
    infoVenda: {
        marca: 'Coopers Original Pale Ale',
        preco: undefined,
        estabelecimento: 'cervejaria Coopers'
    },
    
}

const cervejaBarleyWine = {
    tipo: 'BarleyWine',
    descricao: 'É uma ale de origem inglesa, bem maltada e bastante alcoólica. Licorosa e sem gás',
    infoVenda: {
        marca: 'Cerveja Pagan Dragon’s Blood Wine'
    }
}

function exibirDadosDaCerveja() {
    console.log("-- Sem uso do destructuring só podemos acessar as propriedades de um objeto através do mesmo (objeto.attr_1, objeto.attr_2 etc), fazendo com que haja repetição de código.");
    console.log('Tipo: ' + cervejaLager.tipo);
    console.log('Descrição: ' + cervejaLager.descricao);
    console.log('Combinação: ' + cervejaLager.combinacao);
    console.log('');
}

function destructuringDadosCerveja(cerveja) {
    let { tipo, descricao, combinacao = ['Não especificado'], origem } = cerveja;
    
    console.log('-- Com o uso do destructuring podemos extrair do objeto apenas os atributos que desejamos para variáveis ({attr_1} = objeto).');
    console.log('-- Podendo declarar valor padrão para quando o atributo não estiver definido no objeto ({attr_1, attr_2 = valorPadrao} = objeto).');
    console.log('Tipo: ' + tipo);
    console.log('Descrição: ' + descricao);
    console.log('Combinação: ' + combinacao);
    console.log('Origem: '+ origem);
    console.log('');
}

function nestedDestructuring(cerveja) {
    const {tipo, infoVenda:{marca, preco = 'Não informado'}} = cerveja;

    console.log('-- Podemos também extrair objetos aninhados ({attr_1, attr_2:{attr_2_1, attr_2_2}} = objeto).');
    console.log('Tipo: ' + tipo);
    console.log('Marca: ' + marca);
    console.log('Preço: ' + preco);
    console.log('');
}

function changingVariableNameOnDestructuring(param) {
    cervejaBarleyWine ['tipo a'] = 'exemplo';
    const {'tipo a': tipoDaCerveja, 
    infoVenda: {marca: marcaDaCerveja, preco: precoDaCerveja = 'Não informado'}
    } = cervejaBarleyWine;

    console.log('-- E podemos alterar o nome do atributo que estamos extraindo ({attr_1: novoAtributo} = objeto)');
    console.log('Tipo: ' + tipoDaCerveja);
    console.log('Marca: ' + marcaDaCerveja);
    console.log('Preço: ' + precoDaCerveja);
    console.log('');
}

exibirDadosDaCerveja();
destructuringDadosCerveja(cervejaPilsen);
destructuringDadosCerveja(cervejaBarleyWine);
nestedDestructuring(cervejaAle);
nestedDestructuring(cervejaBarleyWine);
changingVariableNameOnDestructuring();
