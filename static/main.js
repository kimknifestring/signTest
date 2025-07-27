// =======================================================
//  1. DOM 요소 및 상태 관리 (상수 및 변수 블록)
// =======================================================
const landingSection = document.getElementById('landing-section');
const loadingSection = document.getElementById('loading-section');
const resultSection = document.getElementById('result-section');
const loadingText = document.getElementById('loading-text');

const canvas = document.getElementById('signature-canvas');
const clearButton = document.getElementById('clear-button');
const startButton = document.getElementById('start-button');
const downloadButton = document.getElementById('download-button');
const restartButton = document.getElementById('restart-button');
const shareButton = document.getElementById('share-button');

let signaturePad;

// JSON 데이터 직접 내장
const analysisResults = [
    {
        "id": 4, "profileType": "분 단위로 인생 설계하는 파워 J형 AI",
        "stat_ranges": { "logic": [85, 99], "creativity": [30, 59], "execution": [90, 99], "leadership": [70, 89], "empathy": [20, 49] },
        "comment_parts": { "opening": ["당신의 계획에 오차란 존재하지 않습니다.", "MBTI에 J가 세 개쯤 있는 것 같습니다."], "middle": ["즉흥적인 약속은 당신의 시스템을 마비시키지만,", "모든 변수를 통제하려다 에너지가 방전되곤 합니다."], "closing": ["결국 당신의 계획대로 모든 것이 이루어질 것입니다.", "당신이 만든 엑셀 시트는 한 편의 예술작품입니다."] },
        "hiddenTalent": "여행 가서 친구들 동선, 맛집, 예산까지 엑셀로 완벽하게 정리해주는 능력."
    },
    {
        "id": 5, "profileType": "도파민에 미친 탕진잼 욜로(YOLO)족",
        "stat_ranges": { "logic": [10, 39], "creativity": [80, 98], "execution": [20, 49], "leadership": [50, 79], "empathy": [85, 99] },
        "comment_parts": { "opening": ["인생은 한 번뿐, 재미없는 건 참을 수 없습니다.", "당신의 통장 잔고는 오늘도 위태롭습니다."], "middle": ["꽂히면 일단 지르고 보지만, 뒷수습은 미래의 나에게 맡깁니다.", "새로운 핫플은 누구보다 먼저 가봐야 직성이 풀립니다."], "closing": ["남는 건 사진과 경험뿐, 후회는 없습니다.", "오늘의 행복을 위해 내일의 고통을 기꺼이 감수합니다."] },
        "hiddenTalent": "월급날 5분 만에 다음 달의 나에게서 돈 빌려오는 기술."
    },
    {
        "id": 6, "profileType": "침대 위에서 세상을 분석하는 방구석 데이터 과학자",
        "stat_ranges": { "logic": [90, 99], "creativity": [70, 95], "execution": [5, 29], "leadership": [10, 30], "empathy": [20, 45] },
        "comment_parts": { "opening": ["당신에겐 침대와 노트북만 있으면 어디든 갈 수 있습니다.", "세상 모든 것에 대한 TMI를 수집하는 것이 취미입니다."], "middle": ["나가서 사람 만나는 것보다 위키피디아 탐험이 더 즐거우며,", "완벽한 이론을 세우지만 정작 실행에 옮기지는 않습니다."], "closing": ["당신이 쌓은 지식은 언젠가 세상을 구할지도 모릅니다.", "오늘도 당신은 인류의 지적 유산에 기여했습니다. 침대 위에서."] },
        "hiddenTalent": "관심 있는 주제의 유튜브 알고리즘을 3시간 만에 정복하는 능력."
    },
    {
        "id": 7, "profileType": "물 밑에서 하드캐리하는 딥 워커(Deep Worker)",
        "stat_ranges": { "logic": [75, 95], "creativity": [60, 80], "execution": [88, 98], "leadership": [30, 59], "empathy": [40, 69] },
        "comment_parts": { "opening": ["티 내지 않고 묵묵히 모든 것을 해결하는 당신은,", "조용하지만 누구보다 강한 존재감을 드러냅니다."], "middle": ["남들이 알아주지 않아도 묵묵히 자기 일을 하며,", "모든 칭찬과 스포트라이트는 다른 사람에게 양보하곤 합니다."], "closing": ["결국 모든 것이 당신 덕분이었다는 사실을 아는 사람은 압니다.", "당신은 팀의 숨겨진 에이스이자 진정한 능력자입니다."] },
        "hiddenTalent": "아무도 모르게 팀 프로젝트의 위기를 수습하고 퇴근하는 스킬."
    },
    {
        "id": 8, "profileType": "AI도 질투하는 천상계 아티스트",
        "stat_ranges": { "logic": [40, 69], "creativity": [95, 99], "execution": [30, 59], "leadership": [20, 49], "empathy": [70, 95] },
        "comment_parts": { "opening": ["당신의 감성은 이 세상의 것이 아닌 듯합니다.", "세상을 당신만의 필터로 바라보는 특별한 눈을 가졌습니다."], "middle": ["자신만의 세계에 깊이 빠져 현실 감각이 흐려질 때가 있지만,", "당신의 작품 세계를 이해하지 못하는 사람들을 보면 답답함을 느낍니다."], "closing": ["결국 당신의 독창성은 시대를 앞서가는 예술로 인정받을 것입니다.", "돈이나 명예보다 중요한 것은 당신의 예술혼입니다."] },
        "hiddenTalent": "내 기분을 표현하는 플레이리스트를 5분 만에 100곡 단위로 만드는 재능."
    },
    {
        "id": 9, "profileType": "10년 뒤 강남 건물주를 꿈꾸는 투자가",
        "stat_ranges": { "logic": [88, 98], "creativity": [40, 60], "execution": [70, 90], "leadership": [60, 85], "empathy": [15, 35] },
        "comment_parts": { "opening": ["모든 대화는 기승전'돈'으로 끝나는 당신.", "세상의 모든 것을 숫자로 환산해서 보는 능력이 있습니다."], "middle": ["'그거 얼마야?'가 말버릇이지만, 누구보다 자본주의의 원리를 잘 이해하며,", "사람의 감정보다는 데이터와 통계를 신뢰하는 경향이 있습니다."], "closing": ["당신의 냉철한 분석과 꾸준함은 부를 가져다줄 것입니다.", "오늘 마시는 커피 한 잔도 미래를 위한 투자입니다."] },
        "hiddenTalent": "점심값 아껴서 모은 주식이 10배가 되는 상상만으로 행복해지는 능력."
    },
    {
        "id": 10, "profileType": "숨쉬기 운동만 하는 만성 무기력증 환자",
        "stat_ranges": { "logic": [30, 50], "creativity": [40, 60], "execution": [1, 10], "leadership": [5, 15], "empathy": [50, 70] },
        "comment_parts": { "opening": ["'아무것도 안 하고 싶다. 이미 아무것도 안 하고 있지만,'", "당신의 유일한 운동은 숨쉬기와 눈 깜빡이기입니다."], "middle": ["세상만사가 귀찮고 모든 것에 큰 감흥이 없지만,", "누가 나 대신 일 좀 해줬으면 좋겠다고 매일 생각합니다."], "closing": ["언젠가는 움직여야 한다는 걸 알지만, 그게 오늘은 아닙니다.", "당신은 에너지 보존의 법칙을 온몸으로 실천하고 있습니다."] },
        "hiddenTalent": "알람 10개를 모두 끄고 5분 더 잘 수 있는 강인한 정신력."
    },
    {
        "id": 11, "profileType": "팩폭으로 친구 반절 날려버린 냉혈한",
        "stat_ranges": { "logic": [95, 99], "creativity": [10, 30], "execution": [80, 95], "leadership": [40, 65], "empathy": [1, 10] },
        "comment_parts": { "opening": ["T세요? 라는 말을 인생에서 100번 이상 들어봤습니다.", "당신의 팩트는 언제나 아프고 정확합니다."], "middle": ["비효율적인 상황을 보면 참지 못하고 쓴소리를 하지만,", "공감보다는 해결책을 제시하다 '너 T발 C야?' 소리를 듣습니다."], "closing": ["결국 당신의 조언이 옳았다는 것이 증명될 것입니다.", "진정한 친구는 팩트 폭격 속에서도 살아남는 법입니다."] },
        "hiddenTalent": "친구의 연애상담을 30초 만에 손익분석 리포트로 바꿔주는 재능."
    },
    {
        "id": 12, "profileType": "알고 보면 인싸 중에 핵인싸",
        "stat_ranges": { "logic": [60, 80], "creativity": [70, 90], "execution": [65, 85], "leadership": [85, 99], "empathy": [90, 99] },
        "comment_parts": { "opening": ["언뜻 보면 조용해 보이지만, 정신 차려보면 모든 모임의 중심에 있습니다.", "당신은 사람들을 끌어당기는 알 수 없는 매력의 소유자입니다."], "middle": ["모든 사람의 성향과 관계를 파악하고 최적의 분위기를 만들지만,", "가끔은 이 모든 관계가 피곤하게 느껴지기도 합니다."], "closing": ["결국 당신 없이는 아무것도 돌아가지 않는다는 것을 모두가 압니다.", "당신은 타고난 '인간 F5(새로고침)' 버튼입니다."] },
        "hiddenTalent": "처음 본 사람과 10년 지기 친구처럼 대화할 수 있는 친화력."
    },
    {
        "id": 13, "profileType": "생각과다로 뇌에 쥐 나는 철학자",
        "stat_ranges": { "logic": [80, 95], "creativity": [85, 98], "execution": [10, 35], "leadership": [20, 40], "empathy": [60, 85] },
        "comment_parts": { "opening": ["'나는 왜 존재하는가'에 대한 고민으로 하루를 시작합니다.", "하나의 질문은 꼬리에 꼬리를 무는 수백 개의 질문으로 이어집니다."], "middle": ["하나를 시작하기 전에 모든 경우의 수를 따져보다가 결국 시작도 못하며,", "단순한 문제도 복잡하게 만드는 경이로운 재능이 있습니다."], "closing": ["당신의 깊이 있는 통찰은 언젠가 빛을 보게 될 것입니다.", "오늘도 당신은 생각하느라 아무것도 하지 않았습니다."] },
        "hiddenTalent": "짜장면을 시킬지 짬뽕을 시킬지 1시간 동안 철학적 고찰에 빠지는 능력."
    },
    {
        "id": 1, "profileType": "상위 0.1%의 전략가형 CEO",
        "stat_ranges": { "logic": [80, 98], "creativity": [70, 89], "execution": [85, 99], "leadership": [90, 99], "empathy": [60, 79] },
        "comment_parts": { "opening": ["당신의 뇌는 잘 짜인 슈퍼컴퓨터와 같습니다.", "타고난 리더의 자질을 갖추고 있습니다."], "middle": ["복잡한 문제 속에서 누구보다 빠르게 핵심을 꿰뚫고", "어떤 위기 상황에서도 냉철한 판단을 내리며"], "closing": ["팀을 이끌어 반드시 승리를 쟁취합니다.", "결국에는 목표를 달성하고야 맙니다."] },
        "hiddenTalent": "아무리 복잡한 회의에서도 3초 만에 핵심을 파악하고 회의를 끝내버리는 능력."
    },
    {
        "id": 2, "profileType": "고집불통 천재 발명가",
        "stat_ranges": { "logic": [85, 95], "creativity": [90, 99], "execution": [20, 49], "leadership": [10, 39], "empathy": [5, 29] },
        "comment_parts": { "opening": ["세상이 당신을 이해하지 못하는 것이지, 당신이 틀린 게 아닙니다.", "당신의 머릿속은 그 누구도 상상 못 할 아이디어로 가득합니다."], "middle": ["하지만 남의 말을 지독하게 듣지 않아 종종 고립되곤 하며,", "자신만의 세계에 깊이 빠져드는 경향이 있습니다."], "closing": ["결국 세상을 놀라게 할 발명품을 만들어낼 것입니다.", "그 고집이 언젠가 빛을 발할 날이 올 겁니다."] },
        "hiddenTalent": "3일 밤낮으로 하나의 문제에만 몰두할 수 있는 경이로운 집중력."
    },
    {
        "id": 3, "profileType": "마감 직전에만 활성화되는 초인",
        "stat_ranges": { "logic": [60, 85], "creativity": [70, 95], "execution": [90, 99], "leadership": [50, 75], "empathy": [40, 69] },
        "comment_parts": { "opening": ["평소에는 한없이 게으르고 무기력해 보이지만,", "평범한 일상에서는 좀처럼 힘을 쓰지 않지만,"], "middle": ["마감이 닥치면 각성하여 누구도 따라올 수 없는 퍼포먼스를 보여줍니다.", "위기 상황이 닥치면 당신의 잠재력은 폭발적으로 깨어납니다."], "closing": ["당신의 진짜 능력은 '위기'를 먹고 자랍니다.", "벼락치기의 신이 있다면 바로 당신일 겁니다."] },
        "hiddenTalent": "커피 10잔을 마셔도 멀쩡하게 밤을 새울 수 있는 강철 위장."
    }
];

// =======================================================
//  2. 초기화 및 설정 블록
// =======================================================

function initializeApp() {
    setupCanvas();
    setupEventListeners();
}

function setupCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    
    signaturePad = new SignaturePad(canvas, {
        penColor: "rgb(95, 120, 255)"
    });

    signaturePad.addEventListener("beginStroke", () => {
        startButton.disabled = false;
    });
}

function setupEventListeners() {
    clearButton.addEventListener('click', () => {
        signaturePad.clear();
        startButton.disabled = true;
    });
    startButton.addEventListener('click', startAnalysis);
    downloadButton.addEventListener('click', downloadResult);
    restartButton.addEventListener('click', () => {
        signaturePad.clear();
        startButton.disabled = true;
        uiController.showScreen('landing');
    });
    shareButton.addEventListener('click', shareResult);
}


// =======================================================
//  3. UI 제어 블록 (화면 전환 등)
// =======================================================

const uiController = {
    screens: {
        landing: landingSection,
        loading: loadingSection,
        result: resultSection,
    },
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.add('hidden'));
        if (this.screens[screenName]) {
            this.screens[screenName].classList.remove('hidden');
        }
    },
    renderResult(result) {
        document.getElementById('result-signature-image').src = result.signatureImage;
        document.getElementById('result-profile-type').textContent = result.profileType;
        document.getElementById('result-profile-comment').textContent = result.profileComment;
        document.getElementById('result-hidden-talent').textContent = result.hiddenTalent;
        
        const statsList = document.getElementById('result-stats-list');
        statsList.innerHTML = ''; 

        for (const [stat, value] of Object.entries(result.stats)) {
            const li = document.createElement('li');
            const statName = { logic: '논리력', creativity: '창의력', execution: '실행력', leadership: '리더십', empathy: '공감 능력' }[stat];
            li.innerHTML = `
                <span>${statName}</span>
                <div class="stat-bar">
                    <div class="stat-bar-inner" style="width: 0%;"></div>
                </div>
            `;
            statsList.appendChild(li);
            setTimeout(() => {
                li.querySelector('.stat-bar-inner').style.width = `${value}%`;
            }, 100);
        }
    }
};


// =======================================================
//  4. 핵심 로직 블록
// =======================================================

function startAnalysis() {
    if (signaturePad.isEmpty()) {
        alert("서명을 먼저 입력해주세요.");
        return;
    }

    const signatureData = signaturePad.toData();
    const signatureImage = signaturePad.toDataURL("image/png");
    
    const analysisResult = generateDynamicResult(signatureData);
    analysisResult.signatureImage = signatureImage;

    uiController.showScreen('loading');
    
    const loadingMessages = ["서명을 보며 멍 때리는 중...", "프로파일링 완료. 분석 리포트를 생성합니다."];
    let messageIndex = 0;
    loadingText.textContent = "사용자의 서명을 스캔하는 중...";
    const interval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex++;
        } else {
            clearInterval(interval);
        }
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        uiController.renderResult(analysisResult);
        uiController.showScreen('result');
    }, 3000);
}

function generateDynamicResult(signatureData) {
    if (!analysisResults || analysisResults.length === 0) {
        return { profileType: "오류", profileComment: "결과 데이터가 없습니다.", stats: {}, hiddenTalent: "" };
    }

    const points = signatureData.flatMap(d => d.points);
    const pointCount = points.length || 1;
    const archetypeIndex = pointCount % analysisResults.length;
    const archetype = analysisResults[archetypeIndex];

    const finalStats = {};
    const duration = points.length > 1 ? points[points.length - 1].time - points[0].time : 1000;
    
    Object.entries(archetype.stat_ranges).forEach(([stat, range]) => {
        const [min, max] = range;
        const seed = (duration + pointCount + stat.length * 7) || 1;
        const randomValue = min + (seed % (max - min + 1));
        finalStats[stat] = Math.max(min, Math.min(max, randomValue));
    });

    const { opening, middle, closing } = archetype.comment_parts;
    const finalComment = [
        opening[Math.floor(Math.random() * opening.length)],
        middle[Math.floor(Math.random() * middle.length)],
        closing[Math.floor(Math.random() * closing.length)]
    ].join(' ');

    return {
        profileType: archetype.profileType,
        profileComment: finalComment,
        stats: finalStats,
        hiddenTalent: archetype.hiddenTalent
    };
}

function downloadResult() {
    const resultCard = document.getElementById('result-card');
    const originalBackgroundColor = resultCard.style.backgroundColor;
    resultCard.style.backgroundColor = 'white'; 

    html2canvas(resultCard, {
        scale: 2, 
        useCORS: true 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ai-profiler-result.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        resultCard.style.backgroundColor = originalBackgroundColor;
    });
}

async function shareResult() {
    const resultType = document.getElementById('result-profile-type').textContent;
    const url = window.location.href;

    const shareText = `[AI 프로파일러 분석 결과]\n\n나의 잠재력 유형은 "${resultType}"!\n\n당신의 잠재력도 확인해보세요! 👇\n`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: 'AI 프로파일러 분석 결과',
                text: shareText,
                url: url
            });
            console.log('결과 공유 성공');
        } else {
            await navigator.clipboard.writeText(shareText + url);
            alert('결과 내용과 링크가 복사되었습니다. SNS에 바로 붙여넣어보세요!');
        }
    } catch (err) {
        console.error('공유 실패:', err);
        if (err.name !== 'AbortError') {
             alert('오류로 인해 공유할 수 없습니다.');
        }
    }
}

// =======================================================
//  5. 앱 실행
// =======================================================
initializeApp();