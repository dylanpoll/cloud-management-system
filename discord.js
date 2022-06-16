const Discord = require('discord.js');
require('dotenv/config'); 
const bot = new Discord.Client();

const prefix = '!'; //prefix for user commands.
//embedds
const Helpembed = {
    "title": "Cloud System Info :",
    "color": 9202888,
    "author": {"name": "Made by Dylan Poll"},
    "fields": [                      
                {"name": "!help","value": "gives a print of all these commands."},
                {"name": "!delete (number)","value": " deletes comments including and above"},
                {"name": "!home *NameOfPerson* ","value": "Tells you if they are home."}
            ],
    "footer": {"text": "if you need help with using these commands.... Seek help"}
};
//bot startup
    bot.on('ready', () => {
    console.log('Cloud system is armed and dangerous...');
    });
//user command tree
    bot.on('message', message=>{

        let command = message.content.substring(prefix.length).split(" "); //tells the bot to search for the prefix, and than a space, and the contents after the sace will be command
        if(message.author.bot) return; // tell the bot to ignore comments made by bots.
        
        switch(command[0]){
                            case 'help':
                                                try { message.channel.send({embed: Helpembed})} catch (err) {console.log({ message: err } + "failed to post help embed")}  //prints help
                                                break;
                            case 'delete':
                                                try{ if(!command[1]) return message.reply('please put in the amount of messages you want to delete...') //this states if there isn't a number given than ignore the command.
                                                        message.channel.bulkDelete(command[1])} catch (err) {console.log({ message: err } + "failed to post help embed")}
                                                break;
                            case 'home':
                                                try { if(!command[1]) return message.reply('please put in a persons name to check...')
                                                        let searchName = command[1];
                                                        IsHomeCall(searchName).then(content => message.channel.send({ embed: content }));
                                                            } catch (err) {console.log({ message: err } + "failed to post help embed")}
                                                    break;
                            default:// do nothing
                                                break;  
        }
    }) 
//ASYNC DATA VALIDATION
/*    async function filterInt(number) {
        if (/^[-+]?(\d+|Infinity)$/.test(number)) {
            return Number(number)
        }
        else {
            return "";
        }
    }
*/
//----------------------
//functions
//----------------------
async function IsHomeCall(searchName){//this pulls from our express to our database
    try{
        let home; let content;
        await IsHomeSearch(searchName).then(content => home = content);
        const HomeEmbed= {//profile card
            "title": searchName + "'s Information :",
            "color": 9202888,
            "fields":   [{ name: "Currently home? : ", "value": home }]
        };
        content = HomeEmbed
        return content;
    } catch (err) { console.log({ message: err } + "failed to pull information for who is home call");}
}
async function IsHomeSearch(searchName) {
    try {
        let url =process.env.HOST_SYSTEM+process.env.EXPRESS_PORT+'/homeReporting/';
        let people = await fetch(url, {method: 'GET'});
        let data = await people.json(); //json object for all people returned from this get request
        let person = await data.findOne({'name': (searchName)});  //finds the person from the returned json object
        let content = person.isHome.text();
        return content;
    } catch (err) {console.log({ message: err } + "failed in IsHomeSearch");}
}
//----------------------
//bot token
//----------------------
bot.login(process.env.BOTTOKEN);