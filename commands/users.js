module.exports = {
	name: 'users',
	description:"selecciona los participantes",
	execute(message, args) {
		if (args.length == 0) {
			message.channel.send("No has seleccionado ningún participante");
		} else {
			const users = new Set();
			for (idx in args) {
				users.add(args[idx]);
			}
			message.channel.send("**Participantes:**")
			users.forEach((elem) => {
				message.channel.send(`- ${elem}`);
			})
		}
	}
}
