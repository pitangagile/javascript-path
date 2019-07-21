const rgb = [255, 200, 0];
const rgbOneValue = [200];

function exibirDadosDoArray() {
    console.log("-- Sem uso do destructuring precisamos dizer explicitamento o index do array (arr[index])");
    console.log('Vermelho: ', rgb[0]);
    console.log('Verde: ', rgb[1]);
    console.log('Azul: ', rgb[2]);
    console.log('');
}

function arrayDestructuring() {
    const [red, green, blue] = rgb;
    console.log("-- Com uso do destructuring podemos definir nome as variáveis desta forma: [var_1, var_2, var_3] = arr");
    console.log('Vermelho: ', red);
    console.log('Verde: ', green);
    console.log('Azul: ', blue);
    console.log('');
}

function arrayDestructuringDefaultValue() {
    const [red = 255, green, blue = 255] = rgbOneValue;
    console.log("-- Podemos tabém definir valores padrão caso o array não contenha o index desejado ([var_1 = value, var2 = value] = arr)");
    console.log('Vermelho: ', red);
    console.log('Verde: ', green);
    console.log('Azul: ', blue);
    console.log('');
}

function skippingItems() {
    const [,, blue] = rgb;
    console.log("-- Podemos ignorar posições do array utilizando a ',' ([,, var_3] = arr => desta forma pulamos duas posições do array)");
    console.log('Azul: ', blue);
    console.log('');
}

function swappingVariables() {
    let width = 300;
    let height = 400;

    console.log("-- Com destructuring a troca de valores fica mais fácil bastando apenas fazer a atribuição desta forma: [var_1, var_2] = [value2, value1]");

    console.log('*********************')
    console.log('Antes')
    console.log('Largura: ', width);
    console.log('Altura: ', height);

    [width, height] = [height, width];

    console.log('*********************')
    console.log('Depois')
    console.log('Largura: ', width);
    console.log('Altura: ', height);
    console.log('');
}

function neastedArrayDestructuring() {
    const cores = ['#FF00FF', [255, 0, 255], 'rgb(255, 0, 255)'];
    const [hex, [red, green, blue]] = cores;

    console.log("-- Podemos ainda destruturar arrays aninhados ([var_1, var_2, [var_3, var_4]] = arr)");
    console.log('Cor em hexadecimal: ', hex);
    console.log('Vermelho: ', red);
    console.log('Verde: ', green);
    console.log('Azul: ', blue);
    console.log('');
}



exibirDadosDoArray();
arrayDestructuring();
arrayDestructuringDefaultValue();
skippingItems();
swappingVariables();
neastedArrayDestructuring();
