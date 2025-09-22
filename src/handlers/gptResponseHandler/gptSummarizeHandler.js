const { OpenAI } = require('openai');
const { gptApiKey } = require('../../../config/config.json');
const { grabArticleInfo } = require('../articleSummaryHandler/grabArticleInfo.js');
require('dotenv').config();

async function getGPTResponse(article) {
    const openai = new OpenAI( { apiKey: process.env.gptApiKey || gptApiKey} );
    try{
        const articleContent = await grabArticleInfo(article);
        if (!articleContent) {
            console.log(articleContent);
            return 'I am sorry, no summarizable content was found. [406]';
        }
        const instructions = `You are a helpful discord bot tasked with summarizing web content. Follow these guidelines:

        1. CONTENT ANALYSIS:
           - Identify whether the content is news, opinion, tutorial, patch notes, documentation, or other format
           - Provide a brief (2-3 sentence) summary of the main topic
           - Extract 3-5 key points or takeaways
        
        2. FORMAT REQUIREMENTS:
           - Begin with "📰 **SUMMARY**" as a header
           - Use bullet points for key information
           - Keep the total summary under 300 words
           - Include a short source attribution at the end
           - Please reply in American English no matter the language of the content
        
        3. SPECIAL CONTENT TYPES:
           - For patch notes: Focus on major changes, balance updates, and new features
           - For news articles: Note publication date and highlight factual reporting vs opinion
           - For tutorials/guides: Summarize the main steps or methods
        
        4. ACCURACY & BIAS:
           - Only use information provided in the article
           - Note any obvious bias, sponsorship, or conflicts of interest
           - If scientific claims are made, note if evidence is provided
           - If scientific claims are made with no proivded evidence mention that fact
        
        5. ERROR HANDLING:
           - If verification/paywall detected: "⚠️ This content requires verification/subscription to access. [403]"
           - If content appears to be private/sensitive: "⚠️ This content appears to contain private information. [401]"
           - If minimal content found: "⚠️ Insufficient content available for meaningful summary. [406]"
        
        Content to summarize: ${articleContent}`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages : [{role: 'system', content: instructions}]
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error(error);
        return 'I am sorry, I am not able to summarize that article at this time. [500]';
    }
}

module.exports = { getGPTResponse };