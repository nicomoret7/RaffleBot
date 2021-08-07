const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const prefix = process.env.PREFIX;
const fs = require('fs');
const users = new Set();
const tareas = new Set();


// Escanea e importa los comandos implementados
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

// Notifica que el bot esté online
client.on('ready', () => {
	console.log('Raffle Bot is online!');
});



client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch(command) {
		case 'participantes':	
						client.commands.get('participantes').execute(message, args, Discord, users);
						break;
		case 'tareas':	client.commands.get('tareas').execute(message, args, Discord, tareas);
						break;
		case 'raffle':	client.commands.get('raffle').execute(message, args, Discord, users, tareas);
						break;
		case 'rclear':	
						client.commands.get('rclear').execute(message, args, Discord, users, tareas);
						break;
		case 'rhelp':	
						client.commands.get('rhelp').execute(message, args, Discord, client.commands);
						break;
		default:		message.channel.send('Comando no reconocido. Escribe `!rhelp` para ver los comandos disponibles');
	}
});

client.login(process.env.DISCORD_TOKEN);
