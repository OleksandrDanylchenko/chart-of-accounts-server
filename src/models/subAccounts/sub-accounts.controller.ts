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
import { SubAccountsService } from './sub-accounts.service';
import {
  defaultSubAccountGroups,
  SubAccountEntity
} from './serializers/sub-account.serializer';
import { CreateSubAccountDto } from './dtos/create-sub-account.dto';
import { EditSubAccountDto } from './dtos/edit-sub-account.dto';

@Controller('sub-accounts')
@SerializeOptions({ groups: defaultSubAccountGroups })
export class SubAccountsController {
  constructor(private readonly subAccountsService: SubAccountsService) {}

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<SubAccountEntity[]> {
    return await this.subAccountsService.getAll();
  }

  @Get('/single/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SubAccountEntity> {
    return await this.subAccountsService.get(id);
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateSubAccountDto): Promise<SubAccountEntity> {
    return await this.subAccountsService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() inputs: EditSubAccountDto
  ): Promise<SubAccountEntity> {
    const account = await this.subAccountsService.get(id, [], true);
    return await this.subAccountsService.update(account, inputs);
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SubAccountEntity> {
    return await this.subAccountsService.delete(id);
  }
}
