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
| `src/content/projects.json` | 웹사이트·향후 A4 PDF에서 공유할 프로젝트 사실 원본 |
| `src/content/categories.json` | 카테고리명과 필터 |
| `public/assets/` | 실제 이미지·GIF·영상 |
| `public/evidence/` | 원본에서 가져온 기존 검증 요약 |
| `src/main.tsx` | 렌더링, 필터, 메뉴, 프로젝트 상세, 이미지 확대 |
| `src/styles.css` | 반응형 레이아웃과 `#375582` 색상 |
| `scripts/pages.mjs` | GitHub Pages 직접 접속용 프로젝트 HTML 생성 |
| `dist/` | 빌드 결과. 정적 서버 배포 가능 |

프로젝트 텍스트는 `src/content/projects.json`에서 수정합니다. 컴포넌트에는 프로젝트 설명을 넣지 않습니다. `id`는 URL이므로 발행 후에는 가급적 유지합니다. 이미지는 `public/assets/`에 넣고 `cover` 또는 `media[].src`를 바꿉니다. `media[].type`은 `image`, `gif`, `video`를 지원합니다. GIF의 정지 이미지는 `media[].poster`, 카드 정지 이미지는 `coverPoster`로 지정합니다. 카드의 검증 문구는 `featuredVerification`, 실제 기술 목록은 `techStack`, 역할 태그는 `tags`에서 관리합니다. 영상 파일에는 브라우저가 재생 가능한 MP4/H.264를 권장합니다.

검증 결과를 추가할 때 `verification[]`의 `label`, `value`, `scope`, `source`를 함께 갱신합니다. 실제 완료된 결과에만 `status: historical-verified`를 사용합니다. 과거 결과와 새 결과의 revision·조건을 구분하고, 문구와 미디어 caption도 함께 확인합니다. 기대 결과를 미리 PASS로 기재하지 않습니다.

`profile.json`의 `portfolioPdf`와 `resumePdf`는 현재 `null`입니다. PDF가 확정되면 파일을 `public/downloads/`에 넣고 상대 경로를 지정합니다. 그때 실제 다운로드 버튼이 나타납니다. A4 PDF는 웹페이지 인쇄가 아닌 별도 편집 대상이며 공통 프로젝트 JSON을 사실 원본으로 사용합니다. 빌드 시 `dist/content.json`도 생성됩니다.

## GitHub Pages 배포

공개 주소: https://realisshoon.github.io/

`main`에 Push하면 `.github/workflows/pages.yml`이 콘텐츠 검사·Production Build 후 GitHub Pages에 배포합니다. Actions의 `Deploy portfolio to GitHub Pages`를 수동 실행할 수도 있습니다. Pages Source는 GitHub Actions입니다.

기존 Jekyll 사이트는 `backup/site-before-portfolio-20261019` 브랜치에 보존했습니다. 백업 시점 Commit은 `228432630a4ca5584da21219b45767a649f5ddf3`입니다. 복원할 때에는 이 브랜치를 기준으로 별도 검토 후 반영합니다.

콘텐츠는 `src/content/`와 `public/assets/`에서 수정한 뒤 같은 저장소에 Commit/Push합니다. 빌드 결과는 상대 경로를 사용하고 `projects/<id>.html` 직접 접속을 지원합니다.

## 검증 범위

자세한 검수와 보완 대상은 `CONTENT_NOTES.md`를 확인하세요. 콘텐츠 검사는 ID 중복, 분류, 미디어 존재, 결과별 근거와 범위를 확인합니다. 외부 Notion/Drive 링크는 방문자의 접근 권한에 따라 로그인이 필요할 수 있습니다.
