const fs = require('fs');

let instance = null;

class LogsClass {
    constructor(path) {
        this.path = path;
    }

    addEvent(event) {
        fs.appendFile(this.path, event);
    }

    getAllLogs() {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
            } else {
                console.log('Conteúdo do arquivo:\n', data);
            }
        });
    }

    static getInstance() {
        if(!instance) {
            instance = new LogsClass();
        }

        return instance
    }
}

module.exports = LogsClass