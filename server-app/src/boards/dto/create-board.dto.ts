import { IsString, IsBoolean, IsOptional, MaxLength, MinLength, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string; // 게시판 제목

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description?: string; // 게시판 설명 (선택 항목)

    @IsBoolean()
    @IsOptional()
    isPublic?: boolean; // 공개 여부 (선택 항목)

    @IsDateString()
    date: Date;
}