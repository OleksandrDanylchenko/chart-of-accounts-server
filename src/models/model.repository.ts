import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial, DeleteResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ModelEntity } from '../common/serializers/model.serializer';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
  async getById(
    id: string,
    relations: string[] = [],
    throwsException = false
  ): Promise<K | null> {
    return await this.findOne({
      where: { id },
      relations
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity ? this.transform(entity) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async getAll(
    relations: string[] = [],
    throwsException = false
  ): Promise<K[] | null> {
    return await this.find({ relations })
      .then((entities) => {
        if (!entities && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entities ? this.transformMany(entities) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = []
  ): Promise<K> {
    return this.save(inputs)
      .then(async (entity) => await this.getById((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    entity: K,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = []
  ): Promise<K> {
    return this.update(entity.id, inputs)
      .then(async () => await this.getById(entity.id, relations))
      .catch((error) => Promise.reject(error));
  }

  async deleteEntity(entity: K): Promise<DeleteResult> {
    return this.delete(entity.id)
      .then((deletionResult) => Promise.resolve(deletionResult))
      .catch((error) => Promise.reject(error));
  }

  transform(model: T, transformOptions = {}): K {
    return plainToClass(ModelEntity, model, transformOptions) as K;
  }

  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
