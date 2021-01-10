import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { ISubAccount } from '../interfaces/sub-account.interface';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  descriptionField,
  idField,
  numberField,
  syntheticAccountIdField,
  titleField
} from '../dtos/swagger-descriptors';

export const defaultSubAccountGroups: string[] = [];
export const allSubAccountGroups: string[] = [...defaultSubAccountGroups];

export class SubAccountEntity extends ModelEntity implements ISubAccount {
  @ApiResponseModelProperty(idField)
  @Expose()
  id: string;

  @ApiResponseModelProperty(numberField)
  @Expose()
  number: number;

  @ApiResponseModelProperty(titleField)
  @Expose()
  title: string;

  @ApiResponseModelProperty(descriptionField)
  @Expose()
  description: string;

  @ApiResponseModelProperty(syntheticAccountIdField)
  @Expose()
  syntheticAccountId: number;
}
