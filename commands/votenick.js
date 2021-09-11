const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageButton, MessageEmbed } = require('discord.js');
const { MessageActionRow } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('votenick')
        .setDescription('vote ubah nama orang')
        .addUserOption(option => option.setName('user')
        .setDescription('user yang ingin dirubah nicknya')
        .setRequired(true))

        .addStringOption(optionTwo => optionTwo.setName('newnick')
        .setDescription('nick yang baru')
        .setRequired(true)),

	async execute(interaction) {
        const kollektor = interaction.channel.createMessageComponentCollector({ componentType : 'BUTTON', time : 60000 });
        let voteYes = 0;
        let voteNo = 0;
        let voterID = [];
        let mentionedUser = null;
        let oldInteraction = null;
        const userID = interaction.options.getUser('user').id;
        const memberServer = interaction.guild.members.cache.find(member => member.user.id == userID);
        const newNick = interaction.options.getString('newnick');
        console.log(memberServer.displayName);
        let embedName = new MessageEmbed()
        .setColor('#ffee00')
        .setTitle('Ubah Nama')
        .setDescription(`Old name   : **${memberServer.displayName}** 
                         New name   : **${newNick}**
                         Voted yes  : ${voteYes} Voted no : ${voteNo}
                         Status     : In Progress`);
        const row = new MessageActionRow()
        .addComponents(
                new MessageButton()
                .setCustomId('yes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),
        ).addComponents(
                new MessageButton()
                .setCustomId('no')
                .setLabel('No')
                .setStyle('DANGER'),
        );

        kollektor.on('collect', async i => {
                oldInteraction = i;
                if (i.customId === 'yes' && !voterID.includes(i.user.id)) {
                        voteYes++;
                        mentionedUser = interaction.options.getUser('user');
                        voterID.push(i.user.id);
                        embedName.setDescription(`Old name : **${memberServer.displayName}** 
                                                New name   : **${newNick}**
                                                Voted yes  : ${voteYes} Voted no : ${voteNo}
                                                Status     : In Progress`);
                        await i.deferUpdate();
                        await i.editReply({ embeds : [embedName], components :[row] });
                } else if (i.customId === 'no' && !voterID.includes(i.user.id)) {
                        voteNo++;
                        voterID.push(i.user.id);
                        embedName.setDescription(`Old name : **${memberServer.displayName}** 
                                                New name   : **${newNick}**
                                                Voted yes  : ${voteYes} Voted no : ${voteNo}
                                                Status     : In Progress`);
                        await i.deferUpdate();
                        await i.editReply({ embeds : [embedName], components :[row] });
                } else {
                        await i.reply({ content: 'lo udah ngevote ya bre!', ephemeral : true });
                }
                console.log(voteYes, voteNo);
        });

        kollektor.on('end', async collected => {
                const newInteraction = collected.find(key => key.type);
                if (!newInteraction) {
                        embedName.setDescription(`Old name : **${memberServer.displayName}** 
                                                New name   : **${newNick}**
                                                Voted yes  : ${voteYes} Voted no : ${voteNo}
                                                Status     : Finished
                                                Result     : Unsuccessful`);
                        await interaction.editReply({ embeds : [embedName], components :[] });
                        return;
                }
                if (newInteraction.deferred != true) {
                       await newInteraction.deferUpdate();
                }
                if (voteYes > voteNo) {
                        // console.log(collected.find(key => key.type));
                        memberServer.setNickname(newNick);
                        embedName.setDescription(`Old name : **${memberServer.displayName}** 
                                                New name   : **${newNick}**
                                                Voted yes  : ${voteYes} Voted no : ${voteNo}
                                                Status     : Finished
                                                Result     : Success`);
                        await newInteraction.editReply({ embeds : [embedName], components :[] });
                } else {
                        embedName.setDescription(`Old name : **${memberServer.displayName}** 
                                                New name   : **${newNick}**
                                                Voted yes  : ${voteYes} Voted no : ${voteNo}
                                                Status     : Finished
                                                Result     : Unsuccessful`);
                        await newInteraction.editReply({ embeds : [embedName], components :[] });
                }
        });

        await interaction.reply({ embeds : [embedName], components :[row] });

	},

};