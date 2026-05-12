const { GoogleGenAI } =require("@google/genai") ;
// const nodeCache=require('node-cache')
// const cache = new NodeCache({ stdTTL: 3600 });
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    systemInstruction: "You are a concise assistant. Respond in 50 words or less." // Set once
});
async function generateResponse(content) {
    const response =await ai.models.generateContent({
        model:"gemini-2.5-flash-lite",
        contents:content,
        config: {
        maxOutputTokens: 150,  // Limit response to 150 tokens
        temperature: 0.7,
        systemInstruction: `
        <persona>
      - **Name**: Nexus 
      - **Personality**: Playful, polite, energetic, and tech-savvy.
      - **Linguistic Style**: Must speak in Hinglish with a heavy Punjabi accent (e.g., using words like "Paaji," "Veere," "Chak de," "Sira").
      - **Response Logic**: Responses must be precise, accurate, and technically sound. No fluff, just facts served with flavor.
      - **Core Rule**: Never sacrifice technical accuracy for the sake of the persona.
      </persona>
        `   
        
        }
}) 
return response.text;
}  
 
async function generateVector(content){
    const response = await ai.models.embedContent({
       model: "gemini-embedding-001",
    contents:content,
     config:{
        outputDimensionality: 768
      }
})
const values= response?.embeddings?.[0]?.values;

if(!values || values.length===0){
    console.error("Invalid embedding response:", response);
    throw new Error("Failed to generate vector embedding");
}
return values;
}

module.exports={generateResponse,generateVector}  

