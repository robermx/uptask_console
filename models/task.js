const { v4: uuidv4 } = require('uuid');

class Task {
  // id = '';
  // desc = '';
  // compOn = null;
  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.compOn = null;
  }
}

module.exports = Task;
