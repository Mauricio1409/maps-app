
// importacion
const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config()


// Obtencuion de ruta para crear las carpetas y archivos
const targetPath = './src/environments/environment.ts'
const targetPathDev = './src/environments/environment.development.ts'

// Verificacion de la existencia de la variable de entorno
if( !process.env['MAPBOX_KEY']){
  throw new Error('No Mapbox key found in environment variables')
}


// Contenido del archivo
const envFileContent = `
export const environment = {
  mapboxKey : "${process.env['MAPBOX_KEY']}",

};`


// Creacion de las carpetas y archivos
mkdirSync('./src/environments', { recursive: true })
writeFileSync(targetPath, envFileContent)
writeFileSync(targetPathDev, envFileContent)

