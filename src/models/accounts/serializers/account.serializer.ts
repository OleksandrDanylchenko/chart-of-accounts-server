import { Expose } from 'class-transformer';
import { ModelEntity } from '../../../common/serializers/model.serializer';
import { IAccount } from '../interfaces/account.interface';
import { ISyntheticAccount } from '../../syntheticAccounts/interfaces/synthetic-account.interface';
import {
  descriptionField,
  idField,
  numberField,
  syntheticAccountsField,
  titleField
} from '../dtos/swagger-descriptors';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export const defaultAccountGroups: string[] = [];
export const accountGroupsWithSynthetic: string[] = [
  ...defaultAccountGroups,
  'account.linkedSyntheticAccounts'
];
export const allAccountGroups: string[] = [...accountGroupsWithSynthetic];

export class AccountEntity extends ModelEntity implements IAccount {
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

  @ApiResponseModelProperty(syntheticAccountsField)
  @Expose({ groups: ['account.linkedSyntheticAccounts'] })
  syntheticAccounts: ISyntheticAccount[];
}
