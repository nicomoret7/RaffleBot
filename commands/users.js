module.exports = {
	name: 'participantes',
	description:"Inserta y lista los participantes.",
	execute(client, message, args, Discord, users) {
		if (args.length != 0)	{
			users.clear();
			for (idx in args) {
				users.add(args[idx]);
			}
		}	

		if (users.size != 0) {
			// Embebbed response
			const messageEmbed = new Discord.MessageEmbed()
			.setColor('#FF8000')
			.setTitle('Participantes')
			.setDescription(Array.from(users).join('\n'));

			message.channel.send(messageEmbed);
		} else message.channel.send("No has seleccionado ningún participante");
	}	
}
