import fs from 'fs/promises';

const BASE = 'https://thronesapi.com/api/v2/Characters';
--------// PUNTO 1 --------

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
 --------// PUNTO 2 --------

// Leer archivo
async function leerArchivo() {
  const data = await fs.readFile('personajes.json', 'utf-8');
  return JSON.parse(data);
}

// a) Agregar al final
async function agregarAlFinal() {
  console.log('\n Agregando personaje al final...');

  const data = await leerArchivo();

  data.push({
    id: 999,
    fullName: "Personaje Final"
  });

  await guardarEnArchivo(data);
}

// b) Agregar al inicio
async function agregarAlInicio() {
  console.log('\n Agregando personajes al inicio...');

  const data = await leerArchivo();

  data.unshift(
    { id: 1000, fullName: "Inicio 1" },
    { id: 1001, fullName: "Inicio 2" }
  );

  await guardarEnArchivo(data);
}

// c) Eliminar primero
async function eliminarPrimero() {
  console.log('\n Eliminando primer personaje...');

  const data = await leerArchivo();

  const eliminado = data.shift();

  console.log(' Eliminado:', eliminado);

  await guardarEnArchivo(data);
}

// d) Crear archivo reducido
async function crearArchivoReducido() {
  console.log('\n Creando archivo reducido...');

  const data = await leerArchivo();

  const reducido = data.map(p => ({
    id: p.id,
    nombre: p.fullName
  }));

  await fs.writeFile('soloNombres.json', JSON.stringify(reducido, null, 2));

  console.log(' Archivo soloNombres.json creado');
}

// e) Ordenar DESC
async function ordenarDescendente() {
  console.log('\n Ordenando nombres DESC...');

  const data = await fs.readFile('soloNombres.json', 'utf-8');
  const personajes = JSON.parse(data);

  personajes.sort((a, b) => b.nombre.localeCompare(a.nombre));

  console.log(' Ordenados:', personajes);
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

    // 👇 PUNTO 2
    // a) Agregar al final
    await agregarAlFinal();
    // b) Agregar al inicio
    await agregarAlInicio();
    // c) Eliminar primero
    await eliminarPrimero();
    // d) Crear archivo reducido
    await crearArchivoReducido();
    // e) Ordenar DESC
    await ordenarDescendente();

  } catch (error) {
    console.error(' Error:', error.message);
  }
}
