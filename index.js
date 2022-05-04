const pokeContainer = document.querySelector(".poke-container");
let pokemons = [];
const body = document.getElementById("body");

const detailForeground = getElementId("detail-foreground");
const detailBackground = getElementId("detail-background");
const closeMark = getElementId("close-mark");
const spriteOptions = getElementId("sprite-options");
const info = getElementId("info");
const spriteView = ["front_default","back_default","front_shiny","back_shiny"];
let shiny = 1;
let obj = {
    0: [0,1],
    1: [2,3]
}





const fetchPokemon = async () =>{
    for(let i = 1; i <= 150; i++){
        await getPokemon(i);
    }
}

const getPokemon = async id =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const res = await fetch(url);
    const pokemon = await res.json();     
    createPokeElement(pokemon);
    await pokemons.push(pokemon);   
} 

const requestedPokemon = async id =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const res = await fetch(url);
    const pokemon = await res.json();
    showPokemon(pokemon);
}

let poketest = document.getElementById("pokeTest");
if(poketest){
    let prueba = sessionStorage.getItem('pokeID');
    requestedPokemon(prueba);
}


function createPokeElement(pokemon){    

    const cardContainer = creaDivElement();
    addClass(cardContainer,"container-card");
    cardContainer.setAttribute('id',pokemon.id)

    const spriteContainer = creaDivElement();
    addClass(spriteContainer, "container-sprite");

    const sprite = creaImgElement();
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const numberId = creaParaElement();
    numberId.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    const pokeName = creaParaElement();
    addClass(pokeName, "pokemon-name");
    pokeName.textContent = pokemon.name;

    cardContainer.appendChild(spriteContainer);
    cardContainer.appendChild(numberId);
    cardContainer.appendChild(pokeName);

    pokeContainer.appendChild(cardContainer);

    let showDetails = document.getElementById(cardContainer.id);

    cardContainer.addEventListener("click",()=>{
        sessionStorage.setItem('pokeID',pokemon.id);
        window.open("pokemon.html", '_blank');
    })

}

function showPokemon(pokemon){    

    //sprites

    spriteView.forEach(s => {
        let sprImg = creaImgElement()
        sprImg.src = pokemon.sprites[s];
        addClass(sprImg,"spr-img");
        spriteOptions.appendChild(sprImg);
    });

    let sprImages = spriteOptions.querySelectorAll(".spr-img");

    let shinyBtn = creaElement("button");
    addClass(shinyBtn,"button-shiny");
    shinyBtn.textContent = "shiny";
    spriteOptions.appendChild(shinyBtn);

    toggleShiny(sprImages);
    
    shinyBtn.addEventListener("click",()=>{
        
        toggleShiny(sprImages);
        shiny = shiny == 0 ? 1 : 0;
        toggleShiny(sprImages);
    })

    //info

    const basicInfo = creaDivElement();
    addClass(basicInfo,"basic-info")

    const extendedInfo = creaDivElement();
    addClass(extendedInfo,"extended-info")

    info.appendChild(basicInfo);
    info.appendChild(extendedInfo);

    let names = creaDivElement();
    addClass(names, "name");
    names.textContent = pokemon.name;
    basicInfo.appendChild(names);

    let number = creaDivElement();
    addClass(number, "number");
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;
    basicInfo.appendChild(number);

    let types = creaDivElement()
    addClass(types, "types");

    for(let i = 0; i<pokemon.types.length;i++){
        const subtypes = creaDivElement();
        addClass(subtypes, "type-"+i);
        subtypes.textContent = pokemon.types[i].type.name;
        types.appendChild(subtypes);
    }
    basicInfo.appendChild(types);

    let height = creaDivElement();
    addClass(height, "height");
    height.textContent = (pokemon.height*10)+"cm";
    basicInfo.appendChild(height);

    let weight = creaDivElement();
    addClass(weight, "weight");
    weight.textContent = (pokemon.weight/10)+"kg";
    basicInfo.appendChild(weight);

    let moves = creaDivElement()
    addClass(moves, "moves");
    for(let i = 0; i<pokemon.moves.length;i++){
        const submoves = creaDivElement();
        addClass(submoves, "move-"+i);
        submoves.textContent = pokemon.moves[i].move.name;
        moves.appendChild(submoves);
    }
    extendedInfo.appendChild(moves);
    

    let stats = creaDivElement()
    addClass(stats, "stats");
    for(let i = 0; i<pokemon.stats.length;i++){
        const substats = creaDivElement();
        addClass(substats, "stat-"+i);
        substats.textContent = pokemon.stats[i].stat.name + ": " + pokemon.stats[i].base_stat;
        stats.appendChild(substats);
    }
    extendedInfo.appendChild(stats);
}

function toggleShiny(sprImages){
    obj[shiny].forEach(i => {
        sprImages[i].classList.toggle("hidden")
    });
}

function creaElement(element){
    return document.createElement(element);
}

function creaParaElement(){
    return document.createElement("p");
}
function creaDivElement(){
    return document.createElement("div");
}
function creaImgElement(){
    return document.createElement("img");
}

function getElementId(element){
    return document.getElementById(element)
}

function addClass(element, elementClass){
    return element.classList.add(elementClass);
}
function revClass(element, elementClass){
    return element.classList.remove(elementClass);
}

function attr(element, attribute, value){
    return element.setAttribute(attribute, value);
}


//closeInfo();
if(!poketest){
    fetchPokemon();
    console.log(pokemons)
}



