const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordTogether } = require('discord-together');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('buat activity di channel sound')
		.addChannelOption(option => option.setName('channel')
		.setDescription('mau nonton dimana bre')
		.setRequired(true))

		.addStringOption(stringop => stringop.setName('activity')
		.setDescription('activity yang mau dilakukan')
		.setRequired(true)
		.addChoice('youtube', 'youtube')
		.addChoice('chess', 'chess')
		.addChoice('checkers', 'checkers')
		.addChoice('betrayal', 'betrayal')
		.addChoice('fishing', 'fishing')
		.addChoice('lettertile', 'lettertile')
		.addChoice('wordsnack', 'wordsnack')
		.addChoice('doodlecrew', 'doodlecrew')
		.addChoice('spellcast', 'spellcast')
		.addChoice('awkword', 'awkword')
		.addChoice('puttparty', 'puttparty')),

	async execute(interaction, client) {
		const saidChannel = interaction.options.getChannel('channel');
		const stringop = interaction.options.getString('activity');
		const stringopLow = stringop.toLowerCase();
		client.discordTogether = new DiscordTogether(client);

		if (saidChannel.type == 'GUILD_VOICE') {
			// console.log(stringopLow);
			if(stringopLow == 'youtube' || stringopLow == 'poker'
			|| stringopLow == 'chess' || stringopLow == 'checkers'
			|| stringopLow == 'betrayal' || stringopLow == 'fishing'
			|| stringopLow == 'lettertile' || stringopLow == 'wordsnack'
			|| stringopLow == 'doodlecrew' || stringopLow == 'spellcast'
			|| stringopLow == 'awkword' || stringopLow == 'puttparty') {

				client.discordTogether.createTogetherCode(saidChannel.id, stringopLow)
				.then(async invite =>{
					return interaction.reply(`pencet link ini bre : ${invite.code}`);
				});
			} else {
				await interaction.reply('activity yang dimasukkin gak ada bre! goblok ya');
			}
		} else {
			await interaction.reply('Tolong pilih channel SUARA bre!!!!!');
		}


	},
};