const Task = require('./task');
class Tasks {
  // _listado = {};
  get listArr() {
    const list = [];
    Object.keys(this._listado).forEach((key) => {
      const task = this._listado[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._listado = {};
  }

  deleteTask(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._listado[task.id] = task;
    });
  }

  createTask(desc) {
    const task = new Task(desc);
    this._listado[task.id] = task;
  }

  listComp() {
    console.log();
    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}.`.blue;
      const { desc, compOn } = task;
      const state = compOn ? 'completada'.green : 'pendiente'.yellow;
      console.log(`${idx} ${desc} :: ${state}`);
    });
  }

  listCompPend(comp) {
    console.log();
    let count = 0;
    this.listArr.forEach((task) => {
      const { desc, compOn } = task;
      const state = compOn ? 'completada'.green : 'pendiente'.yellow;
      if (comp) {
        if (compOn) {
          count += 1;
          console.log(`${(count + '.').blue} ${desc} :: ${compOn.blue}`);
        }
      } else {
        //pendientes
        if (!compOn) {
          count += 1;
          console.log(`${(count + '.').blue} ${desc} :: ${state}`);
        }
      }
    });
  }

  toggleComplete(ids = []) {
    ids.forEach((id) => {
      const task = this._listado[id];
      if (!task.compOn) {
        task.compOn = new Date().toISOString();
      }
    });
    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._listado[task.id].compOn = null;
      }
    });
  }
}

module.exports = Tasks;
