import fs from 'fs/promises';

const BASE = 'https://thronesapi.com/api/v2/Characters';

// a) GET
async function obtenerTodosLosPersonajes() {
  console.log('\n Obteniendo todos los personajes...');
  const response = await fetch(BASE);
  const personajes = await response.json();
  console.log(` Se encontraron ${personajes.length} personajes.`);
  console.log(personajes);
  return personajes;
}

// b) POST 
async function agregarPersonaje() {
  console.log('\nAgregando un nuevo personaje...');
  const nuevoPersonaje = {
    firstName: "Lionel",
    lastName: "Messi",
    fullName: "Lionel Messi",
    title: "Rey del fuchibol",
    family: "Argentina",
  };

  const response = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoPersonaje)
  });

  const text = await response.text(); 
  console.log(' Personaje agregado. Status:', response.status);
  console.log('Respuesta del servidor:', text || '(sin contenido)');
}

// c) GET
async function obtenerPersonajePorId(id) { 
  console.log(`\n Buscando personaje con id: ${id}...`);
  const response = await fetch(`${BASE}/${id}`);
  const personaje = await response.json();
  console.log(' Personaje encontrado:', personaje);
  return personaje;
}

// d) Guardar datos en archivo JSON 
async function guardarEnArchivo(datos) {
  console.log('\n Guardando datos en personajes.json...');
  await fs.writeFile('personajes.json', JSON.stringify(datos, null, 2), 'utf-8');
  console.log(' Archivo guardado correctamente.');
}

// main
async function main() {
  try {
    // a) Obtener personajes
    const personajes = await obtenerTodosLosPersonajes();

    // b) Agregar nuevo personajes
    await agregarPersonaje();

    // c) Buscar por ID 
    await obtenerPersonajePorId(1);

    // d) Guardar los datos del primer GET
    await guardarEnArchivo(personajes);

  } catch (error) {
    console.error(' Error:', error.message);
  }
}

main();