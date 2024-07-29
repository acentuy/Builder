import BuildingStateWhole from "./BuildingStateWhole";
import BuildingBase, { BUILDING_DAMAGE, BUILDING_NAMES } from "./BuildingBase";
import { TextureLoader } from "./TextureLoader";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingView extends cc.Component {
    static updateSprite(building: BuildingBase) {
        const node = building.node;

        const animationComponent = building.buildAnim.getComponent(cc.Animation);
        const onFinished = () => {
            animationComponent.off('finished', onFinished, this);

            const shrink = cc.scaleTo(0.2, 0).easing(cc.easeBackIn());
            const onShrinkComplete = cc.callFunc(() => {
                this.addSprites(building);
                const expand = cc.scaleTo(0.2, 0.5).easing(cc.easeBackOut());
                node.runAction(expand);
            });
            const sequence = cc.sequence(shrink, onShrinkComplete);
            node.runAction(sequence);
        };

        if (animationComponent) {
            animationComponent.on('finished', onFinished, this);
            animationComponent.play("build");
        } else {
            this.addSprites(building);
        }
    }

    static addSprites(building: BuildingBase) {
        const spriteComponent = building.getComponent(cc.Sprite);
        const textureName = building.getState() instanceof BuildingStateWhole
            ? `${BUILDING_NAMES[building.buildIndex]}_${building.currentLevel}`
            : `${BUILDING_NAMES[building.buildIndex]}${BUILDING_DAMAGE}_${building.currentLevel}`;
        TextureLoader.setTexture(spriteComponent, textureName);
    }
}
