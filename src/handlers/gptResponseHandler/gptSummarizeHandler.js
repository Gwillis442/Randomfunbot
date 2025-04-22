const { OpenAI } = require('openai');
const { gptApiKey } = require('../../../config/config.json');
const { grabArticleInfo } = require('../articleSummaryHandler/grabArticleInfo.js');



async function getGPTResponse(article) {
    const openai = new OpenAI( { apiKey: gptApiKey} );
    try{
        const articleContent = await grabArticleInfo(article);
        if (!articleContent) {
            console.log(articleContent);
            return 'I am sorry, no summarizable content was found. [406]';
        }
        const instructions = `You are a discord bot tasked with summarizing the following content and pulling out the most relevant information to display to the user. If the data sent mentions requiring some sort of verification send 'This link requires some sort of verification to access. I am unable to summarize it. [403]'
        If the content happens to be some sort of 'patch notes' for a game please mention important or notable changes: ${articleContent}`;

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