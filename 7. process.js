// argumentos de entrada (en la consola)
console.log(process.argv);

// controlar el proceso y su salida
// 0 -> todo salio bien
// 1 -> hubo un error
// console.log(process.exit(1));

// podemos controlar eventos del proceso
// process.on('exit', () => {
//   // limpiar los recursos
// });

// current working directory
// nos dice desde DONDE estamos ejecutando el proceso (depende desde que ruta estamos ejecutándolo)
// no indica que estemos en este archivo
console.log(process.cwd());
