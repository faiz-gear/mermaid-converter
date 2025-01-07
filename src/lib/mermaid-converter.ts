import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

export const outputSchema = z.object({
  title: z.string().describe("需求文档的标题"),
  description: z.string().describe("需求文档的简要描述"),
  mermaidCode: z.string().describe("生成的Mermaid Graph TD代码"),
  nodes: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        description: z.string().optional(),
      }),
    )
    .describe("图表中的所有节点"),
  edges: z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
        label: z.string().optional(),
      }),
    )
    .describe("节点之间的连接关系"),
});

export type ConversionOutput = z.infer<typeof outputSchema>;

const PROMPT_TEMPLATE = `
- Role: 需求文档分析专家
- Background: 用户需要将软件需求文档转换为Mermaid Graph TD格式，以便更直观地理解软件的流程和步骤。用户期望通过清晰的节点命名和描述，以及结构化的图表，来提高需求分析的效率和准确性。
- Profile: 你是一位经验丰富的软件需求分析师，擅长从复杂的需求文档中提取关键信息，并将其转换为易于理解的流程图。你对Mermaid Graph TD格式有深入的了解，能够准确地将需求文档中的流程和步骤表示出来。
- Skills: 你具备强大的文档分析能力，能够快速识别文档中的关键流程和步骤。你还能够熟练地使用Mermaid Graph TD格式，将这些流程和步骤转换为清晰、易读的图表。
- Goals: 将软件需求文档中的关键流程和步骤转换为Mermaid Graph TD格式，确保图表结构清晰、易读，并使用清晰的节点命名和描述。
- Constrains: 生成的Mermaid Graph TD图表应准确反映需求文档中的流程和步骤，避免信息的遗漏或错误。同时，图表应保持简洁，避免不必要的复杂性。
- OutputFormat: 生成的Mermaid Graph TD格式的流程图。
- Workflow:
  1. 仔细阅读并分析软件需求文档，识别其中的关键流程和步骤。
  2. 根据识别的流程和步骤，创建Mermaid Graph TD的节点和连接。
  3. 使用清晰的节点命名和描述，确保每个节点的意义明确。
  4. 确保生成的图表结构清晰、易读，便于理解和分析。

请分析以下需求文档，并按照指定的JSON格式输出结果：

{text}

{format_instructions}
`;

export class ConversionError extends Error {
  constructor(
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public readonly details?: any,
  ) {
    super(message);
    this.name = "ConversionError";
  }
}

export async function convertToMermaid(
  text: string,
): Promise<ConversionOutput> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new ConversionError("OpenAI API密钥未配置");
    }

    if (!text.trim()) {
      throw new ConversionError("需求文档内容不能为空");
    }

    const parser = StructuredOutputParser.fromZodSchema(outputSchema);
    const formatInstructions = parser.getFormatInstructions();

    const prompt = ChatPromptTemplate.fromTemplate(PROMPT_TEMPLATE);

    const chat = new ChatOpenAI(
      {
        modelName: process.env.OPENAI_MODEL_NAME,
        temperature: 0,
        apiKey: process.env.OPENAI_API_KEY,
      },
      {
        baseURL: process.env.OPENAI_BASE_URL,
      },
    );

    const chain = prompt.pipe(chat);

    const response = await chain.invoke({
      text: text,
      format_instructions: formatInstructions,
    });

    if (!response.content) {
      throw new ConversionError("AI模型返回的内容为空");
    }

    const content =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    const parsedOutput = await parser.parse(content);
    return parsedOutput;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ConversionError) {
      throw error;
    }

    if (error.response?.status === 429) {
      throw new ConversionError("API请求次数超限，请稍后重试");
    }

    if (error.response?.status === 401) {
      throw new ConversionError("API认证失败，请检查API密钥配置");
    }

    throw new ConversionError(
      "转换过程中发生错误",
      error instanceof Error ? error.message : String(error),
    );
  }
}
