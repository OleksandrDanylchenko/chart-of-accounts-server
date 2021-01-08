import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  SerializeOptions,
  UseInterceptors
} from '@nestjs/common';
import { SyntheticAccountsService } from './synthetic-accounts.service';
import {
  defaultSyntheticAccountGroupsForSerializing,
  SyntheticAccountEntity
} from './serializers/synthetic-account.serializer';

@Controller('synthetic-accounts')
export class SyntheticAccountsController {
  constructor(
    private readonly syntheticAccountsService: SyntheticAccountsService
  ) {}

  @Get('/')
  @SerializeOptions({ groups: defaultSyntheticAccountGroupsForSerializing })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<SyntheticAccountEntity[]> {
    return await this.syntheticAccountsService.getAll();
  }

  @Get('/:id')
  @SerializeOptions({ groups: defaultSyntheticAccountGroupsForSerializing })
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SyntheticAccountEntity> {
    return await this.syntheticAccountsService.get(id);
  }
}
