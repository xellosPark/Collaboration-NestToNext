import { Body, Controller, Get, Post, Logger } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('board_logger');
  constructor(private boardsService: BoardsService) {}

  // 전체 검새후 요청한 id 데이터만 다시 받기 ()
  // 모든 게시판 가져오기
  @Get('/')
  getAllBoard(): Promise<Board[]> {
    // verbose 레벨의 로그로 사용자가 모든 게시판을 가져오려고 시도하는 메시지를 출력
    console.log('Controller_getAllBoard');
    this.logger.verbose(`getAllBoard 호출`);
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  createPost(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createPost(createBoardDto);
  }
}
