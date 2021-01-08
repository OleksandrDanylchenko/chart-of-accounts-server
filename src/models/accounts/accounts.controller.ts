import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  SerializeOptions,
  UseInterceptors
} from '@nestjs/common';
import {
  AccountEntity,
  defaultAccountGroupsForSerializing
} from './serializers/account.serializer';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('/')
  @SerializeOptions({ groups: defaultAccountGroupsForSerializing })
  @UseInterceptors(ClassSerializerInterceptor)
  async get(): Promise<AccountEntity[]> {
    return [];
  }

  @Get('/:id')
  @SerializeOptions({ groups: defaultAccountGroupsForSerializing })
  @UseInterceptors(ClassSerializerInterceptor)
  async getById(@Param('id', ParseIntPipe) id: string): Promise<AccountEntity> {
    return await this.accountsService.get(id);
  }

  // @Get('/with-synthetic')
  // @SerializeOptions({ groups: allAccountGroupsForSerializing })
  // @UseInterceptors(ClassSerializerInterceptor)
  // async getWithSynthetic(): Promise<AccountEntity[]> {
  //   return [];
  // }

  // @Post('/')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async create(@Body() inputs: CreateUserDto): Promise<UserEntity> {
  //   return await this.usersService.create(inputs);
  // }

  // @Put('/:id')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async update(
  //   @EntityBeingQueried() user: UserEntity,
  //   @Body() inputs: EditUserDto
  // ): Promise<UserEntity> {
  //   return await this.usersService.update(user, inputs);
  // }
}
