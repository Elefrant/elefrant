'use strict';

var cluster = require('cluster'),
    datefmt = require('dateformat'),
    util = require('elefrant-util'),
    Q = util.q,
    chalk = util.chalk,
    numCPUs = require('os').cpus().length;

cluster.setupMaster({
    exec: 'server.js'
});

//Show master info in console
console.log(chalk.green('INFO:'), ' Cluster master created');
console.log('    Pid: %d', process.pid);
console.log('    Time: %s', datefmt(new Date(), 'ddd, dd mmm yyyy hh:MM:ss Z'));

// Function to promises fork
function promiseCluster(condition, body) {
    var done = Q.defer();

    function loop() {
        if (!condition()) return done.resolve();
        Q.when(body(), loop, done.reject);
    }

    Q.nextTick(loop);

    return done.promise;
}

// Fork workers
var index = 0;
promiseCluster(function () {
    return index < numCPUs;
}, function () {
    cluster.fork();
    index++;
    return Q.delay(1000); // arbitrary async
}).done();

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
