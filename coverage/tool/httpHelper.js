if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['tool/httpHelper.js'] === 'undefined'){_$jscoverage['tool/httpHelper.js']=[];
_$jscoverage['tool/httpHelper.js'].source=['/**',
' * @fileOverview http请求的工具操作集，包含请求超时时间设置',
' * @author waterchestnut',
' * @module tool/httpHelper',
' */',
'',
'var http = require(\'http\');',
'var https = require(\'https\');',
'var qs = require(\'querystring\');',
'var iconv = require(\'iconv-lite\');',
'var BufferHelper = require(\'bufferhelper\');',
'',
'/**',
' * @exports tool/httpHelper',
' */',
'var httpHelper = {',
'',
'    /**',
'     * @description 发起远程请求的基础方法',
'     * @param {Object} options 请求选项',
'     * @param {String} [options.protocol=\'http\'] 请求协议',
'     * @param {String} [options.method=\'get\'] 请求方法，get、post...',
'     * @param {Object=} options.headers 请求头',
'     * @param {String=} options.encode 请求数据的编码格式，如果是gbk，使用escape编码',
'     * @param {Boolean=} [options.json=false] 发送的是否json数据',
'     * @param {Boolean=} [options.buffer=false] 是否直接返回二进制数据',
'     * @param {Number=} timeout 超时时间，单位为毫秒',
'     * @param {Object=} data 请求发送的数据对象',
'     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}',
'     * @param {String} [encoding=\'utf-8\'] 编码格式',
'     */',
'    request: function (options, timeout, data, callback, encoding) {',
'        var httpLib = http;',
'        if (options.protocol && options.protocol === \'https:\') {',
'            httpLib = https;',
'        }',
'        var content = {};',
'        if (options.json) {',
'            content = JSON.stringify(data);',
'        } else {',
'            content = (options.encode && options.encode.toLocaleLowerCase() == \'gbk\') ? qs.stringify(data, null, null, {encodeURIComponent: escape}) : qs.stringify(data);',
'        }',
'        if (options.method.toLowerCase() === \'post\') {',
'            options.headers = options.headers || {};',
'            options.headers[\'Content-Type\'] = options.json ? \'application/json\' : \'application/x-www-form-urlencoded\';',
'            options.headers[\'Content-Length\'] = Buffer.byteLength(content);',
'        }',
'        /** 为true时直接返回数据流 */',
'        options.buffer = options.buffer || false;',
'',
'        var req = httpLib.request(options, function (res) {',
'            var bufferHelper = new BufferHelper();',
'            res.on(\'data\', function (chunk) {',
'                bufferHelper.concat(chunk);',
'            });',
'            res.on(\'end\', function () {',
'                var _data;',
'                if (options.buffer) {',
'                    _data = bufferHelper.toBuffer();',
'                }',
'                else {',
'                    if (typeof encoding != \'undefined\' && encoding !== null) {',
'                        _data = iconv.decode(bufferHelper.toBuffer(), encoding);',
'                    } else {',
'                        _data = iconv.decode(bufferHelper.toBuffer(), \'utf-8\');',
'                    }',
'                }',
'                callback(null, _data, res, req);',
'            });',
'        });',
'',
'        req.on(\'error\', function (err) {',
'            callback(err);',
'        });',
'',
'        req.write(content);',
'',
'        if (timeout && timeout > 0) {',
'            req.setTimeout(timeout, function () {',
'                callback(new Error(\'request timeout\'), \'\');',
'            });',
'        }',
'',
'        req.end();',
'    },',
'',
'    /**',
'     * @description 以GET的方式发起远程请求',
'     * @param {String} url 请求地址',
'     * @param {Number=} timeout 超时时间，单位为毫秒',
'     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}',
'     * @param {String} [encoding=\'utf-8\'] 编码格式',
'     * @param {Object=} header 请求头对象',
'     */',
'    get: function (url, timeout, callback, encoding, header) {',
'        var options = require(\'url\').parse(url);',
'        options.method = \'GET\';',
'        if (header) {',
'            options.headers = header;',
'        }',
'',
'        this.request(options, timeout, {}, callback, encoding);',
'    },',
'',
'    /**',
'     * @description 以POST的方式发起远程请求',
'     * @param {String} url 请求地址',
'     * @param {Number=} timeout 超时时间，单位为毫秒',
'     * @param {Object=} data 请求发送的数据对象',
'     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}',
'     * @param {String} [encoding=\'utf-8\'] 编码格式',
'     * @param {Object=} header 请求头对象',
'     * @param {String=} reqEncoding 请求数据的编码格式，如果是gbk，使用escape编码',
'     * @param {Boolean=} [json=false] 发送的是否json数据',
'     */',
'    post: function (url, timeout, data, callback, encoding, header, reqEncoding, json) {',
'        var options = require(\'url\').parse(url);',
'        options.method = \'POST\';',
'        if (header) {',
'            options.headers = header;',
'        }',
'        if (reqEncoding) {',
'            options.encode = reqEncoding;',
'        }',
'        if (json) {',
'            options.json = json;',
'        }',
'        this.request(options, timeout, data, callback, encoding);',
'    }',
'};',
'',
'/**',
' * @description 处理请求响应的回调方法',
' * @callback RequestCallback',
' * @param {Object} err 请求或响应的错误对象',
' * @param {string} data 响应的数据',
' * @param {Object} res 响应流对象',
' */',
'',
'module.exports = httpHelper;'];
_$jscoverage['tool/httpHelper.js'][68]=0;
_$jscoverage['tool/httpHelper.js'][7]=0;
_$jscoverage['tool/httpHelper.js'][56]=0;
_$jscoverage['tool/httpHelper.js'][9]=0;
_$jscoverage['tool/httpHelper.js'][8]=0;
_$jscoverage['tool/httpHelper.js'][51]=0;
_$jscoverage['tool/httpHelper.js'][33]=0;
_$jscoverage['tool/httpHelper.js'][16]=0;
_$jscoverage['tool/httpHelper.js'][10]=0;
_$jscoverage['tool/httpHelper.js'][11]=0;
_$jscoverage['tool/httpHelper.js'][76]=0;
_$jscoverage['tool/httpHelper.js'][41]=0;
_$jscoverage['tool/httpHelper.js'][34]=0;
_$jscoverage['tool/httpHelper.js'][38]=0;
_$jscoverage['tool/httpHelper.js'][35]=0;
_$jscoverage['tool/httpHelper.js'][37]=0;
_$jscoverage['tool/httpHelper.js'][39]=0;
_$jscoverage['tool/httpHelper.js'][78]=0;
_$jscoverage['tool/httpHelper.js'][52]=0;
_$jscoverage['tool/httpHelper.js'][44]=0;
_$jscoverage['tool/httpHelper.js'][45]=0;
_$jscoverage['tool/httpHelper.js'][46]=0;
_$jscoverage['tool/httpHelper.js'][43]=0;
_$jscoverage['tool/httpHelper.js'][49]=0;
_$jscoverage['tool/httpHelper.js'][99]=0;
_$jscoverage['tool/httpHelper.js'][62]=0;
_$jscoverage['tool/httpHelper.js'][53]=0;
_$jscoverage['tool/httpHelper.js'][58]=0;
_$jscoverage['tool/httpHelper.js'][59]=0;
_$jscoverage['tool/httpHelper.js'][54]=0;
_$jscoverage['tool/httpHelper.js'][57]=0;
_$jscoverage['tool/httpHelper.js'][117]=0;
_$jscoverage['tool/httpHelper.js'][72]=0;
_$jscoverage['tool/httpHelper.js'][65]=0;
_$jscoverage['tool/httpHelper.js'][63]=0;
_$jscoverage['tool/httpHelper.js'][120]=0;
_$jscoverage['tool/httpHelper.js'][84]=0;
_$jscoverage['tool/httpHelper.js'][79]=0;
_$jscoverage['tool/httpHelper.js'][73]=0;
_$jscoverage['tool/httpHelper.js'][80]=0;
_$jscoverage['tool/httpHelper.js'][122]=0;
_$jscoverage['tool/httpHelper.js'][102]=0;
_$jscoverage['tool/httpHelper.js'][97]=0;
_$jscoverage['tool/httpHelper.js'][96]=0;
_$jscoverage['tool/httpHelper.js'][98]=0;
_$jscoverage['tool/httpHelper.js'][118]=0;
_$jscoverage['tool/httpHelper.js'][119]=0;
_$jscoverage['tool/httpHelper.js'][123]=0;
_$jscoverage['tool/httpHelper.js'][125]=0;
_$jscoverage['tool/httpHelper.js'][126]=0;
_$jscoverage['tool/httpHelper.js'][128]=0;
_$jscoverage['tool/httpHelper.js'][140]=0;
}/**
 * @fileOverview http请求的工具操作集，包含请求超时时间设置
 * @author waterchestnut
 * @module tool/httpHelper
 */

_$jscoverage['tool/httpHelper.js'][7]++;
var http = require('http');
_$jscoverage['tool/httpHelper.js'][8]++;
var https = require('https');
_$jscoverage['tool/httpHelper.js'][9]++;
var qs = require('querystring');
_$jscoverage['tool/httpHelper.js'][10]++;
var iconv = require('iconv-lite');
_$jscoverage['tool/httpHelper.js'][11]++;
var BufferHelper = require('bufferhelper');

/**
 * @exports tool/httpHelper
 */
_$jscoverage['tool/httpHelper.js'][16]++;
var httpHelper = {

    /**
     * @description 发起远程请求的基础方法
     * @param {Object} options 请求选项
     * @param {String} [options.protocol='http'] 请求协议
     * @param {String} [options.method='get'] 请求方法，get、post...
     * @param {Object=} options.headers 请求头
     * @param {String=} options.encode 请求数据的编码格式，如果是gbk，使用escape编码
     * @param {Boolean=} [options.json=false] 发送的是否json数据
     * @param {Boolean=} [options.buffer=false] 是否直接返回二进制数据
     * @param {Number=} timeout 超时时间，单位为毫秒
     * @param {Object=} data 请求发送的数据对象
     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}
     * @param {String} [encoding='utf-8'] 编码格式
     */
    request: function (options, timeout, data, callback, encoding) {
        _$jscoverage['tool/httpHelper.js'][33]++;
var httpLib = http;
        _$jscoverage['tool/httpHelper.js'][34]++;
if (options.protocol && options.protocol === 'https:') {
            _$jscoverage['tool/httpHelper.js'][35]++;
httpLib = https;
        }
        _$jscoverage['tool/httpHelper.js'][37]++;
var content = {};
        _$jscoverage['tool/httpHelper.js'][38]++;
if (options.json) {
            _$jscoverage['tool/httpHelper.js'][39]++;
content = JSON.stringify(data);
        } else {
            _$jscoverage['tool/httpHelper.js'][41]++;
content = (options.encode && options.encode.toLocaleLowerCase() == 'gbk') ? qs.stringify(data, null, null, {encodeURIComponent: escape}) : qs.stringify(data);
        }
        _$jscoverage['tool/httpHelper.js'][43]++;
if (options.method.toLowerCase() === 'post') {
            _$jscoverage['tool/httpHelper.js'][44]++;
options.headers = options.headers || {};
            _$jscoverage['tool/httpHelper.js'][45]++;
options.headers['Content-Type'] = options.json ? 'application/json' : 'application/x-www-form-urlencoded';
            _$jscoverage['tool/httpHelper.js'][46]++;
options.headers['Content-Length'] = Buffer.byteLength(content);
        }
        /** 为true时直接返回数据流 */
        _$jscoverage['tool/httpHelper.js'][49]++;
options.buffer = options.buffer || false;

        _$jscoverage['tool/httpHelper.js'][51]++;
var req = httpLib.request(options, function (res) {
            _$jscoverage['tool/httpHelper.js'][52]++;
var bufferHelper = new BufferHelper();
            _$jscoverage['tool/httpHelper.js'][53]++;
res.on('data', function (chunk) {
                _$jscoverage['tool/httpHelper.js'][54]++;
bufferHelper.concat(chunk);
            });
            _$jscoverage['tool/httpHelper.js'][56]++;
res.on('end', function () {
                _$jscoverage['tool/httpHelper.js'][57]++;
var _data;
                _$jscoverage['tool/httpHelper.js'][58]++;
if (options.buffer) {
                    _$jscoverage['tool/httpHelper.js'][59]++;
_data = bufferHelper.toBuffer();
                }
                else {
                    _$jscoverage['tool/httpHelper.js'][62]++;
if (typeof encoding != 'undefined' && encoding !== null) {
                        _$jscoverage['tool/httpHelper.js'][63]++;
_data = iconv.decode(bufferHelper.toBuffer(), encoding);
                    } else {
                        _$jscoverage['tool/httpHelper.js'][65]++;
_data = iconv.decode(bufferHelper.toBuffer(), 'utf-8');
                    }
                }
                _$jscoverage['tool/httpHelper.js'][68]++;
callback(null, _data, res, req);
            });
        });

        _$jscoverage['tool/httpHelper.js'][72]++;
req.on('error', function (err) {
            _$jscoverage['tool/httpHelper.js'][73]++;
callback(err);
        });

        _$jscoverage['tool/httpHelper.js'][76]++;
req.write(content);

        _$jscoverage['tool/httpHelper.js'][78]++;
if (timeout && timeout > 0) {
            _$jscoverage['tool/httpHelper.js'][79]++;
req.setTimeout(timeout, function () {
                _$jscoverage['tool/httpHelper.js'][80]++;
callback(new Error('request timeout'), '');
            });
        }

        _$jscoverage['tool/httpHelper.js'][84]++;
req.end();
    },

    /**
     * @description 以GET的方式发起远程请求
     * @param {String} url 请求地址
     * @param {Number=} timeout 超时时间，单位为毫秒
     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}
     * @param {String} [encoding='utf-8'] 编码格式
     * @param {Object=} header 请求头对象
     */
    get: function (url, timeout, callback, encoding, header) {
        _$jscoverage['tool/httpHelper.js'][96]++;
var options = require('url').parse(url);
        _$jscoverage['tool/httpHelper.js'][97]++;
options.method = 'GET';
        _$jscoverage['tool/httpHelper.js'][98]++;
if (header) {
            _$jscoverage['tool/httpHelper.js'][99]++;
options.headers = header;
        }

        _$jscoverage['tool/httpHelper.js'][102]++;
this.request(options, timeout, {}, callback, encoding);
    },

    /**
     * @description 以POST的方式发起远程请求
     * @param {String} url 请求地址
     * @param {Number=} timeout 超时时间，单位为毫秒
     * @param {Object=} data 请求发送的数据对象
     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}
     * @param {String} [encoding='utf-8'] 编码格式
     * @param {Object=} header 请求头对象
     * @param {String=} reqEncoding 请求数据的编码格式，如果是gbk，使用escape编码
     * @param {Boolean=} [json=false] 发送的是否json数据
     */
    post: function (url, timeout, data, callback, encoding, header, reqEncoding, json) {
        _$jscoverage['tool/httpHelper.js'][117]++;
var options = require('url').parse(url);
        _$jscoverage['tool/httpHelper.js'][118]++;
options.method = 'POST';
        _$jscoverage['tool/httpHelper.js'][119]++;
if (header) {
            _$jscoverage['tool/httpHelper.js'][120]++;
options.headers = header;
        }
        _$jscoverage['tool/httpHelper.js'][122]++;
if (reqEncoding) {
            _$jscoverage['tool/httpHelper.js'][123]++;
options.encode = reqEncoding;
        }
        _$jscoverage['tool/httpHelper.js'][125]++;
if (json) {
            _$jscoverage['tool/httpHelper.js'][126]++;
options.json = json;
        }
        _$jscoverage['tool/httpHelper.js'][128]++;
this.request(options, timeout, data, callback, encoding);
    }
};

/**
 * @description 处理请求响应的回调方法
 * @callback RequestCallback
 * @param {Object} err 请求或响应的错误对象
 * @param {string} data 响应的数据
 * @param {Object} res 响应流对象
 */

_$jscoverage['tool/httpHelper.js'][140]++;
module.exports = httpHelper;