import os from 'node:os';

console.log('Información del Sistema Operativo:')
console.log('---------------------------------')

console.log('Nombre del Sistema Operativo: ', os.platform());
console.log('Version del sistema operativo: ', os.version());
console.log('Arquitectura: ', os.arch())
console.log('CPUs', os.cpus());
console.log('Memoria libre', os.freemem() / 1024 / 1024);
console.log('Memoria total', os.totalmem() / 1024 / 1024);
console.log('Uptime', os.uptime() / 60 / 60 );


