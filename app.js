require('colors');
const { saveDB, readDB } = require('./helpers/saveFile');
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksDel,
  confirm,
  showListCheck,
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();
  const tasksDB = readDB();
  if (tasksDB) {
    // load tasks
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await readInput('Descripción:');
        tasks.createTask(desc);
        break;
      case '2':
        tasks.listComp();
        break;
      case '3':
        tasks.listCompPend(true);
        break;
      case '4':
        tasks.listCompPend(false);
        break;
      case '5':
        const ids = await showListCheck(tasks.listArr);
        tasks.toggleComplete(ids);
        break;
      case '6':
        const id = await listTasksDel(tasks.listArr);
        if (id !== '0') {
          const ok = await confirm('¿Estas Seguro?');
          if (ok) {
            tasks.deleteTask(id);
            console.log('Tarea eliminada correctamente');
          }
        }
        break;
    }

    saveDB(tasks.listArr);

    await pause();
  } while (opt !== '7');
};

main();
