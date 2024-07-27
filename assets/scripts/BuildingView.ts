import BuildingStateWhole from "./BuildingStateWhole";

const {ccclass, property} = cc._decorator;
import BuildingStateDamaged from "./BuildingStateDamaged";
import BuildingBase from "./BuildingBase";
import BuildingStorage from "./BuildingStorage";

@ccclass
export default class BuildingView extends cc.Component {
    static updateSprite(building: BuildingBase) {
        const animationComponent = building.buildAnim.getComponent(cc.Animation);
        if (animationComponent) {
            const onFinished = () => {
                animationComponent.off('finished', onFinished, this);
                this.addSprites(building);
            };
            animationComponent.on('finished', onFinished, this);
            animationComponent.play("build");
        }
        else
            this.addSprites(building);
    }
    static addSprites(building: BuildingBase) {
        const spriteComponent = building.getComponent(cc.Sprite);
        if (building.getState() instanceof BuildingStateWhole) {
            spriteComponent.spriteFrame = building.wholeSprites[building.currentLevel - 1];
        } else {
            spriteComponent.spriteFrame = building.damagedSprites[building.currentLevel - 1];
        }
    }
}
