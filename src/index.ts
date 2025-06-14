import { existsSync, mkdirSync, writeFile } from "fs";

export type EntityFile = {
  format_version: string;
  "minecraft:entity": Entity;
};
export type Entity = {
  description: EntityDescription;
  components: EntityComponentGroup;
};

export type EntityDescription = {
  identifier: string;
  is_spawnable: boolean;
  is_summonable: boolean;
  is_experimental: boolean;
};

export type EntityComponentGroup = {
  "minecraft:type_family"?: EntityTypeFamilyComponent;
};

export type EntitySlot =
  | "slot.armor.head"
  | "slot.armor.chest"
  | "slot.armor.legs"
  | "slot.armor.feet"
  | "slot.armor.body";
export type EntityInteractComponent = {
  add_items?: EntityInteractComponentAddItems;
  cooldown?: number;
  cooldown_after_being_attacked?: number;
  drop_item_slot?: EntitySlot | number;
  drop_item_y_offset?: number;
  equip_item_slot?: EntitySlot | number;
  health_amount?: number;
  hurt_item?: number;
  interact_text?: string;
  on_interact?: EntityTrigger;
  play_sounds?: string | string[];
  repair_entity_item?: EntityInteractComponentRepairEntityItem;
  spawn_entities?: string | string[];
  spawn_items?: EntityInteractComponentSpawnItems;
  swing?: boolean;
  transform_to_item?: string;
  use_item?: true;
  vibration: "shear" | "entity_die" | "entity_act" | "entity_interact";
  interactions?: EntityInteractComponent[];
};
export type EntityInteractComponentSpawnItems = {
  table: string;
};
export type EntityInteractComponentRepairEntityItem = {
  amount: number;
  slot: EntitySlot | number;
};
export type EntityInteractComponentAddItems = {
  table: string;
};
export type EntityTypeFamilyComponent = {
  family: string[];
};

export type EntityBoolProperty = {
  type: "bool";
  default: boolean;
  client_sync: boolean;
};

export type EntityIntProperty = {
  type: "int";
  default: number;
  range: [number, number];
  client_sync: boolean;
};
export type EntityFloatProperty = {
  type: "float";
  default: number;
  range: [number, number];
  client_sync: boolean;
};
export type EntityEnumProperty = {
  type: "enum";
  values: string[];
  default: string;
  client_sync: boolean;
};
export type EntityProperty =
  | EntityBoolProperty
  | EntityEnumProperty
  | EntityIntProperty
  | EntityFloatProperty;
//TODO target specifications;
export type EntityTrigger = {
  filters: FilterComplete;
  event: string;
  target: string;
};

export type EntityEvent = {
  add?: EntityEventAddRemove;
  remove?: EntityEventAddRemove;
  queue_command?: EntityEventCommand;
  sequence?: EntityEvent[];
  filters?: FilterComplete;
};
export type EntityEventCommand = {
  target: string | "self";
  command: string | string[];
};
export type EntityEventAddRemove = {
  component_groups: string[];
};
export type EntityEventRandomize = EntityEvent & {
  weight: number;
};

///////////////////////////////////////////////////////////////////
//               FILTERS                                         //
///////////////////////////////////////////////////////////////////
//TODO add subject specifications;
export type FilterSingle = {
  test?: string;
  subject?: string;
  operator?: string;
  value?: string | boolean | number;
  domain?: string;
};
export type Filter = FilterSingle | FilterComplete[];
export type FilterComplete =
  | Filter
  | {
      all_of?: FilterComplete;
      any_of?: FilterComplete;
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
  "minecraft:destructible_by_explosion"?:
    | BlockDestructibleByExplosion
    | boolean;
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

export type BlockDirections =
  | "up"
  | "down"
  | "north"
  | "south"
  | "east"
  | "west"
  | "side"
  | "all";
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
  render_method?:
    | "alpha_test"
    | "alpha_test_single_sided"
    | "blend"
    | "double_sided"
    | "opaque";
  ambient_occlusion?: boolean;
  face_dimming?: boolean;
};

export type BlockPermutation = {
  condition: string;
  components: BlockComponentGroup;
};

export function saveBlock(block: BlockFile, path: string) {
  let stringToSave: string = JSON.stringify(block, undefined, 2);
  let fileName: string =
    path +
    "/" +
    block["minecraft:block"].description.identifier.split(":")[1] +
    ".json";
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
  writeFile(fileName, stringToSave, (e) => {
    if (e == undefined) {
      return;
    }
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
  "minecraft:wearable"?: ItemWearable;
  "minecraft:use_modifiers"?: ItemUseModifiers;
};

export type ItemUseModifiers = {
  movement_modifier?: number;
  use_duration?: number;
};

export type ItemWearable = {
  protection: number;
  slot: EntitySlot;
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
  let fileName: string =
    path +
    "/" +
    item["minecraft:item"].description.identifier.split(":")[1] +
    ".json";
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
  writeFile(fileName, stringToSave, (e) => {
    if (e == undefined) {
      return;
    }
  });
}

//////////////////////////////////////////////////////////////////////////////
//                                  FEATURES                                //
//////////////////////////////////////////////////////////////////////////////

export type FeatureDescription = {
  identifier: string;
};

export type FeatureStructureFile = {
  format_version: string;
  "minecraft:structure_template_feature": FeatureStructure;
};
export type FeatureStructure = {
  description: FeatureDescription;
  structure_name: string;
  adjustment_radius: number;
  facing_direction: FeatureStructureFacingDirection;
  constraints?: FeatureStructureConstraints;
};
export type FeatureStructureFacingDirection =
  | "north"
  | "west"
  | "east"
  | "south"
  | "random";
export type FeatureStructureConstraints = {
  unburied?: {};
  grounded?: {};
  block_intersection?: FeatureStructureConstraintsBlockIntersection;
};
export type FeatureStructureConstraintsBlockIntersection = {
  block_allowlist: string[];
};

export type FeatureRuleFile = {
  format_version: string;
  "minecraft:feature_rules": FeatureRule;
};
export type FeatureRule = {
  description: FeatureDescription & { places_feature: string };
  conditions: FeatureRuleConditions;
  distribution: FeatureRuleDistribution;
};

export type FeatureRuleConditions = {
  placement_pass: FeatureRuleConditionsPlacementPass;
  "minecraft:biome_filter": FilterComplete;
};

export type FeatureRuleDistribution = {
  coordinate_eval_order: string;
  iterations?: string | number;
  scatter_chance?: string | number;
  x: string | number | FeatureCoordinateDistribution;
  y: string | number | FeatureCoordinateDistribution;
  z: string | number | FeatureCoordinateDistribution;
};

export type FeatureRuleConditionsPlacementPass =
  | "first_pass"
  | "after_sky_pass"
  | "after_surface_pass"
  | "after_underground_pass"
  | "before_sky_pass"
  | "before_surface_pass"
  | "before_underground_pass"
  | "final_pass"
  | "pregeneration_pass"
  | "sky_pass"
  | "surface_pass"
  | "underground_pass";

export type FeatureScatterFile = {
  format_version: string;
  "minecraft:scatter_feature": FeatureScatter;
};
export type FeatureScatter = {
  description: FeatureDescription;
  coordinate_eval_order?: string;
  iterations?: string | number;
  places_feature: string;
  x: string | number | FeatureCoordinateDistribution;
  y: string | number | FeatureCoordinateDistribution;
  z: string | number | FeatureCoordinateDistribution;
};
export type FeatureCoordinateDistribution = {
  extent: [number | string, number | string];
  distribution: FeatureCoordinateDistributionDistribution;
};
export type FeatureCoordinateDistributionDistribution =
  | "fixed_grid"
  | "gaussian"
  | "inverse_gaussian"
  | "jittered_grid"
  | "triangle"
  | "uniform";

export type FeatureGroupFile = {
  format_version: string;
  "minecraft:weighted_random_feature": FeatureGroup;
};
export type FeatureGroup = {
  description: FeatureDescription;
  features: [string, number][];
};

export type FeatureBlockFile = {
  format_version: string;
  "minecraft:single_block_feature": FeatureBlock;
};
export type FeatureBlock = {
  description: FeatureDescription;
  enforce_placement_rules: boolean;
  enforce_survivability_rules: boolean;
  places_block: FeatureBlockPlacesBlock;
  may_replace?: string[];
  may_attach_to?: FeatureBlockMayAttachTo;
  may_not_attach_to?: FeatureBlockMayAttachTo;
};
export type FeatureBlockPlacesBlock = {
  name: string;
  states?: { [key: string]: string | number | boolean };
};
export type FeatureBlockMayAttachTo = {
  bottom?: string[];
  top?: string[];
  sides?: string[];
  all?: string[];
};

export type FeatureOreFile = {
  format_version: string;
  "minecraft:ore_feature": FeatureOre;
};
export type FeatureOre = {
  description: FeatureDescription;
  count: number;
  replace_rules: FeatureOreReplaceRules[];
};
export type FeatureOreReplaceRules = {
  places_block: string;
  may_replace: string[];
};

export type FeatureSequenceFile = {};
export type FeatureSequence = {};
export type FeatureAggregateFile = {
  format_version: string;
  "minecraft:aggregate_feature": FeatureAggregate;
};
export type FeatureAggregate = {
  description: FeatureDescription;
  early_out: string;
  features: string[];
};

export type FeatureTypeIdentifier =
  | "minecraft:aggregate_feature"
  | "minecraft:single_block_feature"
  | "minecraft:feature_rules"
  | "minecraft:scatter_feature"
  | "minecraft:structure_template_feature"
  | "minecraft:weighted_random_feature";

export function saveFeature(
  feature: any,
  type: FeatureTypeIdentifier,
  path: string
) {
  let stringToSave: string = JSON.stringify(feature, undefined, 2);
  let fileName: string =
    path + "/" + feature[type].description.identifier.split(":")[1] + ".json";
  let truePath = fileName.substring(0, fileName.lastIndexOf("/"));
  if (!existsSync(truePath)) {
    mkdirSync(truePath, { recursive: true });
  }
  writeFile(fileName, stringToSave, (e) => {
    if (e == undefined) {
      return;
    }
  });
}

////////////////
//   MODELS   //
////////////////

export type GeoFile = {
  format_version: string;
  "minecraft:geometry": Geo[];
};

export type Geo = {
  description: GeoDescription;
  bones: GeoBone[];
};

export type GeoDescription = {
  identifier: string;
  texture_width?: number;
  texture_height?: number;
  visible_bounds_width?: number;
  visible_bounds_height?: number;
  visible_bounds_offset?: [number, number, number];
};

export type GeoBone = {
  name: string;
  parent?: string;
  pivot?: [number, number, number];
  cubes?: GeoCube[];
};
export type GeoCube = {
  origin: [number, number, number];
  size: [number, number, number];
  pivot?: [number, number, number];
  rotation?: [number, number, number];
  uv?: [number, number] | GeoUvFaces;
};

export type GeoUvFaces = {
  north?: GeoUv;
  east?: GeoUv;
  south?: GeoUv;
  west?: GeoUv;
  up?: GeoUv;
  down?: GeoUv;
};
export type GeoUv = {
  uv: [number, number];
  uv_size: [number, number];
};

export function saveGeo(item: GeoFile, path: string, name: string) {
  let stringToSave: string = JSON.stringify(item, undefined, 2);
  let fileName: string = path + "/" + name + ".json";
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
  writeFile(fileName, stringToSave, (e) => {
    if (e == undefined) {
      return;
    }
  });
}

///////////////
// Java Geo  //
///////////////

export type JGeoFile = {
  credit?: string;
  parent?: string;
  elements?: JGeoElement[];
  textures?: JGeoTextures;
  groups?: JGeoGroup[];
  ambientocclusion?: boolean;
  render_type?: string;
};
export type JGeoTextures = {
  [key: string]: string;
};
export type JGeoElement = {
  from?: [number, number, number];
  to?: [number, number, number];
  rotation?: JGeoElementRotation;
  color?: number;
  shade?: boolean;
  faces?: JGeoElementFaces;
};
export type JGeoElementFaces = {
  north?: JGeoElementFace;
  east?: JGeoElementFace;
  south?: JGeoElementFace;
  west?: JGeoElementFace;
  up?: JGeoElementFace;
  down?: JGeoElementFace;
};
export type JGeoElementFace = {
  uv: [number, number, number, number];
  texture: string;
};
export type JGeoElementRotation = {
  angle: number;
  axis: "y" | "x" | "z";
  origin: [number, number, number];
};
export type JGeoGroup =
  | number
  | {
      name: string;
      origin?: [number, number, number];
      color?: number;
      children?: JGeoGroup[];
    };

////////////////
//  Manifest  //
////////////////
export type ManifestFile = {
  format_version: number;
  metadata?: ManifestMetadata;
  modules?: ManifestModule[];
  dependencies?: ManifestDependency[];
  header?: ManifestHeader;
};
export type ManifestHeader = {
  name: string;
  description: string;
  uuid: string;
  pack_scope?: string;
  version: [number, number, number];
  min_engine_version: [number, number, number];
};
export type ManifestModule = {
  type: string;
  uuid: string;
  version: [number, number, number];
  language?: string;
  entry?: string;
};
export type ManifestMetadata = {
  authors?: string[];
  product_type?: string;
};
export type ManifestDependency = {
  module_name?: string;
  version?: string | [number, number, number];
  uuid?: string;
};

export function saveManifest(item: GeoFile, path: string) {
  let stringToSave: string = JSON.stringify(item, undefined, 2);
  let fileName: string = path + "/manifest.json";
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
  writeFile(fileName, stringToSave, (e) => {
    if (e == undefined) {
      return;
    }
  });
}
