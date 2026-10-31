/* Public-facing lab copy adapted from the supplied project document.
   No signed pages, budget, personal contacts, or internal approval records belong here. */
(() => {
  const pair=(en,zh)=>({en,zh});
  const overview=pair(
    'Business Artificial Intelligence Lab at City University of Hong Kong (Dongguan) connects research, education, industry, and practical application. Drawing on the complementary strengths of the Hong Kong and Dongguan campuses, the lab brings generative AI and multi-agent systems together with causal inference and design science to address real business and societal questions.',
    '商业人工智能实验室位于香港城市大学（东莞），以“产学研用”深度融合为发展理念，发挥香港与东莞双校区的资源互补优势。实验室将生成式人工智能、多智能体协同系统与因果推断、设计科学等方法结合，围绕现实商业与社会问题开展跨学科研究、教学与应用探索。');
  Object.assign(window.LAB_CONTENT.en,{
    labName:'Business Artificial Intelligence Lab',institutionLabel:'BUSINESS ARTIFICIAL INTELLIGENCE LAB',
    siteDemo:'WEBSITE · CONTENT IN PROGRESS',demoNotice:'Lab and team information has been updated. Items still marked “sample” remain fictional and to be revised. Forms are local demonstrations and do not send submissions.',reviewExamples:'Explore the team ↓',
    heroDescription:'Connecting generative AI, multi-agent systems, and management research to address real business questions.',
    aboutBody:overview.en,aboutNote:'Based on the lab project plan. Research objectives and expected outputs describe the programme, not completed results.',
    aboutLead:'Research. Education. Industry. Application.',
    researchIntro:'Four core directions from the lab project plan.\nFrom organizational collaboration to public infrastructure.',
    researchBadge:'PROJECT RESEARCH DIRECTION',dialogEyebrow:'PROJECT RESEARCH DIRECTION',dialogNote:'This direction is part of the lab research programme. Research questions and expected applications are not claims of completed findings.',
    peopleIntro:'Four members connecting information systems, business research, and AI.',
    peopleNotice:'Faculty profiles draw on their university pages. The research-assistant profile and portrait were supplied by the team.',
    profileDemo:'OUR TEAM',profileAction:'View profile',mockPerson:'',profileDetails:'Research interests',
    profileDisclaimer:'Faculty information is linked to university profiles; research-assistant information was supplied by the team. Sample papers elsewhere on this site are not attributed to these members.',
    portrait:'TEAM PORTRAIT',campusCaption:'CityUHK (Dongguan) · Campus photograph',imageAlt:'Photograph of the City University of Hong Kong (Dongguan) campus',
    footerNote:'Lab website · Remaining sample content is marked for revision',
    resourcesIntro:'Research resources, working-paper examples, and academic exchange.\nUnconfirmed items remain clearly marked as samples.',
    contactNotice:'The university location is real. Lab email, office, and visiting arrangements remain to be confirmed; the entries below are placeholders.'
  });
  Object.assign(window.LAB_CONTENT.zh,{
    labName:'商业人工智能实验室',institutionLabel:'BUSINESS ARTIFICIAL INTELLIGENCE LAB',
    siteDemo:'网站内容持续完善',demoNotice:'实验室与团队资料已更新；仍标注“示例”的论文、活动等内容为模拟资料，待修改。表单仅作本地演示，不会实际发送。',reviewExamples:'认识研究团队 ↓',
    heroDescription:'连接生成式 AI、多智能体与管理学研究，回应真实的商业问题。',
    aboutBody:overview.zh,aboutNote:'根据实验室项目资料整理。研究目标与预期产出属于计划，不代表已完成的成果。',
    aboutLead:'以产学研用融合，连接研究与实践。',
    researchIntro:'立项研究计划中的四个核心方向。\n从组织协作，到公共基础设施。',
    researchBadge:'项目研究方向',dialogEyebrow:'项目研究方向',dialogNote:'此方向来自实验室研究计划，研究问题与预期应用不代表已完成的研究结论。',
    peopleIntro:'四位成员，连接信息系统、商业研究与人工智能。',
    peopleNotice:'教师介绍参考校方个人主页；研究助理的简介与照片由团队提供。',
    profileDemo:'研究团队',profileAction:'查看个人简介',mockPerson:'',profileDetails:'研究方向',
    profileDisclaimer:'教师资料附校方个人主页，研究助理资料由团队提供。本站其他栏目中的模拟论文不属于这些成员的真实成果。',
    portrait:'团队成员照片',campusCaption:'香港城市大学（东莞）· 校园实景',imageAlt:'香港城市大学（东莞）校园实景照片',
    footerNote:'实验室网站 · 尚未确认的示例资料均标注待修改',
    resourcesIntro:'研究资源、工作论文示例与学术交流。\n未确认的条目继续明确标注为模拟内容。',
    contactNotice:'大学校址为真实信息；实验室邮箱、办公室和接待安排仍待确认，以下保留占位标记。'
  });
  window.LAB_DEMO.people=[
    {id:'chong-alex-wang',initials:'CW',tone:'rose',confirmed:true,groups:['management','faculty'],photo:'assets/people/chong-alex-wang.jpg',sourceUrl:'https://scholars.cityu.edu.hk/en/persons/chonwang/',sourceLabel:pair('University profile','校方个人主页'),
      en:{name:'Chong Alex Wang',role:'Principal Investigator · Professor',affiliation:'Department of Information Systems, City University of Hong Kong',focus:'Economics of IS · Digital platforms · Financial technology',bio:'Professor and Head of the Department of Information Systems at City University of Hong Kong. His research examines the economic and social impacts of information technologies and innovation. He is the principal investigator of the lab project.',points:['Economics of information systems','Online social networks and crowdsourcing','Financial technology','Privacy in online social networks']},
      zh:{name:'王翀',role:'项目负责人 · 教授',affiliation:'香港城市大学商学院资讯系统学系',focus:'信息系统经济学 · 数字平台 · 金融科技',bio:'香港城市大学商学院资讯系统学系教授、系主任，研究信息技术与创新的经济及社会影响，担任商业人工智能实验室项目负责人。',points:['信息系统经济学','在线社交网络与众包','金融科技','在线社交网络隐私']}},
    {id:'le-wang',initials:'LW',tone:'sage',confirmed:true,groups:['faculty'],photo:'assets/people/le-wang.jpg',sourceUrl:'https://www.cb.cityu.edu.hk/people/faculty-directory/people-details?eid=lwang595',sourceLabel:pair('University profile','校方个人主页'),
      en:{name:'Le Wang',role:'Assistant Professor',affiliation:'Department of Information Systems, City University of Hong Kong',focus:'Healthcare IT · Digital platforms · Artificial intelligence',bio:'Assistant Professor in the Department of Information Systems at City University of Hong Kong. His research spans health informatics, AI applications in business, and user behaviour on digital platforms, with a focus on individual behaviour in the age of AI.',points:['Healthcare IT','Digital platforms','Artificial intelligence and individual behaviour']},
      zh:{name:'王乐',role:'助理教授',affiliation:'香港城市大学资讯系统学系',focus:'健康信息技术 · 数字平台 · 人工智能',bio:'香港城市大学资讯系统学系助理教授，研究健康信息技术、人工智能的商业应用及数字平台上的用户行为，关注人工智能时代的个体行为。',points:['健康信息技术','数字平台','人工智能与个体行为']}},
    {id:'xinyan-yao',initials:'XY',tone:'sand',confirmed:true,groups:['faculty'],photo:'assets/people/xinyan-yao.jpg',sourceUrl:'https://faculty.cityu-dg.edu.cn/?lang=zh&alphabet=Y',sourceLabel:pair('University faculty directory','校方教师目录'),extraSourceUrl:'https://cityudg.globalimpact.cn/en/persons/xinyan-yao/',
      en:{name:'Xinyan Yao',role:'Assistant Professor',affiliation:'City University of Hong Kong (Dongguan)',focus:'Social interaction · Online platforms · Human–computer interaction',bio:'Assistant Professor at City University of Hong Kong (Dongguan). Her research focuses on social interaction and user engagement, online platforms, and human–computer interaction.',points:['Social interaction and user engagement','Online platforms','Human–computer interaction']},
      zh:{name:'姚昕言',role:'助理教授',affiliation:'香港城市大学（东莞）',focus:'社交互动 · 在线平台 · 人机互动',bio:'香港城市大学（东莞）助理教授，研究社交互动与用户参与、在线平台及人机互动。',points:['社交互动与用户参与','在线平台','人机互动']}},
    {id:'shiqing-huang',initials:'SH',tone:'lilac',confirmed:true,groups:['associates','students'],photo:'assets/people/shiqing-huang.png',sourceLabel:pair('Profile and portrait supplied by the team','简介与照片由团队提供'),
      en:{name:'Shiqing Huang',role:'Research Assistant · Doctoral Student',affiliation:'Joint doctoral training: Renmin University of China and City University of Hong Kong',focus:'AI disclosure',bio:'Research assistant and current doctoral student jointly trained by Renmin University of China and City University of Hong Kong. Her research focuses on AI disclosure.',points:['AI disclosure']},
      zh:{name:'黄诗晴',role:'研究助理 · 博士研究生',affiliation:'中国人民大学与香港城市大学联合培养博士研究生（在读）',focus:'AI 披露',bio:'研究助理，中国人民大学与香港城市大学联合培养博士研究生在读，研究方向为 AI 披露。',points:['AI 披露']}}
  ];
  const directions=[
    {id:'transformation',homeId:'organizations',art:'organizations',category:'people',theme:0,
      title:pair('Human–AI Collaboration & Multi-agent Innovation','组织人机协作与多智能体创新'),
      description:pair('Study talent development, knowledge transfer, cognitive workload, and the organizational consequences of generative AI and multi-agent systems.','探索生成式 AI 如何支持人才培养、知识传承与认知负荷分配，以及多智能体系统如何影响组织与战略。'),
      questions:pair(['How can generative AI make tacit knowledge explicit and support knowledge transfer?','How does AI change peer pressure, promotion, and organizational structure?','Where are the limits of multi-agent systems in research ideation and strategy simulation?'],['生成式 AI 如何促进隐性知识显性化与跨代际知识传承？','AI 如何改变同侪压力、晋升机制与组织结构？','多智能体在科研构思与企业战略推演中的应用边界是什么？']),
      applications:pair(['Talent development and knowledge-transfer tools','Human–AI task and cognitive-workload design','Multi-agent prototypes for research and strategy'],['人才培养与知识传承工具','人机协作任务与认知负荷设计','科研与战略推演多智能体原型'])},
    {id:'agents',homeId:'marketing',art:'collaboration',category:'business',theme:1,
      title:pair('Intelligent Marketing & Platform Disclosure','智能营销与平台信息披露'),
      description:pair('Connect digital consumer journeys, demand discovery, and lifetime value with research on AI disclosure, trust, and platform incentives.','结合数字消费轨迹、需求挖掘与生命周期价值预测，研究 AI 信息披露、消费者信任与平台激励机制。'),
      questions:pair(['How do algorithmic transparency and AI disclosure affect consumer trust?','How does disclosure influence power and dependence on platforms?','How can incentive-compatible mechanisms improve two-sided markets?'],['算法透明度与 AI 信息披露如何影响消费者信任？','信息披露如何改变平台中的权力与依赖关系？','如何设计激励相容机制以改善双边市场效用？']),
      applications:pair(['Consumer demand and lifetime-value modelling','Online–offline marketing research','Disclosure and incentive-design studies'],['消费者需求与生命周期价值建模','线上线下融合营销研究','信息披露与激励机制研究'])},
    {id:'implementation',homeId:'finance',art:'decisions',category:'business',theme:2,
      title:pair('Smart Finance & Alternative Data','智慧金融与另类数据价值发掘'),
      description:pair('Investigate large-model methods, quantitative strategies, and alternative data for financial prediction and interactive investment support.','探索大模型、量化策略与另类数据在金融预测和交互式智能投资支持中的应用价值。'),
      questions:pair(['What information do hiring demand and venture-capital networks add to prediction?','How can deep learning use unstructured data to study startup success?','How can interactive systems understand investor needs and risk preferences?'],['企业招聘需求与风险投资网络为预测提供哪些增量信息？','深度学习如何利用非结构化数据研究初创企业成功率？','交互式系统如何理解用户需求与风险偏好？']),
      applications:pair(['Alternative-data modelling','Interactive investment-support prototypes','Startup and asset-performance research'],['另类数据建模','交互式投资支持原型','初创企业与资产表现研究'])},
    {id:'future-work',homeId:'transport',art:'responsibility',category:'business',theme:0,
      title:pair('Smart Transportation & Public Infrastructure','智慧交通与公共基础设施效能'),
      description:pair('Study infrastructure planning, conversational traffic control, dynamic routing, and incentives that improve system efficiency and worker outcomes.','研究基础设施规划、对话式交通管控、动态路径规划，以及提升系统效率与劳动者福祉的激励机制。'),
      questions:pair(['How should transit stops, charging networks, and logistics facilities be planned?','How can conversational systems support traffic control and dynamic routing?','How do infrastructure upgrades affect worker safety and digital reputation?'],['如何规划公交站点、充电网络与物流配送设施？','对话式系统如何支持交通管控与动态路径规划？','基础设施升级如何影响劳动者安全与数字声誉？']),
      applications:pair(['Long-term public-infrastructure planning','Conversational traffic-management prototypes','Mobility incentives and gig-economy studies'],['公共基础设施长期规划','对话式交通管理原型','出行激励与零工经济研究'])}
  ];
  window.LAB_PROJECT={
    title:pair('Business Artificial Intelligence Lab','商业人工智能实验室'),overview,
    period:pair('1 September 2026 – 1 September 2032','2026 年 9 月 1 日至 2032 年 9 月 1 日'),
    objective:pair('Understand how mechanism design and AI-enabled technologies reshape organizational efficiency, marketing, financial decisions, and public infrastructure in complex business and social systems.','理解机制设计与数智化技术如何在复杂商业和社会系统中重塑组织效率、市场营销、金融决策与公共基础设施管理。'),
    methods:pair('Combine generative AI and multi-agent systems with causal inference, design science, and economic and management research.','将生成式 AI、多智能体协同系统与因果推断、设计科学及经济管理研究方法结合。'),
    outcomes:pair(['Peer-reviewed research and conference exchange','Conversational traffic control, interactive investment support, and multi-agent research prototypes','Intellectual-property development and industry collaboration','Practical projects for business analytics education and doctoral research'],['同行评议研究与学术会议交流','对话式交通管控、交互式投资支持和多智能体研究原型','知识产权开发与产业合作','商业分析教学实践与博士研究培养']),
    directions
  };
  window.LAB_RESEARCH=directions.map(d=>({id:d.homeId,category:d.category,art:d.art,confirmed:true,...Object.fromEntries(['en','zh'].map(lang=>[lang,{title:d.title[lang],summary:d.description[lang],description:d.description[lang],questions:d.questions[lang]}]))}));
  window.LAB_AGENDA=[...directions.map(d=>({...d,kind:'core'})),
    {id:'human-ai',kind:'support',theme:1,title:pair('Research Methods & Talent Development','研究方法与人才培养'),description:pair('Connect causal inference and design science with AI prototyping, business analytics education, and doctoral research.','连接因果推断、设计科学与 AI 原型，支持商业分析教育与博士研究。'),questions:pair(['How can observational data support credible causal inference?','How can design-science prototypes address business questions?','How can research projects support interdisciplinary education?'],['如何利用观察数据进行可信的因果推断？','设计科学原型如何回应商业问题？','研究项目如何支持跨学科人才培养？']),applications:pair(['Causal research designs','Design-science prototypes','Business analytics and doctoral training'],['因果研究设计','设计科学原型','商业分析与博士生培养'])},
    {id:'responsible-ai',kind:'support',theme:2,title:pair('AI Disclosure & Platform Governance','AI 披露与平台治理'),description:pair('A focus within the marketing and platform-disclosure direction, examining transparency, trust, and incentive design.','智能营销与平台信息披露方向下的专题，关注透明度、信任与激励设计。'),questions:pair(['What should users know about the role of AI?','When does disclosure strengthen or weaken trust?','How can platform incentives account for disclosure?'],['用户需要了解哪些 AI 使用信息？','披露在什么情况下增强或削弱信任？','平台激励设计如何纳入披露机制？']),applications:pair(['AI-disclosure study designs','Consumer-trust research','Platform incentive analysis'],['AI 披露研究设计','消费者信任研究','平台激励分析'])}
  ];
})();
