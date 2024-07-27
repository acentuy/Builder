import { BuildingState } from "./BuildingState";
import BuildingBase from "./BuildingBase";
import BuildingStateWhole from "./BuildingStateWhole";
import BuildingView from "./BuildingView";

export default class BuildingStateDamaged implements BuildingState {
    private building: BuildingBase;

    constructor(building: BuildingBase) {
        this.building = building;
    }

    levelUp() {
    }

    damage() {
        if (this.building.currentLevel > this.building.minLevel) {
            this.building.currentLevel--;
        }
        BuildingView.updateSprite(this.building);

    }

    repair() {
        this.building.setState(new BuildingStateWhole(this.building));
    }
}
