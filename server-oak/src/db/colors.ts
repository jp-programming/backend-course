export default class ColorsContainer {
    private colors: string[];

    constructor() {
        this.colors = [];
    }

    getColors(): string[] {
        return this.colors;
    }

    addColor(colorCode: string) {
        this.colors.push(colorCode);
    }
}