stock-cloud-community/
├─ client/ # 프론트엔드 (React + TS + Tailwind)
│ ├─ src/
│ │ ├─ app/ # 페이지/라우팅 레벨
│ │ ├─ components/ # 재사용 UI 컴포넌트
│ │ ├─ features/ # 도메인 단위(피드, 프로필, 종목 등)
│ │ ├─ hooks/
│ │ ├─ lib/ # 공통 유틸 (api, i18n, 디자인 토큰 등)
│ │ ├─ styles/
│ │ └─ types/
│ ├─ public/
│ ├─ index.html
│ ├─ tailwind.config.cjs
│ ├─ postcss.config.cjs
│ └─ tsconfig.json
│
├─ server/ # 백엔드 (Node + Express + TS + MongoDB)
│ ├─ src/
│ │ ├─ api/ # 라우터(REST API)
│ │ │ ├─ auth/
│ │ │ ├─ users/
│ │ │ ├─ posts/
│ │ │ └─ stocks/
│ │ ├─ core/ # 핵심 공통 (db, logger, config)
│ │ ├─ modules/ # 도메인 비즈니스 로직
│ │ └─ index.ts # 서버 엔트리
│ ├─ tsconfig.json
│ └─ .env.example
│
├─ package.json # 루트 스크립트, 워크스페이스 설정 가능
└─ README.md
