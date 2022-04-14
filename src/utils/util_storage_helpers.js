import AsyncStorage from '@react-native-async-storage/async-storage';

// region Save Data
export function storeData(keyName, keyData)
{
    return new Promise((resolve) =>
    {
        AsyncStorage.setItem(keyName, keyData)
            .then((result) =>
            {
                console.log('[SUCCESS] Save Data to Storage', keyName);
                resolve(result);
            })
            .catch((error) =>
            {
                console.log('[FAILED] Save Data to Storage', error);
                resolve(null);
            });
    });
}
// endregion

// region Get Data
export function getData(keyName)
{
    return new Promise((resolve) =>
    {
        AsyncStorage.getItem(keyName)
            .then((value) =>
            {
                if (value)
                {
                    try
                    {
                        console.log('[SUCCESS] Get data from storage "' + keyName + '"', JSON.parse(value));
                    }
                    catch
                    {
                        console.log('[SUCCESS] Get data from storage "' + keyName + '"', value);
                    }

                    resolve(value);
                }
                else
                {
                    console.log('[SUCCESS] Get data from storage "' + keyName + '"', null);
                    resolve(null);
                }
            })
            .catch((error) =>
            {
                console.log('[FAILED] Get data from storage "' + keyName + '"', error);
                resolve(null);
            });
    });
}
// endregion

// region Remove Data
export function removeData(keyName)
{
    return new Promise((resolve, reject) =>
    {
        AsyncStorage.removeItem(keyName)
            .then(() =>
            {
                console.log('[SUCCESS] Remove data from storage "' + keyName + '"');
                resolve(true);
            })
            .catch((error) =>
            {
                console.log('[FAILED - ERROR] Remove data from storage "' + keyName + '"', error);
                reject(error);
            });
    });
}
// endregion
