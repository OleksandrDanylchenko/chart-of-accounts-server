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
import {
  AccountEntity,
  accountGroupsWithSynthetic,
  defaultAccountGroups
} from './serializers/account.serializer';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { EditAccountDto } from './dtos/edit-account.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ApiResponseError } from '../../common/errors/api-error.schema';
import {
  AccountWithSyntheticAccounts,
  AtomicAccount
} from './documents/account.descriptors';
import { Public } from '../../common/decorators/routes-privacy.decorator';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Public()
  @Get('/')
  @ApiOkResponse({
    description: 'List of accounts',
    type: [AtomicAccount]
  })
  @SerializeOptions({ groups: defaultAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<AccountEntity[]> {
    return await this.accountsService.getAll();
  }

  @Public()
  @Get('/single/:id')
  @ApiOkResponse({
    description: 'Account with provided id',
    type: AtomicAccount
  })
  @ApiNotFoundResponse({
    description: "Account with provided id hasn't been found",
    type: ApiResponseError
  })
  @SerializeOptions({ groups: defaultAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(@Param('id', ParseIntPipe) id: string): Promise<AccountEntity> {
    return await this.accountsService.get(id, [], true);
  }

  @Public()
  @Get('/with-synthetic')
  @ApiOkResponse({
    description: 'List of accounts with linked synthetic accounts',
    type: [AccountWithSyntheticAccounts]
  })
  @SerializeOptions({ groups: accountGroupsWithSynthetic })
  @UseInterceptors(ClassSerializerInterceptor)
  async getWithSynthetic(): Promise<AccountEntity[]> {
    return await this.accountsService.getAll(['syntheticAccounts']);
  }

  @Public()
  @Get('/with-synthetic/single/:id')
  @ApiOkResponse({
    description: 'Account with provided id and linked synthetic accounts',
    type: AccountWithSyntheticAccounts
  })
  @ApiNotFoundResponse({
    description: "Account with provided id hasn't been found",
    type: ApiResponseError
  })
  @SerializeOptions({ groups: accountGroupsWithSynthetic })
  @UseInterceptors(ClassSerializerInterceptor)
  async getWithSyntheticById(
    @Param('id', ParseIntPipe) id: string
  ): Promise<AccountEntity> {
    return await this.accountsService.get(id, ['syntheticAccounts'], true);
  }

  @Post('/')
  @ApiCreatedResponse({
    description: 'Newly created account',
    type: AtomicAccount
  })
  @ApiBadRequestResponse({
    description:
      'Passed creation body contains data, which contradicts to validation rules or database',
    type: ApiResponseError
  })
  @SerializeOptions({ groups: defaultAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateAccountDto): Promise<AccountEntity> {
    return await this.accountsService.create(inputs);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: 'Updated account',
    type: AtomicAccount
  })
  @ApiBadRequestResponse({
    description:
      'Passed editing body contains data, which contradicts to validation rules or database',
    type: ApiResponseError
  })
  @SerializeOptions({ groups: defaultAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() inputs: EditAccountDto
  ): Promise<AccountEntity> {
    const account = await this.accountsService.get(id, [], true);
    return await this.accountsService.update(account, inputs);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Deleted account',
    type: AtomicAccount
  })
  @SerializeOptions({ groups: defaultAccountGroups })
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(@Param('id', ParseIntPipe) id: string): Promise<AccountEntity> {
    return await this.accountsService.delete(id);
  }
}
