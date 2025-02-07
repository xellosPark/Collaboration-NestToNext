import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  // DB 저장하기위해서 constructor
  constructor(
    // 데코레이터는 TypeORM의 Repository 객체를 의존성 주입(DI, Dependency Injection)을 통해 사용할 수 있도록 합니다.
    // NestJS에서 데이터베이스와 상호작용하기 위해 레포지토리를 쉽게 사용할 수 있게 합니다.
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) { }

  //POST
  //http://localhost:9801/boards
  // {
  //     "title":"해바라기 식당",
  //     "description":"소프트웨어 맛집",
  //     "isPublic : flase",
  //     "date": "2024-03-30 01:56:40.386",
  // }

  // async getAllBoards(): Promise<Board[]> {
  //   // 쿼리 빌더를 사용하여 board 엔티티에서 데이터 조회
  //   console.log('Serviece_getAllBoard');
  //   const query = this.boardRepository.createQueryBuilder('board');

  //   // 쿼리 실행 및 결과 반환
  //   const boards = await query.getMany();
  //   return boards;
  // }

  // 모든 게시판 데이터를 조회하는 메서드
  async getAllBoards(): Promise<{ message: string; data: Board[] }> {
    console.log('Service_getAllBoard');

    // 데이터베이스에서 Board 엔티티 조회
    const boards = await this.boardRepository.createQueryBuilder('board').getMany();

    // 메시지와 데이터를 함께 반환
    return {
      message: '데이터 조회 성공!',
      data: boards,
    };
  }

  // 게시물 생성 및 저장 후 메시지와 데이터 반환
  async createPost(createBoardDto: CreateBoardDto): Promise<{ message: string; data: Board }> {
    // DTO를 기반으로 새로운 게시물 생성
    const newBoard = this.boardRepository.create(createBoardDto);

    // 게시물 저장
    const savedBoard = await this.boardRepository.save(newBoard);

    // 메시지와 저장된 게시물 반환
    return {
      message: '게시물이 성공적으로 생성되었습니다!',
      data: savedBoard,
    };
  }

  // ID로 게시물 조회
  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });

    // 게시물이 없으면 예외 발생
    if (!board) {
      throw new NotFoundException(`ID ${id}에 해당하는 게시물이 존재하지 않습니다.`);
    }

    return board;
  }

  // // 게시물 삭제 메서드 (DB 삭제제)
  // async deleteBoardById(id: number): Promise<void> {
  //   const result = await this.boardRepository.delete(id);

  //   // 게시물이 없는 경우 예외 발생
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`ID ${id}에 해당하는 게시물이 존재하지 않습니다.`);
  //   }
  // }

  // 게시물 소프트 삭제 메서드 (deletedAt 타이머 추가)
  async deleteBoardById(id: number): Promise<void> {
    const board = await this.boardRepository.findOneBy({ id });

    // 게시물이 없는 경우 예외 발생
    if (!board) {
      throw new NotFoundException(`ID ${id}에 해당하는 게시물이 존재하지 않습니다.`);
    }

    // `deletedAt` 필드를 현재 시간으로 업데이트
    board.deletedAt = new Date();
    await this.boardRepository.save(board);
  }
}
