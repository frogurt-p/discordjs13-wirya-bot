const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gelud')
		.setDescription('trigger baguan'),

	async execute(interaction) {
		return interaction.reply('GW GABAKAL NGEGAS KALO LU GA NGEGAS DI GRUP');
	},
};