
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
var commands = ['test']
var a = 0

bot.on('message', function (user, userID, channelID, message, evt){
    output = ''
    if (message.substring(0, start.length) == start){
        input = message.substring(start.length, message.length)
        inputB = input
        while (input.includes(' ')){
            inputB = inputB.substring(0, inputB.length - 1)
        }
        if (commands.includes(inputB)){
            a = -1
            while (a < commands.length && commands[a] != inputB){
                a = a + 1
            }
            if (a == 0){
                output = 'Test is successful.'
            }
        }
    }
    if (output != ''){
        bot.sendMessage({
            to: channelID,
            message: output})
    }
            
    }
})
