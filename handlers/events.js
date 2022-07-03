const fs = require('fs');
const Eeventos = [];
module.exports = async (client) => {
    try {
        let cantidad = 0;
        const cargar_dir = (dir) => {
            const archivos_eventos = fs.readdirSync(`./eventos/${dir}`).filter((file) => file.endsWith('.js'));
            for (const archivo of archivos_eventos) {
                try {
                    const evento = require(`../eventos/${dir}/${archivo}`);
                    const nombre_evento = archivo.split(".")[0];
                    Eeventos.push(nombre_evento);
                    client.on(nombre_evento, evento.bind(null, client));
                    cantidad++
                } catch (e) {
                    console.log(e)
                }
            }
        }
        await ["client", "guild"].forEach(e => cargar_dir(e));
        console.log(`${cantidad} Eventos Cargados`);
        try { console.log(`Iniciando Sesión el Bot...`.yellow) } catch (e) { console.log(e) }
    } catch (e) {
        console.log(e)
    }
}

/*
* 🟢 Handler hecho por Mateo#9100
*/
