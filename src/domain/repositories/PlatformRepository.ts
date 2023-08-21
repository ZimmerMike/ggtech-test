import { IPlatform } from "../models/PlatformModel";

export interface PlatformRepository {
  getPlatforms(): Promise<Array<IPlatform>>;
}