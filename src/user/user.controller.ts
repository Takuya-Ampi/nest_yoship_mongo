import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.userService.create(createUser)
  }
  @Get()
  findAll() {
    return this.userService.findAll()
  }
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username)
  }
}
