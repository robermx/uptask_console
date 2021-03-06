const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.blue} Crear tarea`,
      },
      {
        value: '2',
        name: `${'2.'.blue} Listar tarea`,
      },
      {
        value: '3',
        name: `${'3.'.blue} Listar tereas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.blue} Listar tereas pendinetes`,
      },
      {
        value: '5',
        name: `${'5.'.blue} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6.'.blue} Borrar tarea`,
      },
      {
        value: '7',
        name: `${'7.'.blue} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('====================================='.blue);
  console.log('        Seleccione una Opción        '.bgBlue);
  console.log('=====================================\n'.blue);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para contunuar`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTasksDel = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.blue;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });
  choices.unshift({
    value: '0',
    name: '0.'.blue + ' Cancelar',
  });
  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListCheck = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.blue;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.compOn ? true : false,
    };
  });
  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleciones',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listTasksDel,
  confirm,
  showListCheck,
};
