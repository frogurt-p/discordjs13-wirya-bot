const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { YTSearcher } = require('ytsearcher');
require('dotenv').config;
const apiKey = process.env.API_KEY;
const searcher = new YTSearcher(apiKey);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ytlist')
		.setDescription('nampilin list video berdasarkan judul ( chandra liem )')
		.addStringOption(option => option.setName('judul')
		.setDescription('judul video yang mau dicari')
		.setRequired(true)),

	async execute(interaction) {
		function makeid(length) {
			let result = '';
			let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let charactersLength = characters.length;
			for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
			return result;
		}
		const title = interaction.options.getString('judul');
		const menuKey = makeid(5);


		if (title) {
			const menuPilihan = new MessageSelectMenu();
            const row = new MessageActionRow()
			.addComponents(
			menuPilihan
			.setCustomId(menuKey)
			.setPlaceholder(`Pilih judul video untuk ${title}`),
			);

			const searchResult = await searcher.search(title);
			const resLength = searchResult.currentPage.length;
            let videoKe = null;

			for (let i = 0; i < resLength; i++) {
			videoKe = searchResult.currentPage[i];
			const cutTitle = videoKe.title.substring(0, 100);
			row.components[0].addOptions({ label : cutTitle, description : videoKe.channelTitle, value : videoKe.url, emoji : '848388614123683840' });
			}
			await interaction.reply({ content : 'Silahkan pilih videonya bre', components : [row] });

		} else {
			await interaction.reply('Tolong masukkan judulnya ya bre!');
		}


	},


};

