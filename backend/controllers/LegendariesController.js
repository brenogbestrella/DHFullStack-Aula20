const LegendariesService = require('../services/LegendariesService');
const legendariesJson ='./public/database/legendaries.json';
const fs = require('fs');

const controller = {
    read: (req, res) => {
        fs.readFile(legendariesJson, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const legendariesList = JSON.parse(data);
            return res.json(legendariesList);
        });
    },
    
    readPokemon: (req, res) => {
        const { id } = req.params;
        fs.readFile(legendariesJson, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const legendariesList = JSON.parse(data);
            const legendaryFilter = legendariesList.filter((item) => {
                return item.id == id;
            });
            if (legendaryFilter.length == 0) {
                return res.status(400).send('O Pokémon ' + id + ' não existe');
            } else {
                console.log(legendaryFilter);
                return res.json(legendaryFilter);
            }
        });
    },

    create: (req, res) => {
        const { 
            name, 
            description, 
            type, 
            healthpoints, 
            specialAttack, 
            defense, 
            attack, 
            experience, 
            specialDefense
        } = req.body;

        const legendary = LegendariesService.createLegendary(
            name, 
            description, 
            type, 
            healthpoints, 
            specialAttack, 
            defense, 
            attack, 
            experience, 
            specialDefense
        );
        fs.readFile(legendariesJson, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const legendariesList = JSON.parse(data);
            legendariesList.push(legendary);
            const newLegendariesSting = JSON.stringify(legendariesList, null, 2);
            fs.writeFileSync(LegendariesJson, newLegendariesSting, (err) => {
                if (err) {
                    return console.error(err);
                } else {
                    return res.json(legendary);
                }
            })
        })
    },
    update: (req, res) => {
        fs.readFile(legendariesJson, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            };
        });
        const { id } = req.params;
        const { 
            name, 
            description, 
            type, 
            healthpoints, 
            specialAttack, 
            defense, 
            attack, 
            experience, 
            specialDefense
        } = req.body;
        const legendariesList = JSON.parse(data);
        const legendaryFilter = legendariesList.findIndex((item) => item.id == id);


        if (legendaryFilter == -1) {
            return res.status(400).send('O Pokémon ' + id + ' não existe.');
        } else {
            legendariesList[legendaryFilter].name = name;
            legendariesList[legendaryFilter].description = description;
            legendariesList[legendaryFilter].type = type;
            legendariesList[legendaryFilter].healthPoints = healthPoints;
            legendariesList[legendaryFilter].specialAttack = specialAttack;
            legendariesList[legendaryFilter].defense = defense;
            legendariesList[legendaryFilter].attack = attack;
            legendariesList[legendaryFilter].experience = experience;
            legendariesList[legendaryFilter].specialDefense = specialDefense;

            console.log(legendariesList);

            const novaLegendariesString = JSON.stringify(legendariesList, null, 2);
            fs.writeFileSync(legendariesJson, novaLegendariesString, (err) => {
                if (err) {
                    return console.error(err);
                }
            });
            return res.json(legendariesList[legendaryFilter]);
        }   
    },
    delete: (req, res) => {
		fs.readFile(legendariesJson, 'utf8', (err, data) => {
			if (err) {
				return console.log(err);
			}
        });
		const { id } = req.params;
		const { 
            name, 
            description, 
            type, 
            healthpoints, 
            specialAttack, 
            defense, 
            attack, 
            experience, 
            specialDefense
        } = req.body;
		const legendariesList = JSON.parse(data);

			const legendaryFilter = legendariesList.findIndex((item) => item.id == id);

			if (legendaryFilter == -1) {
				return res.status(400).send('O Pokémon ' + id + ' não existe');
			} else {
				const deleteLegendary = legendariesList.splice(legendaryFilter, 1);

				const LegendariesString = JSON.stringify(legendariesList, null, 2);
				fs.writeFileSync(legendariesJson, LegendariesString, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
				return res.json(deleteLegendary);
			}
	},
};

module.exports = controller;