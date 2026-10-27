import type { CardSet } from "./types";

export const cardSets: CardSet[] = [
  {
    id: "studienfinanzierung",
    title: "Studienfinanzierung",
    titleZh: "学业资助",
    group: "2025.07",
    note: "2025.07.24 新题。笔记里只有八句概括，没有听力原文，先把德文读熟、能立刻反应出中文。",
    cards: [
      {
        de: "Durch staatliche Förderung soll Zugang zur Hochschulbildung für alle hergestellt werden.",
        zh: "通过国家资助，应为所有人提供接受高等教育的机会。",
      },
      {
        de: "Es fördert die Selbstständigkeit, wenn Studierende ihren Lebensunterhalt durch Nebenjobs bestreiten.",
        zh: "如果学生通过兼职工作维持生计，这有助于培养独立性。",
      },
      {
        de: "Der jungen Generation sollte frühzeitig finanzielle Bildung vermittelt werden.",
        zh: "应该尽早向年轻一代传授财务知识。",
      },
      {
        de: "Unternehmen sollten mehr Fördermöglichkeiten für ihre zukünftigen Arbeitskräfte zur Verfügung stellen.",
        zh: "企业应该为其未来的劳动力提供更多资助机会。",
      },
      {
        de: "Es sollten nur Studiengänge gefördert werden, die auf dem Arbeitsmarkt gefragt sind.",
        zh: "只应该资助在就业市场上有需求的专业。",
      },
      {
        de: "Da Akademiker mehr verdienen, sollten sie die Kosten für ihr Studium selbst tragen.",
        zh: "由于学者收入更高，他们应该自己承担学习费用。",
      },
      {
        de: "Man sollte Schulabgänger darauf aufmerksam machen, dass sie auch ohne Studium gute Verdienstmöglichkeiten haben können.",
        zh: "应该让毕业生意识到，即使不上大学也可能有良好的收入机会。",
      },
      {
        de: "Nicht alle Eltern sind bereit, ihren Kindern das Studium zu finanzieren.",
        zh: "并非所有父母都愿意为孩子的学业提供资金支持。",
      },
    ],
  },
  {
    id: "gruenflaechen",
    title: "Grünflächen",
    titleZh: "城市绿地",
    group: "2025.07",
    note: "选项 A–J，其中 F 和 J 是这套卷的干扰项。没有原文，先分清每句在说什么。序号只对这一套笔记有效，不要死记。",
    cards: [
      {
        usedAs: 4,
        de: "Gemeinschaftsgärten können auch zu pädagogischen Zwecken eingesetzt werden.",
        zh: "社区花园也可以用于教育目的。",
      },
      {
        usedAs: 8,
        de: "Städtische Grünflächen sind oft kein Musterbeispiel an Sauberkeit.",
        zh: "城市绿地往往不是清洁卫生的典范。",
      },
      {
        usedAs: 3,
        de: "Gemeinschaftsgärten stärken den Zusammenhalt im Stadtviertel.",
        zh: "社区花园能够增强社区居民之间的凝聚力。",
      },
      {
        usedAs: 1,
        de: "Eine Stadt bietet mehr unkonventionelle Möglichkeiten, Grünflächen zu schaffen, als gedacht.",
        zh: "一座城市提供了比人们想象中更多的非传统方式来创造绿地。",
      },
      {
        usedAs: 5,
        de: "Die Begrünung von Städten hat positive Auswirkungen auf das Stadtklima.",
        zh: "城市绿化对城市气候有积极影响。",
      },
      {
        trap: true,
        de: "Lehrgärten in Bildungseinrichtungen sind zu kostenintensiv.",
        zh: "教育机构里的教学花园成本过高。干扰项。",
      },
      {
        usedAs: 2,
        de: "Städte sind keine gute Umgebung für den Anbau von Gemüse.",
        zh: "城市并不是种植蔬菜的理想环境。",
      },
      {
        usedAs: 6,
        de: "Das Dach über dem Kopf ist wichtiger als die selbstgezogene Möhre in der Hand.",
        zh: "有一个遮风挡雨的住处，比手里自己种的胡萝卜更重要。",
      },
      {
        usedAs: 7,
        de: "Grünflächen wirken sich positiv auf die psychische Gesundheit aus.",
        zh: "绿地对心理健康有积极作用。",
      },
      {
        trap: true,
        de: "Projekte für mehr Grünflächen stoßen auf Widerstand bei Politikern.",
        zh: "增加绿地的项目会遭到政客的反对。干扰项。",
      },
    ],
  },
  {
    id: "nebenjob",
    title: "Nebenjob",
    titleZh: "兼职",
    group: "2025.07",
    note: "选项 A–J。D 和 E 是干扰项。C 在笔记里后半句缺失，做的时候按已有信息理解。",
    cards: [
      {
        usedAs: 8,
        de: "Nebenjobs können sich positiv auf den Lernerfolg auswirken.",
        zh: "兼职工作可以对学习成绩产生积极影响。",
      },
      {
        usedAs: 5,
        de: "Um seine Freizeit genießen zu können, braucht man ausreichend finanzielle Mittel.",
        zh: "想要享受闲暇时间，需要有足够的经济条件。",
      },
      {
        usedAs: 2,
        de: "Wenn man dauerhaft neben dem Studium arbeitet, könnten Stress und Leistungsdruck zunehmen.",
        zh: "如果在学习期间长期兼职，压力和成绩负担可能会增加。笔记原文在这里中断。",
      },
      {
        trap: true,
        de: "Wer nebenbei arbeitet, kann sich nicht genug auf das Studium konzentrieren.",
        zh: "一边打工一边学习的人，无法把足够的精力集中在学业上。干扰项。",
      },
      {
        trap: true,
        de: "Wer nicht finanziell darauf angewiesen ist, sollte neben dem Studium nicht arbeiten.",
        zh: "如果在经济上并不依赖，学习期间就不应该去兼职。干扰项。",
      },
      {
        usedAs: 3,
        de: "Wer sein Studium selbst finanziert, gewinnt Freiheit und muss seine Entscheidungen nicht vor anderen rechtfertigen.",
        zh: "自己负担学费和生活费的人会获得更多自由，也不必向他人解释自己的决定。",
      },
      {
        usedAs: 1,
        de: "Bei der Suche nach einer Arbeitsstelle kann es nützlich sein, durch Nebenjobs Praxiserfahrung gesammelt zu haben.",
        zh: "在找工作时，通过兼职积累的实践经验可能会非常有帮助。",
      },
      {
        usedAs: 6,
        de: "Man sollte einen Nebenjob während des Studiums nutzen, um Kontakte zu Unternehmen zu knüpfen.",
        zh: "学习期间应利用兼职工作来与企业建立联系。",
      },
      {
        usedAs: 7,
        de: "Es kann die Motivation für das Studium negativ beeinflussen, wenn dieses von den Eltern finanziert wird.",
        zh: "如果学习费用由父母承担，可能会对学习动力产生负面影响。",
      },
      {
        usedAs: 4,
        de: "Jobs neben dem Studium tragen dazu bei, dass man sich persönlich weiterentwickeln kann.",
        zh: "学习期间的兼职工作有助于个人的成长与发展。",
      },
    ],
  },
  {
    id: "ernaehrung",
    title: "Ernährung",
    titleZh: "饮食",
    group: "2026.03",
    note: "2026.03.20 新题。笔记给出了八句被选中的概括，没有原文，也没有写出没被选中的干扰项。",
    cards: [
      {
        de: "Es hängt auch von den eigenen finanziellen Möglichkeiten ab, ob man sich gesund ernähren kann.",
        zh: "能否实现健康饮食，也取决于个人的经济能力。",
      },
      {
        de: "Der erste Schritt zu einer gesünderen Ernährung ist es, die eigenen Gewohnheiten zu überprüfen.",
        zh: "迈向更健康饮食的第一步，是审视自己的习惯。",
      },
      {
        de: "Durch die Wahl gesunder Nahrungsmittel lässt sich die Lernfähigkeit positiv beeinflussen.",
        zh: "通过选择健康的食物，可以对学习能力产生积极影响。",
      },
      {
        de: "Wenn man die Mahlzeiten vorausplant und selbst kocht, kann man sich auch mit kleinem Geldbeutel gesund ernähren.",
        zh: "如果能提前规划饮食并亲自下厨，即使预算有限也能吃得健康。",
      },
      {
        de: "Es erfordert nicht viel Mühe, auf eine ausgewogene Ernährung zu achten.",
        zh: "注重均衡饮食并不需要费很大力气。",
      },
      {
        de: "Genuss beim Essen und ein ausgeglichenes Essverhalten schließen einander nicht aus.",
        zh: "享受美食与均衡的饮食行为并不互相排斥。",
      },
      {
        de: "Gemeinsame Mahlzeiten wirken sich positiv auf das Wohlbefinden aus.",
        zh: "共同进餐对身心健康有积极影响。",
      },
      {
        de: "Die Vorteile gesunder Ernährung wiegen den damit verbundenen Aufwand nicht auf.",
        zh: "健康饮食的好处并不足以弥补与之相关的付出。",
      },
    ],
  },
  {
    id: "hausarbeiten",
    title: "Hausarbeiten",
    titleZh: "课程论文",
    group: "2026.03",
    note: "2026.03.20 新题。八句概括，没有原文。先练一眼认出立场：支持论文、抱怨负担、还是想换成别的考核。",
    cards: [
      {
        de: "Um zu lernen, wissenschaftlich zu arbeiten, sind Hausarbeiten unverzichtbar.",
        zh: "为了学习如何进行科学研究，写论文是必不可少的。",
      },
      {
        de: "Da Studierende einen engen Zeitplan haben, verursachen Hausarbeiten unnötigen Stress.",
        zh: "由于学生的日程非常紧凑，写论文造成了不必要的压力。",
      },
      {
        de: "Der mit Hausarbeiten verbundene wissenschaftliche Anspruch überfordert Studierende.",
        zh: "写论文所涉及的学术要求让学生们感到不堪重负。",
      },
      {
        de: "Dozenten sollten sich mehr Zeit nehmen, um die Hausarbeiten mit den Studierenden zu besprechen.",
        zh: "讲师们应该抽出更多时间，与学生讨论他们的论文。",
      },
      {
        de: "Auch für Lehrkräfte stellen Hausarbeiten eine Belastung dar.",
        zh: "对于教师而言，论文同样是一种负担。",
      },
      {
        de: "Die Studiengänge sollten so gestaltet werden, dass die Studierenden mehr Zeit für Hausarbeiten haben.",
        zh: "课程设置应该优化，使学生有更多时间来完成论文。",
      },
      {
        de: "Wissenschaftliche Hausarbeiten sollten durch beruflich relevante Schreibübungen ersetzt werden.",
        zh: "学术论文应当由与职业相关的写作练习来取代。",
      },
      {
        de: "Da Hausarbeiten Betrugsversuche ermöglichen, sollte man auf andere Leistungsnachweise ausweichen.",
        zh: "由于论文存在作弊的可能，应当改用其他形式的成绩证明。",
      },
    ],
  },
  {
    id: "mode",
    title: "Mode und Trends",
    titleZh: "时尚与潮流",
    group: "2026.05",
    note: "2026.05.14 新题。笔记标明暂无答案，也没有中文。这里做成德文精读：先自己说出这句的立场，再翻面看提示。",
    cards: [
      {
        de: "Für mich ist Mode nicht nur eine Frage des Geschmacks, sondern auch eine Möglichkeit, meine Persönlichkeit und meine Stimmung nach außen zu zeigen.",
        zh: "立场：衣服是在表达个性和心情，不只是审美。",
      },
      {
        de: "Ich kaufe neue Kleidung eigentlich nur dann, wenn meine alten Sachen wirklich nicht mehr tragbar sind oder ersetzt werden müssen.",
        zh: "立场：不追新，旧的不能穿了才买。",
      },
      {
        de: "In letzter Zeit interessiere ich mich immer stärker für nachhaltige Mode und achte darauf, dass Kleidung unter fairen Bedingungen produziert wird.",
        zh: "立场：越来越在意可持续和公平生产。",
      },
      {
        de: "Ich orientiere mich häufig an aktuellen Trends, die ich in sozialen Netzwerken oder auf Modeblogs sehe.",
        zh: "立场：经常跟着社交媒体和时尚博客的潮流走。",
      },
      {
        de: "Mir ist Markenkleidung durchaus wichtig, weil ich den Eindruck habe, dass sie oft besser verarbeitet ist und länger hält.",
        zh: "立场：看重品牌，因为觉得做工更好、更耐穿。",
      },
      {
        de: "Viele meiner Kleidungsstücke bestelle ich inzwischen im Internet, weil die Auswahl dort deutlich größer ist als in den meisten Geschäften.",
        zh: "立场：网购为主，因为选择比实体店多。",
      },
      {
        de: "Beim Kauf von Kleidung spielt für mich vor allem der Komfort eine Rolle – sie muss praktisch sein und gut sitzen.",
        zh: "立场：舒适、实用、合身比别的都重要。",
      },
      {
        de: "Manchmal tausche ich Kleidung mit Freunden oder Bekannten, statt mir immer wieder neue Sachen zu kaufen.",
        zh: "立场：和朋友换着穿，而不是不停买新的。",
      },
      {
        de: "Da ich beruflich in der Modebranche tätig bin, beschäftige ich mich auch in meiner Freizeit viel mit aktuellen Kollektionen und Trends.",
        zh: "立场：因为职业就在时尚行业，业余也研究系列和潮流。",
      },
      {
        de: "Ich habe oft den Eindruck, dass viele Menschen viel zu viel Geld für Kleidung ausgeben, die sie am Ende kaum tragen.",
        zh: "立场：觉得很多人在几乎不穿的衣服上花了太多钱。",
      },
    ],
  },
  {
    id: "nebenjob-institut",
    title: "Nebenjobs im Studium",
    titleZh: "学业中的兼职",
    group: "2026.05",
    note: "2026.05.14 新题，卷面题号 47–54。笔记有选项和字母答案，但没有说话人原文，所以不能做匹配计分。E 和 J 在这套里没有被选中。",
    cards: [
      {
        usedAs: 49,
        de: "Durch die Tätigkeit am Institut lassen sich wertvolle Kontakte innerhalb der Fakultät knüpfen.",
        zh: "在研究所工作，可以在学院内部建立有价值的联系。",
      },
      {
        usedAs: 48,
        de: "Ein zügiger Studienabschluss hat oberste Priorität, weshalb auf eine Erwerbstätigkeit verzichtet wird.",
        zh: "尽快完成学业是第一位的，因此放弃打工。",
      },
      {
        usedAs: 50,
        de: "Die Doppelbelastung führt dazu, dass die akademischen Leistungen deutlich nachlassen.",
        zh: "双重负担导致学业成绩明显下降。",
      },
      {
        usedAs: 52,
        de: "Die Nebentätigkeit bietet einen willkommenen Ausgleich zur geistigen Anstrengung an der Uni.",
        zh: "兼职是对大学里脑力消耗的一种愉快调剂。",
      },
      {
        trap: true,
        de: "Ohne den Nebenjob wäre die Finanzierung des Lebensunterhalts in einer teuren Stadt unmöglich.",
        zh: "没有兼职，就不可能在昂贵的城市维持生活。这套卷里未被选中。",
      },
      {
        usedAs: 51,
        de: "Die Freiheit, die Arbeitszeiten flexibel an den Stundenplan anzupassen, ist besonders wichtig.",
        zh: "能够把工作时间灵活调到课表上，这一点特别重要。",
      },
      {
        usedAs: 47,
        de: "Jobs im Dienstleistungssektor fördern maßgeblich die kommunikativen Kompetenzen.",
        zh: "服务业的工作能显著提升沟通能力。",
      },
      {
        usedAs: 53,
        de: "Praktische Erfahrungen im angestrebten Berufsfeld werden höher bewertet als reine Theorie.",
        zh: "目标职业领域的实践经验，比纯理论更受看重。",
      },
      {
        usedAs: 54,
        de: "Aufgrund der zeitlichen Beanspruchung durch den Job kommt das Privatleben zu kurz.",
        zh: "由于工作占用时间，私人生活被挤掉了。",
      },
      {
        trap: true,
        de: "Die unzureichende Vergütung steht in keinem Verhältnis zum hohen Arbeitsaufwand.",
        zh: "报酬太低，和很高的工作量完全不成比例。这套卷里未被选中。",
      },
    ],
  },
];
