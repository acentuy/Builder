import {BuildingState} from "./BuildingState";
import BuildingView from "./BuildingView";
import BuildingStateWhole from "./BuildingStateWhole";
import BuildingStorage from "./BuildingStorage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuildingBase extends cc.Component {
    @property([cc.SpriteFrame])
    wholeSprites: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    damagedSprites: cc.SpriteFrame[] = [];

    @property(cc.Node)
    buildAnim: cc.Node = null;

    currentLevel: number = 0;

    maxLevel: number = 5;

    minLevel: number = 1;

    private state: BuildingState = new BuildingStateWhole(this);
    static readonly EVENTS = {
        STATE_CHANGED: "state-changed",
    };

    setState(state:BuildingState) {
        this.state = state;
    }

    getState(): BuildingState {
        return this.state;
    }

    levelUp() {
        if (this.currentLevel < this.maxLevel) {
            this.state.levelUp();
            this._changeState();
        }
    }

    damage() {
        if (this.currentLevel >= this.minLevel) {
            this.state.damage();
            this._changeState();
        }
    }

    repair() {
        this.state.repair();
        this._changeState();
    }

    private _changeState() {
        BuildingView.updateSprite(this);
        this.node.emit(BuildingBase.EVENTS.STATE_CHANGED, this);
    }
}
