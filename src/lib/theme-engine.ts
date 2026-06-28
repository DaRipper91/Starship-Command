/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarshipConfig } from "../types/starship.types";
import { TomlParser } from "./toml-parser";

export class ThemeEngine {
  static stringify(config: StarshipConfig, metadata?: any): string {
    return TomlParser.stringify(config, metadata);
  }

  static parse(toml: string): StarshipConfig {
    return TomlParser.parse(toml).config as StarshipConfig;
  }

  static isValid(toml: string): boolean {
    try {
      TomlParser.parse(toml);
      return true;
    } catch {
      return false;
    }
  }
}
