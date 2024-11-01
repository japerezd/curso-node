// const fs = require('node:fs');

// fs.readdir('.', (err, files) => {
//   if (err) {
//     console.error('Error al leer el archivo', err);
//     return;
//   }

//   files.forEach(file => {
//     console.log(file);
//   })
// });

const fs = require('node:fs/promises');
// Lee el directorio en el que se encuentra el folder/proyecto
fs.readdir('.')
  .then((files) => {
    files.forEach((file) => {
      console.log(file);
    });
  })
  .catch((err) => {
    if (err) {
      console.error('Error al leer el archivo', err);
      return;
    }
  });