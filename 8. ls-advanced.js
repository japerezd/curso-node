const fs = require('node:fs/promises');
const path = require('node:path');

// [0] -> folder de node
// [1] -> folder del archivo actual
// [2] -> lo que le pasemos en consola
const folder = process.argv[2] ?? '.';

async function ls (folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (err) {
    console.error(`No se pudo leer el directorio ${folder}`);
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath); // stats -> información del archivo
    } catch (error) {
      console.error(`No se pudo leer el archivo ${filePath}`);
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : '-';
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${file} ${fileSize.toString()} ${fileModified}`;
  });

  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

ls(folder);