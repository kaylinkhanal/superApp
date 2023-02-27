const checkFieldType = (loginText) => {
    let fieldType
    if(loginText.toString().includes('@') && loginText.toString().includes('.')){
        fieldType = 'email'
    }else if(Object.is(parseInt(loginText, 10), NaN)){
    fieldType = 'userName'
    }else{
    fieldType = 'phoneNumber'
    }
    return fieldType
}

module.exports = checkFieldType