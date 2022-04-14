import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name = '', params = {})
{
    if (navigationRef.isReady() && !!name.trim())
    {
        navigationRef.navigate(name, params);
    }
}

export function canGoBack()
{
    if (navigationRef.isReady())
    {
        return navigationRef.canGoBack();
    }

    return false;
}

export function goBack()
{
    if (navigationRef.isReady())
    {
        navigationRef.goBack();
    }
}

export function push(sceneName = '', params = {})
{
    if (navigationRef.isReady() && !!sceneName.trim())
    {
        navigationRef.dispatch(StackActions.push(sceneName, params));
    }
}

export function pop()
{
    if (navigationRef.isReady())
    {
        navigationRef.dispatch(StackActions.pop());
    }
}

export function reset(sceneName = '')
{
    if (navigationRef.isReady() && !!sceneName.trim())
    {
        navigationRef.reset({
            index: 0,
            routes: [{ name: sceneName }]
        });
    }
}

export function replace(sceneName = '')
{
    if (navigationRef.isReady() && !!sceneName.trim())
    {
        navigationRef.dispatch(StackActions.replace(sceneName));
    }
}
