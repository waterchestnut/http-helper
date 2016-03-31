/**
 * @fileOverview 日志记录管理类
 * @author waterchestnut
 */

var log4js = require('log4js');
log4js.configure('conf/log4jsappends.json', { reloadSecs: 300 });

exports.logger = function(name) {
    var logger = log4js.getLogger(name);
    return logger;
};

exports.accessLogger = function() {
    var logger = this.logger("access");
    return logger;
};

exports.appLogger = function() {
    var logger = this.logger("app");
    return logger;
};