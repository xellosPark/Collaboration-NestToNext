import { Body, Controller, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Post('/')
    createPost(@Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.createPost(createBoardDto);
    }

}
