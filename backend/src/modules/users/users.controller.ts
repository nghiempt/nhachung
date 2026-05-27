import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me/profile')
  myProfile(@CurrentUser('sub') userId: string) {
    return this.users.getProfile(userId);
  }

  @Patch('me')
  updateMe(@CurrentUser('sub') userId: string, @Body() body: any) {
    return this.users.updateProfile(userId, body);
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.users.findById(id);
  }
}
