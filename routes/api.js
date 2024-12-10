'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    // console.log(req.query.input)
    // console.log(convertHandler.getNum(req.query.input))
    // console.log(convertHandler.getUnit(req.query.input))
    // console.log(convertHandler.getReturnUnit('kg'))
    // console.log(convertHandler.convert(1,'gal'))
    let num = convertHandler.getNum(req.query.input);
    let unit = convertHandler.getUnit(req.query.input);
    let returnUnit = convertHandler.getReturnUnit(unit);
    let result = convertHandler.convert(num, unit);
    let returnNum = convertHandler.getNum(result);

    if (num === 'invalid number' && unit === 'invalid unit') {
      res.type('text').send('invalid number and unit');
      return;
    } else if (num === 'invalid number') {
      res.type('text').send('invalid number');
      return;
    } else if (unit === 'invalid unit') {
      res.type('text').send('invalid unit');
      return;
    } else {
      res.json({
        initNum: num,
        initUnit: unit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: convertHandler.getString(num, unit, returnNum, returnUnit)
      });
    }
    // res.type('text').send(convertHandler.getString(num, unit, returnNum, returnUnit));
  })

};
