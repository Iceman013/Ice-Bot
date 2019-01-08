
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
var commands = ['test','ping']
var invited = 0
var a = 0
var activate = 0
var timecheck = 0
var timecheckB = 0
var pingID = ''

bot.on('message', function (user, userID, channelID, message, evt){
    output = ''
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
        bot.sendMessage({
            to: channelID,
            embed: {
                title: 'Information Test',
                color: 305071,
                fields: [
                    {
                        name: 'Ping',
                        value: pingcheck.getMilliseconds() - timecheck.getMilliseconds() + ' milliseconds elapsed'}]}})
    }
    if (message.substring(0, start.length) == start){
        input = message.substring(start.length, message.length).toLowerCase()
        inputB = input
        while (input.includes(' ')){
            inputB = inputB.substring(0, inputB.length - 1)
        }
        if (commands.includes(inputB)){
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
                output = 'ct001n:ping'
                timecheck = new Date()
            }
        }
    }
    if (output != ''){
        let sent = false;
        if(output.substring(0, 7) == 'ct001n:'){
            bot.sendMessage({
                to: '532023767073816576',
                message: output}, function(err, res){
                pingID = res.id})
        }
    }
})
