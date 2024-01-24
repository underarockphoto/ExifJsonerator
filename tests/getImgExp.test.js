const {
    getImgExp,
    hasExpProps,
    getShutterSpeed,
    getFNumber,
    getISO} = require('../parses/getImgExp')
const goodExampleData = require('./exampleObjects/exampleExifOutput')
const missingExposureData = require('./exampleObjects/exampleExifHasNoExposure')

test('hasExpProps fails when exif tags do not exist.',()=>{
    const badInput = missingExposureData.exif
    const badOutputArray = [`ERROR - File exampleImageWithNoExposure.jpg is missing FNUMBER metadata.`,
                            `ERROR - File exampleImageWithNoExposure.jpg is missing ISO metadata.`,
                            `ERROR - File exampleImageWithNoExposure.jpg is missing ExposureTime metadata.`]
    const file = "exampleImageWithNoExposure.jpg"
    expect(hasExpProps(badInput,file)).toStrictEqual(badOutputArray)
})
test('hasExpProps passes when given good data',()=>{
    const goodInput = goodExampleData.exif
    const goodOutput = true
    const file = "exampleImageWithNoExposure.jpg"
    expect(hasExpProps(goodInput,file)).toStrictEqual(goodOutput)
})

test('getImgExp fails when exif tags do not exist.',()=>{
    const badInput = [missingExposureData,[],{}]
    const badOutputArray = [missingExposureData,[`ERROR - File exampleImageWithNoExposure.jpg is missing FNUMBER metadata.`,
                            `ERROR - File exampleImageWithNoExposure.jpg is missing ISO metadata.`,
                            `ERROR - File exampleImageWithNoExposure.jpg is missing ExposureTime metadata.`],{}]
    const file = "exampleImageWithNoExposure.jpg"
    expect(getImgExp(badInput)).toStrictEqual(badOutputArray)
})

test('Shutter speed over 1 second returns itself as string with "s"',()=>{
    expect(getShutterSpeed({ExposureTime:6})).toBe("6s")
})
test('Shutter speed under 1 second returns itself as string with "1/Xs" where X is the nearest integer',()=>{
    expect(getShutterSpeed({ExposureTime:0.125})).toBe("1/8s")
})
test('Fnumber returns string of "f/FNumber',()=>{
    expect(getFNumber({FNumber:5.6})).toBe("f/5.6")
})
test('ISO returns string of "ISO-ISO',()=>{
    expect(getISO({ISO:800})).toBe("ISO-800")
})
test('getImgExp returns proper array of exposure information',()=>{
    const goodInput = [goodExampleData,[],{}]
    const goodOutput = [goodExampleData,[],{imgExp:["4s","f/9","ISO-100"]}]
    expect(getImgExp(goodInput)).toStrictEqual(goodOutput)
})