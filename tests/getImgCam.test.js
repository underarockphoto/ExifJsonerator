const getImgCam = require('../modules/parses/getImgCam')
const goodExampleData = require('./exampleObjects/exampleExifOutput')
const badExampleData = require('./exampleObjects/exampleExifHasNoModel')

test('Get ImgCam',()=>{
    const goodInputArray = [goodExampleData,[],{}]
    const goodOutputArray = [goodExampleData,[],{imgCam:"Canon EOS 5D Mark IV"}]
    
    expect(getImgCam(goodInputArray)).toStrictEqual(goodOutputArray)
})
test('Fail when Model tag does not exist.',()=>{
    const badInputArray = [badExampleData,[],{}]
    const badOutputArray = [badExampleData,[`ERROR - Image exampleImageWithNoModel.jpg has no Model metadata tag!`],{}]
    expect(getImgCam(badInputArray)).toStrictEqual(badOutputArray)
})
