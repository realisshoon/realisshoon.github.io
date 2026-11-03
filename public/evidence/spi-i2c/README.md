# SPI/I2C Evidence index

포트폴리오 데이터·이미지의 출처. 원본 RTL·TB·로그·Coverage는 변경하지 않았으며 새 시뮬레이션은 실행하지 않았습니다.

- 원본 저장소: `realisshoon/spi_i2c_uvm`
- 브랜치: `verification/uvm-regression-audit-20261028`
- 고정 Commit: `cca083e3b6c81394135c7ed01b64c456f65daafe` (2026-11-03 확인 당시 브랜치 HEAD)
- 초기 개인 프로젝트: 2026.06.11–06.18. 후속 실행: 2026.10.19. 자료 보존·집계: 2026.10.28. 추출·원문 재대조: 2026.11.03.
- 후속 코드는 Codex 지원으로 보강된 기록입니다. 교육 당시 개인 구현·보드 시연과 후속 작성 이력을 소급해서 합치지 않습니다.

## 기존 위치의 교체

| 웹 위치 | 기존 자료 | 반영 자료 |
|---|---|---|
| 구현·검증 자료 1 | Basys3 실제 사진 | 사진 유지, 초기 시연임을 캡션에 표시 |
| 구현·검증 자료 2 | `slide-10.png`의 과거 SPI 결과 | `../../assets/spi-i2c/spi-timing-log-comparison.png` |
| 구현·검증 자료 3 | `slide-22.png`의 과거 I2C ACK 설명 | `../../assets/spi-i2c/spi-terminal-high-native-comparison.png` |
| 문제 해결 | I2C ACK Sampling 사례 | SPI 마지막 SCLK High, 문제→분석→수정→결과 양식 유지 |
| 확인한 결과 2개 카드 | SPI 48 / I2C 14 | 정상 회귀의 Run·완료 작업·Check 구분 집계 |

## Before / After 대응

공통: `spi_test`, seed 55, N=4, Divider 순서 4/5/20/255. 파형은 그중 첫 transfer(`clk_div=4`). 시스템 클럭은 [TB의 always #5](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/builds/closed/source_snapshot/tb/tb_spi.sv)로 10ns이며 기대 High는 `(clk_div+1) × Tsys = 50ns`입니다. SPI 규격의 고정 50ns 요구값이 아닙니다.

| 항목 | Before | After |
|---|---|---|
| Run | `pulse_before_failure_s55_n4` | `closed_smoke_s55_n4` |
| 원본 로그 | [sim.log](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/runs/pulse_before_failure_s55_n4/sim.log) | [sim.log](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/runs/closed_smoke_s55_n4/sim.log) |
| metadata | [metadata.json](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/runs/pulse_before_failure_s55_n4/metadata.json) | [metadata.json](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/runs/closed_smoke_s55_n4/metadata.json) |
| 실행 시각 (KST) | 2026-10-19 20:54:49–20:54:52 | 2026-10-19 20:55:54–20:57:04 |
| 사용 build | 로그의 `build/pulse_before/simv` | metadata의 `build_tag=closed` |
| source snapshot | **pulse_before snapshot·manifest 미보존** | [closed/source_snapshot](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/builds/closed/source_snapshot) |
| 마지막 High (PT 원본 파형) | 935–945ns / 10ns | 935–985ns / 50ns |
| Data checks | 8 PASS / 0 FAIL | 8 PASS / 0 FAIL |
| PIN Timing 오류 / UVM_ERROR | 4 / 4 | 0 / 0 |
| 전체 실행 판정 | FAIL | PASS |
| 원본 터미널 캡처 | [log-before-terminal.png](log-before-terminal.png) | [log-after-terminal.png](log-after-terminal.png) |
| PT 추출 원본 | [wave-before-native.jpeg](wave-before-native.jpeg) | [wave-after-native.jpeg](wave-after-native.jpeg) |

`assert_fails`는 Monitor의 절차형 `ck()` 계수입니다. SVA failure로 표현하지 않습니다. Before의 네 PIN 오류는 모두 `terminal SCLK high pulse truncated`입니다.

### 로그 캡처 방식

보존된 sim.log를 byte 그대로 복사해 실제 Xfce Terminal에서 아래 동일 필터로 열고 화면을 캡처했습니다. PIN, RESULT, Scoreboard 및 UVM Error/Fatal 요약만 선택한 발췌이며 **그 외 행은 생략**했습니다. 원문 문장·값을 다시 그리지 않았습니다. 조합본은 메뉴·프롬프트·공백만 자르고 캡처 픽셀을 리사이즈 없이 위아래 배치했으며, Before/After 제목은 원문 밖에 추가했습니다.

```sh
grep -E '\[PIN\]|\[RESULT\]|SPI Scoreboard Report|^UVM_ERROR :|^UVM_FATAL :' <run>/sim.log
```

### 파형 추출 방식

한승훈 iHW PT 발표 자료 PDF(30장), **11페이지**의 실제 Native 파형 이미지 2개를 추출했습니다. PDF 이미지 xref 1509 / 1511, 각각 1360×310 JPEG입니다. 900–1,010ns 부근의 동일 축, 동일 신호 순서(`clk_div`, `cs_n`, `sclk`, `mosi`, `miso`, `master_rx_done`, `slave_rx_done`), 상승·하강 커서와 Δ10/50ns를 그대로 유지했습니다. 신호·엣지·축 픽셀을 수정하거나 늘이지 않았습니다. PT에 표시된 시간·조건과 아카이브의 Run 대응을 사용하며 서버 뷰어를 다시 실행했다고 주장하지 않습니다.

- 원본 PDF SHA-256: `08a0db0cfa98604bd39df8fd2bfda3a698f38449faadc638208dc3afcd957732`
- 아카이브 metadata의 VCD 경로: `projects/spi/runs/<각 Run>/trace.vcd` (당시 `/home/pedu36/workspace/UVM_ENHANCEMENT_20261019/` 아래)
- 원본 서버의 `PPT_FINAL_SELECTION/NATIVE_WAVEFORMS/SOURCE_MANIFEST.json`, `CAPTURE_METADATA.md`와 VCD·VDB는 현재 접근 불가·GitHub 미포함입니다. PT 캡처를 사용했으며 새 파형을 생성하지 않았습니다.

### RTL 수정과 revision의 연결

[보존 baseline→후속 spi_master diff](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/source_diffs/spi/rtl/spi_master.sv.patch)는 Divider 활성 조건을 DATA 또는 STOP으로 확장하고, STOP의 SCLK=0·CS_N=1 처리를 `if (half_tick)` 안으로 옮깁니다. [closed RTL](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/builds/closed/source_snapshot/rtl/spi_master.sv)과 대조했습니다.

- baseline master SHA-256: `516e174834c09d36c9ba35799832bc03910e493dba174a0d9ccbbf61d4af1e4f`
- closed master SHA-256: `d79433c9f6a581414a94cbd2989360c8cb700b72566b8fd286c93fe7dcb1e376`
- closed build SHA-256: `2c2f3ecb1326be352e82646846d0641df8d80ae40f63a3c317071b6da8f03215`
- Before 로그·기록과 위 diff가 종료 Timing 문제를 설명하지만, **baseline을 pulse_before의 완전한 per-run snapshot이라고 간주하지 않습니다.**
- 현재 보강 driver는 resetload와 일치하며 closed driver와 다릅니다. After 설명에는 closed snapshot을 사용했습니다. closed/resetload의 DUT RTL은 같습니다.
- [source_build_checks.json](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/audit/source_build_checks.json)의 48개 snapshot SHA-256을 실제 파일과 재대조했습니다.

## 정상 회귀 집계와 Coverage

[canonical_runs.csv](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/audit/canonical_runs.csv) 및 [실행별 JSON](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/audit/canonical_runs.json)의 31개 정상 Run에 대해 원본 sim.log의 SHA-256·RESULT 계수와 metadata를 대조했습니다.

| 대상 | Run | 완료 단위 | Checks | Fail / PIN 오류 | 정상 merge FC raw bins |
|---|---:|---:|---:|---:|---|
| SPI | 16 | 11,193 transfers | 22,386 data checks | 0 / 0 | legacy 65/67 · enhanced 20/20 |
| I2C | 15 | 11,140 transactions | 26,038 checks | 0 / 0 | legacy 25/25 · enhanced 18/19 |

SPI 한 transfer당 양방향 2 data checks, I2C는 주소·Read/Write 경로에 따라 check 수가 달라집니다. 10-seed 부분집합을 다시 더하지 않았습니다. 진단 실패·오류 주입·대체된 trial을 PASS 집계에 포함하지 않았습니다. 의도적인 reset abort는 완료 transaction 수와 별개입니다.

Coverage는 **URG 텍스트 보고서**입니다. Verdi GUI/URG HTML 캡처로 소개하지 않습니다. raw bin과 weighted score는 다른 값이며, 서로 다른 모델의 수치를 과거 수치와 전후 개선율로 연결하지 않습니다.

- SPI [groups.txt](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/coverage/closed_final/groups.txt), [tests.txt](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/coverage/closed_final/tests.txt), [hierarchy.txt](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/spi/coverage/closed_final/hierarchy.txt): closed 15 + resetload 1 = 16 Run merge.
- I2C [groups.txt](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/i2c/coverage/distributed/groups.txt), [tests.txt](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/i2c/coverage/distributed/tests.txt), [hierarchy.txt](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/i2c/coverage/distributed/hierarchy.txt): distributed 15 Run merge.
- tests.txt의 구성 Run이 canonical 목록과 일치함을 확인했습니다. 상세 지원 범위·잔여 진단 항목은 [원본 README](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/README.md)에 보존되어 있습니다.

## I2C 구현과 과거 설명의 구분

주소 기반 single-byte Read/Write, START·STOP, SDA·ACK/NACK 관찰과 별도 Scoreboard를 유지합니다. [후속 wrapper diff](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/source_diffs/i2c/rtl/i2c_master_slave_top.sv.patch)는 Master 포트를 `.ack_in(ack_in)`, `.ack_out(ack_out)`으로 연결한 변경입니다. [distributed snapshot](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/verification/2026-10-28/evidence/i2c/builds/distributed/source_snapshot)의 pin decode·ACK status 비교와 후속 로그가 근거입니다. baseline seed 1과 distributed seed 10은 동일 seed A/B 실험이 아닙니다. 과거 보고서의 ACK sampling 수정→100%라는 인과관계를 이 Wrapper 수정의 재현 결과로 바꾸지 않습니다.

## 과거 기록 보관

| 구분 | 당시 결과 | 원본 |
|---|---|---|
| 초기 SPI | 48 Pass / 0 Fail · FC 59.59% | [기존 결과 이미지](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/docs/assets/slide-10.png) |
| 초기 I2C | 14 Pass / 0 Fail · FC 100% | [기존 완료보고서](https://drive.google.com/file/d/10GzbqT4t0KN9AIaBSD43hJUAHoV3vFET/view) |
| 초기 I2C ACK 설명 | 과거 Sampling 설명·인과관계 별도 확인 필요 | [기존 발표 이미지](https://github.com/realisshoon/spi_i2c_uvm/blob/cca083e3b6c81394135c7ed01b64c456f65daafe/docs/assets/slide-22.png) |

옛 이미지·파일은 삭제하지 않았습니다. 본문 콘텐츠 출처에도 당시 수치를 유지하고 최신 정상 회귀 카드와 구분했습니다.
