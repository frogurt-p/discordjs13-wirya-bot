const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('komok')
		.setDescription('Print komok orang')
		.addUserOption(option => option.setName('user')
		.setDescription('user yang ingin diprint komoknya')
		.setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const userID = interaction.options.getUser('user').id;
		// const serverMember = interaction.guild.members.cache.find(member => member.user.id == userID);
		const urlbuild = `https://cdn.discordapp.com/avatars/${userID}/${user.avatar}.png?size=1024`;

		const emb = new MessageEmbed()
		.setTitle(`${user.username} #${user.discriminator}`)
		.setImage(urlbuild);

		await interaction.reply({ embeds : [emb] });


		// if (!serverMember.presence || !serverMember.presence.activities[0]) {
		// 	return interaction.reply('Presencenya kosong bre');
		// }
		// if (serverMember.presence.activities[0].type == 'CUSTOM') {
		// 	await interaction.reply(`${serverMember} ${serverMember.presence.activities[0].state}`);
		// } else {
		// const presenceActivities = serverMember.presence.activities[0].name;
		// const presenceType = serverMember.presence.activities[0].type.toLowerCase();
		// const substringPresenceType = presenceType.substring(1);
		// const capitalizedPresenceType = presenceType.slice(0, 1).toUpperCase();
		// await interaction.reply(`${serverMember} ${capitalizedPresenceType}${substringPresenceType} ${presenceActivities}`);
		// }

	},
};