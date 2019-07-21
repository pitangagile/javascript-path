const CARDS_AMOUNT = 9;
const defaultHands = Array(CARDS_AMOUNT).fill({});

const ACE = 0;
const JACK = 11;
const QUEEN = 12;
const KING = 13;
const WILDCARD = 14;

const CLUBS = 'Paus';
const DIAMOND = 'Ouros';
const HEART = 'Copas';
const SPADES = 'Espadas';
const SETS = [CLUBS, DIAMOND, HEART, SPADES];


function generateCards(){
    const cards = defaultHands.map(() => getRandomCardNumber());

    let html = '';
    cards.forEach(card => {
        html += '<div class="card bg-light"><div class="card-body text-center"><p class="card-text">'
        html += card.number

        if (card.number !== 'Curinga') 
            html += ' - ' + card.set;

        html += '</p></div></div>';
    });

    document.getElementById("myCards").innerHTML = html;

    actionsForMap(cards);
    actionsForFilter(cards);
    actionsForFind(cards);
    actionsForReduce(cards);
}

function actionsForMap(cards){
    const mappedCards = cards.map(card => {
        let status = 'Carta Inválida';

        if (card.number > ACE && card.number < JACK) {
            status = 'Carta Válida';
        }

        return {...card, status};
    });

    addHtml(mappedCards, 'mappedCards');
}

function addHtml(cards, divId) {
    let html = '';
    cards.forEach(card => {
        html += '<span class="badge badge-light">'
        html += card.number
        if (card.number !== 'Curinga') html += ' - ' + card.set;
        if (card.status) html += '<p><strong>' + card.status + '</strong></p>';
        html += '</span>';
    });

    document.getElementById(divId).innerHTML = html;
}

function actionsForFilter(cards){
    generateHeartsCards(cards);
    generateSpadesCards(cards);
    generateDiamondsCards(cards);
    generateClubsCards(cards);
}

function generateHeartsCards(cards) {
    const filteredCards = cards.filter(card => filterBySet(card, HEART));
    addHtml(filteredCards, 'heartsCards');
}

function generateSpadesCards(cards) {
    const filteredCards = cards.filter(card => filterBySet(card, SPADES));
    addHtml(filteredCards, 'spadesCards');
}
function generateDiamondsCards(cards) {
    const filteredCards = cards.filter(card => filterBySet(card, DIAMOND));
    addHtml(filteredCards, 'diamondsCards');
}

function generateClubsCards(cards) {
    const filteredCards = cards.filter(card => filterBySet(card, CLUBS));
    addHtml(filteredCards, 'clubsCards');
}

function filterBySet(card, set) {
    return card.set === set && card.number !== 'Curinga';
}


function actionsForFind(cards){
    const wildCard = cards.find(card => card.number === 'Curinga') || null;
    let html = '<span class="badge badge-info"><h5>';
    html+= wildCard ? 'Mão com Curinga' : "Mão sem Curinga";
    html += '</h5></span>';
    document.getElementById('wildCard').innerHTML = html;
}

function actionsForReduce(cards){
    const totalScore = cards.reduce((sum, card) => {
        const number = (card.number > ACE && card.number < JACK) ? card.number : 0
        return sum + number;
    }, 0);

    let html = '<span class="badge badge-info">';
    html += '<h5>Total de pontos na mão: ' + totalScore + '</h5>';
    html += '</span>';
    document.getElementById('totalScore').innerHTML = html;
}

function getRandomCardNumber() {
    const maxNumber = WILDCARD + 1;
    let number = Math.floor(Math.random() * maxNumber);

    return {set: getRandomSet(), number: numberToDisplay(number), status: ''};
}

function getRandomSet() {
    return SETS[[Math.floor(Math.random() * SETS.length)]];
}

function numberToDisplay(number) {
    switch (number) {
        case ACE:
            return 'A';
        case JACK:
            return 'J';
        case QUEEN:
            return 'Q';
        case KING:
            return 'K'
        case WILDCARD:
            return 'Curinga'
        default:
            return number;
    }
}