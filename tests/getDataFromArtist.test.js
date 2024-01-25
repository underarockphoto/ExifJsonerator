const {
    artistDataExists,
    getDataFromArtist,
    dataExistsInArtist,
    extractArtistData
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
test('ExtractArtistData should return empty arrays and three warnings when fed an empty string',()=>{
    const emptyInput = "GAL;EXP;FILTERS"
    const file = "emptyfile.jpg"
    const threeWarnings = [`WARNING - ${file} has a GAL tag in Artist but no data.`,`WARNING - ${file} has a EXP tag in Artist but no data.`,`WARNING - ${file} has a FILTERS tag in Artist but no data.`]

    expect(extractArtistData(emptyInput,file)).toStrictEqual([[],[],[],threeWarnings])
})
test('ExtractArtistData should return filled arrays with proper data',()=>{
    const realInput = "GAL;Animals,Arizona,Fleas;EXP;1,1,1;FILTERS;CPL,ND4"
    const file = "realfile.jpg"
    const GALS = ["Animals","Arizona","Fleas"]
    const EXP = ["1","1","1"]
    const FILTERS = ["CPL","ND4"]

    expect(extractArtistData(realInput,file)).toStrictEqual([GALS,FILTERS,EXP,[]])
})
test('getDataFromObject returns properties when given good data',()=>{
    const goodDataString = "GAL;Animals,Arizona,Fleas;EXP;1,1,1;FILTERS;CPL,ND4"
    const GALS = ["Animals","Arizona","Fleas"]
    const EXP = ["1","1","1"]
    const FILTERS = ["CPL","ND4"]
    const goodDataInput = {file:"realFile.jpg",image:{Artist:goodDataString}}
    const goodOutput = [goodDataInput,[],{gals:GALS,imgFilters:FILTERS,imgExposures:EXP}]
    expect(getDataFromArtist([goodDataInput,[],{}])).toStrictEqual(goodOutput)
})