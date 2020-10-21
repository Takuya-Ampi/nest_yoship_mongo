import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
    ){}
  async validateUser({ username, password }: CreateUserDto){
    const user = await this.userService.findOne(username)
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return isValid
  }
  async login(user: CreateUserDto) {
    if(await this.validateUser(user)) {
      const payload = {username: user.username}
      return {
        'access_token': this.jwtService.sign(payload)
      }
    }
  }
}
