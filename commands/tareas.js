module.exports = {
	name: 'tareas',
	description:"Introduce y lista las tareas.",
	execute(message, args, Discord, tareas) {
		if (args.length != 0)	{
			tareas.clear();
			for (idx in args) {
				tareas.add(args[idx]);
			}
		}	

		if (tareas.size != 0) {
			// Embebbed response
			const messageEmbed = new Discord.MessageEmbed()
			.setColor('#FF8000')
			.setTitle('Tareas')
			.setDescription(Array.from(tareas).join('\n'));

			message.channel.send(messageEmbed);
		} else message.channel.send("No has seleccionado ninguna tarea.");
	}	
}
