const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

// [0] -> folder de node
// [1] -> folder del archivo actual
// [2] -> lo que le pasemos en consola
const folder = process.argv[2] ?? '.';

async function ls (folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (err) {
    console.error(pc.red(`❌ No se pudo leer el directorio ${folder}`));
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    // Une el folder actual con el nombre del archivo
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath); // stats -> información del archivo
    } catch (error) {
      console.error(pc.red(`❌ No se pudo leer el archivo ${filePath}`));
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    let fileType = isDirectory ? 'd' : 'f';
    const fileSize = stats.size.toString();
    const fileModified = stats.mtime.toLocaleString();

    if (fileType === 'd') {
      fileType = pc.magenta(fileType);
    } else {
      fileType = pc.white(fileType);
    }

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`;
  });

  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

ls(folder);