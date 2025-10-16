# English Version
## Service Overview
* DeepQ Technology's Chinese Financial Toolkit MCP Server (hereinafter referred to as DeepQ MCP) is an Chinese Financial AI toolkit designed for the securities industry.
* We provide professional financial data tools covering stocks, ETFs, funds, research reports, news, and other information.
* DeepQ MCP tools adhere to three principles for being large-language-model-friendly: natural language input/output, fast response times, and complete business logic. Services are available with just one-click configuration.

## Capabilities
The MCP provides comprehensive financial data and analytical tool support for AI large language models, specifically including the following five core data capabilities:
* *Stock Analysis*: Covers real-time quotes of individual stocks, main business operations, fundamental analysis, technical analysis, capital flow analysis, news sentiment, sector quotes, capital flow and fundamentals of sectors, and overall market index data.
* *ETF Analysis*: Includes ETF real-time quotes, performance, technical analysis, capital flow, fundamentals, news sentiment, and underlying asset data.
* *Public Funds (Mutual Funds)*: Covers public fund performance, technical analysis, capital flow, fundamentals, news sentiment, underlying assets, and fund manager insights.
* *News & Information*: Includes data from official securities media, primary and secondary self-media in securities, broker research reports, market hot topics, and unusual activity alerts for stocks/ETFs/sectors.
* *General Tools*: Utility tools for getting the current date, determining trading days, standardizing stock codes, standardizing fund codes, and parsing financial entities.

## Tool List
The MCP tools have been officially released, with over 40 tools available for use. If you have requests for other tools, please feel free to contact us.

| **Tool Category**             | **Tool Name**                       | **Description**                                                                                                                                                                                                                                              | **Example Query**                                                                      |
|-------------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| A-Share Stock Analysis        | stockBizHighlight                   | Gets the main business operations, belonging industry/themes, and core highlights of a stock.                                                                                                                                                                | What are the main businesses of Moutai and CATL respectively?                          |
|                               | stockTechAnalysis                   | Gets technical indicators like KDJ, BOLL, MACD for a stock, along with a technical summary and trend analysis.                                                                                                                                               | How is the technical picture for CATL?                                                 |
|                               | stockCapAnalysis         | Gets capital flow data for a stock, including main fund flows, dragon-tiger list data, and margin trading data.                                                                                                                                              | What was the main fund inflow for Moutai today?                                        |
|                               | stockFunAnalysis           | Gets fundamental data for a stock, including PE, PB, ROE, gross margin, net profit margin, and company financials.                                                                                                                                           | What is the recent P/E ratio of CATL?                                                  |
|                               | stockRep                  | Gets the latest 3 research report insights for a stock from the past 90 days (3 months).                                                                                                                                                                     | The latest research reports on Wuliangye                                               |
|                               | stockLatestPrice          | Gets the latest market data for a stock, including price, change percentage, and trading volume.                                                                                                                                                             | What are the current latest prices for Moutai and CATL?                                |
|                               | guessStockCode            | Parses common names or nicknames of stocks mentioned in daily conversation into standard stock codes, names, and trading markets (SH: Shanghai; SZ: Shenzhen; BJ: Beijing; NQ: New Third Board; US: US stocks; HK: Hong Kong stocks).                        | What are the current latest prices for Moutai and CATL?                                |
|                               | stockRiskWarning          | Gets potential risk information for a stock.                                                                                                                                                                                                                 | Guoxuan High-Tech's stock price has been volatile recently, help me screen for risks.  |
|                               | stockFlexibility          | Gets the elasticity of a stock's price reaction to external events.                                                                                                                                                                                          | How elastic is Guoxuan High-Tech's stock price?                                        |
|                               | stockValuation             | Gets valuation data for a stock, such as PE, PB, ROE, gross margin, net profit margin, and the industry P/E ratio of its sector.                                                                                                                             | Is Guoxuan High-Tech's current valuation reasonable?                                   |
| A-Share Market Index Analysis | mktForwardLook            | Gets the outlook for the A-share market indices on a specified date.                                                                                                                                                                                         | How is the A-share market likely to perform going forward?                             |
|                               | aShareFearGreedIndex      | Short-term fear and greed sentiment index for the A-share market.                                                                                                                                                                                            | What is the current level of short-term fear and greed sentiment in the A-share market? |
|                               | aShareTemperature        | A gauge of the current 'temperature' of the A-share market.                                                                                                                                                                                                  | What is the current temperature of the A-share market?                                 |
|                               | aShareMarketQuotes        | Gets the quotes for major A-share indices (e.g., Shanghai Composite, Shenzhen Component, ChiNext, STAR Market, Beijing Exchange Index, Hang Seng Index) on a specified date.                                                                                 | How did the major market indices perform today?                                        |
| A-Share Sector Analysis       | sectorCapAnalysis        | Gets capital flow data for conceptual or industry sectors, including main fund flows and margin trading balances.                                                                                                                                            | What was the main fund inflow into the low-altitude economy sector today?              |
|                               | sectorFunAnalysis          | Gets fundamental data for conceptual or industry sectors, such as PE, ROE, gross margin, and financial operating data.                                                                                                                                       | What are the fundamentals of the low-altitude economy sector like?                     |
|                               | sectorNewsAnalysis         | Gets news messages for a conceptual or industry sector within a specified date range.                                                                                                                                                                        | Any recent news about the low-altitude economy sector?                                 |
|                               | sectorReportAnalysis       | Gets research report insights for a conceptual or industry sector within a specified date range.                                                                                                                                                             | The latest research reports on the low-altitude economy                                |
|                               | sectortLatestPrice        | Gets the latest real-time price, change percentage, and trading volume for a conceptual or industry sector.                                                                                                                                                  | How are the low-altitude economy and chip sectors performing today?                    |
|                               | sectorRelatedStocks       | Gets the stocks influenced by an industry or conceptual sector and the reasons for correlation. Stocks can be sorted by price change, market cap, or conceptual relevance.                                                                                   | Which are the leading stocks in the Apple concept sector?                              |
|                               | sectorPriceChangeRank    | Ranks the sectors with the highest price increases or decreases over a specified date range, providing related news.                                                                                                                                         | Which are the top 10 sectors by gain today?                                            |
|                               | sectorPriceChangeReason | Queries the performance of a sector over a date range and provides attributing news.                                                                                                                                                                         | What was the gain for the innovative drug sector over the past month?                  |
| ETF Analysis & Diagnostics  | etfBasicInfo             | Gets key basic information and interpretation for an ETF, such as fund size, fee rate, and tracking error.                                                                                                                                                   | What is the total expense ratio of the DaCheng Nonferrous Metals Futures ETF?          |
|                               | etfFunAnalysis         | Gets key valuation and fundamental data for an ETF, such as P/E ratio, P/E percentile, P/B ratio, P/B percentile, dividend yield, and ROE.                                                                                                                   | How is the valuation of the CSI 300 ETF?                                               |
|                               | etfPerformance           | Gets performance metrics for an ETF fund over the past 1 year, 3 years, year-to-date, and since inception, including return rate, annualized return, annualized volatility, Sharpe ratio, maximum drawdown, annualized excess return, and information ratio. | How has the performance of the CSI A500 E Fund ETF been this year?                     |
|                               | etfUnderAssets           | Gets the ETF's heavily weighted sectors, heavily weighted stocks, and heavily weighted bonds.                                                                                                                                                                | What are the top holdings of the CSI A500 E Fund ETF?                                                                    |
|                               | etfLatestPrice           | Gets real-time quotes for an ETF fund, including latest size, fee rate, tracking error, and other key basic data.                                                                                                                                            | How much did the Healthcare ETF rise today?                                                                           |
|                               | etfTechAnalysis           | Gets key technical data and interpretation for an ETF fund, such as moving averages and MACD.                                                                                                                                                                | How is the technical picture for the CSI 300 ETF?                                                               |
|                               | etfRelatedNews            | Gets recent relevant news and information for an ETF fund.                                                                                                                                                                                                   | Any news related to the CSI 300 ETF?                                                                      |
| Fund Analysis & Diagnostics   | fundBasicInfo             | Gets basic information for a fund, including classification, labels, managing company, and fund manager.                                                                                                                                                     | Who is the fund manager of China Merchants Quantitative Select?                                                                        |
|                               | fundPerformance             | Gets performance metrics for a fund over the past 1 year, 3 years, year-to-date, and since inception, including return rate, annualized return, annualized volatility, Sharpe ratio, maximum drawdown, annualized excess return, and information ratio.      | What is the return of China Merchants Quantitative Select over the past year?                                                                       |
|                               | fundUnderAssets           | Conducts a look-through analysis of the fund's underlying heavily weighted sectors, heavily weighted stocks, and heavily weighted bonds.                                                                                                                     | How are the top holdings of China Merchants Quantitative Select performing?   |
|                               | fundRecentViews           | Gets the fund manager's recent views on the fund, including investment strategy, operational analysis, and future macro outlook.                                                                                                                             | The recent investment views of China Merchants Quantitative Select and Zhongtai Xingyuan Value Select  |
|                               | guessFundCode             | Parses fund abbreviations or nicknames into standard fund codes, names, and trading markets (SH: Shanghai; SZ: Shenzhen; OF: Over-the-counter).                                                                                                              | How is the Semiconductor ETF?                                                                           |
| Market Event Interpretation  | aShareMarketEvents        | Gets important events related to the A-share market (macro, industry, sector, listed companies) and interprets the opportunities within.                                                                                                                     | Any major events happening in the market recently?                                                                            |
| Securities Information Search     | officialSecuNews          | Retrieves information from relevant official securities media.                                                                                                                                                                                               | Any recent news about stablecoins?                                                                     |
|                               | weMediaSecuNews           | Retrieves information from relevant securities self-media sources.    | Any recent news about Moutai?                                                                 |
|                               | finEntityExtract          | Extracts financial entities (individual stocks, funds, conceptual sectors, industries) mentioned in natural language, returning their codes and names. For stocks, it also returns belonging concepts and Shenwan industries; for ETF funds, it returns the tracked index.                                                                                                                                                                 | Today's price change for Moutai?                                                                          |
|                               | currentDatetime           | Gets today's date, time, day of the week, and holiday information.                                                                                                                                                                                                                                 | Today's price change for the Gold ETF?                                                                          |
|                               | recentTransDate           | Gets today's date and whether it's a trading day, the previous trading date, and the next trading date.                                                                                                                                                                                                                      | What was the tracking error of the Gold ETF on the last trading day?                                                                      |
| Research View Search                      | macroResearch             | Gets research views and interpretations from various brokerages on macro topics (economic data, macro events, macro policies).                                                                                                                                                                                                                    | What do institutions think about the Fed rate cut?                                                                           |
|                               | stkResearch               | Gets research views from various brokerages on individual stocks (i.e., listed companies).                                                                                                                                                                                                                 | What do institutions think about Jiayi Shares?                                                                           |
|                               | industryResearch          | Gets research views from various brokerages on industries.                                                                                                                                                                                                                                      | Recent investment advice for the tourism industry?                                                                            |
|                               | researchRatingStats       | Gets rating statistics for an individual stock (listed company) or industry from various brokerages.                                                                                                                                                                                                                                    | What are the stock ratings for Moutai from various brokerages?                                                                       |

## Deployment
### VS Code + Cline
A sample configuration for using the MCP Server with VS Code + Cline is as follows (using a trial API_KEY for free trial).
```json
{
  "mcpServers": {
    "deepq-finance-toolkit-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@deepq-tech/mcp-server-js@latest",
        "start"
      ],
      "env": {
        "DEEPQ_API_KEY": "4iskgEuB4nTSHaCad2bDUw"
      }
    }
  }
}
```
Note: If too many concurrent calls are made, you will receive an error message: You have been restricted, please try again later!. You can apply for independent concurrency quota at: https://g.h5gdvip.com/p/tgcp0ld7


# 中文版本
## 服务简介
* 深擎科技提供的 MCP Server（以下简称深擎MCP）是一个面向证券行业的AI工具包。
* 我们提供股票、ETF、基金、研报、新闻资讯等专业金融领域数据工具。
* 深擎MCP工具遵循大模型友好3原则：自然语言输入输出、请求迅捷、业务完整，一键配置即享服务。

## 能力范围
MCP为AI大模型提供了完整的金融数据与分析工具支持，具体包含以下五大核心数据能力：

* 股票分析：涵盖个股实时行情、主营业务、基本面、技术面、资金面、消息面，板块行情、资金面与基本面，大盘行情情况数据
* ETF分析：ETF实时行情、业绩表现、技术面、资金面、基本面、消息面、底层资产数据
* 公募基金：公募基金业绩表现、技术面、资金面、基本面、消息面、底层资产、基金经理观点数据
* 新闻资讯：证券官媒、证券一二级自媒体、券商研报、市场热门事件、个股/ETF/板块异动消息数据
* 通用工具：当下日期获取、交易日判断、股票代码标准化、基金代码标准化、金融实体解析数据工具

## 工具列表
MCP工具已正式发布，40+个工具任您使用，如果您有其它想要的工具需求，可以联系我们哦～

| **工具分类** | **工具/接口名称**                     | **描述** | **提问示例** |
| --- |---------------------------------| --- | --- |
| A股个股分析 | 个股主营与亮点<br>stockBizHighlight    | 个股主营与亮点：获取个股的主营业务、所属行业/主题、及核心亮点。 | 茅台和宁德时代的主营业务分别是什么？ |
| | 个股技术面<br>stockTechAnalysis          | 个股技术面：获取股票的 KDJ、BOLL、MACD 等技术指标，以及技术面总结与走势分析。 | 宁德时代的技术面怎么样？ |
| | 个股资金面分析<br>stockCapAnalysis         | 个股资金面：获取股票主力资金流向、龙虎榜、两融数据。 | 茅台今日主力资金流入多少？ |
| | 个股基本面<br>stockFunAnalysis           | 个股基本面：获取股票的PE、PB、ROE、毛利率、净利率，及公司财务等公司基本面数据。 | 宁德时代最近的市盈率多少？ |
| | 个股研报观点<br>stockRep                  | 个股研报面：获取股票近90天（3个月）内最新的3篇研报观点。 | 五粮液最新的研报 |
| | 个股最新行情<br>stockLatestPrice          | 个股最新行情：获取股票最新行情数据，包括价格、涨跌幅、交易量。 | 茅台和宁德时代当前最新价格是多少？ |
| | 个股实体解析<br>guessStockCode            | 个股实体解析：将日常对话中个股简称、别称，解析为标准的股票代码、名称、交易市场（SH：沪市；SZ：深市；BJ：京市；NQ：新三板；US：美股；HK：港股）。 | 茅台和宁德时代当前最新价格是多少？ |
| | 个股风险扫雷<br>stockRiskWarning          | 个股风险扫雷：获取个股潜在的风险信息 | 国轩高科最近股价有点妖，帮我扫个雷 |
| | 个股股性查询<br>stockFlexibility          | 个股股性查询：获取个股对于外部事件的股价反应弹性 | 国轩高科股价弹性如何? |
| | 个股估值面<br>stockValuation             | 个股估值面：获取股票的PE、PB、ROE、毛利率、净利率，所属行业行业市盈率等公司估值数据。 | 国轩高科现在估值合理吗？ |
| A股大盘分析 | 大盘后市观点<br>mktForwardLook            | 大盘后市观点：可获取指定日期的A股大盘后市展望。 | A股后市怎么走？ |
| | A股恐贪指数<br>aShareFearGreedIndex      | A股恐贪指数：A股市场短期恐贪情绪指数 | A股短期恐贪情绪到哪啦？ |
| | A股市场温度计<br>aShareTemperature        | A股市场温度计：A股当下市场的温度指数 | 当下A股市场温度如何？ |
| | A股大盘行情<br>aShareMarketQuotes        | A股大盘行情：获取指定日期A股主流指数（上证指数、深证成指、创业板指、科创板指、北证指数、恒生指数等）行情。 | 今天大盘行情如何？ |
| A股板块分析 | 板块资金面分析<br>sectorCapAnalysis        | 板块资金面：获取概念或行业板块主力资金流向、两融余额数据。 | 低空经济板块今日主力资金流入多少？ |
| | 板块基本面<br>sectorFunAnalysis          | 板块基本面：获取概念或行业板块的PE、ROE、毛利率、财务经营数据等基本面数据。 | 低空经济板块的基本面怎么样？ |
| | 板块消息面<br>sectorNewsAnalysis         | 板块消息面：获取概念或行业板块指定日期段内的新闻消息。 | 低空经济板块最近有啥消息？ |
| | 板块研报面<br>sectorReportAnalysis       | 板块研报面：获取概念或行业板块指定日期段内的研报观点。 | 低空经济最新的研报 |
| | 板块最新行情<br>sectortLatestPrice        | 板块最近行情：获取概念或行业板块最新实时价格、涨跌幅、交易量数据。 | 低空经济和芯片板块今天行情如何？ |
| | 板块相关个股<br>sectorRelatedStocks       | 板块相关个股：获取行业或概念板块所影响股票及关联理由，相关个股可根据个股涨跌幅、个股市值、概念相关度进行排序。 | 苹果概念有哪些龙头股？ |
| | 板块涨跌幅榜单<br>sectorPriceChangeRank    | 板块涨跌幅榜单：查询日期区间内涨跌幅最大的板块榜单，并提供相关消息 | 今天涨幅前10的板块是哪些？ |
| | 板块行情查询与归因<br>sectorPriceChangeReason | 板块行情查询与归因：查询日期区间的板块行情，并给出归因消息 | 创新药板块最近一个月涨幅多少？ |
| ETF分析与诊断 | ETF基本信息<br>etfBasicInfo             | ETF基本信息：获取ETF基金的规模、费率、跟踪误差等基本信息关键数据与解读。 | 大成有色金属期货ETF的综合费率是多少 |
| | ETF基本面与估值<br>etfFunAnalysis         | ETF基本面与估值：获取ETF的市盈率PE、PE分位、市净率PB、PB分位、股息率、ROE等估值与基本面关键数据。 | 沪深300ETF估值怎么样 |
| | ETF业绩表现<br>etfPerformance           | ETF业绩数据：获取ETF基金近1年、3年、今年、成立以来的业绩指标，包括：收益率、年化收益率、年化波动、夏普比率、最大回撤、年化超额、信息比率。 | 中证A500易方达ETF今年以来业绩如何？ |
| | ETF底层资产<br>etfUnderAssets           | ETF底层资产：获取ETF底层重仓行业、重仓股票、重仓债券 | 中证A500易方达ETF重仓股有哪些？ |
| | ETF实时行情<br>etfLatestPrice           | ETF实时行情：获取ETF基金最新规模、费率、跟踪误差等基本信息关键数据。 | 医药ETF今天涨了多少 |
| | ETF技术面<br>etfTechAnalysis           | ETF技术面：获取ETF基金的均线、MACD等技术面关键数据与解读。 | 沪深300ETF的技术面怎么样？ |
| | ETF消息面<br>etfRelatedNews            | ETF消息面：获取ETF基金最近相关新闻资讯。 | 沪深300ETF有什么消息？ |
| 基金分析与诊断 | 基金基本信息<br>fundBasicInfo             | 基金基本信息：获取基金分类、基金标签、所属公司、基金经理 | 招商量化精选的基金经理是谁？ |
| | 基金业绩<br>fundPerformance             | 基金业绩：近1年、3年、今年、成立以来的业绩指标，包括：收益率、年化收益率、年化波动、夏普比率、最大回撤、年化超额、信息比率 | 招商量化精选近一年收益如何？ |
| | 基金底层资产<br>fundUnderAssets           | 基金底层资产：穿透分析基金底层重仓行业、重仓股票、重仓债券 | 招商量化精选的重仓股表现怎么样？ |
| | 基金经理观点<br>fundRecentViews           | 基金经理观点：基金经理对基金的近期观点，包括：投资策略和运作分析、未来宏观展望 | 招商量化精选和中泰星元价值优选的近期投资观点 |
| | 基金实体解析<br>guessFundCode             | 基金实体解析：将基金简称、别称，解析为标准基金代码、名称、交易市场（SH：沪市，SZ：深市，OF：场外）。 | 半导体ETF怎么样 |
| 市场大事解读 | A股市场大事<br>aShareMarketEvents        | A股市场大事：获取A股市场相关宏观、产业、行业、上市公司（股票）重要事件，并解读其中机会。 | 最近市场上有哪些大事？ |
| 证券资讯搜索 | 证券官媒检索<br>officialSecuNews          | 证券官媒检索：获取相关证券官媒资讯 | 稳定币最近有什么消息 |
| | 证券自媒检索<br>weMediaSecuNews           | 证券自媒检索：获取相关证券自媒体资讯 | 茅台最近有什么消息 |
| | 金融实体解析<br>finEntityExtract          | 金融实体解析：根据自然语言中提及的个股、基金、概念板块、行业，返回其代码、名称。其中，个股还返回所属概念、所属申万行业，ETF基金返回其跟踪指数。 | 茅台今日涨跌幅 |
| | 查询当前时间<br>currentDatetime           | 查询当前日期时间：获取今天的日期、时间、星期几、节日。 | 黄金ETF今日涨跌幅 |
| | 查询交易日期<br>recentTransDate           | 交易日期：获取今天的日期和是否交易日、上一个交易日期、下一个交易日期。 | 黄金ETF上个交易日的跟踪误差？ |
| 研究观点搜索 | 宏观研究观点<br>macroResearch             | 宏观研报观点：获取各券商对于宏观（经济数据、宏观事件、宏观政策）的研究观点和解读。 | 机构怎么看美联储降息 |
| | 公司研究观点<br>stkResearch               | 公司研究观点：获取各券商对于个股（即：上市公司）的研究观点 | 机构怎么看嘉益股份？ |
| | 行业研究观点<br>industryResearch          | 行业研究观点：获取各券商对于行业的研究观点 | 旅游行业最近的投资建议 |
| | 研报评级统计<br>researchRatingStats       | 研报评级统计：个股（上市公司）或行业的评级统计 | 各家券商机构对茅台的股票评级情况 |

## 部署方法
### VS Code + Cline
使用VS Code + Cline配置MCP Server样例如下(试用免费试用的API_KEY）。

```json
{
  "mcpServers": {
    "deepq-finance-toolkit-mcp-server": {
      "command": "npx",
      "args": [
        "-y",
        "@deepq-tech/mcp-server-js@latest",
        "start"
      ],
      "env": {
        "DEEPQ_API_KEY": "4iskgEuB4nTSHaCad2bDUw"
      }
    }
  }
}
```
注意：当调用并发太多，将收到报错message：You have been restricted, please try again later!。可申请独立并发流量：https://g.h5gdvip.com/p/tgcp0ld7
