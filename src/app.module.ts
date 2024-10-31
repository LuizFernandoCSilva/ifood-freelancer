import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importe o ConfigModule
import { JwtModule } from '@nestjs/jwt';
import { UserControllers } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repository/users.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { JwtAuthGuard } from './services/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TasksController } from './controller/tasks.controller';
import { TasksService } from './services/tasks.service';
import { TasksRepository } from './repository/task.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Torne o ConfigService disponível globalmente
    JwtModule.register({ global: true }),
  ],
  controllers: [UserControllers, AuthController, TasksController],
  providers: [
    UsersService,
    UsersRepository,
    TasksService,
    TasksRepository,
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
