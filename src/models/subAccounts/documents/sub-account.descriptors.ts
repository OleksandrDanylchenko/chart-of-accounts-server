import { SubAccountEntity } from '../serializers/sub-account.serializer';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  descriptionField,
  idField,
  numberField,
  syntheticAccountIdField,
  titleField
} from './sub-account-fields.descriptors';

export class AtomicSubAccount extends SubAccountEntity {
  @ApiResponseModelProperty(idField)
  id: string;

  @ApiResponseModelProperty(numberField)
  number: number;

  @ApiResponseModelProperty(titleField)
  title: string;

  @ApiResponseModelProperty(descriptionField)
  description: string;

  @ApiResponseModelProperty(syntheticAccountIdField)
  syntheticAccountId: number;
}
