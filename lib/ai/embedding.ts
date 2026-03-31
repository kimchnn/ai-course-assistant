// TODO: replace with LangChain + OpenAI embeddings

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter(i => i !== '');
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  // placeholder until LangChain OpenAIEmbeddings is wired up
  return chunks.map(chunk => ({ content: chunk, embedding: [] }));
};
