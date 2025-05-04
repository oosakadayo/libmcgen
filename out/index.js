"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCardinalDirection = void 0;
exports.saveBlock = saveBlock;
const fs_1 = require("fs");
///////////////////////////////////////////////////////////////////
//                                                               //
//                                                               //
//               BLOCKS                                          //
///////////////////////////////////////////////////////////////////
exports.BlockCardinalDirection = "minecraft:cardinal_direction";
function saveBlock(block, path) {
    let stringToSave = JSON.stringify(block, undefined, 2);
    let fileName = path + "/" + block["minecraft:block"].description.identifier.split(":")[0];
    if (!(0, fs_1.existsSync)(path)) {
        (0, fs_1.mkdirSync)(path, { recursive: true });
    }
    (0, fs_1.writeFile)(fileName, stringToSave, (e) => {
        if (e == undefined) {
            return;
        }
        console.log(e.message);
    });
}
