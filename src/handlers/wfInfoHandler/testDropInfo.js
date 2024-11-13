const { getWarframeDropInfo } = require('./getWFDropInfo'); // Adjust the path as needed

async function testGetWarframeDropInfo() {
    const query = 'voruna'; // Example query
    const { header, content } = await getWarframeDropInfo(query);

    console.log('Returned Header:', header);
    console.log('Returned Content:', content);
}

testGetWarframeDropInfo();