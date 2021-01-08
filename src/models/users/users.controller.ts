import {
  Get,
  Put,
  Post,
  Body,
  Controller,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor
} from '@nestjs/common';
import {
  extendedUserGroupsForSerializing,
  UserEntity
} from './serializers/user.serializer';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { EntityBeingQueried } from '../../common/decorators/database-queried.decorator';

@Controller('users')
@SerializeOptions({
  groups: extendedUserGroupsForSerializing
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(@EntityBeingQueried() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() inputs: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(inputs);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @EntityBeingQueried() user: UserEntity,
    @Body() inputs: EditUserDto
  ): Promise<UserEntity> {
    return await this.usersService.update(user, inputs);
  }
}
