const url = "https://pokeapi.co/api/v2/pokemon";
const namePokemon = document.querySelector('.namePokemon');
const numberPokemon = document.querySelector('.numberPokemon');
const pokemonImg = document.querySelector('.pokemonImg');
const form = document.querySelector('.form');
const srcpokemon = document.querySelector('.srcpokemon');
const buttomPrev = document.querySelector('.b1');
const buttomNext = document.querySelector('.b2');
const soundPlink = document.querySelector('.Plink');
const type = document.querySelector('.type');
let searchPokemon = 1; 

const dataAPI = async (pokemon) => {
    const response = await fetch(`${url}/${pokemon}`);
    if (response.status === 200){
        const data =  await response.json();
        return data; 
    }    

}

const Pokemon = async (pokemon) => {
    namePokemon.innerHTML = 'Carregando...';
    numberPokemon.innerHTML = '';
    type.innerHTML = '...';

    const data = await dataAPI(pokemon);

    if (data){
        namePokemon.innerHTML = data.name;
        numberPokemon.innerHTML = data.id;
        pokemonImg.src = data["sprites"]['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;

        const types = data.types.map(typeData => typeData.type.name);
        type.innerHTML = types.join('/');
                    
    }
    else {
        namePokemon.innerHTML = 'not found'; 
        numberPokemon.innerHTML = '';
        pokemonImg.src = '';
        type.innerHTML = 'error';
        
    }          
}

form.addEventListener('submit',(event) => {
    event.preventDefault();
    soundPlink.play();
    Pokemon(srcpokemon.value.toLowerCase());

});




buttomPrev.addEventListener('click',() => {
    if (searchPokemon > 1){
        soundPlink.play();
        searchPokemon -= 1;
        Pokemon(searchPokemon);
    }

})

buttomNext.addEventListener('click',() => {   
    soundPlink.play();
    searchPokemon += 1;
    Pokemon(searchPokemon);   
})

Pokemon(searchPokemon);








