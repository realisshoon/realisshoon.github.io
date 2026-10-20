# Han SeungHun — Portfolio

React + TypeScript + Vite 기반 정적 포트폴리오입니다. 한승훈의 GitHub Pages 포트폴리오입니다. RTL/UVM 프로젝트 저장소는 별도로 유지합니다.

## 실행

Node.js 22.12 이상을 권장합니다.

```sh
npm ci
npm run dev
```

화면에 출력되는 Local URL을 엽니다. 배포 결과 검수:

```sh
npm run check:content
npm run build
npm run preview
```

## 구조와 수정 방법

| 경로 | 용도 |
|---|---|
| `src/content/profile.json` | 소개, 사진, 연락처, 교육/경력, PDF 경로 |
| `src/content/projects.json` | 웹사이트·A4 PDF에서 공유하는 프로젝트 사실 원본 |
| `src/content/categories.json` | 카테고리명과 필터 |
| `public/assets/` | 실제 이미지·GIF·영상 |
| `public/evidence/` | 원본에서 가져온 기존 검증 요약 |
| `src/main.tsx` | 렌더링, 필터, 메뉴, 프로젝트 상세, 이미지 확대 |
| `src/styles.css` | 반응형 레이아웃과 `#375582` 색상 |
| `scripts/pages.mjs` | GitHub Pages 직접 접속용 프로젝트 HTML 생성 |
| `dist/` | 빌드 결과. 정적 서버 배포 가능 |

프로젝트 텍스트는 `src/content/projects.json`에서 수정합니다. 컴포넌트에는 프로젝트 설명을 넣지 않습니다. `id`는 URL이므로 발행 후에는 가급적 유지합니다. 이미지는 `public/assets/`에 넣고 `cover` 또는 `media[].src`를 바꿉니다. `media[].type`은 `image`, `gif`, `video`를 지원합니다. GIF의 정지 이미지는 `media[].poster`, 카드 정지 이미지는 `coverPoster`로 지정합니다. 카드의 검증 문구는 `featuredVerification`, 실제 기술 목록은 `techStack`, 역할 태그는 `tags`에서 관리합니다. 영상 파일에는 브라우저가 재생 가능한 MP4/H.264를 권장합니다.

검증 결과를 추가할 때 `verification[]`의 `label`, `value`, `scope`, `source`를 함께 갱신합니다. 실제 완료된 결과에만 `status: historical-verified`를 사용합니다. 과거 결과와 새 결과의 revision·조건을 구분하고, 문구와 미디어 caption도 함께 확인합니다. 기대 결과를 미리 PASS로 기재하지 않습니다.

## A4 요약본 / PDF 갱신

`print.html`은 프로필 1장, 대표 프로젝트 3장, 프로젝트·교육·경력 2장으로 구성됩니다. 메인 웹 전체를 인쇄하지 않고 A4 전용 레이아웃을 생성합니다. `src/content/projects.json`의 역할·검증 값·범위·출처·이미지를 그대로 참조하며, `src/content/print.json`은 대표 프로젝트 선택과 요약 편집을 담당합니다. 핵심 사실을 바꿀 때에는 요약 표현도 검토하세요.

```bash
npm run check:content
npm run build
npm run export:pdf
```

마지막 명령은 설치된 Google Chrome의 headless 렌더러를 사용하며, 기존 브라우저 세션과 분리됩니다. 기본 실행 경로를 찾지 못하면 `CHROME_BIN` 환경 변수로 지정합니다. 완성본은 `public/downloads/Han_SeungHun_Portfolio_Summary.pdf` 및 `dist/downloads/`에 함께 저장됩니다. 실제 출력 후에는 6페이지, 한글·이미지·하단 여백·검증 범위를 확인합니다.

GitHub Actions도 같은 명령으로 매 배포 시 PDF를 다시 생성하므로 웹과 다운로드 PDF가 같은 데이터 revision을 사용합니다. 웹에서 `A4 요약본 미리보기`를 열거나 `Portfolio PDF`로 바로 다운로드할 수 있습니다. `resumePdf`는 확정본이 없어 계속 `null`이며 이력서 다운로드 버튼은 표시하지 않습니다. 폰트는 Noto Sans CJK KR의 한글·라틴 서브셋이고 라이선스는 `public/assets/fonts/OFL.txt`에 있습니다. 빌드 시 `dist/content.json`도 생성됩니다.

## GitHub Pages 배포

공개 주소: https://realisshoon.github.io/

`main`에 Push하면 `.github/workflows/pages.yml`이 콘텐츠 검사·Production Build 후 GitHub Pages에 배포합니다. Actions의 `Deploy portfolio to GitHub Pages`를 수동 실행할 수도 있습니다. Pages Source는 GitHub Actions입니다.

기존 Jekyll 사이트는 `backup/site-before-portfolio-20261019` 브랜치에 보존했습니다. 백업 시점 Commit은 `228432630a4ca5584da21219b45767a649f5ddf3`입니다. 복원할 때에는 이 브랜치를 기준으로 별도 검토 후 반영합니다.

콘텐츠는 `src/content/`와 `public/assets/`에서 수정한 뒤 같은 저장소에 Commit/Push합니다. 빌드 결과는 상대 경로를 사용하고 `projects/<id>.html` 직접 접속을 지원합니다.

## 방문 통계 (Google Analytics 4)

`src/content/analytics.json`에서 측정 ID와 공개 호스트를 관리합니다. `scripts/analytics.mjs`가 공통 태그를 생성하고 빌드 시 메인·프로젝트 상세·A4 미리보기에 한 번씩 삽입합니다. 공개 HTTPS 호스트에서만 수집하며 로컬 개발·미리보기·PDF 내보내기는 수집하지 않습니다. PDF 파일 자체에는 실행되는 분석 스크립트가 없습니다.

배포 후 Google 태그 설정의 ‘설치 테스트’ 또는 GA4 실시간 보고서에서 방문 수신을 확인합니다. 페이지 조회수 외의 스크롤·외부 링크 클릭·파일 다운로드는 웹 스트림의 향상된 측정 설정에 따릅니다. 로그인·이름·이메일 등 개인 식별 정보를 이벤트에 별도로 전달하지 않습니다.

## 검증 범위

자세한 검수와 보완 대상은 `CONTENT_NOTES.md`를 확인하세요. 콘텐츠 검사는 ID 중복, 분류, 미디어 존재, 결과별 근거와 범위를 확인합니다. 외부 Notion/Drive 링크는 방문자의 접근 권한에 따라 로그인이 필요할 수 있습니다.
