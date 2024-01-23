const exists = (dateValue)=> {
    const [dateString, timeString] = dateValue.split(" ") 
    const [year,month,day] = dateString.split(":")
    const [hour,minute,second] = timeString.split(":")
    return !(!year||!month||!day||!hour||!minute||!second)
}

const isRightLength = (dateValue)=>{
    const [dateString, timeString] = dateValue.split(" ") 
    const [year,month,day] = dateString.split(":")
    const [hour,minute,second] = timeString.split(":")
    return year.toString().length === 4 &&
    month.toString().length === 2 &&
    day.toString().length === 2 &&
    hour.toString().length === 2 &&
    minute.toString().length === 2 &&
    second.toString().length === 2 
}

const isAllNumbers = (dateValue)=>{
    const [dateString, timeString] = dateValue.split(" ") 
    const [year,month,day] = dateString.split(":")
    const [hour,minute,second] = timeString.split(":")
    return !!Number(year) &&
    !!Number(month) &&
    !!Number(day) &&
    !!Number(hour) &&
    !!Number(minute) &&
    !!Number(second) 
}

const dateStringsAreValid = (dateValue,file,dateType)=>{
        if (exists(dateValue)){
            if (isRightLength(dateValue)){
                    if (isAllNumbers(dateValue))    {
                        return true
                    }else return (`ERROR - ${dateType} of file ${file} is not all numbers.` )     
            }else return (`ERROR - ${dateType} of file ${file} is not YYYY:MM:DDD hh:mm:ss.`)      
        }else return (`ERROR - ${dateType} of file ${file} is not YYYY:MM:DDD hh:mm:ss.`)      
}

const newDateString = (dateValue)=>{   
        const convertedColons = dateValue.replaceAll(":","-")
        const convertedSpace = convertedColons.replace(" ","T")
        return(convertedSpace)   
}

const formatDateString = (dateValue,file,dateType)=>{
        if (!dateValue||!file||!dateType)return("ERROR - Missing or undefined date inputs.")
        const isValid = dateStringsAreValid(dateValue,file,dateType)
        if(isValid===true){
            return newDateString(dateValue)
        }else{
            return isValid
        }
    
}

module.exports = {
                  formatDateString:formatDateString,
                  dateStringsAreValid:dateStringsAreValid,
                  newDateString:newDateString,
                  exists:exists,
                  isAllNumbers:isAllNumbers,
                  isRightLength:isRightLength
                }