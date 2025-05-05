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
  permutations:BlockPermutation[];
}

export type BlockDescription = {
  identifier:string;
  traits?:BlockTraits;
  menu_category?:BlockMenuCategory;
  states:BlockStates;
}

export type BlockState = number[]|boolean[]|string[]

export type BlockStates = {
  [key:string]:BlockState;
}

export type BlockMenuCategory = {
  category?:string;
  group?:string;
}

export type BlockTraits = {
  "minecraft:placement_direction"?:BlockPlacementDirection;
}

export type BlockPlacementDirection = {
  enabled_states?: string[];
  y_rotation_offset?:number;
}

export type BlockComponentGroup = {
  "minecraft:geometry"?:string|BlockGeometry;
  "minecraft:material_instances"?:BlockMaterialInstances;
  "minecraft:transformation"?:BlockTransformation;
  "minecraft:collision_box"?:BlockCollisionBox|boolean;
  "minecraft:selection_box"?:BlockSelectionBox|boolean;
  "minecraft:destructible_by_mining"?:BlockDestructibleByMining|boolean;
  "minecraft:destructible_by_explosion"?:BlockDestructibleByExplosion|boolean;
  "minecraft:display_name"?:string;
  "minecraft:custom_components"?:string[];
  "minecraft:tick"?:BlockTick;
  "minecraft:light_dampening"?:number;
  "minecraft:light_emission"?:number;
  "minecraft:map_color"?:[number,number,number]|string|BlockMapColor;
  "minecraft:crafting_table"?:BlockCraftingTable;
  "minecraft:entity_fall_on"?:BlockEntityFallOn;
  "minecraft:flammable"?:BlockFlammable|boolean;
  "minecraft:friction"?:number;
  "minecraft:item_visual"?:BlockItemVisual;
  "minecraft:loot"?:string;
  "minecraft:placement_filter"?:BlockPlacementFilter;
  "minecraft:replaceable"?:{};
}

export type BlockPlacementFilter = {
  conditions: BlockPlacementFilterCondition[];
}

export type BlockDirections = "up"|"down"|"north"|"south"|"east"|"west"|"side"|"all";
export type BlockPlacementFilterCondition = {
  allowed_faces?:BlockDirections[];
  block_filter?:BlockFilter[];
}
export type BlockFilter = string|{
  name?:string;
  states?:BlockFilterStates;
  tags?:string;
}
export type BlockFilterStates = {
  [key:string]:string|number|boolean;
}

export type BlockMapColor = {
  color:string;
}

export type BlockItemVisual = {
  geometry:BlockGeometry;
  material_instances:BlockMaterialInstances;
}

export type BlockFlammable = {
  catch_chance_modifier:number;
  destroy_chance_modifier:number;
}

export type BlockEntityFallOn = {
  min_fall_distance:number;
}

export type BlockCraftingTable = {
  table_name:string;
  crafting_tags:string[];
}

export type BlockTick = {
  interval_range:[number,number];
  looping:boolean;
}

export type BlockGeometry = {
  identifier:string;
  bone_visibility:BlockBoneVisibility;
}

export type BlockBoneVisibility = {
  [key:string]:boolean|string;
}

export type BlockDestructibleByMining = {
  seconds_to_destroy:number;
}

export type BlockDestructibleByExplosion = {
  explosion_resistance:number;
}

export type BlockCollisionBox = {
  origin:[number,number,number];
  size:[number,number,number];
}

export type BlockSelectionBox = {
  origin:[number,number,number];
  size:[number,number,number];
}

export type BlockTransformation = {
  rotation?:[number,number,number];
  scale?:[number,number,number];
  translation?:[number,number,number];
  rotation_pivot?:[number,number,number];
  scale_pivot?:[number,number,number];
}

export type BlockMaterialInstances = {
  [key:string]:BlockMaterialInstance;
}

export type BlockMaterialInstance = {
  texture?:string;
  render_method?:"alpha_test"|"alpha_test_single_sided"|"blend"|"double_sided"|"opaque";
  ambient_occlusion?:boolean;
  face_dimming?:boolean;
}

export type BlockPermutation = {
  condition:string;
  components:BlockComponentGroup;
}

export function saveBlock(block:BlockFile,path:string) {
  let stringToSave:string = JSON.stringify(block, undefined, 2);
  let fileName:string = path+"/"+block["minecraft:block"].description.identifier.split(":")[1]+".json";
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

//////////////////////////////////////////////////////////////////////////////
//                                  ITEMS                                   //
//////////////////////////////////////////////////////////////////////////////


