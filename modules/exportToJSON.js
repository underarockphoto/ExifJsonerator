const fs=require('fs')
const {writeFile} = fs;
const readline = require('readline').createInterface({
    input:process.stdin, output: process.stdout 
})

const exportToJSON = (data,outputFileDirectory,fileNameOutput)=>{
    writeFile(outputFileDirectory+"/"+fileNameOutput,JSON.stringify(data),(err)=>{
        if(!err) {
            console.log("\n\nJSON file created...")
            console.log("\n\nType CTRL+C to exit.")
          }
        else {
            showErrorsAndWarnings(err)
        }  
})
}
const handleErrorsAndFinish = (errorArray,imgObj,outputFileDirectory,fileNameOutput) =>{
    if(errorArray.length!==0){
        readline.question('Errors and warnings exist, write to file anyways?: (Y/N) ',(res)=>{
            console.log(res)
            if (res.toLowerCase()==="y"){
                exportToJSON(imgObj,outputFileDirectory,fileNameOutput)
            }else{
                console.log("Process aborted.")
                console.log("\n\nType CTRL+C to exit.")
            }
        })
    }
}
module.exports = handleErrorsAndFinish