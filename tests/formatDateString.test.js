const {
    formatDateString,
    dateStringsAreValid,
    newDateString,
    exists,
    isAllNumbers,
    isRightLength
} = require('../parses/formatDateString')
const validDateString = '2021:03:31 13:34:44';
const missingDataDateString = '2021:3:31 3:44';
const invalidLengthDateString = '2021:3:31 3:44:56'
const hasLettersDateString = '2021:03:31 13:44:FF'
const exampleFile = "exampleFile.jpg"
const dateType = "ExampleDate"

test("All values in validDateString should exist.",()=>{
    expect(exists(validDateString)).toBe(true)
})

test("All values in missingDataDateString do not exist.",()=>{
    expect(exists(missingDataDateString)).toBe(false)
})

test("All values in validDateString have the right length.",()=>{
    expect(isRightLength(validDateString)).toBe(true)
})

test("All values in invalidLengthDateString do not have the right length.",()=>{
    expect(isRightLength(invalidLengthDateString)).toBe(false)
})

test("All values in validDateString are numbers.",()=>{
    expect(isAllNumbers(validDateString)).toBe(true)
})

test("All values in hasLettersDateString are not are numbers.",()=>{
    expect(isAllNumbers(hasLettersDateString)).toBe(false)
})

test("This date string is valid!",()=>{
    expect(dateStringsAreValid(validDateString,exampleFile,dateType)).toBe(true)
})

test("This date string is not all numbers!",()=>{
    expect(dateStringsAreValid(hasLettersDateString,exampleFile,dateType)).toBe(`ERROR - ${dateType} of file ${exampleFile} is not all numbers.`)
})

test("This date string is not the right length!",()=>{
    expect(dateStringsAreValid(invalidLengthDateString,exampleFile,dateType)).toBe(`ERROR - ${dateType} of file ${exampleFile} is not YYYY:MM:DDD hh:mm:ss.`)
})

test("This date string is missing data!",()=>{
    expect(dateStringsAreValid(missingDataDateString,exampleFile,dateType)).toBe(`ERROR - ${dateType} of file ${exampleFile} is not YYYY:MM:DDD hh:mm:ss.`)
})

test("This date string is correctly formatted",()=>{
    expect(newDateString(validDateString)).toBe('2021-03-31T13:34:44')
})

test("This function returns a formatted date string",()=>{
    expect(formatDateString(validDateString,exampleFile,dateType)).toBe(1617212084000)
})

test("This function returns the error value",()=>{
    expect(formatDateString(hasLettersDateString,exampleFile,dateType)).toBe(`ERROR - ${dateType} of file ${exampleFile} is not all numbers.`)
})
test("This function returns Error about invalid data",()=>{
    expect(formatDateString(hasLettersDateString,dateType)).toBe("ERROR - Missing or undefined date inputs.")
})