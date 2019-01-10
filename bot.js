
var Discord = require('discord.io');
var logger = require('winston');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.token,
   autorun: true
});
bot.on('ready',function(evt){
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

var start = '$'
var input = ''
var inputB = ''
var output = ''
var outputB = ''
var outputC = ''
var commands = ['test','info','list','help','suggest','report','feedback']
var commandsA = ['test','info']
var commandsB = ['list','help','suggest','report','feedback']
var invited = 0
var a = 0
var b = 0
var c = 0
var activate = 0
var timecheck = 0
var timecheckB = 0
var pingID = ''
var channelIDB = ''
var upper = ''
var lower = ''
var keywords = ['iceman','icecy','icerice','iceshark']
var responses = ['<@486985623161274378>, you were mentioned in this message.','<@!336507246227881984>, you were mentioned in this message.','<@458809225120972800>, you were mentioned in this message.','<@393586279964475393>, you were mentioned in this message.']
var access = ['486985623161274378','393586279964475393']

bot.on('message', function (user, userID, channelID, message, evt){
    output = ''
    outputB = ''
    outputC = ''
    if ((message.toLowerCase().includes('ice bot') || message.toLowerCase().includes('<@520039060660682771>')) && userID != '520039060660682771'){
        output = 'I am Ice Bot. I can help you with uh . . . Well, I have this great thing where I can um . . . Oh! I do this thing with the uhhhhh ummm . . . Well, I have a cool picture. Try `' + start + 'help` for help and `' + start + 'list` for a list of commands.'
    }
    if (!bot.directMessages[channelID]) {
        serverID = bot.channels[channelID].guild_id;
        channel = bot.channels[channelID];
        member = bot.servers[serverID].members['520039060660682771'];
    }
    if (activate == 0){
        invited = Object.keys(bot.servers).length
        bot.sendMessage({
            to: '532011128633688076',
            message: 'Ice Bot has been activated.'})
        bot.setPresence({
            game: {
                type: 0,
                name: 'in ' + invited + ' servers'}})
        activate = 1
    }
    b = -1
    while (b < keywords.length){
        b = b + 1
        if (message.toLowerCase().includes(keywords[b])){
            output = responses[b]
        }
    }
    if (Object.keys(bot.servers).length != invited){
        invited = Object.keys(bot.servers).length
        bot.sendMessage({
            to: '532011128633688076',
            message: 'Amount of servers has changed.'})
        bot.setPresence({
            game: {
                type: 0,
                name: 'in ' + invited + ' servers'}})
    }
    if (message == 'ct001n:ping' && userID == '520039060660682771'){
        timecheckB = new Date()
        b = timecheckB.getMilliseconds() - timecheck.getMilliseconds()
        c = b
        if (b > 16**2){
            b = 16**2
        }
        b = (16**2) - b + (16**4)*b
        bot.sendMessage({
            to: channelIDB,
            embed: {
                author: {
                    name: 'Ice Bot Information',
                    icon_url: 'https://cdn.discordapp.com/avatars/520039060660682771/' + bot.users['520039060660682771'].avatar + '.png?size=32'},
                title: 'Information Test',
                color: b,
                timestamp: timecheckB,
                footer: {
                    icon_url: 'https://cdn.discordapp.com/attachments/532010793416392704/532739274806657044/unknown_4.png',
                    text: 'Information Posted:'},
                fields: [
                    {
                        name: 'Constants',
                        value: 'Prefix: ' + start,
                    },
                    {
                        name: 'Ping',
                        value: c + ' milliseconds'}]}})
    }
    if (message.substring(0, start.length) == start){
        input = message.substring(start.length, message.length).toLowerCase()
        inputB = input
        while (inputB.includes(' ')){
            inputB = inputB.substring(0, inputB.length - 1)
        }
        if (input.length > inputB.length){
            input = input.substring(inputB.length + 1, input.length)
        }
        if (input == inputB){
            input = ''
        }
        if (commands.includes(inputB) && (commandsB.includes(inputB) || access.includes(userID))){
            a = 0
            if (commands[a] != inputB){
                while (a < commands.length && commands[a] != inputB){
                    a = a + 1
                }
            }
            if (a == 0){
                output = 'Test is successful.'
            }
            if (a == 1){
                channelIDB = channelID
                bot.sendMessage({
                    to: '532160160941211658',
                    message: 'ct001n:ping'})
                timecheck = new Date()
            }
            if (a == 2){
                outputB = '`' + commandsA[0] + '`'
                b = 1
                while (commandsA.length > b){
                    outputB = outputB + ' `' + commandsA[b] + '`'
                    b = b + 1
                }
                outputC = '`' + commandsB[0] + '`'
                b = 1
                while (commandsB.length > b){
                    outputC = outputC + ' `' + commandsB[b] + '`'
                    b = b + 1
                }
                if (access.includes(userID) == false){
                    outputB = 'You must have higher clearance to view this section.'
                }
                bot.sendMessage({
                    to: channelID,
                    embed: {
                        title: 'Commands',
                        color: 305071,
                        fields: [
                            {
                                name: 'Creator Only',
                                value: outputB,
                            },
                            {
                                name: 'Everyone',
                                value: outputC
                            }
                        ]}})
            }
            if (a == 3){
                upper = ''
                lower = ''
                output = 'That is not a command or the syntax is incorrect.'
                if ((commands.includes(input) || input == '') && (commandsB.includes(input) || access.includes(userID))){
                    b = -1
                    while (b < commands.length && commands[b] != input){
                        b = b + 1
                    }
                    if (b == 0){
                        upper = 'test'
                        lower = 'This will test commands'
                    }
                    if (b == 1){
                        upper = 'info'
                        lower = 'This will tell you information about the bot'
                    }
                    if (b == 2){
                        upper = 'list'
                        lower = 'This will tell you all of the commands'
                    }
                    if (b == 3){
                        upper = 'help {command}'
                        lower = '< command >\nInsert any command here to receive instructions on syntax as well as purpose'
                    }
                    if (input == ''){
                        upper = 'help {command}'
                        lower = '< command >\nInsert any command here to receive instructions on syntax as well as purpose'
                    }
                    output = '```md\n' + start + upper + '\n='
                    b = 0
                    while (b < upper.length){
                        output = output + '='
                        b = b + 1
                    }
                    output = output + '\n' + lower + '\n```'
                }
            }
            if (a == 4){
                c = new Date()
                bot.sendMessage({
                    to: '532890871570497552',
                    embed: {
                        author: {
                            name: bot.users[userID].nickname,
                            icon_url: 'https://cdn.discordapp.com/avatars/' + userID + '/' + bot.users[userID].avatar + '.png?size=32'},
                        title: 'Suggestion',
                        color: 305071,
                        timestamp: c,
                        footer: {
                            text: 'Suggested on'
                        },
                        fields: [
                            {
                                name: 'React Below to Vote',
                                value: message.substring(start.length + inputB.length + 1, message.length)
                            }]}})
            }
        }
    }
    if (output != ''){
        bot.sendMessage({
            to: channelID,
            message: output
        })
    }
})
