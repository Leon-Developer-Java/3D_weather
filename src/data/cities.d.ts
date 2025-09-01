export interface City {
  id: string;
  name: string;
  coordinates: [number, number, number];
  landmark: string;
  flyHeight: number;
}

export declare const cities: City[];
export declare function getCityById(id: string): City | undefined;
export declare function getCityByName(name: string): City | undefined;
export declare function searchCities(query: string): City[];