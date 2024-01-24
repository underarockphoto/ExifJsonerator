const {
    artistDataExists,
    getDataFromArtist,
    dataExistsInArtist
} = require('../parses/getDataFromArtist')

test('Pssses if Artist data does exist',()=>{
    expect(artistDataExists({image:{Artist:""}})).toBe(true)
})
test('Fails if Artist data does not exist',()=>{
    expect(artistDataExists({image:{}})).toBe(false)
})
test('getDataFromArtist returns erroryArray and empty object with no artist data',()=>{
    const badObj = {file:"noArtist.jpg",image:{}}
    const badInput = [badObj,[],{}]
    const badOutput = [badObj,[`ERROR - File ${badObj.file} does not have an Artist tag!`],{}]
    expect(getDataFromArtist(badInput)).toStrictEqual(badOutput)
})
test('dataExistsInArtist passes if all data exists',()=>{
    const goodInput = {file:"AllDataExists.jpg",image:{Artist:"GAL;FILTERS;EXP;"}}
    const goodOutput = true
    expect(dataExistsInArtist(goodInput)).toBe(goodOutput)
})
test('dataExistsInArtist returns errors if data is missing',()=>{
    const badInput = {file:"AllDataExists.jpg",image:{Artist:""}}
    const badOutput = [`ERROR - File ${badInput.file} Artist tag does not contain GAL data!`,
    `ERROR - File ${badInput.file} Artist tag does not contain EXP data!`,
    `ERROR - File ${badInput.file} Artist tag does not contain FILTERS data!`]
    expect(dataExistsInArtist(badInput)).toStrictEqual(badOutput)
})