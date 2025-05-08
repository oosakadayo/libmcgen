import { existsSync, mkdirSync, writeFile } from "fs";

export type EntityFile = {
  format_version: string;
  "minecraft:entity": Entity;
};
export type Entity = {
  description: EntityDescription;
  components: ComponentGroup;
};

export type EntityDescription = {
  identifier: string;
  is_spawnable: boolean;
  is_summonable: boolean;
  is_experimental: boolean;
};

export type ComponentGroup = {
  "minecraft:type_family"?: TypeFamilyComponent;
};

export type TypeFamilyComponent = {
  family: string[];
};

///////////////////////////////////////////////////////////////////
//                                                               //
//                                                               //
//               BLOCKS                                          //
///////////////////////////////////////////////////////////////////

export const BlockCardinalDirection: string = "minecraft:cardinal_direction";

export type BlockFile = {
  format_version: string;
  "minecraft:block": Block;
};

export type Block = {
  description: BlockDescription;
  components?: BlockComponentGroup;
  permutations?: BlockPermutation[];
};

export type BlockDescription = {
  identifier: string;
  traits?: BlockTraits;
  menu_category?: BlockMenuCategory;
  states?: BlockStates;
};

export type BlockState = number[] | boolean[] | string[];

export type BlockStates = {
  [key: string]: BlockState;
};

export type BlockMenuCategory = {
  category?: string;
  group?: string;
};

export type BlockTraits = {
  "minecraft:placement_direction"?: BlockPlacementDirection;
};

export type BlockPlacementDirection = {
  enabled_states?: string[];
  y_rotation_offset?: number;
};

export type BlockComponentGroup = {
  [key: string]: {};
  "minecraft:geometry"?: string | BlockGeometry;
  "minecraft:material_instances"?: BlockMaterialInstances;
  "minecraft:transformation"?: BlockTransformation;
  "minecraft:collision_box"?: BlockCollisionBox | boolean;
  "minecraft:selection_box"?: BlockSelectionBox | boolean;
  "minecraft:destructible_by_mining"?: BlockDestructibleByMining | boolean;
  "minecraft:destructible_by_explosion"?: BlockDestructibleByExplosion | boolean;
  "minecraft:display_name"?: string;
  "minecraft:custom_components"?: string[];
  "minecraft:tick"?: BlockTick;
  "minecraft:light_dampening"?: number;
  "minecraft:light_emission"?: number;
  "minecraft:map_color"?: [number, number, number] | string | BlockMapColor;
  "minecraft:crafting_table"?: BlockCraftingTable;
  "minecraft:entity_fall_on"?: BlockEntityFallOn;
  "minecraft:flammable"?: BlockFlammable | boolean;
  "minecraft:friction"?: number;
  "minecraft:item_visual"?: BlockItemVisual;
  "minecraft:loot"?: string;
  "minecraft:placement_filter"?: BlockPlacementFilter;
  "minecraft:replaceable"?: {};
};

export type BlockPlacementFilter = {
  conditions: BlockPlacementFilterCondition[];
};

export type BlockDirections = "up" | "down" | "north" | "south" | "east" | "west" | "side" | "all";
export type BlockPlacementFilterCondition = {
  allowed_faces?: BlockDirections[];
  block_filter?: BlockFilter[];
};
export type BlockFilter =
  | string
  | {
      name?: string;
      states?: BlockFilterStates;
      tags?: string;
    };
export type BlockFilterStates = {
  [key: string]: string | number | boolean;
};

export type BlockMapColor = {
  color: string;
};

export type BlockItemVisual = {
  geometry: BlockGeometry;
  material_instances: BlockMaterialInstances;
};

export type BlockFlammable = {
  catch_chance_modifier: number;
  destroy_chance_modifier: number;
};

export type BlockEntityFallOn = {
  min_fall_distance: number;
};

export type BlockCraftingTable = {
  table_name: string;
  crafting_tags: string[];
};

export type BlockTick = {
  interval_range: [number, number];
  looping: boolean;
};

export type BlockGeometry = {
  identifier: string;
  bone_visibility: BlockBoneVisibility;
};

export type BlockBoneVisibility = {
  [key: string]: boolean | string;
};

export type BlockDestructibleByMining = {
  seconds_to_destroy: number;
  item_specific_speeds?: BlockDestructibleByMiningItemSpeed[];
};

export type BlockDestructibleByMiningItemSpeed = {
  destroy_speed: number;
  item: BlockDestructibleByMiningItemSpeedItem | string[];
};
export type BlockDestructibleByMiningItemSpeedItem = {
  tags: string;
};

export type BlockDestructibleByExplosion = {
  explosion_resistance: number;
};

export type BlockCollisionBox = {
  origin: [number, number, number];
  size: [number, number, number];
};

export type BlockSelectionBox = {
  origin: [number, number, number];
  size: [number, number, number];
};

export type BlockTransformation = {
  rotation?: [number, number, number];
  scale?: [number, number, number];
  translation?: [number, number, number];
  rotation_pivot?: [number, number, number];
  scale_pivot?: [number, number, number];
};

export type BlockMaterialInstances = {
  [key: string]: BlockMaterialInstance;
};

export type BlockMaterialInstance = {
  texture?: string;
  render_method?: "alpha_test" | "alpha_test_single_sided" | "blend" | "double_sided" | "opaque";
  ambient_occlusion?: boolean;
  face_dimming?: boolean;
};

export type BlockPermutation = {
  condition: string;
  components: BlockComponentGroup;
};

export function saveBlock(block: BlockFile, path: string) {
  let stringToSave: string = JSON.stringify(block, undefined, 2);
  let fileName: string = path + "/" + block["minecraft:block"].description.identifier.split(":")[1] + ".json";
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

export type ItemFile = {
  format_version: string;
  "minecraft:item": Item;
};

export type Item = {
  description: ItemDescription;
  components: ItemComponentGroup;
};

export type ItemDescription = {
  identifier: string;
  menu_category?: ItemMenuCategory;
};

export type ItemMenuCategory = {
  category: string;
};

export type ItemComponentGroup = {
  "minecraft:allow_off_hand"?: ItemAllowOffHand | boolean;
  "minecraft:block_placer"?: ItemBlockPlacer;
  "minecraft:bundle_interaction"?: ItemBundleInteraction;
  "minecraft:can_destroy_in_creatyive"?: ItemCanDestroyInCreative;
  "minecraft:compostable"?: ItemCompostable;
  "minecraft:cooldown"?: ItemCooldown;
  "minecraft:custom_components"?: string[];
  "minecraft:damage"?: ItemDamage;
  "minecraft:damage_absorption"?: ItemDamageAbsorption;
  "minecraft:digger"?: ItemDigger;
  "minecraft:display_name"?: ItemDisplayName | string;
  "minecraft:durability"?: ItemDurability;
  "minecraft:durability_sensor"?: ItemDurabilitySensor;
  "minecraft:dyeable"?: ItemDyeable;
  "minecraft:enchantable"?: ItemEnchantable;
  "minecraft:entity_placer"?: ItemEntityPlacer;
  "minecraft:food"?: ItemFood;
  "minecraft:fuel"?: ItemFuel;
  "minecraft:icon"?: string | ItemIcon;
};

export type ItemIcon = {
  textures: ItemIconTextures;
};
export type ItemIconTextures = {
  default: string;
};

export type ItemFuel = {
  duration: number;
};

export type ItemFood = {
  can_always_eat?: boolean;
  nutrition?: number;
  saturation_modifier?: number;
  using_converts_to?: string;
};

export type ItemEntityPlacer = {
  entity: string;
  dispense_on?: string[];
  use_on?: string[];
};

export type ItemEnchantableSlot =
  | "armor_feet"
  | "armor_torso"
  | "armor_head"
  | "armor_legs"
  | "axe"
  | "bow"
  | "cosmetic_head"
  | "crossbow"
  | "elytra"
  | "fishing_rod"
  | "flintsteel"
  | "hoe"
  | "pickaxe"
  | "shears"
  | "shield"
  | "shovel"
  | "sword"
  | "all";

export type ItemEnchantable = {
  slot?: ItemEnchantableSlot;
  value?: number;
};

export type ItemDyeable = {
  default_color: string;
};

export type ItemDurabilitySensor = {
  durability_thresholds: ItemDurabilitySensorDurabilityThreshold[];
};

export type ItemDurabilitySensorDurabilityThreshold = {
  durability: number;
  particle_type?: string;
  sound_event?: string;
};

export type ItemDurability = {
  damage_chance: ItemDurabilityDamageChance;
  max_durability: number;
};

export type ItemDurabilityDamageChance = {
  min: number;
  max: number;
};

export type ItemDisplayName = {
  value: string;
};

export type ItemDigger = {
  use_efficency: boolean;
  destroy_speeds: ItemDiggerDestroySpeed[];
};

export type ItemDiggerDestroySpeed = {
  block: string | ItemDiggerDestroySpeedBlock;
  speed: number;
};
export type ItemDiggerDestroySpeedBlock = {
  tags: string;
};

//TODO get all strings here;
export type ItemDamageAbsorption = {
  absorbable_causes: string[];
};

export type ItemDamage = {
  value: number;
};

//TODO get all category strings;
export type ItemCooldown = {
  category: string;
  duration: number;
};

export type ItemCompostable = {
  composting_chance: number;
};

export type ItemAllowOffHand = {
  value: boolean;
};

export type ItemBlockPlacer = {
  block: string;
  use_on?: string[];
  replace_block_item?: boolean;
};

export type ItemBundleInteraction = {
  num_viewable_slots: number;
};

export type ItemCanDestroyInCreative = {
  value: boolean;
};

export function saveItem(item: ItemFile, path: string) {
  let stringToSave: string = JSON.stringify(item, undefined, 2);
  let fileName: string = path + "/" + item["minecraft:item"].description.identifier.split(":")[1] + ".json";
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
