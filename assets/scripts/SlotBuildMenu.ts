import BuildingStateWhole from "./BuildingStateWhole";
import BuildingBase, {BUILDING_DAMAGE, BUILDING_NAMES} from "./BuildingBase";
import BuildingStorage from "./BuildingStorage";
import BuildingView from "./BuildingView";
import {TextureLoader} from "./TextureLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SlotBuildMenu extends cc.Component {

    @property(cc.Node) buyButton: cc.Node = null;

    @property(cc.Node) buildButton: cc.Node = null;

    @property(cc.Node) gradeSprites: cc.Node = null;

    @property(cc.Sprite) progressSprite: cc.Sprite = null;

    @property(cc.Sprite) upgradeSprite: cc.Sprite = null;

    @property([cc.Node]) activeStarsNode: cc.Node[] = [];

    private building: BuildingBase = null;
    private buildingIndex: number = -1;

    init(buildIndex: number) {
        this.building = BuildingStorage.buildings[buildIndex];
        this.buildingIndex = buildIndex;
        this.building.node.on(BuildingBase.EVENTS.STATE_CHANGED, this._updateGrades, this);
        TextureLoader.setTexture(this.progressSprite, BUILDING_NAMES[this.buildingIndex] + '_' + this.building.minLevel);
    }

    private _updateGrades() {
        if (this.building.getState() instanceof BuildingStateWhole)
            this._wholeUpgrade();
        else
            this._damageUpgrade();
    }

    private _wholeUpgrade() {
        TextureLoader.setTexture(this.progressSprite, BUILDING_NAMES[this.buildingIndex] + '_' + this.building.currentLevel);
        this.activeStarsNode[this.building.currentLevel - 1].active = true;
        if (this.building.currentLevel < this.building.maxLevel)
            TextureLoader.setTexture(this.upgradeSprite, BUILDING_NAMES[this.buildingIndex] + '_' + (this.building.currentLevel + 1));
        else
            this.gradeSprites.active = false;
    }

    private _damageUpgrade() {
        TextureLoader.setTexture(this.progressSprite, BUILDING_NAMES[this.buildingIndex] + BUILDING_DAMAGE + '_' + this.building.currentLevel);
        TextureLoader.setTexture(this.upgradeSprite, BUILDING_NAMES[this.buildingIndex] + '_' + this.building.currentLevel);
        if (this.building.currentLevel == this.building.maxLevel)
            this.gradeSprites.active = true;
        else
            this.activeStarsNode[this.building.currentLevel].active = false;
    }

    build() {
        this.buildButton.destroy();
        this.buyButton.active = true;
        this.gradeSprites.active = true;
        this.building.currentLevel++;
        BuildingView.updateSprite(this.building);
        this._updateGrades();
    }

    onUpgradeButtonClick() {
        if (this.building.getState() instanceof BuildingStateWhole)  this.building.levelUp();
        else this.building.repair();
    }
}
