import fs from 'fs/promises';
import { json } from 'stream/consumers';

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


//leer archivo

const leerarchivo = async () => {
  const data = await fs.readFile('personajes.json', 'utf-8');
  return JSON.parse(data);
};

//agregar al final
async function agregarAlFinal(){
  let personajes = await leerarchivo();

  const nuevo = {
    id: 999,
    fullName: 'Nuevo personaje'
  }
}
personajes.push(nuevo);
console.log ('Agregado al final:' , nuevo);
await fs.writeFile('personaje,json', JSON.stringify(personaje,null,2));

//agregar al inicio
async function agregarAlInicio(){
  let personajes= await leerarchivo();
  const personaje1= {id:1000, fullName: "inicio 1"};
  const personaje2= {id:1001, fullName: "inicio 2"};
  personajes.unshift(personajes1, personaje2);
  await fs.writeFile('personajes.json', JSON.stringify(personajes, null,2));
}

//eliminar primero
async function eliminarPrimero(){
  let personajes= await leerarchivo();
  const eliminado=personajes.shift();
  console.long('personaje elinado', eliminado);
  await fs.writeFile('personaje.json', JSON.stringify(personajes, null,2));

}
//crear archivo con id y nombre
async function crearArchivoReducido(){
  let personajes1= await leerarchivo();
  const filtrado=personajes.map(p=> ({
    id: p.id,
    fullName: p.fullName
  }));
  await fs.writeFile('personaje_reducido.json', JSON.stringify(filtrado, null,2));
  console.log('archivo reducido creado');
}
// ordenar y mostrar
async function ordenar(){
  const data= await fs.readFile('personaje_reducido.json', 'utf-8');
  let filtrados= JSON.parse(data);
  filtrado.sort((a, b) =>b.fullName.localeCompare(a.fullName));
  console.long('ordenados decendente: ');
  console.long(filtrados);
}

main();