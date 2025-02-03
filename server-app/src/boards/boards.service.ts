import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
  ) {}

  //POST
  //http://localhost:9801/boards
  // {
  //     "title":"해바라기 식당",
  //     "description":"소프트웨어 맛집",
  //     "isPublic : flase",
  //     "date": "2024-03-30 01:56:40.386",
  // }

  async createPost(createBoardDto: CreateBoardDto) {
    const { title, description, isPublic, date } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      isPublic,
      date,
    });

    try {
      await this.boardRepository.save(board);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '추가하는 도중에 에러가 발생했습니다.',
      );
    }
  }

  async getAllBoards(): Promise<Board[]> {
    // 쿼리 빌더를 사용하여 board 엔티티에서 데이터 조회
    console.log('Serviece_getAllBoard');
    const query = this.boardRepository.createQueryBuilder('board');

    // 쿼리 실행 및 결과 반환
    const boards = await query.getMany();
    return boards;
  }
}
