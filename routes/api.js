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

    if (result === 'invalid unit') {
      res.json({ string: 'invalid unit' });
    } else if (result === 'invalid number') {
      res.json({ string: 'invalid number' });
    } else if (result === 'invalid number and unit') {
      res.json({ string: 'invalid number and unit' });
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
