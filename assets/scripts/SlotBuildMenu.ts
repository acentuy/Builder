import BuildingStateWhole from "./BuildingStateWhole";

const {ccclass, property} = cc._decorator;
import BuildingStateDamaged from "./BuildingStateDamaged";
import BuildingBase from "./BuildingBase";
import BuildingStorage from "./BuildingStorage";
import BuildingView from "./BuildingView";

@ccclass
export default class SlotBuildMenu extends cc.Component {
    @property(cc.Node) buyButton: cc.Node = null;

    @property(cc.Node) buildButton: cc.Node = null;

    @property(cc.Node) gradeSprites: cc.Node = null;

    @property(cc.Sprite) progressSprite: cc.Sprite = null;

    @property(cc.Sprite) upgradeSprite: cc.Sprite = null;

    @property([cc.SpriteFrame]) wholeSprites: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame]) damagedSprites: cc.SpriteFrame[] = [];
    @property([cc.Node]) activeStarsNode: cc.Node[] = [];

    private building: BuildingBase = null;

    init(buildIndex: number) {
        this.building = BuildingStorage.buildings[buildIndex];
        this.building.node.on(BuildingBase.EVENTS.STATE_CHANGED, this.updateGrades, this);
        this.progressSprite.spriteFrame = this.wholeSprites[0];
    }

    updateGrades() {
        if (this.building.getState() instanceof BuildingStateWhole) {
            this.progressSprite.spriteFrame = this.wholeSprites[this.building.currentLevel - 1];
            this.activeStarsNode[this.building.currentLevel - 1].active = true;
            if (this.building.currentLevel < this.building.maxLevel) {
                this.upgradeSprite.spriteFrame = this.wholeSprites[this.building.currentLevel];
            } else {
                this.gradeSprites.active = false;
            }
        } else {
            this.progressSprite.spriteFrame = this.damagedSprites[this.building.currentLevel - 1];
            this.upgradeSprite.spriteFrame = this.wholeSprites[this.building.currentLevel - 1];
            if (this.building.currentLevel == this.building.maxLevel)
                this.gradeSprites.active = true;
            else
                this.activeStarsNode[this.building.currentLevel].active = false;
        }
    }

    build() {
        this.buildButton.destroy();
        this.buyButton.active = true;
        this.gradeSprites.active = true;
        this.building.currentLevel++;
        BuildingView.updateSprite(this.building);
        this.updateGrades();
    }

    onUpgradeButtonClick() {
        if (this.building.getState() instanceof BuildingStateWhole)  this.building.levelUp();
        else this.building.repair();
    }
}
