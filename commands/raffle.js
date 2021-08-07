module.exports = {
	name: 'raffle',
	description:"Reparte las tareas entre los participantes aleatoriamente.",
	execute(message, args, Discord, users, tareas) {

		// Función de sorteo
		function raffle(users, tareas) {
			const res = new Map();
			var i = 0;
			var key;
			var value;

			while (tareas.size > 0) {
				key = Array.from(users.values())[i];
				console.log(`Key: ${key}`);
				value = Array.from(tareas.values())[Math.floor(Math.random()*tareas.size)];
				console.log(`Value: ${value}`);

				if (res.has(key)) res.set(key, [value].concat(res.get(key)));
				else res.set(key, [value]);
				tareas.delete(value);
				console.log(`Tamaño de tareas: ${tareas.size}`);
				i = (i+1)%users.size;
			}

			return res;
		}

		
		// Comprueba que los participantes y las tareas hayan sido asignadas
		if (users.size == 0 || tareas.size == 0) message.channel.send(
			new Discord.MessageEmbed()
			.setColor('#FF8000')
			.setTitle('Los participantes y las tareas han de estar asignadas.')
		);

		else {
			const resultados = raffle(users, tareas);	// Repartimos

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
