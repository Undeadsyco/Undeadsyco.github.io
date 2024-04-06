import { Tame } from "./database/collections/ark/TamesModel";

export const capitalize = (val?: string) => val?.split('').map((v, i, a) => i === 0 ? v.toUpperCase() : a[i - 1] === " " ? v.toUpperCase() : v).join('');

export const mapArkTameData = <cType,>(tames: Tame[], keys: string[]) => {
  const mapedData = new Map();

  keys.forEach(key => {
    const section = mapedSection(tames, key)

    if (section) mapedData.set(key, section);
    else return
  });

  return mapedData;
}

const mapedSection = (tames: Tame[], key: string) => {
  const mapedSection = new Map();
  tames.forEach((item: any) => {
    const mapKeys = Array.from(mapedSection.keys());
    let mapKey = '';
    
    switch (key) {
      case '_id': return;
      case 'name': return;
      case 'tamed': return;
      case 'breed': return;
      case 'lvl': return;
      case 'parents': return;
      case 'stats': return;
      case 'colors': return;
      
      case 'age': mapKey = item.age; break;
      case 'sex': mapKey = item.sex; break;
      case 'owner': mapKey = item.owner; break;
      case 'wild': mapKey = item.wild; break;
      case 'deseased': mapKey = item.deseased; break;
      case 'nutered': mapKey = item.nutered; break;
      case 'species': mapKey = item.species; break;
      default: { }
    }

    if (mapKeys.includes(mapKey)) mapedSection.set(mapKey, [...mapedSection.get(mapKey), item]);
    else mapedSection.set(mapKey, [item]);
  });
  return mapedSection
}