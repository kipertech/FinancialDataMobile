// region Generate Initials
export function generateInitials(text = '')
{
    let name = text.toUpperCase().split(' ');
    let initials = '';

    if (name.length === 1)
    {
        initials = `${name[0].charAt(0)}`;
    }
    else if (name.length > 1)
    {
        initials = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    }
    else initials = '';

    return(initials);
}
// endregion

// region Generate Color Based on Name
export function generateColor(text = '')
{
    let sumChars = 0;
    for (let i = 0; i < text.length; i++)
    {
        sumChars += text.charCodeAt(i);
    }

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [
        '#e67e22', // carrot
        '#2ecc71', // emerald
        '#3498db', // peter river
        '#8e44ad', // wisteria
        '#e74c3c', // alizarin
        '#1abc9c', // turquoise
        '#2c3e50' // midnight blue
    ];

    return(colors[sumChars % colors.length]);
}
// endregion
