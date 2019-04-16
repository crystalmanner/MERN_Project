import {
  mergeWith,
  map,
  flatten,
  flattenDeep,
  keyBy,
  forOwn,
  merge,
} from 'lodash';
import { isArray } from 'util';
import { Grid } from './Grid';

class Layout {
  container: Grid[] = [];
  layouts = {};

  addGrid(grid: Grid) {
    this.container.push(grid);
  }

  /**
   * In format of react-grid-layout
   */
  getLayout() {
    // Loop each grid
    // grid -> build layout

    this.container.forEach(grid => {
      this.mapLayout(grid);
    });

    return this.layouts;
  }

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
  private mapLayout(grid: Grid) {
    const { configs } = grid;

    forOwn(configs, (val, key) => {
      /**
       * Add to layout
       */
      const customizer = (obj, src) => {
        if (isArray(obj)) {
          return obj.concat(src);
        }
        return obj;
      };

      this.layouts = mergeWith(this.layouts, { [key]: [val] }, customizer);
    });
  }
}

export { Layout };
