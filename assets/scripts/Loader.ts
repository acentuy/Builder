import BuildingBase from "./BuildingBase";
import BuildingStorage from "./BuildingStorage";
import SlotBuildMenu from "./SlotBuildMenu";
import { TextureLoader } from "./TextureLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Loader extends cc.Component {

    @property(cc.Prefab) slotBuildMenu: cc.Prefab = null;

    start() {
        TextureLoader.init().then(() => {
            this._loadBuildMenu();
        });
    }

    private _loadBuildMenu() {
        BuildingStorage.buildings.forEach((building: BuildingBase, index: number) => {
            const slotNode = cc.instantiate(this.slotBuildMenu);
            const slot: SlotBuildMenu = slotNode.getComponent(SlotBuildMenu);
            slot.init(index);
            this.node.addChild(slot.node);
        });
    }
}
