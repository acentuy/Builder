import {BuildingState} from "./BuildingState";
import BuildingView from "./BuildingView";
import BuildingStateWhole from "./BuildingStateWhole";

const {ccclass, property} = cc._decorator;

export const BUILDING_NAMES: Array<string> = [
    'bear'
]
export const BUILDING_DAMAGE = "_dmg"

@ccclass
export default class BuildingBase extends cc.Component {

    @property(cc.Node) buildAnim: cc.Node = null;

    public currentLevel: number = 0;

    public maxLevel: number = 5;

    public minLevel: number = 1;

    public buildIndex: number = -1;

    private _state: BuildingState = new BuildingStateWhole(this);

    static readonly EVENTS = {
        STATE_CHANGED: "state-changed",
    };

    setState(state:BuildingState) {
        this._state = state;
    }

    getState(): BuildingState {
        return this._state;
    }

    levelUp() {
        if (this.currentLevel < this.maxLevel) {
            this._state.levelUp();
            this._changeState();
        }
    }

    damage() {
        if (this.currentLevel >= this.minLevel) {
            this._state.damage();
            this._changeState();
        }
    }

    repair() {
        this._state.repair();
        this._changeState();
    }

    private _changeState() {
        this.node.emit(BuildingBase.EVENTS.STATE_CHANGED, this);
    }
}
