require('dotenv').config();
const fs = require('fs');
const { Client, Intents, MessageEmbed, Collection } = require('discord.js');


const wiryaIntents = new Intents();
wiryaIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES);
const client = new Client({ intents: wiryaIntents, allowedMentions: { parse: ['users', 'roles'], repliedUser: true } });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const apiKeyNew = process.env.API_KEY;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.login(process.env.DISCORDJS_WIRYA_TOKEN);


client.once('ready', () => {
	console.log('Ready!');

});

const prefix = '*';

client.on('messageCreate', async (message) => {
    const meConCase = message.content.toLowerCase();
    if (meConCase == 'pap dong wir') {
        const papEmbed = new MessageEmbed()
        .setTitle('Pap')
        .setImage('https://cdn.discordapp.com/attachments/426214215750254604/748890227904610476/Screenshot_2020-07-07-22-58-46-89.jpg');
		await message.reply({ embeds: [papEmbed] });
    } else if (meConCase == 'ijin lewat ndan') {
        await message.reply({ content: `siap ndan ${message.author}` });
    }


    let globalcommand = null;
    if (message.content.startsWith('*jumbo')) { globalcommand = true; }
    else if (message.content.startsWith(prefix) && message.author.bot === false) { globalcommand = true; }

    if (globalcommand) {
        const [command, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(' ');
        console.log(command);
        console.log(args);

        if ((command.toLowerCase() === 'jumbo' && args)) {

            let emojiID = null;
            const newargs = args.toString()
            if (newargs.includes('>') && newargs.includes('<')) {
             const newerargs = newargs.lastIndexOf('>');
             const calculation = newerargs - 18;
             emojiID = newargs.substring(calculation, newerargs);
             message.channel.send(`https://cdn.discordapp.com/emojis/${emojiID}`);
            }
            else { console.log('emote cannot be grabbed'); }

           }

        if ((command.toLowerCase() === 'createemoji' && args[0])) {

        if (!message.attachments.find(image => image.size < 256000)) {
            return message.channel.send('sizenya kegedean bre');
        }
        const color1 = Math.random() * 255;
        const color2 = Math.random() * 255;
        const color3 = Math.random() * 255;

        const embedSuccess = new MessageEmbed()
        .setDescription(`${message.author.username} berhasil membuat emote :${args[0]}:`)
        .setImage(message.attachments.last().url)
        .setColor([color1, color2, color3]);

        const image = message.attachments.last().url;
        message.guild.emojis.create(image, args[0])
        .then(message.channel.send({ embeds : [embedSuccess] }))
        .catch(reason => message.channel.send('kayaknya ada yg salah bre'));


     }
    }


});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'wah kyknya ada yang error bre pas jalanin commandnya 😡', ephemeral: true });
	}

});

client.on('interactionCreate', async menuResponse => {
    if (!menuResponse.isSelectMenu()) return;
        try {
        await menuResponse.deferUpdate();
        await menuResponse.editReply({ content : `Ini linknya bre : ${menuResponse.values}`, components : [] });

            } catch (error) {
            console.log(error);
                            }

});

// client.on('interactionCreate', async interaksiButton => {
// 	if (!interaksiButton.isButton()) return;
// 	console.log(interaksiButton);
// });
