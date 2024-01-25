


const showErrorsAndWarnings = (errorArray)=>{
    const colors = require('colors')
    colors.enable()
    let numWarn = 0;
    let numErr = 0;
    let numOther = 0;
    errorArray.forEach(err=>{
        if (err.includes("ERROR")) numErr = numErr+1
        else if (err.includes("WARN")) numWarn = numWarn+1
        else numOther = numOther+1
    })
    console.log("Process Completed with:")
    console.log(numErr===0?("0 Errors".green):(numErr.toString()+" Errors").red)
    console.log(numWarn===0?("0 Warnings".green):(numWarn.toString()+" Warnings").yellow)
    console.log(numOther.toString()+" Other Messages")
    console.log("")
    errorArray.forEach(err=>{
        if (err.includes("ERROR")) console.log((err).red)
        else if (err.includes("WARN")) console.log((err).yellow)
        else console.log(err)
    })
    colors.disable()
}
module.exports = {showErrorsAndWarnings:showErrorsAndWarnings}