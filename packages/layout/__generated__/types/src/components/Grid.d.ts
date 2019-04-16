import { Screen } from "./Screen";
interface Grid {
    id: string;
    configs?: RglLayout;
}
declare type RglLayout = {
    [key in Screen.Size]?: Dimension[];
};
declare type Dimension = {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
};
declare class Grid {
    id: string;
    configs?: Grid["configs"];
    constructor(id: string);
    setDimension(size: Screen.Size, x: number, y: number, w: number, h: number): void;
}
export { Grid };
//# sourceMappingURL=Grid.d.ts.map