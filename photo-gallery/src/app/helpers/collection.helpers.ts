import { Collection } from '../models/collection.interface';

/**
 * Trie les collections par nombre de médias (décroissant)
 */
export function sortCollectionsByMediaCount(collections: Collection[]): Collection[] {
  return [...collections].sort((a, b) => b.media_count - a.media_count);
}

/**
 * Filtre les collections qui ont au moins X médias
 */
export function filterCollectionsByMinMedia(collections: Collection[], minCount: number): Collection[] {
  return collections.filter(c => c.media_count >= minCount);
}

/**
 * Trouve une collection par ID
 */
export function findCollectionById(collections: Collection[], id: string): Collection | undefined {
  return collections.find(c => c.id === id);
}

/**
 * Calcule le nombre total de médias dans toutes les collections
 */
export function getTotalMediaCount(collections: Collection[]): number {
  return collections.reduce((sum, c) => sum + c.media_count, 0);
}
