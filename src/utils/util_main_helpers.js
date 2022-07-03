import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const GLOBAL = require('../configs/config_global');

// region Function - Get Random Integer
export function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// endregion

// region Function - Capitalize First Letter
export function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}
// endregion

// region Function - Show Alert
export function showAppError(text, callback = () => {})
{
    if (text === 'Network request failed')
    {
        Alert.alert(GLOBAL.APP_NAME, 'Oops! Connection lost, please try again!');
    }
    else
    {
        Alert.alert(
            GLOBAL.APP_NAME,
            'An error has occurred while fetching data, please try again later.\n\nError message:\n' +
            text,
            [{ text: 'OK', onPress: callback }]
        );
    }
}
// endregion

// region Number with Commas and Summary
export function numberWithCommas(x, summary = true, fixedDecimal = 0, addDollarSign = false)
{
    let decimalStr = Number(x || 0).toFixed(fixedDecimal),
        processingNumber = summary ? Math.round(x) : (fixedDecimal > 0 ? Number(decimalStr.substring(0, decimalStr.length - (fixedDecimal + 1))) : x),
        postDecimal = fixedDecimal > 0 ? decimalStr.substr(decimalStr.toString().length - 3, fixedDecimal + 1) : '',
        isNegative = false;

    if (processingNumber < 0)
    {
        isNegative = true;
        processingNumber = Math.abs(processingNumber);
    }

    let postfix = '';
    if (summary)
    {
        if (processingNumber >= 1000 && processingNumber < 1000000)
        {
            postfix = 'K';
            processingNumber = Math.round(processingNumber / 100) / 10;
        }
        else if (processingNumber >= 1000000 && processingNumber < 1000000000)
        {
            postfix = 'M';
            processingNumber = Math.round(processingNumber / 100000) / 10;
        }
        else if (processingNumber >= 1000000000 && processingNumber < 1000000000000)
        {
            postfix = 'B';
            processingNumber = Math.round(processingNumber / 100000000) / 10;
        }
    }
    else if (fixedDecimal > 0)
    {
        postfix = postDecimal;
    }

    return(
        (isNegative ? '-' : '') +
        (addDollarSign ? '$' : '') +
        processingNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        postfix
    );
}
// endregion

// region Convert String to Number
export function stringToNumber(text)
{
    return(Number((text || '0').toString().replace(/,/g, '')));
}
// endregion

// region Check Password Strength
export function checkPasswordStrength(password)
{
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    let hasWhiteSpace = /\s/g.test(password);

    if (hasWhiteSpace)
    {
        return false;
    }
    else
    {
        let isStrong = strongRegex.test(password),
            isMedium = mediumRegex.test(password);

        let progress = isStrong ? 1 : (isMedium ? 0.5 : 0.2);

        return(progress);
    }
}
// endregion

// region Compare 2 Arrays
export function compareArrays(arr1 = [], arr2 = [])
{
    if (arr1.length !== arr2.length)
    {
        return false;
    }
    else return(arr1.every((item) => arr2.includes(item)));
}
// endregion

// region Capitalize Each Word
export function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt)
    {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
}
// endregion

// region Validate US Number
export function validateUSNumber(elementValue)
{
    // Valid US phone number format:
    // +1 NXX-NXX-XXXX
    // N=digits 2–9, X=digits 0–9

    let checkStr = elementValue;
    if (typeof elementValue === 'string' && elementValue.trim())
    {
        // Remove zip code before checking
        if (elementValue.startsWith('+1'))
        {
            checkStr = elementValue.substring(2, checkStr.length);
        }
        // If user enters leading 1 and the length of number is 11, they might indicating this as US zip code
        else if (elementValue.startsWith('1') && elementValue.length === 11)
        {
            checkStr = checkStr.substring(1, checkStr.length);
        }

        // Check for first "N" number
        if (checkStr.startsWith('1') || checkStr.startsWith('0')) return false;

        // Check for second "N" number
        if ((checkStr.substr(3, 1) === '0') || (checkStr.substr(3, 1) === '1')) return false;

        // Regex to test
        let phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return phoneNumberPattern.test(checkStr);
    }
    else return false;
}
// endregion

// region Format US Phone Number
export function formatPhoneNumber(phoneNumberString)
{
    if (typeof phoneNumberString === 'string' && phoneNumberString.trim().length > 0)
    {
        if (validateUSNumber(phoneNumberString))
        {
            let cleaned = ('' + phoneNumberString.match(/\d/g)?.join("")).replace(/\D/g, '');
            let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
            if (match)
            {
                let intlCode = (match[1] ? '+1 ' : '');
                return[intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('').replace('+1', '').trim();
            }
            return phoneNumberString.replace('+1', '').trim();
        }
        else return('');
    }
    else return('');
}
// endregion

// region Check if email is in valid format
export function checkEmail(email)
{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !email.trim())
    {
        return true;
    }
    else return re.test(email);
}
// endregion

// region Check Valid URL
export function checkValidURL(str)
{
    if (!str) return true;

    if (str.indexOf('.') < 0)
    {
        return false;
    }
    else
    {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        if (!str || !str.trim())
        {
            return true;
        }
        else return pattern.test(str);
    }
}
// endregion

// region Check Current Internet Connectivity
export function checkInternet()
{
    return new Promise((resolve) =>
    {
        NetInfo.fetch()
            .then((connectionState) =>
            {
                console.log("[SUCCESS] CHECK INTERNET CONNECTION", connectionState);
                resolve(connectionState.isConnected);
            });
    });
}
// endregion
