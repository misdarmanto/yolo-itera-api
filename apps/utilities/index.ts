export const GenerateRandomNumber = (length: number) => {
    let result = '';
    let characters = '012345678901234567890123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const GenerateRandomString = (length: number) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const ParsePhoneNumber = (phone: string) => {
    phone = phone.trim()
    phone = phone.replace(/-/g, '')
    phone = phone.replace(/ /g, '')
    phone = phone.replace(/\+/g, '')
    if (phone.substr(0, 1) == '0') { phone = '62' + phone.substr(1, phone.length - 1) }
    else if (phone.substr(0, 3) == '+62') { phone = '62' + phone.substr(3, phone.length - 1) }
    return phone
}
