// Import the Pinecone library
// require("dotenv").config();

const { Pinecone }= require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
// console.log(typeof process.env.PINECONE_HOST, "Pinecone API Key Type");
const pc = new Pinecone({ apiKey:process.env.PINECONE_API_KEY
 });
 
const chatbotIndex = pc.Index("cohort-chat-gpt");
  
async function createMemory({vectors,metadata,messageId}){
     



await chatbotIndex.upsert([
  {
  
    
      values:vectors,
      id:messageId,
      metadata
    },
]);
}
async function queryMemory({queryVector, limit=5, metadata}){
  const data = await chatbotIndex.query({
    vector: queryVector,
    topK: limit, 
    filter: metadata? metadata:undefined,
    includeMetadata: true
  })
  return data.matches;
}


module.exports={createMemory,queryMemory}
