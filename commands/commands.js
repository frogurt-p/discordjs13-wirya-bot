const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Liat commands'),

	async execute(interaction) {
		const embed = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle('Wirya Bot Commands')
		.addFields(
			{ name : '/activity', value : 'bikin activity game, video, dll' },
			{ name : '/cepu', value : 'nuduh baguan cepu' },
			{ name : '/colbar', value : 'nonton youtube di channel' },
			{ name : '/commands', value : 'keluarin list commands' },
			{ name : '/foto', value : 'nyari foto di google' },
			{ name : '/gelud', value : 'sulut baguan bwt gelud' },
			{ name : '/halo', value : 'sapa baguan' },
			{ name : '/hina || nista', value : 'hina orang || nista orang' },
			{ name : '/jumbo || *jumbo', value : 'jumbo emoji' },
			{ name : '/komok', value : 'perbesar avatar user' },
			{ name : '/presence', value : 'print presence orang' },
			{ name : '/votenick', value : 'ubah nick orang dengan vote' },
			{ name : '/ytlist', value : 'cari video di youtube pake dropdown menu' },
			{ name : '/ytsearch', value : 'cari video pertama berdasarkan judul' },
			{ name : '*createemoji', value : 'bikin emoji dengan attachment gambar' },
			{ name : 'pap dong wir', value : 'pap baguan' },
			{ name : 'ijin lewat ndan', value : 'siap ndan' });
		return interaction.reply({ embeds : [embed] });
	},
};