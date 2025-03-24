const puppeteer = require('puppeteer');

async function getWarframeDropInfo(query) {
    const url = `https://wiki.warframe.com/index.php?search=${encodeURIComponent(query)}`;


    let browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage'
        ]
    });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000
    });

    try {
        //<h1 id="firstHeading" class="firstHeading mw-first-heading"><span class="mw-page-title-main">*Item Name*</span></h1>

        //<meta property="og:image" content="https://wiki.warframe.com/images/?.png">

        //<div class="codex-flower codex-content">*Codex Text*</div>

        /*
        <h2><span class="mw-headline" id="Acquisition">Acquisition</span></h2><p>Wisp's main and components blueprints are acquired from defeating the <a href="/w/Ropalolyst" title="Ropalolyst">Ropalolyst</a> on The Ropalolyst, <a href="/w/Jupiter" title="Jupiter">Jupiter</a>.</p><div style="overflow-x:auto;">
        <table style="width:100%; text-align:center; margin:0;" class="article-table sortable acquisition-table" cellspacing="1" cellpadding="1" border="0">

        <tbody><tr>
        <th style="text-align:left">Item</th>
        <th style="text-align:center">Source</th>
        <th style="text-align:center">Chance</th>
        <th style="text-align:center" class="unsortable">Expected</th>
        <th style="text-align:center" class="unsortable">Nearly Guaranteed</th></tr>
        <tr>
        <td style="text-align:left"><span class="tooltip tooltip-full" data-param="Neuroptics" data-param2="Resources"><span class="mw-default-size icon" typeof="mw:File"><a href="/w/Blueprints" title="Blueprints"><img src="/images/thumb/Helmet.png/32px-Helmet.png?e26ce" decoding="async" loading="lazy" width="32" height="32" class="mw-file-element" srcset="/images/thumb/Helmet.png/64px-Helmet.png?e26ce 2x" data-file-width="512" data-file-height="512" /></a></span></span><span class="tooltip-metadata hidden"><span class="noexcerpt">{"Description":"A Neuroptics component","Image":"Helmet.png","Name":"Neuroptics","Link":"Blueprints"}</span></span>&#160;Neuroptics Blueprint</td>
        <td><a href="/w/Ropalolyst#Locations" title="Ropalolyst">Ropalolyst Assassination Wisp Component</a></td>
        <td class="AcqProb">25.81%</td>
        <td>~ 3 Kills</td>
        <td>23 ± 7 Kills</td></tr>
        <tr>
        <td style="text-align:left"><span class="tooltip tooltip-full" data-param="Wisp" data-param2="Warframes"><span class="mw-default-size icon" typeof="mw:File"><a href="/w/Wisp" title="Wisp"><img src="/images/thumb/WispIcon272.png/31px-WispIcon272.png?3e203" decoding="async" loading="lazy" width="31" height="32" class="mw-file-element" srcset="/images/thumb/WispIcon272.png/63px-WispIcon272.png?3e203 2x" data-file-width="272" data-file-height="278" /></a></span></span><span class="tooltip-metadata hidden"><span class="noexcerpt">{"Sprint":"1.2","EnergyRank30":"300","Description":"Wisp floats between the material and the ethereal. She accesses multiple dimensions to support her allies. Her countenance is mysterious and enigmatic.","Conclave":false,"Shield":"180","MaxRank":"30","Themes":"Will-O-Wisp, Solar Elemental, Portal Manipulation","Tactical":"Breach Surge","Image":"Wisp.png","SquadPortrait":"WispLargePortrait.png","Introduced":"25.0","Armor":"185","FullImages":{"Portrait":"WispFull.png"},"InternalName":"/Lotus/Powersuits/Wisp/Wisp","Passive":"Flowing between dimensions Wisp becomes invisible to enemies while in the air.","Progenitor":"Heat","Type":"Warframe","Health":"270","Link":"Wisp","Portrait":"WispIcon272.png","Polarities":["V","D"],"Abilities":["Reservoirs","Wil-O-Wisp","Breach Surge","Sol Gate"],"InitialEnergy":"150","Subsumed":"Breach Surge","AuraPolarity":"Bar","Name":"Wisp","Sex":"Female","Playstyle":"Support","SellPrice":"25000","Energy":"200","CodexSecret":false}</span></span>&#160;Blueprint</td>
        <td><a href="/w/Ropalolyst#Locations" title="Ropalolyst">Ropalolyst Assassination Wisp Component</a></td>
        <td class="AcqProb">22.56%</td>
        <td>~ 4 Kills</td>
        <td>27 ± 9 Kills</td></tr>
        <tr>
        <td style="text-align:left"><span class="tooltip tooltip-full" data-param="Chassis" data-param2="Resources"><span class="mw-default-size icon" typeof="mw:File"><a href="/w/Blueprints" title="Blueprints"><img src="/images/thumb/Chassis.png/32px-Chassis.png?31720" decoding="async" loading="lazy" width="32" height="32" class="mw-file-element" srcset="/images/thumb/Chassis.png/64px-Chassis.png?31720 2x" data-file-width="512" data-file-height="512" /></a></span></span><span class="tooltip-metadata hidden"><span class="noexcerpt">{"Description":"A Chassis component","Image":"Chassis.png","Name":"Chassis","Link":"Blueprints"}</span></span>&#160;Chassis Blueprint</td>
        <td><a href="/w/Ropalolyst#Locations" title="Ropalolyst">Ropalolyst Assassination Wisp Component</a></td>
        <td class="AcqProb">25.81%</td>
        <td>~ 3 Kills</td>
        <td>23 ± 7 Kills</td></tr>
        <tr>
        <td style="text-align:left"><span class="tooltip tooltip-full" data-param="Systems" data-param2="Resources"><span class="mw-default-size icon" typeof="mw:File"><a href="/w/Blueprints" title="Blueprints"><img src="/images/thumb/Systems.png/32px-Systems.png?56a40" decoding="async" loading="lazy" width="32" height="32" class="mw-file-element" srcset="/images/thumb/Systems.png/64px-Systems.png?56a40 2x" data-file-width="512" data-file-height="512" /></a></span></span><span class="tooltip-metadata hidden"><span class="noexcerpt">{"Description":"A Systems component","Image":"Systems.png","Name":"Systems","Link":"Blueprints"}</span></span>&#160;Systems Blueprint</td>
        <td><a href="/w/Ropalolyst#Locations" title="Ropalolyst">Ropalolyst Assassination Wisp Component</a></td>
        <td class="AcqProb">25.81%</td>
        <td>~ 3 Kills</td>
        <td>23 ± 7 Kills</td></tr>
        </tbody></table></div>

        
*/

    } catch (err) {
        console.log(err);
        return null;
    } finally {
        if (browser) {
            await browser.close();
        }
    }

}
module.exports = { getWarframeDropInfo };