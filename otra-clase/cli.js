import { readdir, stat } from 'node:fs/promises';
import { format, join } from 'node:path';

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] || '.';

// 2. Formateo simple de los tamaños
const formatBytes = (size) => {
  if (size < 1024) return `${size} B`;
  return `${(size / 1024).toFixed(2)} KB`;
};

// 3. Leer los nombres, sin info
const files = await readdir(dir);

// 4. Recuperar la info de cada file
const entries = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name);
    const info = await stat(fullPath);

    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes(info.size),
    };
  }),
);

const folders = entries.filter((file) => file.isDir) || [];
const restOfFiles = entries.filter((file) => !file.isDir) || [];
const newEntries = folders.concat(restOfFiles);
const sortedEntries = newEntries.sort((a, b) => a.name - b.name);

// for (const entry of sortedEntries) {
//   // Renderizar la informacion
//   const icon = entry.isDir ? '📁' : '📄'
//   const size = entry.isDir ? '-' : `${entry.size}`
//   console.log(`${icon} ${entry.name.padEnd(25)} ${size}`);
// }

// TODO:
// 1. que aparezcan primero las carpetas
// 2. que esten en orden alfabetico

// filter
// tener en cuenta flags como --files-only o --dirs-only
const renderFilesAndFolders = () => {
  let listToShow = sortedEntries;
  if (process.argv.includes('--files-only')) {
    listToShow = sortedEntries.filter((file) => !file.isDir);
  } else if (process.argv.includes('--dirs-only')) {
    listToShow = sortedEntries.filter((file) => file.isDir);
  }

  for (const entry of listToShow) {
    // Renderizar la informacion
    const icon = entry.isDir ? '📁' : '📄';
    const size = entry.isDir ? '-' : `${entry.size}`;
    console.log(`${icon} ${entry.name.padEnd(25)} ${size}`);
  }
};

renderFilesAndFolders();
