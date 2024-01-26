const {getArrayOfFiles} = require('../modules/getArrayOfFiles')

test('An empty directory returns error that no files exist in the filepath.',()=>{
    const filepath = "./tests/exampleObjects/emptyDirectory/reallyEmptyDirectory"
    expect(getArrayOfFiles(filepath)).toBe("ERROR - No files exist in filepath: "+filepath)
})
test('A directory with no JPEGs returns error that no JPEGs exist in the filepath.',()=>{
    const filepath = "./tests/exampleObjects/emptyDirectory"
    expect(getArrayOfFiles(filepath)).toBe("ERROR - No JPEGs exist in filepath: "+filepath)
})
test('A directory with JPEGs returns an array of JPEGs that exist in the filepath.',()=>{
    const filepath = "./tests/testPhotos"
    expect(getArrayOfFiles(filepath)).toStrictEqual(["examplePhoto (1).jpg","examplePhoto (2).jpg","examplePhoto (3).jpg","examplePhoto (4).jpg"])
})