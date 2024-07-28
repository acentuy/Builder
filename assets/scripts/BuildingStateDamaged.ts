import { BuildingState } from "./BuildingState";
import BuildingBase from "./BuildingBase";
import BuildingStateWhole from "./BuildingStateWhole";
import BuildingView from "./BuildingView";

export default class BuildingStateDamaged implements BuildingState {
    private _building: BuildingBase;

    constructor(building: BuildingBase) {
        this._building = building;
    }

    levelUp() {
    }

    damage() {
        if (this._building.currentLevel > this._building.minLevel) {
            this._building.currentLevel--;
            BuildingView.updateSprite(this._building);
        }
    }

    repair() {
        this._building.setState(new BuildingStateWhole(this._building));
        BuildingView.updateSprite(this._building);
    }
}
