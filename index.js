const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const fs = require('fs');
const users = new Set();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Raffle Bot is online!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch(command) {
		case 'ping':	client.commands.get('ping').execute(message, args);
						break;
		case 'participantes':	
						client.commands.get('users').execute(message, args, Discord, users);
						break;
		default:		message.channel.send('Comando no reconocido.');
	}
});

client.login(process.env.DISCORD_TOKEN);
