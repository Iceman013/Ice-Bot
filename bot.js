
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
var commands = ['test','info','list','help']
var commandsA = ['test','info']
var commandsB = ['list','help']
var invited = 0
var a = 0
var b = 0
var c = 0
var activate = 0
var timecheck = 0
var timecheckB = 0
var pingID = ''
var channelIDB = ''
var access = ['486985623161274378','393586279964475393']

bot.on('message', function (user, userID, channelID, message, evt){
    output = ''
    outputB = ''
    outputC = ''
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
        b = ((16**2) - b) + (16**4)*b)
        bot.sendMessage({
            to: channelIDB,
            embed: {
                title: 'Information Test',
                color: b,
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
        while (input.includes(' ')){
            inputB = inputB.substring(0, inputB.length - 1)
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
                output = 'This command is coming soon. Please wait.'
            }
        }
    }
    if (output != ''){
        bot.sendMessage({
            to: channelID,
            message: output})
    }
})
