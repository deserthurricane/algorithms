/**
 * Структура для хранения информации о ребре графа
 */
export class UnionFind {
  union: [number, number];
  weight: number;

  constructor(v1Index: number, v2Index: number, weight: number) {
    this.union = [v1Index, v2Index];
    this.weight = weight;
  }
}