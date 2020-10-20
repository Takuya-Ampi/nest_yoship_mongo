import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return createUser
  }
}
