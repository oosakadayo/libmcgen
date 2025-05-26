"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCardinalDirection = void 0;
exports.saveBlock = saveBlock;
exports.saveItem = saveItem;
exports.saveFeature = saveFeature;
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
    });
}
function saveFeature(feature, type, path) {
    let stringToSave = JSON.stringify(feature, undefined, 2);
    let fileName = path + "/" + feature[type].description.identifier.split(":")[1] + ".json";
    let truePath = fileName.substring(0, fileName.lastIndexOf("/"));
    if (!(0, fs_1.existsSync)(truePath)) {
        (0, fs_1.mkdirSync)(truePath, { recursive: true });
    }
    (0, fs_1.writeFile)(fileName, stringToSave, (e) => {
        if (e == undefined) {
            return;
        }
    });
}
