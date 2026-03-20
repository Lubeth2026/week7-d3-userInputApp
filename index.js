"use strict";

console.log("Greetings!");

//Global Variables//
const form = document.getElementById("lookupForm");
const output = document.getElementById("output");
const idLookup = document.getElementById("idLookup");
const nameLookup = document.getElementById("nameLookup")

//Request GET data Function//
async function getPoke(url, pokemon) {
    try {
        const res = await fetch(url + pokemon)

        if(!res.ok){
            throw new Error("Failed getting Data")
        }

        const data = await res.json()
        return data
    } catch (error) {
        throw error
    }
}
function renderPokemon(data) {
  output.textContent = "";
  const img = document.createElement("img");
  img.src = data.sprites.front_default;
  img.alt = data.name;
  const id = document.createElement("p");
  id.textContent = data.id;
  const name = document.createElement("p");
  name.textContent = data.name;
  const weight = document.createElement("p");
  weight.textContent = data.weight;

  output.appendChild(img);
  output.appendChild(id);
  output.appendChild(name);
  output.appendChild(weight);
}
async function main(){
    form.addEventListener("submit", async(event)=>{
    event.preventDefault()
    output.textContent = "Loading..."

    try {
        const pokeName = nameLookup.value;
        const pokeID = idLookup.value;
        let query = pokeName || pokeID;
        const data = await getPoke("https://pokeapi.co/api/v2/pokemon/", query);
        renderPokemon(data);
    } catch (error) {
        output.textContent = "Error: Problem fetching Pokemon"
    }
    
})
}
main();