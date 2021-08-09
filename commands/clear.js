module.exports = {
	name: 'rclear',
	description:"Limpia la lista de participantes, la de tareas o ambas: `!rclear participantes`, `!rclear tareas` y `!rclear` respectivamente.",
	execute(client, message, args, Discord, users, tareas) {
		if (args.length == 0 || args[0] === 'participantes') users.clear();

		if (args.length == 0 || args[0] === 'tareas') tareas.clear();

		message.channel.send(
			new Discord.MessageEmbed()
			.setColor('#FF8000')
			.setTitle('Cleared')
		);
	}	
}
