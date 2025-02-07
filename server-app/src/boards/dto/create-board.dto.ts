import { IsString, IsBoolean, IsOptional, MaxLength, MinLength, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty({ message: '제목은 필수 입력 항목입니다.' })
    @IsString({ message: '제목은 문자열이어야 합니다.' })
    @MaxLength(255, { message: '제목은 최대 255자까지 입력할 수 있습니다.' })
    title: string; // 게시판 제목

    @IsOptional()
    @IsString({ message: '설명은 문자열이어야 합니다.' })
    @MaxLength(1000, { message: '설명은 최대 1000자까지 입력할 수 있습니다.' })
    description?: string; // 게시판 설명 (선택 항목)

    @IsOptional()
    @IsBoolean({ message: '공개 여부는 true 또는 false 값이어야 합니다.' })
    isPublic?: boolean; // 공개 여부 (선택 항목)

    // @IsNotEmpty({ message: '날짜는 필수 입력 항목입니다.' })
    // @IsDateString({ message: '날짜는 유효한 ISO 8601 형식이어야 합니다.' })
    // date: Date; // 날짜
}