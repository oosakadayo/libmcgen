import { existsSync, mkdirSync, writeFile } from "fs";

export type EntityFile = {
  format_version:string;
  "minecraft:entity":Entity;
}
export type Entity = {
  description:EntityDescription;
  components:ComponentGroup;
}

export type EntityDescription = {
  identifier:string;
  is_spawnable:boolean;
  is_summonable:boolean;
  is_experimental:boolean;
}

export type ComponentGroup = {
  "minecraft:type_family"?:TypeFamilyComponent;
}

export type TypeFamilyComponent = {
  family: string[];
}

///////////////////////////////////////////////////////////////////
//                                                               //
//                                                               //
//               BLOCKS                                          //
///////////////////////////////////////////////////////////////////

export const BlockCardinalDirection:string = "minecraft:cardinal_direction";

export type BlockFile = {
  format_version:string;
  "minecraft:block":Block;
}

export type Block = {
  description:BlockDescription;
  components:BlockComponentGroup;
}

export type BlockDescription = {
  identifier:string;
  traits?:BlockTraits;
}

export type BlockTraits = {
  "minecraft:placement_direction"?:BlockPlacementDirection;
}

export type BlockPlacementDirection = {
  enabled_states?: string[];
}

export type BlockComponentGroup = {
  "minecraft:geometry"?:string;
  "minecraft:material_instances"?:BlockMaterialInstances;
  "minecraft:transformation"?:BlockTransformation;
}

export type BlockTransformation = {
  rotation?:[number,number,number];
  scale?:[number,number,number];
  position?:[number,number,number];
}

export type BlockMaterialInstances = {
  [key:string]:BlockMaterialInstance;
}

export type BlockMaterialInstance = {
  texture:string;
  render_method:string;
}

export type Permutation = {
  condition:string;
  components:BlockComponentGroup;
}

export function saveBlock(block:BlockFile,path:string) {
  let stringToSave:string = JSON.stringify(block, undefined, 2);
  let fileName:string = path+"/"+block["minecraft:block"].description.identifier.split(":")[0];
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
  writeFile(fileName, stringToSave, (e) => {
    if (e == undefined) {
      return;
    }
    console.log(e.message);
  });
}
