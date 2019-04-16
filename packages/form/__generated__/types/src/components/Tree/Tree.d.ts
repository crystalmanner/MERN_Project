import TreeModel from 'tree-model';
declare class Tree extends TreeModel {
    private root;
    constructor(options: any);
    getTree(): any;
    /**
     * Convert tree to react-d3-tree format
     *
     * https://github.com/bkrem/react-d3-tree
     */
    getD3Tree(): any;
}
export default Tree;
//# sourceMappingURL=Tree.d.ts.map