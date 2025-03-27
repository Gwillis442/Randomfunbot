const { OpenAI } = require('openai');
const { gptApiKey } = require('../../../config/config.json');
const { grabArticleInfo } = require('../articleSummaryHandler/grabArticleInfo.js');



async function getGPTResponse(article) {
    const openai = new OpenAI( { apiKey: gptApiKey} );
    try{
        const articleContent = await grabArticleInfo(article);
        if (!articleContent) {
            return 'I am sorry, I am not able to summarize that article at this time.';
        }
        const instructions = `You are a discord bot tasked with summarizing the following article's content and pulling out the most relevant information to display to the user. If the data sent mentions requiring some sort of verification send Requires Verification. Keep Responses as short as possible: ${articleContent}`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages : [{role: 'system', content: instructions}]
        });

        if(response.choices[0].message.content === "Requires Verification"){
            return false;
        } else {
        return response.choices[0].message.content;
        }

    } catch (error) {
        console.error(error);
        return 'I am sorry, I am not able to summarize that article at this time.';
    }
}

module.exports = { getGPTResponse };