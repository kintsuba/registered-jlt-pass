const BASE_ID = process.env.NUXT_AIRTABLE_BASE_ID;
const API_KEY = process.env.NUXT_AIRTABLE_API_KEY;

const questionsData = [
  // 社会・文化・地域
  {
    id: "q_001",
    status: "published",
    officialCategory: "社会・文化・地域",
    tags: ["頻出"],
    questionText:
      "異文化適応のプロセスにおける「U字型曲線」の第2段階として最も適切なものを選びなさい。",
    choices: JSON.stringify([
      "ハネムーン期（高揚期）",
      "カルチャーショック期（葛藤期）",
      "回復期（適応期）",
      "同化期（安定期）",
      "逆カルチャーショック期",
    ]),
    correctChoice: 1,
    explanation:
      "異文化適応のU字型曲線（U-Curve Hypothesis）は一般に、1)ハネムーン期、2)カルチャーショック期、3)回復期、4)適応期 の4段階を経るとされます。第2段階は現地での生活に直面し、文化の違いからストレスを感じるカルチャーショック期です。",
  },
  {
    id: "q_002",
    status: "published",
    officialCategory: "社会・文化・地域",
    tags: ["頻出"],
    questionText: "「同化主義」の説明として適切なものを選びなさい。",
    choices: JSON.stringify([
      "複数の文化をそれぞれ対等に尊重し、共存を図る立場である。",
      "移民や少数派が、多数派の文化に完全に溶け込むことを求める立場である。",
      "異なる文化同士が混ざり合い、全く新しい文化が生まれることを指す。",
      "各民族が独自の言語と文化を保持したまま、政治的・経済的に統合されることである。",
      "自文化の価値観を基準にして他文化を判断する態度である。",
    ]),
    correctChoice: 1,
    explanation:
      "同化主義（Assimilationism）とは、少数派集団に対して多数派集団の文化、言語、価値観などを全面的に受け入れ、溶け込むことを要求する政策や立場のことを指します。",
  },
  {
    id: "q_003",
    status: "published",
    officialCategory: "社会・文化・地域",
    tags: ["難問"],
    questionText:
      "「ハイコンテクスト文化」と「ローコンテクスト文化」の概念を提唱した人物を選びなさい。",
    choices: JSON.stringify([
      "ホフステード（G. Hofstede）",
      "ホール（E. T. Hall）",
      "ベリー（J. W. Berry）",
      "ヴィゴツキー（L. Vygotsky）",
      "サピア（E. Sapir）",
    ]),
    correctChoice: 1,
    explanation:
      "エドワード・T・ホールは、コミュニケーションにおける文脈（コンテクスト）の依存度によって文化を「ハイコンテクスト（文脈依存度が高い）」と「ローコンテクスト（言葉そのものに依存する）」に分類しました。",
  },
  {
    id: "q_004",
    status: "published",
    officialCategory: "社会・文化・地域",
    tags: ["頻出"],
    questionText:
      "EPA（経済連携協定）に基づいて日本が受け入れている外国人看護師・介護福祉士候補者の送り出し国として、正しい組み合わせを選びなさい。",
    choices: JSON.stringify([
      "中国、韓国、台湾",
      "インドネシア、フィリピン、ベトナム",
      "タイ、マレーシア、シンガポール",
      "ブラジル、ペルー、アルゼンチン",
      "ネパール、ミャンマー、スリランカ",
    ]),
    correctChoice: 1,
    explanation:
      "日本はEPA（経済連携協定）に基づき、インドネシア（2008年〜）、フィリピン（2009年〜）、ベトナム（2014年〜）の3カ国から看護師および介護福祉士の候補者を受け入れています。",
  },

  // 言語と社会
  {
    id: "q_005",
    status: "published",
    officialCategory: "言語と社会",
    tags: ["頻出"],
    questionText: "「ピジン（pidgin）」について正しい記述を選びなさい。",
    choices: JSON.stringify([
      "共通の言語を持たない集団間で、意思疎通のために複数の言語が混ざり合ってできた人工的・一時的な言語である。",
      "ピジンが世代を超えて母語として定着したものを指す。",
      "特定の社会階層の人々のみが使用する隠語である。",
      "国が公用語として法律で定めた言語のことである。",
      "言語が消滅の危機に瀕している状態を指す。",
    ]),
    correctChoice: 0,
    explanation:
      "ピジンは、共通言語を持たない集団が交易などでコミュニケーションをとるために形成された、文法が単純化された言語です。これが次世代の母語として定着すると「クレオール（creole）」と呼ばれます。",
  },
  {
    id: "q_006",
    status: "published",
    officialCategory: "言語と社会",
    tags: ["頻出"],
    questionText:
      "同じ言語の中で、話し言葉と書き言葉、あるいは日常会話と公式な演説など、状況に応じて異なる変種を使い分ける状況を何と呼ぶか。",
    choices: JSON.stringify([
      "ダイグロシア（diglossia）",
      "バイリンガリズム（bilingualism）",
      "コードスイッチング（code-switching）",
      "言語シフト（language shift）",
      "リングア・フランカ（lingua franca）",
    ]),
    correctChoice: 0,
    explanation:
      "ダイグロシアは、1つの社会において、機能や威信が異なる2つの言語変種（高変種と低変種）が明確に使い分けられている状態を指します。",
  },
  {
    id: "q_007",
    status: "published",
    officialCategory: "言語と社会",
    tags: ["難問"],
    questionText:
      "話者が相手との親密度や社会的距離を調整するために、意図的に相手の話し方に合わせたり、逆に遠ざけたりする現象を説明する理論を選びなさい。",
    choices: JSON.stringify([
      "サピア＝ウォーフの仮説",
      "ポライトネス理論",
      "スピーチアクト理論",
      "アコモデーション理論",
      "関連性理論",
    ]),
    correctChoice: 3,
    explanation:
      "ハワード・ジャイルズによって提唱された「アコモデーション理論（コミュニケーション適応理論）」は、話者が相手に合わせて話し方を調整する（コンバージェンス）か、あるいは差異を際立たせる（ダイバージェンス）現象を説明する理論です。",
  },
  {
    id: "q_008",
    status: "published",
    officialCategory: "言語と社会",
    tags: ["頻出"],
    questionText: "「待遇表現」の概念に関する説明として最も適切なものを選びなさい。",
    choices: JSON.stringify([
      "動詞の活用のみによって敬意を表す文法体系のこと。",
      "対人関係や場面に応じて、相手への配慮や敬意を示すための言語表現全体のこと。",
      "書き言葉において、読者に分かりやすく情報を伝えるための表現工夫のこと。",
      "地域ごとに異なる方言の使い分けのこと。",
      "話し手が自分自身の感情を強調して伝える表現方法のこと。",
    ]),
    correctChoice: 1,
    explanation:
      "待遇表現とは、敬語だけでなく、呼称（名前の呼び方）や挨拶、言葉の丁寧さのレベル調整など、対人関係や場面において相手への配慮・敬意を示す言語行動全体を指します。",
  },

  // 言語と心理
  {
    id: "q_009",
    status: "published",
    officialCategory: "言語と心理",
    tags: ["頻出"],
    questionText:
      "第二言語習得における「化石化（fossilization）」の説明として適切なものを選びなさい。",
    choices: JSON.stringify([
      "学習者が新しい言語規則を全く覚えられなくなる現象。",
      "学習者の母語の規則が、そのまま目標言語に適用されてしまう現象。",
      "第二言語の習得がある段階で停滞し、誤りが固定化してそれ以上進歩しなくなる現象。",
      "一度習得した第二言語を使わなくなることで、徐々に忘れていく現象。",
      "年齢が上がるにつれて、第二言語の習得が困難になる現象。",
    ]),
    correctChoice: 2,
    explanation:
      "セリンカー（Selinker）が提唱した「化石化」とは、第二言語（中間言語）の発達がある段階で停滞し、学習者が目標言語の正しい規則を十分なインプットを受けても習得できず、誤りが固定化する現象です。",
  },
  {
    id: "q_010",
    status: "published",
    officialCategory: "言語と心理",
    tags: ["頻出"],
    questionText: "「臨界期仮説（Critical Period Hypothesis）」について適切な記述を選びなさい。",
    choices: JSON.stringify([
      "大人になってから第二言語を学ぶ方が、論理的思考力を用いて早く習得できるとする仮説。",
      "言語を自然に、かつネイティブレベルで習得できる期間（主に思春期まで）が生物学的に決まっているとする仮説。",
      "母語と第二言語の構造が似ているほど、習得が容易になるという仮説。",
      "第二言語を習得するためには、必ずその言語が話される地域に滞在しなければならないとする仮説。",
      "動機づけが高ければ、年齢に関係なくネイティブと同等の発音を習得できるとする仮説。",
    ]),
    correctChoice: 1,
    explanation:
      "レネバーグらによって提唱された「臨界期仮説」は、脳の可塑性の観点から、言語を母語話者と同等のレベル（特に発音）で自然に習得できる期間には生物学的な限界（一般に思春期前後まで）があるとする仮説です。",
  },
  {
    id: "q_011",
    status: "published",
    officialCategory: "言語と心理",
    tags: ["頻出"],
    questionText:
      "ある学習者が「行きます」を「行きります」のように、規則的な活用を不規則動詞にも当てはめて過剰に適用してしまう現象を何というか。",
    choices: JSON.stringify([
      "負の転移",
      "過剰般化（過剰推論）",
      "語用論的失敗",
      "回避",
      "コード・ミキシング",
    ]),
    correctChoice: 1,
    explanation:
      "学習者が獲得した目標言語の規則を、適用すべきでない例外的なケースにまで広げて適用してしまう現象を「過剰般化（overgeneralization）」と呼びます。",
  },
  {
    id: "q_012",
    status: "published",
    officialCategory: "言語と心理",
    tags: ["難問"],
    questionText:
      "第二言語習得において、学習者の「中間言語（Interlanguage）」の特徴として誤っているものを選びなさい。",
    choices: JSON.stringify([
      "独自の規則体系を持つ。",
      "母語と目標言語の両方から影響を受ける。",
      "学習が進むにつれて動的に変化する。",
      "どの学習者も全く同じ発達段階を辿る。",
      "場合によっては発達が停滞し、化石化が起こる。",
    ]),
    correctChoice: 3,
    explanation:
      "中間言語はある程度の普遍的な発達順序（自然習得順序）を示すことはありますが、学習者の母語、学習環境、年齢、動機づけなどにより、「どの学習者も全く同じ段階を辿る」わけではありません。個人差が存在します。",
  },

  // 言語と教育
  {
    id: "q_013",
    status: "published",
    officialCategory: "言語と教育",
    tags: ["頻出"],
    questionText: "コミュニカティブ・アプローチの特徴として最も適切なものを選びなさい。",
    choices: JSON.stringify([
      "正確な文法知識の習得を最優先とし、反復練習を重視する。",
      "母語を一切使わず、絵やジェスチャーを用いて目標言語のみで指導する。",
      "実際の場面でのコミュニケーション能力（意味の伝達）の育成を重視する。",
      "文学作品の講読を通じて、高度な読解力と翻訳能力を養う。",
      "学習者の心理的障壁を取り除くため、音楽を聴きながらリラックスした状態で学習する。",
    ]),
    correctChoice: 2,
    explanation:
      "コミュニカティブ・アプローチは、文法の正確さよりも「実際のコミュニケーション場面で意味を伝え合えるか（流暢さ・適切さ）」を重視し、インフォメーション・ギャップやロールプレイなどの活動を取り入れる教授法です。",
  },
  {
    id: "q_014",
    status: "published",
    officialCategory: "言語と教育",
    tags: ["頻出"],
    questionText: "コースデザインの手順として、一般的に最初に実施されるべきものはどれか。",
    choices: JSON.stringify([
      "シラバスの作成",
      "教材の選定",
      "ニーズ分析",
      "到達目標の決定",
      "評価方法の決定",
    ]),
    correctChoice: 2,
    explanation:
      "コースデザインは学習者の目的や状況を把握することから始まります。そのため、最初に「ニーズ分析（レディネス調査を含む）」を実施し、それに基づいて目標設定、シラバス作成へと進みます。",
  },
  {
    id: "q_015",
    status: "published",
    officialCategory: "言語と教育",
    tags: ["難問"],
    questionText: "CEFR（ヨーロッパ言語共通参照枠）に関する説明として誤っているものを選びなさい。",
    choices: JSON.stringify([
      "言語能力をA1からC2までの6段階で評価する。",
      "「〜ができる」というCan-doディスクリプターを用いて能力を記述する。",
      "多言語主義・多文化主義を理念の背景に持っている。",
      "文法知識の正確さを最も重要な評価基準としている。",
      "言語知識だけでなく、社会言語能力や語用論的能力も評価の対象に含む。",
    ]),
    correctChoice: 3,
    explanation:
      "CEFRは「その言語を使って何ができるか」という課題遂行能力（Can-do）を基準としており、単なる文法知識の正確さを最優先の評価基準としているわけではありません。",
  },
  {
    id: "q_016",
    status: "published",
    officialCategory: "言語と教育",
    tags: ["頻出"],
    questionText: "「フォーマティブ評価（形成的評価）」の目的として適切なものを選びなさい。",
    choices: JSON.stringify([
      "コース終了時に、学習者が目標を達成できたかを最終的に判定するため。",
      "コース開始前に、学習者の現在のレベルを把握して適切なクラスに振り分けるため。",
      "コースの途中で学習者の理解度を確認し、教師の指導方法や学習計画を改善するため。",
      "他の学習者との相対的な順位を決定し、成績の格付けを行うため。",
      "学習者の語学適性（外国語学習に向いているか）を事前に測定するため。",
    ]),
    correctChoice: 2,
    explanation:
      "形成的評価（Formative assessment）は、学習の途中で小テストや観察などを用いて行われ、その結果を以後の指導方針の改善や学習者の軌道修正に役立てるための評価です。",
  },

  // 言語一般
  {
    id: "q_017",
    status: "published",
    officialCategory: "言語一般",
    tags: ["頻出"],
    questionText: "日本語の音声において、「特殊拍（モーラ）」に分類されないものはどれか。",
    choices: JSON.stringify([
      "撥音（ん）",
      "促音（っ）",
      "長音（ー）",
      "拗音（きゃ・しゅ・ちょなど）",
      "どの選択肢も特殊拍である",
    ]),
    correctChoice: 3,
    explanation:
      "拗音（「きゃ」「しゅ」など）はそれ自体が自立した1拍（直音と同じ通常の拍）として数えられます。一方、撥音・促音・長音は単独では発音しにくく、他の拍と結びついて現れるため「特殊拍」と呼ばれます。",
  },
  {
    id: "q_018",
    status: "published",
    officialCategory: "言語一般",
    tags: ["頻出"],
    questionText: "次の動詞のうち、「意志動詞」としてのみ使われるものはどれか。",
    choices: JSON.stringify(["落ちる", "開く", "壊れる", "読む", "降る"]),
    correctChoice: 3,
    explanation:
      "意志動詞は、人間の意志によってコントロールできる動作を表す動詞です。「読む」は意志動詞です。一方、「落ちる」「壊れる」「降る」は無意志動詞であり、「開く」は自動詞（ドアが開く＝無意志）としても使われます。",
  },
  {
    id: "q_019",
    status: "published",
    officialCategory: "言語一般",
    tags: ["頻出"],
    questionText:
      "「私は昨日、スーパーでりんごを買った。」という文における「りんごを」の格的意味（意味役割）として最も適切なものはどれか。",
    choices: JSON.stringify([
      "動作主（エージェント）",
      "経験者",
      "対象（テーマ／対象語）",
      "着点",
      "道具",
    ]),
    correctChoice: 2,
    explanation:
      "動作（買う）が向けられる直接の対象であり、状態の変化や移動を経験する対象を「対象（Theme / Patient）」と呼びます。「私」が動作主（Agent）となります。",
  },
  {
    id: "q_020",
    status: "published",
    officialCategory: "言語一般",
    tags: ["難問"],
    questionText:
      "「ハとガ」の違いについて、一般的に「未知の事柄（新情報）」を主語として提示する際に使われる助詞はどちらか。",
    choices: JSON.stringify([
      "ハ",
      "ガ",
      "文脈によって完全にランダムである",
      "両方同時に使う必要がある",
      "日本語にはそのような区別はない",
    ]),
    correctChoice: 1,
    explanation:
      "情報構造の観点から、日本語ではすでに話題に上っている既知情報（旧情報）を主題化する際に「ハ」を用い、新たに登場する未知情報（新情報）を提示する際には「ガ」を用いるのが一般的です。（例：「むかしむかし、あるところにお爺さんとお婆さん『が』いました。お爺さん『は』山へ…」）",
  },
];

async function insertData() {
  console.log("Airtableへのデータ挿入を開始します...");
  const endpoint = `https://api.airtable.com/v0/${BASE_ID}/Questions`;

  // Airtable APIの仕様では、1回のリクエストで最大10件まで作成可能
  const chunkSize = 10;
  for (let i = 0; i < questionsData.length; i += chunkSize) {
    const chunk = questionsData.slice(i, i + chunkSize);
    const records = chunk.map((q) => ({
      fields: q,
    }));

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Chunk ${i / chunkSize + 1} 挿入失敗:`, errorText);
      } else {
        console.log(`Chunk ${i / chunkSize + 1} (${chunk.length}件) 挿入成功`);
      }
    } catch (e) {
      console.error("通信エラー:", e);
    }
  }
  console.log("完了しました。");
}

insertData();
