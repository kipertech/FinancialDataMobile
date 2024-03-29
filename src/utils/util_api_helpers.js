import { isObject } from "./util_object_helpers";

const GLOBAL = require('../configs/config_global');

// region API Wrapper
export function apiWrapper(link, method = 'POST', functionName = '', body = null, completeFunc = () => {}, customAuthorizationKey = null)
{
    return new Promise((resolve, reject) => {
        let hasPagination = link.toLowerCase().includes('page') || link.toLowerCase().includes('per_page'),
            fetchLink = (link.startsWith('http') ? '' : GLOBAL.FATHER_LINK) + link;

        console.log(fetchLink);

        fetch(fetchLink, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + (customAuthorizationKey || GLOBAL.DATA.USER_TOKEN)
            },
            body
        })
            .then((response) => handleFirstResponse(response))
            .then((response) =>
            {
                if (!checkErrorExist(response))
                {
                    console.log(`[SUCCESS] ${functionName.toUpperCase()}`, response);
                    completeFunc(response);
                    resolve(
                        hasPagination ?
                            {
                                data: response.data,
                                currentPage: (response['meta'] || response)["current_page"],
                                lastPage: (response['meta'] || response)["last_page"],
                                totalResult: (response['meta'] || response)["total"],
                                meta: response['meta'] || {}
                            }
                            :
                            response
                    );
                }
                else
                {
                    console.log(`[FAILED] ${functionName.toUpperCase()}`, response);
                    reject(convertError(response.errors || response.error));
                }
            })
            .catch((error) =>
            {
                console.log(`[FAILED] ${functionName.toUpperCase()}`, error);
                reject(error.message);
            });
    });
}
// endregion

// region Check if error exist in API response
export function checkErrorExist(responseObj)
{
    return(responseObj.hasOwnProperty('errors') || responseObj.hasOwnProperty('error') || responseObj.hasOwnProperty('exception'));
}
// endregion

// region Convert Error Object in Response to Readable Format
export function convertError(errorObj)
{
    if (isObject(errorObj))
    {
        // Extract error data
        let errorStr = '';
        let errorArr = Object.keys(errorObj);
        errorArr.forEach((errorKey) =>
        {
            errorStr += (errorArr.length > 1 ? '- ' : '') + (errorObj[errorKey])[0].toString();

            // Add line break
            if (errorArr.length > 1)
            {
                errorStr += '\n';
            }
        });

        return errorStr;
    }
    else if (typeof errorObj === 'string')
    {
        return(errorObj);
    }
    else if (errorObj.hasOwnProperty('headers'))
    {
        return('Status Code: ' + errorObj.status);
    }
}
// endregion

// region Check if response is valid JSON
function isJSON(str)
{
    try
    {
        JSON.parse(str);
    }
    catch (e)
    {
        return false;
    }
    return true;
}
// endregion

// region Function - Handle First Response
export function handleFirstResponse(response)
{
    if (typeof response === 'string')
    {
        if (isJSON(response))
        {
            return response.json();
        }
        else return({ errors: response });
    }
    else
    {
        let statusCode = response.status;

        switch(statusCode)
        {
            case 200:
            case 201:
            case 422:
            case 403:
            {
                return response.json();
            }
            case 204:
            case 205:
            {
                return({});
            }
            case 401:
            {
                return({ errors: 'Your account session has expired, please log out and log in again.' });
            }
            case 404:
            {
                return({ errors: '404' });
            }
            default: return({ errors: response });
        }
    }
}
// endregion

// region Function - Extract Meta Data
export function getMetaData(response)
{
    if (response['meta'])
    {
        return({
            data: response.data || [],
            currentPage: response['meta']['current_page'],
            lastPage: response['meta']['last_page'],
            totalResult: response['meta']['total']
        });
    }
    else
    {
        return({
            data: response.data || [],
            currentPage: response['current_page'],
            lastPage: response['last_page'],
            totalResult: response['total']
        });
    }
}
// endregion
