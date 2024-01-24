const getImgLens = require('../parses/getImgLens')
const goodExampleData = require('./exampleObjects/exampleExifOutput')
const badExampleData = require('./exampleObjects/exampleExifHasNoLensModel')

test('Get ImgLens',()=>{
    const goodInputArray = [goodExampleData,[],{}]
    const goodOutputArray = [goodExampleData,[],{imgLens:"EF24-105mm f/4L IS USM"}]
    
    expect(getImgLens(goodInputArray)).toStrictEqual(goodOutputArray)
})
test('Fail when Model tag does not exist.',()=>{
    const badInputArray = [badExampleData,[],{}]
    const badOutputArray = [badExampleData,[`ERROR - Image exampleImageWithNoLensModel.jpg has no LensModel metadata tag!`],{}]
    expect(getImgLens(badInputArray)).toStrictEqual(badOutputArray)
})
