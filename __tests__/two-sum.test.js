const rewire = require('rewire')
const app = rewire('../answers/two-sum.js')

twoSum = app.__get__('twoSum');

describe('Application module', function () {

  it('should output the correct error', function (done) {
    logError().should.equal('MongoDB Connection Error. Please make sure that MongoDB is running.');
    done();
  });
});