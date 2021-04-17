const LegendaryModel = require('../models/LegendaryModel');
const { v4: uuidv4 } = require('uuid');
const legendariesJson = '../public/databse/legendaries.json';
const fs = require('fs');

const LegendariesService = {
    listLegendaries: () => {
		fs.readFile(legendariesJson, 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			const legendariesList = JSON.parse(data);
			console.log(legendariesList);
			const novoLegendariesString = JSON.stringify(legendariesList, null, 2);
			console.log(novoLegendariesString);
		});
	},
	listPokemonData: (pokemonName) => {
		const pokemonList = LegendariesService.listLegendaries();
		let pokemon = pokemonList.find((item) => item.name === pokemonName);

		if (!pokemon) {
			pokemon = pokemonList[0];
		}

		return pokemon;
	},
	createLegendary: (name, description, type, healthPoints, specialAttack, defense, attack, experience, specialDefense) => {
		const newLegendary = new LegendaryModel(
			uuidv4(),
			name,
			description,
			type,
			healthPoints,
			specialAttack,
			defense,
			attack,
			experience,
			specialDefense,
		);
		return newLegendary;
	},
};

module.exports = LegendariesService;