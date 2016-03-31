/**
 * @fileOverview mochaTest单元测试示例
 * @author waterchestnut
 * @module test/mochatest
 */

var assert = require("assert");

/**var log=console.log;*/

beforeEach(function(){
    /**console.log=function(a){console.log(a);};*/
});

afterEach(function(){
    /**console.log=log;*/
});

/**
 *  @function myFunction
 *  @description GET home page.
 */
describe('test mochatest/Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
            assert.equal(-1, [1,2,3].indexOf(4));
        });
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});