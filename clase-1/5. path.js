const path = require('node:path');

// Barra separadora de carpetas según SO
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath);
 // Regresa nombre de archivo en una ruta
const base = path.basename('/beto/Documents/Projects/file1.txt');
console.log(base);
// Obtener nombre de archivo en ruta SIN EXTENSION
const fileName = path.basename('/beto/Documents/Projects/file1.txt', '.txt');
console.log(fileName)

const extension = path.extname('my.image.png');
console.log(extension);