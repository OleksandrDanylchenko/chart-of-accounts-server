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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ApiResponseError } from '../../common/errors/api-error.schema';
import { AtomicSubAccount } from './documentation/sub-account.descriptors';
import { Public } from '../../common/decorators/routes-privacy.decorator';

@Controller('sub-accounts')
@ApiTags('sub-accounts')
@SerializeOptions({ groups: defaultSubAccountGroups })
export class SubAccountsController {
  constructor(private readonly subAccountsService: SubAccountsService) {}

  @Public()
  @Get('/')
  @ApiOkResponse({
    description: 'List of sub-accounts',
    type: [AtomicSubAccount]
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<SubAccountEntity[]> {
    return await this.subAccountsService.getAll();
  }

  @Public()
  @Get('/single/:id')
  @ApiOkResponse({
    description: 'Sub-account with provided id',
    type: AtomicSubAccount
  })
  @ApiNotFoundResponse({
    description: "Sub-account with provided id hasn't been found",
    type: ApiResponseError
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<SubAccountEntity> {
    return await this.subAccountsService.getById(id, [], true);
  }

  @ApiBearerAuth()
  @Post('/')
  @ApiCreatedResponse({
    description: 'Newly created sub-account',
    type: AtomicSubAccount
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

  @ApiBearerAuth()
  @Put('/:id')
  @ApiOkResponse({
    description: 'Updated sub-account',
    type: AtomicSubAccount
  })
  @ApiBadRequestResponse({
    description:
      'Passed editing body contains data, which contradicts to validation rules or database',
    type: ApiResponseError
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() inputs: EditSubAccountDto
  ): Promise<SubAccountEntity> {
    return await this.subAccountsService.update(id, inputs);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @ApiOkResponse({
    description: 'Deleted sub-account',
    type: AtomicSubAccount
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<SubAccountEntity> {
    return await this.subAccountsService.delete(id);
  }
}
