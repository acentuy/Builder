import { BuildingState } from "./BuildingState";
import BuildingBase from "./BuildingBase";
import BuildingView from "./BuildingView";
import BuildingStateDamaged from "./BuildingStateDamaged";

export default class BuildingStateWhole implements BuildingState {
    private _building: BuildingBase;

    constructor(building: BuildingBase) {
        this._building = building;
    }

    levelUp() {
        this._building.currentLevel++;
        BuildingView.updateSprite(this._building);
    }

    damage() {
        this._building.setState(new BuildingStateDamaged(this._building));
        BuildingView.updateSprite(this._building);
    }

    repair() {
    }
}
