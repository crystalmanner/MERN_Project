import { Grid } from './Grid';
declare class Layout {
    container: Grid[];
    layouts: {};
    addGrid(grid: Grid): void;
    /**
     * In format of react-grid-layout
     */
    getLayout(): {};
    /**
     * Create react-grid-layout format from each grid
      {
        lg: [
          { i: 'a', x: 0, y: 0, w: 4, h: 2 },
        ],
        xxs: [
          { i: "c", x: 8, y: 0, w: 4, h: 2 },
        ],
      };
     */
    private mapLayout;
}
export { Layout };
//# sourceMappingURL=Layout.d.ts.map