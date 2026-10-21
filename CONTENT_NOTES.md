# 콘텐츠 확인 및 보완 대상

기준: 2026-10-20. 기존 공개 GitHub Pages를 정리한 Notion·최신 GitHub 코드와 대조했습니다. RTL/UVM 저장소는 수정하지 않았습니다.

## 프로젝트 선정

- 공개 코드가 확인된 12개: RTL Design & Verification 8개, SoC / Embedded 2개, AI / Vision 2개.
- 기존 URL/ID를 유지하고 Watch & Stopwatch, UART Loopback을 추가했습니다. 교육 실습은 교육 프로젝트로 표시합니다.
- 위험소리 분류는 코드 미확인으로 공개 목록에서 제외했습니다. Backend는 About의 5개월 경력으로 유지합니다. 제거한 두 프로젝트 주소는 관련 섹션으로 이동합니다.
- 모든 프로젝트에 실제 대표이미지·GitHub 코드·정리한 Notion 상세 링크가 있습니다. YOLO는 팀 저장소 `MS-Aigraphers/main`을 연결했습니다.
- 메인 Notion은 사용자가 정리 요청한 `3fe61f29205481b29fa5f5446d9c1e0f`입니다. 원본 CNN 참조 페이지는 편집하지 않았습니다.

## 역할과 검증 범위

- CNN: 7인 팀, 개인 DW/PW·공통 UVM/Golden 환경·연동 참여. 최신 main `fc647991090b3955780308f7e371f94595f9bf7e`의 2026.10.19 XSim 단위 로그를 표시합니다. DW Cin96·3 batches·27 taps·errors0, PW Directed PASS, PW Fault/Recovery 4/4·errors0입니다. 원본 로그를 해당 commit으로 고정 연결했습니다.
- CNN 과거 G02 29/29 OP·5,174,016개 원소, G06 5/5, G07 4/4는 `CNN_Verification_Evidence.zip`에서 직접 확인한 보관 결과입니다. `archivedVerification`에서 최신 단위 결과와 별도로 표시합니다. DMA/DDR은 TB 모사이며 최신 전체 SoC PASS를 의미하지 않습니다. 최신 전체 Golden UVM 회귀는 입력 자료 문제로 차단됐고 실제 FPGA/로봇 재검증은 미수행입니다.
- CNN Golden Tensor 비교는 Sequence/Python 경로에서 수행합니다. 빈 파생 Scoreboard가 전체 비교를 수행한 것으로 설명하지 않습니다. PoseNet 0.75와 2026.09.09–10.15 기간은 기존 원본·사용자 확정 기준입니다.
- SPI/I2C: 개인 프로젝트입니다. RTL 설계·UVM 검증·FPGA 보드 시연 및 ACK 관찰 수정까지 개인 수행으로 정정했습니다(2026-10-21 사용자 확인). 기존 결과 SPI 48/0·Functional Coverage 59.59%, I2C 14/0·100%는 각 Protocol 기준으로 구분합니다.
- VGA: 7인 팀. RGB Filter·좌표/Top 통합·RG Detect UVM·Git 통합이 개인 범위입니다. 확인 가능한 새 raw log가 없는 500/500·100% 문구는 제거했습니다. 게임 FSM·속도 계산·MCP는 팀원 범위입니다.
- AXI SoC: AXI-SPI IP-level 32 Pass/0 Fail, 4 Directed+12 Random=16 Transaction/32 Check. Functional Coverage 100%는 TXDATA/START_WRITE/DONE_STATUS/SPI_COMPLETE의 4개 Covergroup 범위이며 전체 SoC 또는 Code Coverage가 아닙니다.
- Watch/Stopwatch: 2인 팀, 개인 FSM·Control Unit·FND. Counter Datapath·Divider·Debounce는 팀원 담당입니다. UART Sensor 프로젝트의 개인 Watch Datapath 역할과 혼동하지 않습니다.
- UART Loopback: 교육 실습, 9600bps·8N1·16x. 완료 당시 Stop 대기24→15 Tick·8 Byte 이상 연속 전송 파형을 보존했습니다. 초기 Verilog TB/Top Port Revision 차이는 저장소 README에 있으며 현재 재빌드 PASS를 주장하지 않습니다.
- AXI Master/Slave: 교육 실습, Master/Slave RTL·TB 확인. AW/W 독립 수신과 VALID/READY Handshake 범위이며 전체 Compliance·정량 Coverage 주장이 아닙니다.
- UART OOP: UVM과 구분되는 개인 Class 기반 TB·Mailbox·Interface·Scoreboard입니다. 확정되지 않은 Coverage 수치는 표시하지 않습니다.
- RV32I: 완료 당시 정렬 결과를 보존합니다. 현재 보관 소스의 `datapath.pc_en` 연결 누락 때문에 현 revision 재컴파일 PASS와 구분합니다.
- Sensor: 개인 센서 RTL·TB·시간 Datapath, 팀 UART/FIFO/Top 통합·Basys3. 2단 동기화를 Static CDC 검증 완료로 표현하지 않습니다.
- Jetson: 개인 중앙 서버·DB·MQTT·통합·발표. YOLO/ByteTrack/OSNet/Face 모델은 팀 구성 기술입니다.
- YOLO: 공개 `tracking_another.py`의 객체 ID/Bounding Box/이동 이력과 `web/` Django 코드 확인. 개인은 도난 감지팀 데이터·라벨링·로직 연동 참여이며 무기/소음 전체 구현·정량 모델 성능으로 확대하지 않습니다.

## 이미지 출처

- 기존 본인 프로필·CNN GIF·연산 구조·시스템 구조·G07 파형, SPI 발표자료, AXI SoC 구조·검증·보드, RV32I 구조·결과, VGA/Jetson 시연, Sensor 구조·파형, UART OOP 구조·RX Unit 파형, YOLO 개요 자료를 유지했습니다.
- `watch-fpga.jpg`: 본인 `STOPWATCH-WATCH_Verilog-HDL/docs/assets/slide-37.png`의 실제 보드 사진. 원본 확장자는 PNG지만 바이트는 JPEG이므로 올바른 확장자로 저장했습니다.
- `uart-loopback-waveform.png`: 본인 UART 발표자료의 RX→TX Handover 파형. 정리한 Notion에 첨부한 원본을 사용했습니다.
- `axi4-lite-channels.png`: 본인 AXI4-Lite 발표자료의 5채널 구조 설명. 원본 Notion 소개 커버를 교체했습니다. 검증 결과나 구현 Netlist로 표시하지 않습니다.
- 가상 파형·Coverage/PASS 이미지를 생성하지 않았습니다. 공개 Caption의 ‘PPT 몇 쪽 발췌’ 문구는 구현·검증 설명으로 정리했습니다.

## 공통 데이터와 PDF

웹·A4 요약본은 `src/content/projects.json`의 역할·결과·범위·이미지를 공유합니다. `print.json`은 3개 대표 프로젝트와 별도 A4 편집을 관리합니다. 6페이지 구성을 유지하고 RTL 목록, SoC/AI/교육/경력을 분리했습니다. PDF 보기 버튼은 새 탭에서 열고 강제 다운로드하지 않습니다. 확정 이력서는 없어 `resumePdf: null`입니다.

## 보완 대상

1. CNN 최신 전체 Golden UVM 재현에 필요한 입력 파일·통합 수정·raw log와 실제 FPGA/로봇 재검증.
2. 추가 서버 UVM Coverage의 최종 revision·실행 조건·raw report.
3. RV32I pc_en, UART Loopback 일부 Port Revision을 수정한 뒤 재실행 근거. 해당 코드 저장소는 이번 작업에서 수정하지 않았습니다.
4. 일부 교육 실습·Watch·YOLO의 확정 기간. 미확정 기간을 임의로 채우지 않았습니다.
5. Notion/Drive 원본의 비로그인 열람 권한과 공개용 이력서 PDF.

## 디자인·배포

실제 Cloud Browser로 분석한 ugie01 레퍼런스의 Hero, 4열 Skills, 대표 프로젝트, 가로형 Archive, About/Contact 및 독립 상세 구성을 유지합니다. Primary는 #375582입니다. 원본 인물·프로젝트 콘텐츠·코드는 복제하지 않았습니다.

기존 Jekyll 백업은 `backup/site-before-portfolio-20261019`에 보존되어 있습니다. GA4 G-0QTE2D4682는 기존 공개 호스트에서만 동작하며 이번 콘텐츠 갱신에서 설정을 바꾸지 않았습니다.


## 동작 시연 갱신 (2026-10-21)

실제 영상이 확인된 7개 프로젝트에 GIF 11개를 추가했습니다. `demos[]`와 `DEMO_SOURCES.md`에서 원본·추출 범위·재생 조건을 관리합니다. 기존 정지 이미지·역할·검증 지표는 유지하며 PDF는 정지 자료를 참조합니다.
