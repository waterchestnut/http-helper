/**
 * @fileOverview tool/httpHelper单元测试
 * @author waterchestnut
 * @module test/tool/httpHelper
 */

var should = require('chai').should();
var httpHelper = require("../../index");

/**
 *  @function tool/httpHelper
 *  @description tool/httpHelper单元测试
 */
describe('test tool/httpHelper', function () {

	var url = 'http://www.baidu.com';

    /**
     *  @function get
     *  @description tool/httpHelper get
     */
    describe('#get', function () {
        it('get方式请求不报错', function (done) {
            httpHelper.get(url, 1000, function (err, data) {
                if (err) {
                    return done(err);
                }
                should.exist(data);
                done();
            }, 'gbk', {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'});
        });

        it('get方式请求超时', function (done) {
            httpHelper.get('http://www.google.com/', 10, function (err, data) {
                if (err && err.message === 'request timeout') {
                    return done();
                }

                done(new Error('超时时间设置无效'));
            }, 'gbk');
        });

    });

    /**
     *  @function post
     *  @description tool/httpHelper post
     */
    describe('#post', function () {
        it('post方式请求不报错', function (done) {
            httpHelper.post(url, 1000, {}, function (err, data) {
                if (err) {
                    return done(err);
                }
                should.exist(data);
                done();
            }, 'gbk', {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'});
        });

        it('post方式发送json数据不报错', function (done) {
            httpHelper.post(url, 1000, {
                username: 'username',
                pwd: 'pwd'
            }, function (err, data) {
                if (err) {
                    return done(err);
                }
                should.exist(data);
                done();
            }, 'gbk', undefined, 'gbk', true);
        });

    });

    /**
     *  @function request
     *  @description tool/httpHelper request
     */
    describe('#request', function () {

        it('get方式请求，直接返回二进制数据', function (done) {
            var options = require('url').parse(url);
            options.method = 'GET';
            options.buffer = true;
            httpHelper.request(options, 1000, {}, function (err, data) {
                if (err) {
                    return done(err);
                }
                should.exist(data);
                (typeof data).should.equals('object');
                done();
            });
        });
    });
});