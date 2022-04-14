const CONFIG = {
    NAME: 'PublicSans',
    WEIGHT: {
        '300': "Light",
        '400': "Regular",
        '500': "Medium",
        '600': "SemiBold",
        '700': "Bold",
        '800': "Bold",
        '900': "Black",
        'normal': "Regular",
        'bold': "Bold"
    },
    STYLE: {
        'normal': '',
        'italic': 'Italic'
    }
};

export function getFontName(fontWeight = 'normal', fontStyle = 'normal')
{
    const weight = fontWeight ? CONFIG.WEIGHT[fontWeight.toString()] : CONFIG.WEIGHT['normal'];
    const style = fontStyle ? CONFIG.STYLE[fontStyle.toString()] : CONFIG.STYLE['normal'];

    if (style === CONFIG.STYLE['italic'] && weight === CONFIG.WEIGHT['normal'])
    {
        return(`${CONFIG.NAME}-${style}`);
    }
    else return(`${CONFIG.NAME}-${weight || "Regular"}${style}`);
}

export function parsedTextStyle(textStyleObject = {})
{
    return(
        Object.assign(
            {},
            textStyleObject,
            {
                fontWeight: null,
                fontStyle: null,
                fontFamily: getFontName(textStyleObject['fontWeight'] || 'normal', textStyleObject['fontStyle'] || 'normal')
            }
        )
    );
}
