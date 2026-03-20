"use strict";

console.log("Greetings!");

//Global Variables//
const form = document.getElementById("lookupForm");
const output = document.getElementById("output");
const input = document.getElementById("submit");

//Request GET data Function//
async function getPoke(url, id) {
    try {
        const res = await fetch(url + id)

        if(!res.ok){
            throw new Error("Failed getting Data")
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
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
async function main() {
    const data = await getPoke("https://pokeapi.co/api/v2/pokemon/", "ditto");
    renderPokemon(data)
    
}
main();