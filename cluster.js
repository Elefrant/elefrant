'use strict';

var cluster = require('cluster'),
        datefmt = require('dateformat'),
        util = require('elefrant-util'),
        chalk = util.chalk,
        numCPUs = require('os').cpus().length;

cluster.setupMaster({
    exec: 'server.js'
});

//Show master info in console
console.log(chalk.green('INFO:'), ' Cluster master created');
console.log('    Pid: %d', process.pid);
console.log('    Time: %s', datefmt(new Date(), 'ddd, dd mmm yyyy hh:MM:ss Z'));

// Fork workers
for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
}

// Event when listening worker
cluster.on('listening', function (worker, address) {
    console.log(chalk.green('INFO:') + ' The worker #%s is now connected to %s:%d', worker.id, address.address, address.port);
});

// Event when exit worker
cluster.on('exit', function (worker, code, signal) {
    console.log(chalk.red('ERROR:') + ' Worker %d died (%s). restarting...', worker.process.pid, signal || code);

    // Auto-restart worker
    cluster.fork();
});

// Event when disconnect worker
cluster.on('disconnect', function (worker) {
    console.log(chalk.yellow('WARN:') + ' The worker #%s has disconnected', worker.id);
});

// Event when death worker
cluster.on('death', function (worker) {
    console.log(chalk.red('ERROR:') + ' The worker #%s is death', worker.id);
});
