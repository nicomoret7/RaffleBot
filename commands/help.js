module.exports = {
	name: 'rhelp',
	description:"Muestra una lista con los comandos disponibles.",
	execute(client, message, args, Discord) {
		// Embebbed response
			const messageEmbed = new Discord.MessageEmbed()
			.setColor('#FF8000')
			.setAuthor('Comandos disponibles', 'https://raw.githubusercontent.com/nicomoret7/RaffleBot/master/raffle_icon.png');
			//.setDescription(Array.from(commands.keys()).join('\n'));
			client.commands.forEach(command => {
				messageEmbed.addField(command.name, command.description);
			})

			message.channel.send(messageEmbed);
	}	
}
