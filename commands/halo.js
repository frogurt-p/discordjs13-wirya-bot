const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('halo')
		.setDescription('Sapa penguasa babi : Baguan'),

	async execute(interaction) {
		return interaction.reply(`Halo bre ${interaction.member.user}`);
	},
};