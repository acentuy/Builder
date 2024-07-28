export class TextureLoader {
    static sfMap: Map<string, cc.SpriteFrame> = new Map();

    static init() {
        console.time(`[LOADTIME] all atlases`);
        return new Promise<void>((resolve, reject) => {
            this.loadAtlas('UIAndAnim').then(() =>
                this.loadAtlas('bear').then(() => {
                    console.timeEnd(`[LOADTIME] all atlases`);
                    resolve();
                }).catch((err) => {
                    reject(err);
                })
            ).catch((err) => {
                reject(err);
            });
        });
    }

    static setTexture(sprite: cc.Sprite, texture: string, cb?: (sf: cc.SpriteFrame) => void) {
        const spriteFrame = this.sfMap.get(texture);
        if (spriteFrame) {
            sprite.spriteFrame = spriteFrame;
            console.log(`[TEXTURE SET] Texture ${texture} set successfully.`);
        } else {
            console.error(`[TEXTURE ERROR] Texture ${texture} not found.`);
        }
    }

    static loadAtlas(atlasName: string): Promise<cc.SpriteAtlas> {
        return new Promise<cc.SpriteAtlas>((resolve, reject) => {
            cc.loader.loadRes(atlasName, cc.SpriteAtlas, (err, atlas) => {
                if (err) {
                    console.error("[LOADER] Error loading atlas", atlasName, err);
                    reject(err);
                } else {
                    console.log("[ATLAS LOAD]", atlasName);
                    atlas.getSpriteFrames().forEach(sf => this.sfMap.set(sf.name, sf));
                    resolve(atlas);
                }
            });
        });
    }
}
