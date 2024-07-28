import BuildingBase from "./BuildingBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildingStorage extends cc.Component {

    @property([cc.Node]) buildingsNode: cc.Node[] = [];

    static buildings: BuildingBase[] = [];

    start() {
        this.buildingsNode.forEach((buildingNode: cc.Node, index: number) => {
            const building = buildingNode.getComponent(BuildingBase);
            building.buildIndex = index;
            BuildingStorage.buildings.push(building);
        });
    }
}
