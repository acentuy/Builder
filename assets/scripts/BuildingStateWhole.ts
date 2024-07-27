import { BuildingState } from "./BuildingState";
import BuildingBase from "./BuildingBase";
import BuildingStateDamaged from "./BuildingStateDamaged";
import BuildingView from "./BuildingView";

export default class BuildingStateWhole implements BuildingState {
    private building: BuildingBase;

    constructor(building: BuildingBase) {
        this.building = building;
    }

    levelUp() {
        this.building.currentLevel++;
        BuildingView.updateSprite(this.building);
    }

    damage() {
        this.building.setState(new BuildingStateDamaged(this.building));
    }

    repair() {
    }
}
