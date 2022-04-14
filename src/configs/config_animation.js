import * as Animatable from 'react-native-animatable';
import { LayoutAnimation } from 'react-native';

const customAnimations = {
    makeBigger: {
        from: { scale: 1 },
        to: { scale: 1.5 }
    },
    makeSmaller: {
        from: { scale: 1.5 },
        to: { scale: 1 }
    },
    fadeZoom: {
        0: {
            opacity: 0,
            scale: 0.95
        },
        1: {
            opacity: 1,
            scale: 1
        }
    },
    fadeZoomOut: {
        1: {
            opacity: 1,
            scale: 1
        },
        0: {
            opacity: 0,
            scale: 0
        }
    }
};

export function initializeCustomAnimations()
{
    Animatable.initializeRegistryWithDefinitions(customAnimations);
}

export function startLayoutAnimation(duration = 250)
{
    LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration,
        useNativeDriver: true
    });
}
