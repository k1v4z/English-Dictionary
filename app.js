const input = document.querySelector('.input');
const button = document.querySelector('.button-search');
const loading = document.querySelector('.loading');
const audios = document.querySelector('.audio');
const notFound = document.querySelector('.not-found');
const means = document.querySelector('.meaning');
const textSpeech = document.querySelector('.text');
const exampleText = document.querySelector('.example');
let information = document.querySelector('.information-container');
let isRender = document.querySelector('.render');
let apiKey = 'API';
button.addEventListener('click',() => {
    //clear 
    audios.innerHTML = '';
    notFound.innerHTML = '';
    //get data
    let apiKey =  input.value;
    getData(apiKey);
});
async function getData(word){
    if(!isRender){
        information.classList.remove('render');
    }
    loading.innerHTML = 'Loading...';
    loading.classList.add('is-loading');
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then((data) => {
        loading.classList.remove('is-loading');
        renderView(data);
    })
    .catch((error) => {
        loading.classList.add('is-loading');
        loading.innerHTML = 'Not found';
        console.log(error);
    });
}
function getMeaning(mean){
    const meaning = mean[0].meanings[0].definitions[0].definition;
    means.innerHTML = meaning;
    //console.log(meaning);
}
function getSpeech(speech){
    let speechs;
    speech[0].phonetics.forEach((phonetic) => {
        if(typeof phonetic.text === 'string'){
            speechs = phonetic.text;
        }
    });
    textSpeech.innerHTML = speechs;
}
function getExample(data){
    let examples;
    data[0].meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
            if(typeof definition.example === 'string'){
                examples = definition.example;
                return;
            }
        })
    });
    if(typeof examples !== 'undefined'){
        exampleText.innerHTML = 'Example: ' + examples;
    }else{
        exampleText.innerHTML = '';
    }
}
function getAudio(data){
    let audio;
    data[0].phonetics.forEach((phonetic) => {
        if(typeof phonetic.audio === 'string' && phonetic.audio != ''){
            audio = phonetic.audio;
        }   
    });
    const audioHTML = `
            <audio controls>
                <source src="${audio}" type="audio/ogg">
                Your browser does not support the audio element.
            </audio>
    `;
    audios.innerHTML = audioHTML;
}
function renderView(data){
    getMeaning(data);
    getSpeech(data);
    getExample(data);
    getAudio(data);
    information.classList.add('render');
}

