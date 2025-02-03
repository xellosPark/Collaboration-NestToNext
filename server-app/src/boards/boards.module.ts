import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Board])], // Post 엔터티를 등록
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule { }
