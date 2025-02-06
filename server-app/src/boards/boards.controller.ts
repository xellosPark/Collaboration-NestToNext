import { Body, Controller, Get, Post, Logger, HttpCode, HttpStatus, HttpException, ParseIntPipe, Param, NotFoundException } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('board_logger');
  constructor(private boardsService: BoardsService) { }

  // 전체 검새후 요청한 id 데이터만 다시 받기 ()
  // 모든 게시판 가져오기
  // @Get('/')
  // getAllBoard(): Promise<Board[]> {
  //   // verbose 레벨의 로그로 사용자가 모든 게시판을 가져오려고 시도하는 메시지를 출력
  //   console.log('Controller_getAllBoard');
  //   this.logger.verbose(`getAllBoard 호출`);
  //   return this.boardsService.getAllBoards();
  // }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllBoard(): Promise<{ message: string; data: Board[] }> {
    {
      console.log('Controller_getAllBoard');
      this.logger.verbose(`getAllBoard 호출`);

      try {
        // 서비스에서 Board[] 반환
        const boards = await this.boardsService.getAllBoards();

        // 데이터가 없으면 빈 배열 반환
        if (boards.data.length === 0) {
          // 데이터가 없을 때 상태 코드 204 대신 빈 응답 반환
          return {
            message: '데이터가 없습니다.',
            data: [],
          };
        }

        return boards;  // 서비스에서 반환된 데이터 반환

      } catch (error) {
        console.error('데이터 조회 실패:', error);
        throw new HttpException('서버 오류 발생!', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // @Post('/')
  // createPost(@Body() createBoardDto: CreateBoardDto) {
  //   return this.boardsService.createPost(createBoardDto);
  // }

  @Post('/')
  async createPost(@Body() createBoardDto: CreateBoardDto): Promise<{ message: string; data: Board }> {
    this.logger.verbose(`createPost 호출`);

    try {
      // 서비스에서 새 게시물 생성
      const newBoard = await this.boardsService.createPost(createBoardDto);

      // 상태 코드 201과 함께 메시지 반환
      return newBoard;

    } catch (error) {
      console.error('게시물 생성 중 오류 발생:', error);

      // 상태 코드 500 반환
      throw new HttpException('서버 오류 발생!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 특정 ID의 게시물 조회
  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<{ message: string; data: Board }> {
    this.logger.verbose(`getBoardById 호출 - ID: ${id}`);

    try {
      // 서비스 호출
      const board = await this.boardsService.getBoardById(id);

      // 상태 코드 200과 함께 메시지 반환
      return {
        message: '게시물 조회 성공!',
        data: board,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;  // 이미 처리된 예외를 그대로 반환
      }

      console.error('게시물 조회 중 오류 발생:', error);
      throw new HttpException('서버 오류 발생!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
