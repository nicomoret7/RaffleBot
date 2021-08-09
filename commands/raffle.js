module.exports = {
	name: 'raffle',
	description:"Reparte las tareas entre los participantes aleatoriamente.",
	execute(client, message, args, Discord, users, tareas) {

		// Función de sorteo mejorada
		function raffle2(users, tareas) {
			const res = new Map();
			var parts = new Set(users);
			var tarecop = new Set(tareas);
			var key;
			var value;

			while (tarecop.size > 0) {
				if (parts.size == 0) parts = new Set(users);
				key = Array.from(parts.values())[Math.floor(Math.random()*parts.size)];
				console.log(`Key: ${key}`);
				value = Array.from(tarecop.values())[Math.floor(Math.random()*tarecop.size)];
				console.log(`Value: ${value}`);

				if (res.has(key)) res.set(key, [value].concat(res.get(key)));
				else res.set(key, [value]);
				tarecop.delete(value);
				parts.delete(key);
			}

			return res;
		}


		// Comprueba que los participantes y las tareas hayan sido asignadas
		console.log(`Users: ${users.size}, Tareas: ${tareas.size}`);
		if (users.size == 0 || tareas.size == 0) message.channel.send(
			new Discord.MessageEmbed()
			.setColor('#FF8000')
			.setTitle('Los participantes y las tareas han de estar asignadas.')
		);

		else {
			const resultados = raffle2(users, tareas);	// Repartimos

			const resEmbed = new Discord.MessageEmbed()
			.setColor('#FF8000')
			.setTitle('Resultados!');
			resultados.forEach((values, keys) => {
				resEmbed.addField(keys, values.join(', '));
			});

			message.channel.send(resEmbed);
		}
	}	
}
