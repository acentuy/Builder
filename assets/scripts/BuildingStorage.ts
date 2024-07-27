import BuildingBase from "./BuildingBase";
import BuildingStateWhole from "./BuildingStateWhole";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingStorage extends cc.Component {

    @property([cc.Node])
    buildingsNode: cc.Node[] = [];

    static buildings: BuildingBase[] = [];

    start() {
        this.buildingsNode.forEach(buildingNode => { BuildingStorage.buildings.push(buildingNode.getComponent(BuildingBase)) });
    }
}
