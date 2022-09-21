import ColorsContainer from "../db/colors.ts";
const colors = new ColorsContainer();

const getColors = () => {
    return { colors: colors.getColors() };
};

const postColor = (colorCode: string) => {
    const data = colors.getColors();
    const colorFound = data.find(c => colorCode === c);

    if(colorFound) return { 
        colorCode, 
        msg: 'Este color ya existe', 
        created: false
    };

    colors.addColor(colorCode);
    return { 
        colorCode, 
        msg: 'Se añadió el color con éxito', 
        created: true 
    };
};

export { getColors, postColor };