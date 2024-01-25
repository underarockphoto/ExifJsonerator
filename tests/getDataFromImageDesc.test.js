const {
    imageDescriptionDataExists,
    dataExistsInImgDesc,
    extractImageDescriptionData,
    getDataFromImageDesc
} = require('../parses/getDataFromImageDesc')

test('Pssses if ImageDescription data does exist',()=>{
    expect(imageDescriptionDataExists({image:{ImageDescription:""}})).toBe(true)
})
test('Fails if ImageDescription data does not exist',()=>{
    expect(imageDescriptionDataExists({image:{}})).toBe(false)
})
test('dataExistsInImageDescription passes if all data exists',()=>{
    const goodInput = {file:"AllDataExists.jpg",image:{ImageDescription:"LOC;FORM;DESC;"}}
    const goodOutput = true
    expect(dataExistsInImgDesc(goodInput)).toBe(goodOutput)
})
test('dataExistsInImageDescription passes if all data exists',()=>{
    const badInput = {file:"AllDataExists.jpg",image:{ImageDescription:""}}
    const file = badInput.file;
    const badOutput = [`ERROR - File ${file} ImageDescription tag does not contain LOC data!`,`ERROR - File ${file} ImageDescription tag does not contain FORM data!`,`ERROR - File ${file} ImageDescription tag does not contain DESC data!`]
    expect(dataExistsInImgDesc(badInput)).toStrictEqual(badOutput)
})
test('extractImageDescription passes',()=>{
    const goodInformation = "DESC;This image is real.;FORM;I shot it on film.;LOC;I took it in my house."
    const file = "goodImage.jpg"
    const goodOutput = ["I shot it on film.","I took it in my house.","This image is real.",[]]
    expect(extractImageDescriptionData(goodInformation,file)).toStrictEqual(goodOutput)
})
test('extractImageDescription fails',()=>{
    const badInformation = "DESC;FORM;LOC;"
    const file = "badImage.jpg"
    const badOutput = ["","","",[`WARNING - ${file} has a DESC tag in ImageDescription but no data.`,`WARNING - ${file} has a FORM tag in ImageDescription but no data.`,`WARNING - ${file} has a LOC tag in ImageDescription but no data.`]]
    expect(extractImageDescriptionData(badInformation,file)).toStrictEqual(badOutput)
})
test('getDataFromImageDesc passes',()=>{
    const goodInformation = "DESC;This image is real.;FORM;I shot it on film.;LOC;I took it in my house."
    const file = "goodImage.jpg"
    const goodInput = {image:{ImageDescription:goodInformation},file:file}
    const goodOutput = [goodInput,[],{imgForm:"I shot it on film.",imgLoc:"I took it in my house.",imgDesc:"This image is real."}]
    expect(getDataFromImageDesc([goodInput,[],{}])).toStrictEqual(goodOutput)
})