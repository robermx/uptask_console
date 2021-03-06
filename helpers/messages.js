require('colors');

const showMenu = () => {
  return new Promise((res) => {
    console.clear();
    console.log('==============================='.blue);
    console.log('     Seleccione una Opción     '.bgBlue);
    console.log('===============================\n'.blue);

    console.log(`${'1.'.blue} Crear tarea`);
    console.log(`${'2.'.blue} Listar tereas`);
    console.log(`${'3.'.blue} Listar tereas completadas`);
    console.log(`${'4.'.blue} Listar tereas pendientes`);
    console.log(`${'5.'.blue} Completar tarea(s)`);
    console.log(`${'6.'.blue} Borrar tarea`);
    console.log(`${'7.'.blue} Salir\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question('Seleccione una opción: ', (opt) => {
      readline.close();
      res(opt);
    });
  });
};

const pause = () => {
  return new Promise((res) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`Presione ${'ENTER'.green} para contunuar`, () => {
      readline.close();
      res();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
