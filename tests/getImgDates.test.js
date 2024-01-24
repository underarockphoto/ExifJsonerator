const getImgDates = require('../parses/getImgDates')
const goodExampleData = require('./exampleObjects/exampleExifOutput')
const noModifyDateData = require('./exampleObjects/exampleExifHasNoModifyDate')
const noOriginalDateData = require('./exampleObjects/exampleExifHasNoOriginalDate')
const noDatesAtAllData = require('./exampleObjects/exampleExifHasNoDatesAtAll')

test('Fail when ModifyDate is missing.',()=>{
    const badInputArray = [noModifyDateData,[],{}]
    const badOutputArray = [noModifyDateData,[`ERROR - Image exampleImage.jpg has no ModifyDate metadata tag!`],{}]
    expect(getImgDates(badInputArray)).toStrictEqual(badOutputArray)
})
test('Fail when OriginalDate is missing.',()=>{
    const badInputArray = [noOriginalDateData,[],{}]
    const badOutputArray = [noOriginalDateData,[`ERROR - Image exampleImage.jpg has no OriginalDate metadata tag!`],{}]
    expect(getImgDates(badInputArray)).toStrictEqual(badOutputArray)
})

test('Fail when All Dates are missing.',()=>{
    const badInputArray = [noDatesAtAllData,[],{}]
    const errorArray = [`ERROR - Image exampleImage.jpg has no ModifyDate metadata tag!`,`ERROR - Image exampleImage.jpg has no OriginalDate metadata tag!`]
    const badOutputArray = [noDatesAtAllData,errorArray,{}]
    expect(getImgDates(badInputArray)).toStrictEqual(badOutputArray)
})

test('This returns the correct dates.',()=>{
    const goodImgObj = {imgMod:1704829210000,imgDate:1690850403000}
    expect(getImgDates([goodExampleData,[],{}])).toStrictEqual([goodExampleData,[],goodImgObj])
})