# WAC 창고 업무 전자 메뉴얼

웹: https://wac-warehouse-manual.vercel.app  
저장소: https://github.com/hyunseook0606-dev/wac-manual

## 로컬 실행

```bash
npm install
npm run dev
```

## 자주 고치는 파일

| 파일 | 내용 |
|------|------|
| `src/components/RulesChapter.tsx` | 작업 수칙 |
| `src/components/MapChapter.tsx` | 창고 도면 |
| `public/labels/` | 사진·라벨 |
| `scripts/build_word_manual.py` | 인쇄용 Word 생성 |

## Word 메뉴얼 다시 만들기

```bash
python scripts/build_word_manual.py
```

## 수정 가이드 (인턴용)

자세한 방법은 저장소 밖/데스크톱의 `메뉴얼_수정_가이드_인턴용.docx` 또는 아래를 참고하세요.

1. GitHub에서 `RulesChapter.tsx` 수정  
2. Commit → main  
3. Vercel이 자동 배포 (1~2분)
