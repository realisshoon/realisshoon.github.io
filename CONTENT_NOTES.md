# 콘텐츠 출처 및 보완 대상

기준: 2026-10-19. 사용자 승인 후 GitHub Pages 공개 배포용.

## 적용 기준

- 로컬 `sources/PROFILE_MASTER.md`는 읽기만 했습니다. 현재 이력서 보관본, 연결된 Notion 프로젝트, 첨부 최종 발표 PPT, 원본 검증 요약을 함께 확인했습니다.
- `PROJECT_MASTER`라는 파일은 접근 가능한 프로젝트 자료에서 확인되지 않았습니다. 프로젝트별 상세는 실제 Notion 원문을 근거로 사용했습니다.
- 상명대 학과는 사용자의 10월 19일 정정에 따라 현 명칭 `휴먼AI공학과`, 졸업 당시 명칭 `휴먼지능정보공학과`를 함께 표기했습니다. PROFILE_MASTER의 구 명칭 단독 표기와 구분합니다.
- CNN 기간은 사용자가 확정한 2026.09.09–10.15입니다. 모델은 첨부 PPT에서 PoseNet 0.75로 확인되었으므로 과거 MoveNet 계획을 최종 구현으로 옮기지 않았습니다.
- Jetson은 원본 Notion의 2026.08.05–08.19를 사용했습니다. 과거 대화의 넓은 진행 기간과 구분합니다.
- 이름·연락 이메일·프로필 이미지는 사용자 Notion에서 확인했습니다. 전화번호·생년월일·주소는 페이지에 게시하지 않았습니다.

## 검증 수치

- CNN G02 29/29 OP, 5,174,016개 원소 일치 / G06 5/5 / G07 4/4: `CNN_Verification_Evidence.zip`에서 원본 텍스트를 직접 확인하고 보관했습니다. DMA·DDR은 TB 모사 범위입니다.
- CNN 추가 Coverage 보강은 미확정입니다. 현재 페이지는 기존 Golden 결과만 표시합니다. 기존 Coverage 원본은 근거 링크로 열리며 Golden 전용 58 bins와 공통 Covergroup·Code Coverage가 서로 다른 범위임을 확인할 수 있습니다.
- DW 과거 Review Package는 당시 Release Gate가 미해결인 상태입니다. 이후 승인 기록과 혼동하지 않도록 승인·Full SoC Timing을 주장하지 않았습니다. 역사적 Unit OOC 수치를 시스템 성능으로 제시하지 않았습니다.
- SPI 48/0, Functional Coverage 59.59%; I2C 14/0, Functional Coverage 100%는 원본 Notion/완료보고서 기준 기존 결과입니다. SPI를 100%로 표현하지 않았습니다.
- AXI-SPI의 32/0·Functional Coverage 100%는 해당 IP와 시나리오 범위입니다. Full SoC Coverage로 표현하지 않았습니다.
- RV32I 결과는 완료 당시 산출물 기준입니다. 현재 보관 코드의 `datapath.pc_en` 연결 누락을 상세에 명시했습니다.

## 이미지 출처

- `profile.png`: 본인 Notion 프로필 원본.
- `cnn_motion_robot_demo_2s.gif`: Notion 보관본, PPT 10쪽 원본 시연의 1.88초 발췌. 상세 화면은 일시정지와 reduced-motion 대체 이미지를 제공하고 메인 카드는 가벼운 정지 이미지로 표시합니다.
- `PPT26_cnn_operations_original.png`: 이전 Notion 파일명은 26쪽이지만 이번 첨부본에서는 25쪽 `image172.png`와 동일한 원본입니다. 파일 크기·바이트를 대조했습니다.
- `PPT12_system_architecture_original.png`: 기존 Notion 발표자료 보관 원본. 첨부본 12–18쪽은 단계별 시스템 구성입니다.
- `06_stall_waveform.png`: 기존 실제 FSDB 기반 G07 파형.
- SPI `slide-10/22/24.png`: 원본 Notion에 보관된 발표자료 이미지. 가상 파형을 생성하지 않았습니다.
- AXI `axi-architecture/results/board.png`: 본인 GitHub `docs/assets/slide-3/16/19.png`.
- RV32I `rv32-architecture/result.png`: 본인 GitHub `docs/assets`.
- VGA `vga-demo/pattern.jpg`: 본인 GitHub `docs/images`의 실제 데모 화면.
- Jetson `jetson-demo.jpg`: 본인 GitHub `docs/images/demo-dashboard.jpg`.
- Sensor SVG: 본인 Notion에 보관된 완료보고서 구조·파형.
- YOLO / 위험소리: 기존 Notion 보관 개요 이미지. 핵심 검증 증거로 확대 해석하지 않았습니다.
- 자료가 없는 항목의 대표 영역은 제목과 기술 태그만 표시합니다. 가상의 Architecture나 PASS 화면은 만들지 않았습니다.

## 향후 보완 자료

1. 확정 A4 Portfolio PDF와 공개용 이력서 PDF.
2. 추가 서버 UVM 테스트의 최종 revision, 실행 조건, raw log, Coverage report.
3. UART/FIFO OOP와 AXI Master/Slave의 실제 파형·개인 역할·기간 상세.
4. RV32I 보관 코드 재현성 수정 후 재실행 근거. 기존 저장소는 이번 작업에서 수정하지 않았습니다.
5. YOLO·위험소리 프로젝트 기간, 원본 보고서와 확정 평가 수치가 있다면 추가.
6. Backend는 업무 경험으로 구분했습니다. 회사 내부 화면·코드를 공개 근거로 요청하거나 사용하지 않았습니다.
7. 연결된 Notion/Drive Evidence의 비로그인 방문 권한과 최신 공개용 이력서.
8. 기존 사이트는 `backup/site-before-portfolio-20261019` 브랜치에 보존. 2026-10-19 공개 배포 승인 받음.

## 레퍼런스 확인

Cloud Browser에서 ugie01.github.io의 실제 1440px·390px 화면을 열어 Hero, Navigation, Skills, Project Archive, About, Contact와 독립 상세 페이지를 확인했습니다. 큰 한글 이름, 좌측 소개/우측 사진·정보, 4열 Skills, 대표 프로젝트, 가로형 카드, 모바일 메뉴·세로 스택, 상세 역할/결과·구현·이미지·문제해결 구성을 따랐습니다. 색상은 #375582로 변경했습니다. 지인의 로고·인물·프로젝트 내용·사진·코드는 복사하지 않았습니다.

## 구현 검수

- React/TypeScript 타입 검사 및 Vite Production Build 통과.
- 프로젝트 12개 ID 중복 없음, 모든 검증 지표에 source/scope 확인.
- 상세 페이지 12개를 포함한 로컬 URL·미디어·원본 요약 총 37개 경로 HTTP 200.
- Cloud Browser에서 PC/390px 모바일, SoC 필터, 상세 이동, 파형 확대, GIF 재생/정지, 모바일 메뉴 표시 확인.
- 별도 RTL/UVM 프로젝트 저장소는 수정하지 않음. 포트폴리오 저장소만 사용자 승인 범위에서 교체.


## 대표이미지 갱신 (2026-10-19)

- 메인 웹 카드와 A4 요약본이 같은 프로젝트 `cover`를 참조합니다.
- UART/FIFO OOP: 실제 완료보고서 `word/media/image7.png`(5.1.2 UART RX TC-03)와 `image9.png`(4.2 Testbench)를 추출했습니다. UART Unit 파형을 Integration 결과로 표시하지 않습니다.
- AXI4-Lite Master/Slave: 기존 Notion 소개 커버를 사용하며 파형·검증 결과 이미지로 표현하지 않습니다.
- Backend는 업무 경험으로 공개 가능한 회사 내부 화면이 없어 텍스트를 유지합니다.
- A4 목록에 대표이미지를 넣으면서 전체 분량을 6장으로 조정했습니다.
