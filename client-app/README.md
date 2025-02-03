npx create-next-app client-app --no-git

√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ... Yes
√ Would you like to use Tailwind CSS? ... No
√ Would you like to use `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the default import alias (@/\*)? » No

src/
├── app/
│ ├── boards/
│ │ ├── page.tsx // Boards 페이지 컴포넌트
│ │ ├── Boards.module.css // Boards 페이지에 대한 CSS
│ │ └── components/
│ │ ├── BoardForm.tsx // 게시판 입력 폼 컴포넌트
│ │ └── BoardTable.tsx // 게시판 테이블 컴포넌트
│ ├── layout.tsx // 공통 레이아웃 파일
│ └── globals.css // 전역 스타일 파일
└── styles/
└── common.module.css // 공통 스타일 파일
