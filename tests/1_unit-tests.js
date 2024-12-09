const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    // convertHandler should correctly read a whole number input.
    test('convertHandler should correctly read a whole number input.', () => {
        let output = convertHandler.getNum('10kg');
        assert.isNumber(output, 'Expected number 10')
    });
    // convertHandler should correctly read a decimal number input.
    test('convertHandler should correctly read a decimal number input.', () => {
        let output = convertHandler.getNum('10.10kg');
        assert.equal(output, '10.10', 'Expected number 10.10')
    });
    // convertHandler should correctly read a fractional input.
    test('convertHandler should correctly read a fractional input.', () => {
        let output = convertHandler.getNum('10/2kg');
        assert.equal(output, '5', 'Expected number 5 (10/2kg as input)')
    });
    // convertHandler should correctly read a fractional input with a decimal.
    test('convertHandler should correctly read a fractional input with a decimal.', () => {
        let output = convertHandler.getNum('10/2.5kg');
        assert.equal(output, '4', 'Expected number 4 (10/2.5kg as input)')
    });
    // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
        let output = convertHandler.getNum('3/2/3kg');
        assert.equal(output, 'invalid number', 'Expected error "invalid number" (3/2/3kg as input)')
    });
    // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        let output = convertHandler.getNum('kg');
        assert.equal(output, '1', 'Expected proper output when no numerical input is provided.')
    });
    // convertHandler should correctly read each valid input unit.
    test('convertHandler should correctly read each valid input unit.', () => {
        let output = convertHandler.getUnit('1kg');
        assert.equal(output, 'kg', 'Expected kg unit');
    });
    // convertHandler should correctly return an error for an invalid input unit.
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
        let output = convertHandler.getUnit('1k');
        assert.equal(output, 'invalid unit', 'Expected error "invalid unit" (1k as input)');
    });
    // convertHandler should return the correct return unit for each valid input unit.
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        let output = convertHandler.getReturnUnit('kg');
        assert.equal(output, 'lbs', 'Expected lbs for kg as initUnit');
    });
    // convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
        let output = convertHandler.spellOutUnit('kg');
        assert.equal(output, 'kilograms', 'Expected full word kilograms for kg as unit');
    });
    // convertHandler should correctly convert gal to L.
    test('convertHandler should correctly convert gal to L.', () => {
        let output = convertHandler.convert(1, 'gal');
        assert.equal(output, '3.78541l', 'Expected to convert 1gal to 3.78541l');
    });
    // convertHandler should correctly convert L to gal.
    test('convertHandler should correctly convert L to gal.', () => {
        let output = convertHandler.convert(1, 'l');
        assert.equal(output, '0.26417gal', 'Expected to convert 1l to 0.26417gal');
    });
    // convertHandler should correctly convert mi to km.
    test('convertHandler should correctly convert mi to km.', () => {
        let output = convertHandler.convert(1, 'mi');
        assert.equal(output, '1.60934km', 'Expected to convert 1mi to 1.60934km');
    });
    // convertHandler should correctly convert km to mi.
    test('convertHandler should correctly convert km to mi.', () => {
        let output = convertHandler.convert(1, 'km');
        assert.equal(output, '0.62137mi', 'Expected to convert 1km to 0.62137mi');
    });
    // convertHandler should correctly convert lbs to kg.
    test('convertHandler should correctly convert lbs to kg.', () => {
        let output = convertHandler.convert(1, 'lbs');
        assert.equal(output, '0.45359kg', 'Expected to convert 1lbs to 0.45359kg');
    });
    // convertHandler should correctly convert kg to lbs.
    test('convertHandler should correctly convert kg to lbs.', () => {
        let output = convertHandler.convert(1, 'kg');
        assert.equal(output, '2.20462lbs', 'Expected to convert 1kg to 2.20462lbs');
    });

});