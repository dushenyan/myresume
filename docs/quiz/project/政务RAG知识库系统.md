---
matchName: 政务 RAG 知识库系统
title: 政务 RAG 知识库系统（GraphRAG 智能底座）
stack: Python | FastAPI | Elasticsearch | Neo4j | Sentence-Transformers | bge-reranker | RAGAS
---

## 预测押题

- 为什么政务政策场景纯向量 RAG 不行？GraphRAG 的多跳推理入口具体指什么？
  @frame: 54c10164-8250-4027-a9f1-f2cc73f5807b
- MySQL + Elasticsearch + Neo4j 三存储异构架构，每份数据存几份？一致性怎么保证？
  @frame: 84b607ef-b5da-4a9c-96af-828c20500823
- 图谱构建的实体关系从哪来？政策文件更新后图谱怎么增量维护？
  @frame: dad48108-9e62-4fe1-89f9-29b49d5c3999
- 两阶段检索「召回求快、精排求准」具体怎么分工？bge-reranker 交叉编码为什么慢？
  @frame: 5e455a98-9dcd-4505-af45-1c78b8f19f93
- Rerank 引入时机的业务权衡是什么？哪些场景你明确决定不用精排？
  @frame: ede25027-d9c6-4e93-80d4-2cb3f48e9849
- 重叠分块的重叠窗口怎么定？分块策略迭代靠什么指标驱动？
  @frame: f6fda3ac-a30d-41dc-ba5e-8edc1f3b82a0
- RAGAS 的 faithfulness / answer relevancy / context precision 分别衡量什么？评估集怎么构建？
  @frame: 898a6416-1f46-4bf5-bc39-8d02256ef31c
- Top-5 召回率 71% 到 93%，主要贡献来自哪几个改动？怎么归因？
  @frame: 12d8fe48-68a4-4617-accf-a4610e805084
- 回答如何溯源到政策原文与图表？Chunk 元数据里持久化了什么？
  @frame: e3b8f1ea-2fea-40ed-ac3d-b972055dead0
- embedding / rerank 模型为什么模块级单例？私有化部署算力受限怎么办（vLLM/XInference）？
  @frame: fa79824f-7b20-478b-9b02-5acb2f221ad0

- pdfplumber 解析政务 PDF 的原理是什么？它拿到的文本是带结构的吗？
  @frame: 892db45e-120c-4140-8ab0-4d594101a029
- 政策 PDF 常见的双栏排版、页眉页脚会怎么坑人？你怎么恢复阅读顺序？
  @frame: f7121aaf-8ebf-484d-9ffc-50c6424c6ca5
- 一个条款跨页被腰斩，这种块怎么处理？
  @frame: e67027a5-87b6-4846-ad01-1ae82aa4b2da
- 扫描版带印章水印的政务文件怎么办？你处理过哪类？
  @frame: 98a3f46b-cc5d-4911-b7d2-b3e3281678a1
- 政策文件里的表格是检索重灾区，你是怎么处理的？
  @frame: 312e33ca-3e19-4b73-94ea-df01b38cb69f
- 表格转文本喂给 embedding，有哪几种写法？各自的取舍是什么？
  @frame: a5535b2c-6036-4782-995f-82cb2410b67b
- 政务统计图表（柱状图折线图）本身的信息怎么进检索链路？
  @frame: 986030d1-f14d-46ef-8e9b-a15a9caece9c
- 为什么按固定字符数切分政策文书不行？
  @frame: e9bb8d8d-c167-4171-89ac-8d2797ca9829
- 按标题/条款编号结构化切块的前提是什么？编号体系不规范怎么办？
  @frame: 0ed0df63-16b0-4626-978d-92ec1011d4d4
- chunk 尺寸多大？太大和太小分别坏在哪个环节？
  @frame: 9dfc2a0f-d38b-48a5-90a5-8d3063da47e9
- 一条答案的证据被切进了两个 chunk，向量各自都不够相关，这种问题怎么治？
  @frame: 212142e7-ee3c-471b-909a-6f6876746a8a
- Chunk 的元数据里除了页码和图表路径还存了什么？各服务什么功能？
  @frame: c7e76826-563b-4e9b-bb77-359c7c3d6e6a

- embedding 模型用的什么？为什么选 bge-small-zh？
  @frame: a3f6682f-d932-4394-80f9-597bbd73ef6c
- 句向量是怎么算出来的？Bi-Encoder 和 Cross-Encoder 的根本区别在哪？
  @frame: 7c0a3a0e-ba23-41e3-a10b-ca03b6633923
- 余弦、内积、L2 距离三种相似度什么区别？你们统一用哪种？
  @frame: 68fa4394-75aa-4529-bad7-5ad6b61b9b8d
- 五百万级向量在 ES 里检索，用精确 KNN 还是 ANN？判断依据是什么？
  @answer: ffc6ef4c/ans.md
  @frame: ffc6ef4c-be12-482a-ad8f-7d3f2b31019a
- HNSW 的原理一句话讲清？索引参数里哪个决定内存占用？
  @frame: 5a2f9d2d-4264-487c-8bda-8fcbbae37b20
- 1024 维 float32 向量一条占多少内存？量化能省什么、损失什么？
  @frame: c69f97a6-e041-4bc4-a257-a43299465260
- 向量模型要换代（更好的新模型），存量向量全部失效，迁移方案怎么做？
  @frame: dc2f03e3-4f17-4a94-8e1c-a4afe5ee5f13
- bge 这类模型对查询要加指令前缀是什么？忘了加会怎样？
  @frame: 8cfefc12-f97c-4b03-963a-35dc4ded117b
- 政务领域词（「一件事一次办」「帮办代办」）通用 embedding 理解不准，怎么办？
  @frame: e2deaaa7-f99e-4adf-a72b-59db0ecd92ce
- 同一政策的「办理条件」和「办理材料」两段语义很近，向量老混淆，怎么解？
  @frame: 50b83b56-1d7e-44b4-9a05-e90c4e30dcdb

- Chroma 和 Elasticsearch 都有向量能力，你们俩都用？分工是什么？
  @frame: 0a38cfd4-9a6a-450d-93ee-6c395fc5b2ca
- 开发用 Chroma、生产用 ES，两边检索行为不一致坑过吗？怎么防漂移？
  @frame: 918154cf-90aa-4867-bcb6-1f576f01744b
- 为什么生产不干脆也用 Chroma，一套到底？
  @frame: 7c7156c8-c3b7-4887-a9f4-11aef8d66b42
- ES 的混合检索（BM25+向量）一条查询里怎么完成？融合发生在哪层？
  @frame: 46a64911-0fcf-4f2c-a828-274fc4bf7636
- 元数据过滤（生效时间、文档类型）为什么会拖慢 ANN 还降召回？
  @frame: f864cddb-d9e6-4394-987c-8a71902669cf
- 索引重建或 embedding 换代时怎么零停机切换？
  @frame: 5a050675-249e-4b17-b12f-e9be94c02bf8
- Neo4j 里的图谱 schema 怎么设计的？节点和关系各有哪些类型？
  @frame: 02fe7649-9659-4aa9-b656-21eb4fad1d1a
- 图谱查询怎么把多跳结果变成检索输入？延迟怎么控？
  @frame: 9d95e09d-8ced-41cd-85d6-c61297b902b5
- Neo4j 挂了系统会怎样？图谱是不是 optional？
  @frame: 83ba9f7b-1786-446e-904c-9e8737eec6ff
- MySQL 挂了和 ES 挂了，影响有什么不同？
  @frame: 790180ad-de3e-441f-bfd3-7e36ef94b5d7
- 三库对账任务具体对什么？发现不一致怎么处理？
  @frame: 700c3168-e38c-4391-9641-8f4575727ab9
- 图谱抽取质量怎么度量？抽错的边谁负责、怎么兜底？
  @frame: 870ad37c-e6b9-4fb1-9641-8f4575727ab9

- BM25 和向量两路分数怎么融合？权重按什么定？
  @frame: 840920db-6b92-4e44-9a90-6ca93a9069c9
- 召回每路取多少条、精排输入多少条，这两个数怎么定？
  @frame: 21d88d76-36ae-4704-81a1-0dc0edd4fea3
- bge-reranker 的 batch 推理怎么做？为什么它比 embedding 更值得批？
  @frame: d74a05fa-8d92-4542-89cf-838c7760d961
- 精排模型的 max_length 比生成模型短得多，长 chunk 被截断怎么办？
  @frame: dfc2c1a8-f59e-447f-b55a-20bcddbff4e9
- 精排后取 top 几进 prompt？这个 k 怎么定、固定好吗？
  @frame: 50f2d876-3980-4321-8bde-f76cf507ec5f
- 用户口语和公文措辞差距大，query 进检索前做什么？
  @frame: 59e4b547-ed5a-42dc-93cd-236b188395c6
- 图谱多跳召回和向量召回的结果怎么合并去重？两路分数不可比吧？
  @frame: 08ac13c5-2ff4-41e2-816e-a56ea7688020
- 检索结果缓存的 key 怎么设？知识更新后旧缓存怎么办？
  @frame: bc8b949d-6e86-48db-b42e-f3d502d12baf
- rerank 服务挂了，整条链路怎么办？
  @frame: 6b6ac4c3-ec67-422c-b497-9dc652a9f2c0
- 召回率提不上去，你怎么判断问题在索引不在 query 表达？
  @frame: 352f55a0-111d-433b-9c02-d681dd3d7829
- 扩大召回和加强精排，边际收益怎么比？什么时候该停？
  @frame: d367e766-53ab-48a1-9797-de698397fd1d
- 版本化回归时三个指标一起看，会不会互相拉扯？怎么防单指标过拟合？
  @frame: 54dbb33e-7cc7-4af9-8fe5-25e0572a81b3

- 这套系统里意图识别承担什么？不是所有问题都走 RAG 吧？
  @frame: a1ff3733-6354-48af-b114-84ab4c2f8e05
- 意图分流为什么不用 LLM 顺手判了？和之前意图识别项目的选型怎么衔接？
  @frame: 7bdf0ca0-c124-4f70-8a1c-fb3a20969025
- 多轮对话里「那个补贴怎么领」的「那个」怎么处理？
  @frame: 32506e55-1686-46fc-b0c1-289e7b2d19d9
- 会话状态存在哪？上一轮检索到的 chunk 这一轮还用重新查吗？
  @frame: 7a4904aa-26eb-4e3c-8930-c42f57a307b8
- 问题太模糊时系统会追问吗？这个度怎么把握？
  @frame: eab243b8-3c89-4888-af8a-11d3dc3e8ba5
- 生成侧的上下文窗口怎么分配？历史对话、检索 chunk、系统提示词的预算怎么算？
  @frame: df08be2e-73e7-4eac-a387-6cad5672bb7d

- 这个系统里的幻觉具体长什么样？和通用聊天机器人的幻觉有什么不同？
  @frame: 585c1eb2-3cfe-45ae-95ed-51fa9310df4e
- 检索回来的上下文不足以回答时，系统怎么办？
  @frame: 7d9b1726-fd3d-43c3-9646-5ccc923e5ed2
- 答案里的引用怎么做到可信？模型自己标的来源能信吗？
  @frame: 9d0e39e3-4436-466d-ba29-8302e312d657
- 政策修订废止频繁，怎么防「拿过期条款回答」？
  @frame: 06b3d935-6d2b-4609-9f63-7f07f86fdb2c
- 溯源到「原始政务图表」这个体验，后端和前端各做了什么？
  @frame: 3d6aaac0-4ad9-493e-9f6c-83d3252e6042
- 政策文档正文里写了「忽略上述指令」这类文本，会不会攻击你的生成链路？
  @frame: 81c835f2-bdb6-4c68-b5bb-f59f686d68d9
- 如果 faithfulness 达标但人工抽检发现答案错了，你怎么处理？
  @frame: 4070307f-8174-4ce0-aa60-4ae3d1412a37
- 政务客户为什么肯为可解释性买单？投入产出的账怎么算？
  @frame: 19cd6934-2783-4148-a37d-97cc4d981cf7

- 私有化部署的完整组件清单有哪些？哪个最难落地？
  @frame: f07f2e1a-8887-4238-a02b-6986bf56052c
- 生成大模型为什么经 XInference/vLLM 服务化，而不是 Python 进程里直接加载？
  @frame: 6478e1f2-ff36-4900-a982-4f14b208fc7f
- 模块级单例和 uvicorn 多 worker 部署是什么关系？内存账怎么算？
  @frame: bcaa9554-bf84-4fd1-8699-5315c840de30
- cuda / mps / cpu 自适应具体检测什么？纯 CPU 跑得动吗？
  @frame: 5312b593-2d8a-42fa-8f93-6bba4c089d8b
- 内网 GPU 预算紧张，embedding / rerank / 生成三类模型怎么分配资源？
  @frame: ca079496-1d01-4b13-abdd-e5cf17d5d1d0
- 端到端延迟怎么分解？流式输出对体验的意义有多大？
  @frame: 38479421-1631-4ff9-8d3e-36079c7e0406

- 评估集多大？只有几百条够吗？怎么持续扩充？
  @frame: e7282c5c-367e-46b2-a720-6e72c25a9862
- 版本化回归在什么时机触发？门禁标准怎么定？
  @frame: 142e36e1-9da3-438e-a329-5dc22994cb0d
- HITL 反馈具体回流的是什么？标注负担怎么控？
  @frame: c15ca38e-90b4-4e9b-b1e6-5b31090990aa
- 线上监控看哪些质量指标？不是只看 CPU 和 QPS 吧？
  @frame: 22c39981-bf43-4a76-ab86-2e71f5a2bff3
- 用户反馈「这个答案明明有文件却查不到」，排查 SOP 是什么？
  @frame: 844b24ae-18f6-47b0-a2db-6aba3b4fc405
- 新知识从发布到可检索的时效怎么监控？
  @frame: a768ba4d-ee1c-4e54-bf98-5f6fe697868b
- 这套系统的运行成本结构是什么？哪块最贵？
  @frame: 8a3402da-72fb-411b-93ec-7c37d6d4f171
- 重做一遍，你会最先改掉现在设计里的哪个决定？
  @frame: 7c8289b0-1f75-4016-beb3-cf1d107097d5
- 只能保一个质量抓手，保哪个？为什么？
  @frame: 86a39bc9-e846-4483-907f-ed990bc34e1e
- 面试官说「这不就是 ES+Neo4j 调库拼管道，核心竞争力在哪」，你怎么回？
  @frame: 404d7bcd-dd15-47cf-87d0-fbd518cdb085

## 项目亮点挖掘

1. **三存储异构架构**
   MySQL 业务元数据 + ES 全文向量双路 + Neo4j 实体关系图谱，图文协同检索打通跨文档隐式关联。
2. **两阶段检索 + 场景化 Rerank**
   混合召回 + bge-reranker 精排；政策答复强制精排、通用对话仅混合检索，延迟与命中率按场景平衡。
3. **RAGAS 版本化回归**
   faithfulness ≥ 0.92、Top-5 召回率 71%→93%，HITL 反馈闭环驱动分块与精排策略迭代，调优可量化可归因。
4. **可解释溯源闭环**
   pdfplumber 重叠窗口版面分块，Chunk 元数据持久化页码与关联图表路径，回答精准溯源至原始政务图表。
5. **模型服务化部署**
   模块级单例加载避免每请求重复加载数 GB 权重；XInference（vLLM 后端）服务化，cuda/mps/cpu 自适应。
