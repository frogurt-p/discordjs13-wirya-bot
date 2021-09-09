const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jumbo')
		.setDescription('Perbesar emoji')
		.addStringOption(option => option.setName('emoji')
		.setDescription('emoji yang mau diperbesar')
		.setRequired(true)),

	async execute(interaction) {
		const sentEmoji = interaction.options.getString('emoji');
		let emojiID = null;
		console.log(interaction.options.getString('emoji'));
		if (sentEmoji.includes('>') && sentEmoji.includes('<')) {
			const newEmoji = sentEmoji.lastIndexOf('>');
			const calculation = newEmoji - 18;
			emojiID = sentEmoji.substring(calculation, newEmoji);
			await interaction.reply(`https://cdn.discordapp.com/emojis/${emojiID}`);
		} else {
			await interaction.reply('ga ada emotenya bre');
		}

	},
};