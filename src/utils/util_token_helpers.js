import jwtDecode from "jwt-decode";

import {
    getData,
    storeData,
    removeData
} from './util_storage_helpers';

const GLOBAL = require('../configs/config_global');

// region Check Token Expiration
export function checkExpire(token)
{
    let decoded = jwtDecode(token);
    let today = Math.round(new Date().getTime() / 1000);
    let expireDay = decoded.exp;

    console.log('[TOKEN EXPIRATION]', today + '|' + expireDay);

    return(today > expireDay);
}
// endregion

// region Save user token and data to local storage
export function saveToken(token, service, userData)
{
    let saveObj = {
        "token": token,
        "service": service,
        "data": userData
    };

    return new Promise((resolve) => {
        // Retrieve current token in local storage
        // (to support multiple accounts)
        getData('currentToken')
            .then((resultObj) => {
                let accountList;
                if (resultObj)
                {
                    let currentTokenObj = JSON.parse(resultObj);
                    accountList = Array.isArray(currentTokenObj) ? currentTokenObj : [currentTokenObj];
                }
                else accountList = [];

                // Check if current array already contain this user data
                // if yes, update its value
                let accountIndex = accountList.findIndex((account) => account.data.id === userData.id);
                if (accountIndex > -1)
                {
                    accountList.splice(accountIndex, 1, saveObj);
                }
                else accountList.push(saveObj);

                // Start saving new array of accounts to local storage
                storeData('currentToken', JSON.stringify(accountList))
                    .then((result) => resolve(result));
            });
    });
}
// endregion

// region Remove User Token from Local Storage
export function removeToken(userID = GLOBAL.DATA.USER.id)
{
    return new Promise((resolve) => {
        // Retrieve current token in local storage
        // just in case user has multiple accounts
        getData('currentToken')
            .then((resultObj) => {
                let accountList;
                if (resultObj)
                {
                    let currentTokenObj = JSON.parse(resultObj);
                    accountList = Array.isArray(currentTokenObj) ? currentTokenObj : [currentTokenObj];
                }
                else accountList = [];

                // Check if this account is in the list, if yes then remove it
                let accountIndex = accountList.findIndex((account) => account.data.id === userID);
                if (accountIndex > -1)
                {
                    accountList.splice(accountIndex, 1);
                }

                // Start saving new array of accounts to local storage
                if (accountList.length > 0)
                {
                    storeData('currentToken', JSON.stringify(accountList))
                        .then(() => {
                            console.log('[SUCCESS] SAVE TOKEN', accountList);
                            resolve(accountList);
                        });
                }
                else
                {
                    removeData('currentToken')
                        .then(() => resolve(null));
                }
            });
    });
}
// endregion

// region Get Token Data
export function getToken()
{
    return new Promise((resolve) => {
        getData('currentToken')
            .then((result) => {
                console.log('[SUCCESS] Get Token', result);
                resolve(result);
            });
    });
}
// endregion
