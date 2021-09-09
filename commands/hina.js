const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hina')
        .setDescription('hina orang')
        .addUserOption(option => option.setName('nama')
        .setDescription('orang buat dihina')),

	async execute(interaction) {

        const umpatan = ['kontol', 'anjing', 'memek', 'titit', 'goblog', 'bego', 'kontit',
        'bangsat', 'entot', 'tolol', 'idiot', 'tai', 'brengsek',
        'monyet', 'babi', 'anjeng', 'bajingan', 'geblek', 'gila', 'kontil', 'durjana', 'peki', 'peju',
        'kuntul', 'paok', 'biji', 'peler', 'konMek', 'Mekon', 'entodz', 'GUOBLOK!', 'biadab', 'pekok'];

        let msgCon = null;
        const randomizednumber = Math.floor(Math.random() * umpatan.length + 0);
        // interaction.options.getUser('nama').id === null
        // msgCon = `siapa yang mau dihina?, ${umpatan[randomizednumber]}! ${interaction.member.user}`
        if (!interaction.options.getUser('nama')) {
            msgCon = `yee, tulis siapa yang mau dihina, ${umpatan[randomizednumber]}! ${interaction.member.user}`;
        }
        else if (interaction.options.getUser('nama').id == '754878196167475220') {
            msgCon = `Loe kira gw tolol? ${interaction.member.user}`;
        }
        else { msgCon = `${umpatan[randomizednumber]} lo ${interaction.options.getUser('nama')}`;}

		interaction.reply({ content: msgCon });
	},
};