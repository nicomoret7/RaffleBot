const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const fs = require('fs');
const users = new Set();
const tareas = new Set();


// Escanea e importa los comandos implementados
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client, Discord, users, tareas);
})

client.login(process.env.DISCORD_TOKEN);
