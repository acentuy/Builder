import BuildingStateWhole from "./BuildingStateWhole";

const {ccclass, property} = cc._decorator;
import BuildingStateDamaged from "./BuildingStateDamaged";
import BuildingBase from "./BuildingBase";
import BuildingStorage from "./BuildingStorage";

@ccclass
export default class BuildingView extends cc.Component {

    static updateSprite(building: BuildingBase) {
        if (building.getState() instanceof BuildingStateWhole) {
            building.getComponent(cc.Sprite).spriteFrame = building.wholeSprites[building.currentLevel - 1];
        } else {
            building.getComponent(cc.Sprite).spriteFrame = building.damagedSprites[building.currentLevel - 1];
        }
    }
}
