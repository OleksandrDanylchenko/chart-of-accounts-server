import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { AccountEntity } from '../serializers/account.serializer';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ISyntheticAccount } from '../../syntheticAccounts/interfaces/synthetic-account.interface';
import {
  descriptionField,
  idField,
  numberField,
  syntheticAccountsField,
  titleField
} from './account-fields.descriptors';

export class AtomicAccount extends OmitType(AccountEntity, [
  'syntheticAccounts'
] as const) {
  @ApiResponseModelProperty(idField)
  id: string;

  @ApiResponseModelProperty(numberField)
  number: number;

  @ApiResponseModelProperty(titleField)
  title: string;

  @ApiResponseModelProperty(descriptionField)
  description: string;
}

export class AccountWithSyntheticAccounts extends IntersectionType(
  AtomicAccount,
  PickType(AccountEntity, ['syntheticAccounts'] as const)
) {
  @ApiResponseModelProperty(syntheticAccountsField)
  syntheticAccounts: ISyntheticAccount[];
}
