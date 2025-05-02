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

