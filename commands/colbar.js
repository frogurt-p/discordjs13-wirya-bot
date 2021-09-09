const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordTogether } = require('discord-together');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('colbar')
		.setDescription('nyolbar')
		.addChannelOption(option => option.setName('channel')
		.setDescription('mau nonton dimana bre')
		.setRequired(true)),

	async execute(interaction, client) {
		const saidChannel = interaction.options.getChannel('channel');
		client.discordTogether = new DiscordTogether(client);

		if (saidChannel.type == 'GUILD_VOICE') {
			client.discordTogether.createTogetherCode(saidChannel.id, 'youtube')
			.then(async invite =>{
				return interaction.reply(`pencet link ini bre : ${invite.code}`);
			});
		} else {
			await interaction.reply('Tolong pilih channel SUARA bre!!!!!');
		}


	},
};