import BuildingBase from "./BuildingBase";
import BuildingStateWhole from "./BuildingStateWhole";
import BuildingStorage from "./BuildingStorage";
import SlotBuildMenu from "./SlotBuildMenu";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildMenu extends cc.Component {

    @property(cc.Prefab) slotBuildMenu = null;

    start() {
        BuildingStorage.buildings.forEach((building: BuildingBase, index: number) => {
            let slot: SlotBuildMenu = cc.instantiate(this.slotBuildMenu).getComponent(SlotBuildMenu);
            slot.init(index);
            this.node.addChild(slot.node);
        })
    }
}
