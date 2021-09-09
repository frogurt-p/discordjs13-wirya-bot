const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cepu')
		.setDescription('tuduh baguan cepu'),

	async execute(interaction) {
		await interaction.reply({ content: `${interaction.member.user}, gw gk cepu ajg`, files: ['https://cdn.discordapp.com/attachments/748362014652367001/748380268234014811/20200827_100848.jpg'] });
	},
};