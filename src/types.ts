/**
 * Shared Type Definitions for the Cooperative Novel-Writing Assistant
 */

export interface Character {
  id: string;
  name: string;
  gender: string;
  biography: string;
  personality: string;
  skills: string;
  startingPower: string; // Dynamic stats or power rating text
}

export interface StoryProfile {
  // Step 1: Overview
  title: string;
  idea: string;
  worldBackground: string;
  startingHook: string;

  // Step 2: World Settings
  cultivationSystem: string[]; // List of cultivation types or ranks
  ranks: string[]; // Names of ranks or levels
  currencies: string[]; // World currencies
  rules: string[]; // Key laws or rules of the universe

  // Step 3: Cast
  characters: Character[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  userPrompt: string; // The inspiration/notes provided by the user
  content: string; // The written text of the chapter
  wordCount: number;
  createdAt: string;
  suggestedPaths?: string[]; // AI-suggested story paths
}

export interface AISettings {
  writingMode: 'standard' | 'orinlo_m1' | 'orinlo_m2' | 'orinlo_m3';
  customTone: string; // 'Gợi cảm', 'Điện ảnh', 'Lạnh lùng', 'Sâu lắng', 'Kịch tính', 'Kiếm hiệp bi hùng'
  sensoryEmphasis: boolean; // Focus on 5 senses
  psychologicalFocus: boolean; // Focus on progressive internal changes
  wordCountTarget: number; // 500, 1000, 1500, 2000
}
