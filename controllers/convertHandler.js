function ConvertHandler() {

  this.getNum = function (input) {
    let result;

    const regex = /^(\d+(\.\d+)?)*(?:\/(\d+(\.\d+)?))?\s*([a-zA-Z]+)?$/;
    const match = input.match(regex);
  
    if (match) {
      const numerator = parseFloat(match[1]) || 1; // If no numerator, default to 1
      const denominator = parseFloat(match[3]) || 1;
      return numerator / denominator;
    } else {
      return 'invalid number';
    }
  
  // let regex = /\d+\.*\d*/g
  // let values = input.match(regex)
  // result = values == null ? 1 :
  //   values.length == 1 ? Number(values[0]) :
  //     values.length == 2 ? Number(values[0]) / Number(values[1]) : 'invalid number'


  // result = Number(input.match(/\d+\.*\d*/g)[0]);
  return result;
};

this.getUnit = function (input) {
  let result;
  let regex = /\d*\.*\d*\s*((lbs|kg|gal|l|mi|km))\b/i;

  const match = regex.exec(input);

  if (match) {
    const unit = match[1].toLowerCase();
    result = unit === 'l' ? 'L' : unit;
  } else {
    result = 'invalid unit';
  }
  return result;
  // let values = input.match(regex);
  // console.log(values);
  // let match;
  // let results = [];
  // while ((match = regex.exec(input)) !== null) {
  //   results.push(match[1]);
  // }
  //console.log(results)
  // return results.length > 0 ? results[0] : 'invalid unit';

  // result = values == null ? 'invalid unit' : values[0].toLowerCase();
  // return result;
};

this.getReturnUnit = function (initUnit) {
  let result;
  switch (initUnit.toLowerCase()) {
    case 'kg':
      result = 'lbs';
      break;
    case 'lbs':
      result = 'kg';
      break;
    case 'mi':
      result = 'km';
      break;
    case 'km':
      result = 'mi';
      break;
    case 'l':
      result = 'gal';
      break;
    case 'gal':
      result = 'L';
      break;
  }
  return result;
};

this.spellOutUnit = function (unit) {
  let result;

  if (!unit) {
    return 'invalid unit';
  }

  switch (unit.toLowerCase()) {
    case 'l':
      result = 'liters';
      break;
    case 'gal':
      result = 'gallons';
      break;
    case 'kg':
      result = 'kilograms';
      break;
    case 'lbs':
      result = 'pounds';
      break;
    case 'km':
      result = 'kilometers';
      break;
    case 'mi':
      result = 'miles';
      break;
  }
  return result;
};

this.convert = function (initNum, initUnit) {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  let result;

  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return 'invalid number and unit';
  } else if (initNum === 'invalid number') {
    return 'invalid number';
  } else if (initUnit === 'invalid unit') {
    return 'invalid unit';
  }

  // console.log("initNum:", initNum);
  // console.log("initUnit:", initUnit);
  // console.log("typeof initUnit:", typeof initUnit);

  switch (initUnit.toLowerCase()) {
    case 'l':
      result = initNum / galToL;
      break;
    case 'gal':
      result = initNum * galToL;
      break;
    case 'kg':
      result = initNum / lbsToKg;
      break;
    case 'lbs':
      result = initNum * lbsToKg;
      break;
    case 'km':
      result = initNum / miToKm;
      break;
    case 'mi':
      result = initNum * miToKm;
      break;
    default:
      return "Invalid unit";
  }
  // console.log("After calculation: result =", result);
  return result.toFixed(5) + '' + this.getReturnUnit(initUnit);
};

this.getString = function (initNum, initUnit, returnNum, returnUnit) {
  let result;
  result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit)
  return result;
};

}

module.exports = ConvertHandler;
