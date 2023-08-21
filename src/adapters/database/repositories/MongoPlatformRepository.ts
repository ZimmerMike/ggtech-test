import { IPlatform } from "../../../domain/models/PlatformModel";
import { PlatformRepository } from "../../../domain/repositories/PlatformRepository";
import PlatformModel from "../schemas/Platform";

export class MongoPlatformRepository implements PlatformRepository {
  async getPlatforms(): Promise<Array<IPlatform>> {
    return await PlatformModel.find();
  }
}