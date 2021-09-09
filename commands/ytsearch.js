const { SlashCommandBuilder } = require('@discordjs/builders');
const { YTSearcher } = require('ytsearcher');
const apiKey = process.env.API_KEY;
const searcher = new YTSearcher(apiKey);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ytsearch')
		.setDescription('cari video di youtube( chandra liem )')
		.addStringOption(option => option.setName('judul')
		.setDescription('judul video yang mau dicari')
		.setRequired(true)),

	async execute(interaction) {
		const title = interaction.options.getString('judul');
		const searchResult = await searcher.search(title);

		if (title) {
			return interaction.reply(`Ini bre URLnya : ${searchResult.first.url}`);
		} else {
			return interaction.reply('Tolong masukkan judulnya ya bre!');
		}

	},
};

