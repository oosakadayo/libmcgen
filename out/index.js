"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCardinalDirection = void 0;
exports.saveBlock = saveBlock;
exports.saveItem = saveItem;
const fs_1 = require("fs");
///////////////////////////////////////////////////////////////////
//                                                               //
//                                                               //
//               BLOCKS                                          //
///////////////////////////////////////////////////////////////////
exports.BlockCardinalDirection = "minecraft:cardinal_direction";
function saveBlock(block, path) {
    let stringToSave = JSON.stringify(block, undefined, 2);
    let fileName = path +
        "/" +
        block["minecraft:block"].description.identifier.split(":")[1] +
        ".json";
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
function saveItem(item, path) {
    let stringToSave = JSON.stringify(item, undefined, 2);
    let fileName = path +
        "/" +
        item["minecraft:item"].description.identifier.split(":")[1] +
        ".json";
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
