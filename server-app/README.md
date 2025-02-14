nest new server-app --skip-git
npm i pg typeorm @nestjs/typeorm
npm install class-validator class-transformer

TypeORM에서는 기본적으로 deletedAt이 null인 데이터만 조회됩니다.

find(), findOne(), createQueryBuilder() 등의 메서드는 Soft Delete를 감지하여 **삭제된 데이터(deletedAt이 null이 아닌 데이터)**는 제외합니다.
이는 TypeORM의 내부 동작으로 설정되어 있습니다.
Soft Delete 무시 조회
Soft Delete가 적용된 데이터를 포함하여 조회하려면, withDeleted: true 옵션을 사용해야 합니다
// deletedAt이 null이 아닌 데이터도 함께 조회
const boards = await this.boardRepository.find({ withDeleted: true });

nest g module users
nest g controller users --no-spec
nest g service users --no-spec

nest g module auth
nest g controller auth --no-spec
nest g service auth --no-spec
