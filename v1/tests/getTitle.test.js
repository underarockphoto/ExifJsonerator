const getTitle = require('../modules/parses/getTitle')
const goodExampleData = require('./exampleObjects/exampleExifOutput')
const badExampleData = require('./exampleObjects/exampleExifHasNoImageID')

test('Get title',()=>{
    const goodInputArray = [goodExampleData,[],{}]
    const goodOutputArray = [goodExampleData,[],{imgTitle:"Yay, we got the right title!"}]
    
    expect(getTitle(goodInputArray)).toStrictEqual(goodOutputArray)
})
test('Fail when ImageID tag does not exist.',()=>{
    const badInputArray = [badExampleData,[],{}]
    const badOutputArray = [badExampleData,[`ERROR - Image exampleImageWithNoImageID.jpg has no ImageID metadata tag!`],{}]
    expect(getTitle(badInputArray)).toStrictEqual(badOutputArray)
})
