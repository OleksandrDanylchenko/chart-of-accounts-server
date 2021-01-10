import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  SerializeOptions,
  UseInterceptors
} from '@nestjs/common';
import { SyntheticAccountsService } from './synthetic-accounts.service';
import {
  defaultSyntheticAccountGroups,
  SyntheticAccountEntity,
  syntAccountWithLinkedSyntAccountsGroups,
  syntAccountWithSubAccountsGroups
} from './serializers/synthetic-account.serializer';
import { EditSyntheticAccountDto } from './dtos/edit-synt-account.dto';
import { CreateSyntheticAccountDto } from './dtos/create-synt-account.dto';
import { defaultAccountGroups } from '../accounts/serializers/account.serializer';

@Controller('synthetic-accounts')
export class SyntheticAccountsController {
  constructor(
    private readonly syntheticAccountsService: SyntheticAccountsService
  ) {}

  @Get('/')
  @SerializeOptions({ groups: defaultSyntheticAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<SyntheticAccountEntity[]> {
    return await this.syntheticAccountsService.getAll();
  }

  @Get('/single/:id')
  @SerializeOptions({ groups: defaultSyntheticAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SyntheticAccountEntity> {
    return await this.syntheticAccountsService.get(id);
  }

  @Get('/with-linked')
  @SerializeOptions({
    groups: syntAccountWithLinkedSyntAccountsGroups
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getWithLinked(): Promise<SyntheticAccountEntity[]> {
    return await this.syntheticAccountsService.getAll([
      'byDebitAccounts',
      'byCreditAccounts'
    ]);
  }

  @Get('/with-linked/single/:id')
  @SerializeOptions({
    groups: syntAccountWithLinkedSyntAccountsGroups
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getWithLinkedById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SyntheticAccountEntity> {
    return await this.syntheticAccountsService.get(id, [
      'byDebitAccounts',
      'byCreditAccounts'
    ]);
  }

  @Get('/with-sub')
  @SerializeOptions({
    groups: syntAccountWithSubAccountsGroups
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getWithSub(): Promise<SyntheticAccountEntity[]> {
    return await this.syntheticAccountsService.getAll(['subAccounts']);
  }

  @Get('/with-sub/single/:id')
  @SerializeOptions({
    groups: syntAccountWithSubAccountsGroups
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getWithSubById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SyntheticAccountEntity> {
    return await this.syntheticAccountsService.get(id, ['subAccounts']);
  }

  @Post('/')
  @SerializeOptions({
    groups: syntAccountWithLinkedSyntAccountsGroups
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body() inputs: CreateSyntheticAccountDto
  ): Promise<SyntheticAccountEntity> {
    return await this.syntheticAccountsService.create(inputs);
  }

  @Put('/:id')
  @SerializeOptions({
    groups: syntAccountWithLinkedSyntAccountsGroups
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() inputs: EditSyntheticAccountDto
  ): Promise<SyntheticAccountEntity> {
    const account = await this.syntheticAccountsService.get(id, [], true);
    return await this.syntheticAccountsService.update(account, inputs);
  }

  @Delete('/:id')
  @SerializeOptions({ groups: defaultAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SyntheticAccountEntity> {
    return await this.syntheticAccountsService.delete(id);
  }
}
