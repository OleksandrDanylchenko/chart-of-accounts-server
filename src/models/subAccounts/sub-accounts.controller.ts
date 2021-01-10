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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { AccountEntity } from '../accounts/serializers/account.serializer';
import { ApiResponseError } from '../../common/errors/api-error.schema';

@Controller('sub-accounts')
@ApiTags('sub-accounts')
@SerializeOptions({ groups: defaultSubAccountGroups })
export class SubAccountsController {
  constructor(private readonly subAccountsService: SubAccountsService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'List of sub-accounts',
    type: [SubAccountEntity]
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<SubAccountEntity[]> {
    return await this.subAccountsService.getAll();
  }

  @Get('/single/:id')
  @ApiOkResponse({
    description: 'Sub-account with provided id',
    type: SubAccountEntity
  })
  @ApiNotFoundResponse({
    description: "Sub-account with provided id hasn't been found",
    type: ApiResponseError
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SubAccountEntity> {
    return await this.subAccountsService.get(id, [], true);
  }

  @Post('/')
  @ApiCreatedResponse({
    description: 'Newly created sub-account',
    type: SubAccountEntity
  })
  @ApiBadRequestResponse({
    description:
      'Passed creation body contains data, which contradicts to validation rules or database',
    type: ApiResponseError
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateSubAccountDto): Promise<SubAccountEntity> {
    return await this.subAccountsService.create(inputs);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: 'Updated sub-account',
    type: SubAccountEntity
  })
  @ApiBadRequestResponse({
    description:
      'Passed editing body contains data, which contradicts to validation rules or database',
    type: ApiResponseError
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() inputs: EditSubAccountDto
  ): Promise<SubAccountEntity> {
    const account = await this.subAccountsService.get(id, [], true);
    return await this.subAccountsService.update(account, inputs);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Deleted sub-account',
    type: SubAccountEntity
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(
    @Param('id', ParseIntPipe) id: string
  ): Promise<SubAccountEntity> {
    return await this.subAccountsService.delete(id);
  }
}
