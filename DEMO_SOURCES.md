# 동작 시연 GIF

2026-10-21: 공개 프로젝트 12개를 GitHub 코드·원본 발표자료·사용자의 Drive 포트폴리오/구현영상 폴더와 대조했습니다. 실제 동작영상이 확인된 7개 프로젝트에 11개 GIF를 배치했습니다.

| 프로젝트 | GIF | 실제 원본 |
|---|---|---|
| CNN Motion Recognition SoC | 사람–로봇팔 연동, Unity Digital Twin | 본인 GitHub docs/media의 완료 시연 GIF 2개 |
| FPGA VGA 지휘게임 | 카메라/PC 게임 연동 | 본인 GitHub docs/demo의 실제 지휘게임 영상; 도입부 영화 장면 제외 |
| SPI/I2C | SPI, I2C 보드 간 송수신 | Drive의 2026-06-17 SPI/I2C 시연 |
| AXI4-Lite SoC | 버튼/LCD, UART/SPI 전송 | 본인 발표 PPT에 삽입된 mp4 2개; 동일 Drive 원본 링크 연결 |
| UART/FIFO Sensor | SR04 거리, DHT11 온습도/UART | Drive의 실제 통합 보드 동작영상 |
| Jetson Multi-Camera | 4개 카메라 Dashboard | Drive의 11조 시연영상 |
| Watch/Stopwatch | 버튼/FND 동작 | Drive 원본 폴더의 2026-04-19 시연 녹화 |

RV32I·AXI Master/Slave·UART OOP·UART Loopback·YOLO는 이번 확인 범위에서 해당 프로젝트의 동작영상 원본을 찾지 못해 기존 구조·파형 이미지를 유지했습니다. 강의 녹화, 타인 예제 영상, CNN 저장소 robot_arm/sample의 예시 영상은 개인 프로젝트 시연으로 사용하지 않았습니다. RV32I BubbleSort 및 UART Loopback의 원본 Slides도 영상 요소를 확인했으며 등록된 영상이 없었습니다.

## 변환과 확인

- `src/content/demo-sources.json`: 원본 URL, 파일명, 추출 시작/길이, FPS, 크기, 실제 GIF 프레임 수·재생 길이·바이트 수.
- `src/content/projects.json`의 `demos[]`: 웹에서 표시할 제목·설명·GIF·정지 이미지·원본 링크. 기존 역할·수치·분류는 바꾸지 않았습니다.
- 원본 속도로 5–8초를 추출하고 8–10fps·96색 팔레트로 용량을 줄였습니다. 원본 화면과 자막을 유지했습니다. 합성 프레임·임의 결과·추가 PASS 화면은 만들지 않았습니다.
- 메인 카드는 첫 번째 GIF를 사용합니다. 화면 밖에서는 정지 이미지로 교체하고, 화면에 들어온 GIF만 로딩·재생합니다. 정지 이미지는 가벼운 JPG이고 PDF는 기존 정지 자료를 참조합니다.
- 재생/일시정지 버튼을 카드와 상세에 제공합니다. 운영체제의 동작 줄이기가 활성화되어 있으면 자동재생 대신 정지 이미지를 먼저 보여주고 수동 재생을 지원합니다.
- 상세의 전체 원본 링크는 사용자/팀의 원본 영상으로 연결합니다. 로그인이나 공유 권한은 원본 Drive 설정을 따릅니다.

원본 다운로드 후 `scripts/prepare-demo-gifs.py`에 `--source-dir`와 FFmpeg 경로를 전달하면 다시 생성할 수 있습니다. 큰 원본 파일은 이 웹사이트 저장소에 추가하지 않습니다. 배포 빌드는 커밋한 GIF와 JPG만 사용합니다.
