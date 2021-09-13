const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('paduka')
		.setDescription('paduka stats'),

	async execute(interaction) {
		const userID = '484651974659145740';
		const serverMember = interaction.guild.members.cache.find(member => member.user.id == userID);
		console.log(serverMember.presence);
		if (!serverMember.presence || serverMember.presence.status == 'offline') {
			return interaction.reply('Paduka sedang offline!');
		} else if (serverMember.presence.status == 'online') {
			await interaction.reply(`${serverMember} sedang online!,🧎‍♂️ bicaralah dengan hormat 🧎‍♂️ `);
		} else if (serverMember.presence.status == 'idle') {
			await interaction.reply('Paduka sedang idle! mohon panggil beliau di lain waktu');
		} else if (serverMember.presence.status == 'dnd') {
			await interaction.reply('Jangan ganggu paduka ya bre!');
		}

	},
};