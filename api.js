'use strict';

// Module dependencies.
require('colors');
var cluster = require('cluster'),
    datefmt = require('dateformat'),
    numCPUs = require('os').cpus().length;

// Check if New relic is enable
if (require('./app/lib/config').getConfigValue('newrelic', 'enable')) {
    require('newrelic');
}

// Show master info
console.log('[Cluster] Creating Master...');

// Create a master server
cluster.setupMaster({
    exec: 'server.js'
});

//Show master info in console
console.log('[Cluster] Master created'.green);
console.log('- Pid: %d'.grey, process.pid);
console.log('- Time: %s'.grey, datefmt(new Date(), 'ddd, dd mmm yyyy hh:MM:ss Z'));

// Fork workers
console.error('[Cluster] Creating Workers...');
for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
}

// Event when listening worker
cluster.on('listening', function (worker, address) {
    console.log('[Cluster] A worker is now connected to %s:%d'.green, address.address, address.port);
});

// Event when exit worker
cluster.on('exit', function (worker, code, signal) {
    console.log('[Cluster] worker %d died (%s). restarting...'.red, worker.process.pid, signal || code);

    // Auto-restart worker
    cluster.fork();
});

// Event when disconnect worker
cluster.on('disconnect', function (worker) {
    console.log('[Cluster] The worker #%s has disconnected'.yellow, worker.id);
});

// Event when death worker
cluster.on('death', function (worker) {
    console.log('[Cluster] The worker #%s is death'.red, worker.id);
});
