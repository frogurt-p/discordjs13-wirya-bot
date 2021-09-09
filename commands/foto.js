const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const gis = require('g-i-s');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('foto')
		.setDescription('search ftoto dari google')
		.addStringOption(option => option.setName('foto')
		.setDescription('foto yang ingin dicari')
		.setRequired(true)),

	async execute(interaction) {
		const query = interaction.options.getString('foto');
		let photoFrame = new MessageEmbed()
		.setTitle('PhotoGuan')
		.setDescription(`ini fotonya bre untuk ${query}`);

		gis(query, gisResult);
		// await interaction.reply({ embeds : [photoFrame] });
		function gisResult(err, logResult) {
			let arrPos = 0;
			let picture = null;
			if (err) {
				console.log(err);
			} else {
				picture = logResult[arrPos];
				photoFrame.setImage(picture.url);
				interaction.reply({ embeds: [photoFrame] });
				// photoFrame.setImage(picture.url);
			}
			console.log(picture.url);

		}
	},
};