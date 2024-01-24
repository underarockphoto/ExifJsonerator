const getImgSrc = require('../parses/getImgSrc')
const goodExampleData = require('./exampleObjects/exampleExifOutput')
const badExampleData = require('./exampleObjects/exampleExifHasNoFile')

test('Get ImgSrc',()=>{
    const goodInputArray = [goodExampleData,[],{}]
    const goodOutputArray = [goodExampleData,[],{imgSrc:"exampleImage.jpg"}]
    
    expect(getImgSrc(goodInputArray)).toStrictEqual(goodOutputArray)
})
test('Fail when ImageID tag does not exist.',()=>{
    const badInputArray = [badExampleData,[],{}]
    const badOutputArray = [badExampleData,[`ERROR - Image UNDEFINED has no FILE!`],{}]
    expect(getImgSrc(badInputArray)).toStrictEqual(badOutputArray)
})
