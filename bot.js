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
var inputC = ''
var output = ''
var outputB = ''
var outputC = ''
var commands = ['test','info','list','help','suggest','report','feedback','link','invite','stop','rep','joke','wyr','update','news','alert','8ball','ship']
var commandsA = ['test','info','stop','rep','update','alert']
var commandsC = ['list','help','suggest','report','feedback','link','invite','news']
var commandsD = ['joke','wyr','8ball','ship']
var commandsB = []
commandsB = commandsC + commandsD
var current = ''
var currentB = ''
var invited = 0
var a = 0
var b = 0
var c = 0
var d = 0
var activate = 0
var timecheck = 0
var timecheckB = 0
var pingID = ''
var channelIDB = ''
var upper = ''
var lower = ''
var keywords = ['iceman','icecy','icerice','iceshark','icesass']
var responses = ['<@486985623161274378>, you were mentioned in this message.','<@!336507246227881984>, you were mentioned in this message.','<@458809225120972800>, you were mentioned in this message.','<@393586279964475393>, you were mentioned in this message.','<@485628261494292505>, you were mentioned in this message.']
var access = ['486985623161274378','393586279964475393']
var silence = ['532890805371797504','532890871570497552','532890982652575754','532391405826605066','532011128633688076']
var jokes = ["My wife and I were happy for 20 years. Then, we met.","My goal is to live forever. So far so good.","People always laughed when I said I wanted to be a comedian. Well, nobody is laughing now.","My parents said I wouldn't get anywhere due to my procrastination. I told them, just you wait.","I bought gift wrap for my brother. When it was wrapped, I told them to wrap it in a different color so he would know when to stop.","My wife told me to stop impersonating a flamingo. I had to put my foot down.","If a person with multiple personalities threatens suicide, is it a hostage situation?","If Europe uses Euros, should Africa use Afros?","If time is money, is an ATM a time machine?","I'm writing a book. So far, I've got the page numbers done.","Everywhere is walking distance if you have the time.","Isn't a room always room temperature?","Don't tell jokes to a kleptomaniac. They take things literally.","I think all people that think they can read minds are idiots. You already knew that though.","An invisible man goes to the doctor's office. The nurse says, I'm afraid the doctor can't see you now.","Never get in an argument with an idiot. They'll bring you down to their level and beat you with experience.","Why is it called common knowledge if it is not that common?","If you punch yourself in the face and it really hurts, are you really strong or really weak? You're really stupid.","I went into a bookstore and asked the lady where the self-help section was. She said if she told me, it would defeat the purpose.","I went to a general store. They wouldn't let me buy anything specific.","I went to a torist booth and asked about people that were there a year ago.","If at first you don't succeed, skydiving isn't for you.","Whenever I think of the past, it brings back so many memories.","I don't like country music, but I don't mean to denigrate those who do. For those that like country music, denigrate means put down.","Everyone has photographic memory. Some just don't have film.","Old people always poke me at weddings and say that I am next. I started doing that to them at funerals.","All those who beleive in psychokinesis, raise my hand.","Ever noticed that it is a penny for your thoughts, yet your thoughts are your two cents? Someone is making apenny on the deal.","Right now, I'm having amnesia and deja vu at the same time. I feel like I've forgotten this before.","I think it is wrong that only one company makes monopoly.","What do you get when you cross a joke with a rhetorical question?","If you think that nobody cares about you, try missing a few payments.","How do you tell when you're out of invisible ink?","I went to a museum once that had the arms and heads of the statues from other museums.","I went to a place that said they served breakfast at any time. I orderd french toast during the renissance.","Hard work pays off in the future. Laziness pays off now.","The early bird gets the worm, but the second mouse gets the cheese.","I almost had a psychic girlfriend, but she left me before we met.","If everything seems to be going well, you must have overlooked something.","A clear concience is usually a sign of a bad memory.","I'm against picketing, but I don't know how to show it.","I don't have a girlfriend, but I have a friend who would be really mad if I said that.","I haven't slept for ten days because that would be to long.","I imagine that the inside of a cleaning bottle is really clean.","I saw a girl on the news that was born blind. The reporter said she didn't know the meaning of the word can't. I thought, that is sad. She can't see and she doesn't get simple contractions.","I like escalators. They can't break. They just become stairs.","I bought a seven dollar pen because I always lose my pens. I'm so sick of not caring.","I couldn't get my brakes fixed, so I just made my horn louder.","I have a vest. I my arms were cut off, it would be a jacket."]
var wyr = ["know when you were going to die, or when all the people around you are going to die","be able to read minds, or send messages by thinking","be good looking but unaware of it, or be ugly and think you are good looking","make friends easily but like none of them, or like most people that won't become friends with you","have really good jokes but not understand humor, or think all jokes are hillarious but rarely here any","hear the same voice no matter who speaks, or speak random voices every time you talk","understand every language but not speak it, or speak every language but not understand it","constantly move homes to new locations, or never travel on vaction","see the future from all viewpoints and be blind, or see like you do now","understand animals, or be able to speak to animals","transform into any animal except a human at will, or only be a human","have all drink containers with holes in the bottom, or have no tap water and only bottled water","have your hands stick to any surface, or be insanely slippery"]

var badWords = ['bike','bicycle','bicycIe','biker','bicyclist','bicycIist','bikes','bicycles','bicycIes','bikers','bicyclists','bicycIists','biking','bik3','bicycl3','bicycI3','bik3r','bik3s','bicycl3s','bicycI3s','bik3rs','bike$','bicycle$','bicycIe$','bicyclist$','bicycli$t','bicycli$ts','bicycli$t$','bicycIist$','bicycIi$t','bicycIi$ts','bicycIi$t$','biker$','bik3$','bicycl3$','bicycI3$','bik3r$','blke','blcycle','blcycIe','blker','blcyclist','blcycIist','bicycIst','blcyclst','blcycIst','blkes','blcycles','blcycIes','blkers','blcyclists','blcycIists','bicycllsts','bicycIlsts','blcycllsts','blcycIlsts','blking','biklng','blklng','blk3','blcycl3','blcycI3','blk3r','blk3s','blcycl3s','blcycI3s','blk3rs','blke$','blcycle$','blcycIe$','blcyclist$','blcycIist$','bicycllst$','bicycIlst$','blcycllst$','blcycIlst$','blcycli$t','blcycIi$t','blcycli$ts','blcycIi$ts','bicycll$t','bicycIl$t','bicycll$ts','bicycIl$ts','blcycll$t','blcycIl$t','blcycll$ts','blcycIl$ts','blker$','blk3$','blcycl3$','blcycI3$','blk3r$']
var characters = '`1234567890-=qwertyuiop[]\asdfghjkl;' + "'" + 'zxcvbnm,./~!@#$%^&*()_+{}|:"<>? '

var eightBallA = ['Yes','All numbers point to yes','Of course','Obviously','Probably','Like totally brah','Sure. I guess so','Yeah']
var eightBallB = ['No','Not a chance','Doubt it','No way! You are a monster for suggesting that','Not likely','Firm no','Nah man','Nope']
var eightBallC = ['I cannot say','Slip me a twenty and I will tell you','Huh? I was not paying attention','Maybe','Definite maybe']
var eightBall = []
b = -1
while (b < eightBallA.length && b < eightBallB.length && b < eightBallC.length){
    b = b + 1
    if (eightBallA[b] != undefined){
        eightBall[eightBall.length] = eightBallA[b]
    }
    if (eightBallB[b] != undefined){
        eightBall[eightBall.length] = eightBallB[b]
    }
    if (eightBallC[b] != undefined){
        eightBall[eightBall.length] = eightBallC[b]
    }
}

bot.on('messageUpdate', function(oldMsgData, newMsgData, evt){
    c = ''
    if (newMsgData.content != undefined){
        c = newMsgData.content.toLowerCase()
    }
    b = 0
    d = ''
    while (b < c.length){
        b = b + 1
        if (characters.includes(c.substring(b - 1, b))){
            d = d + c.substring(b - 1, b).toLowerCase()
        }
    }
    c = d
    b = -1
    while (b < badWords.length){
        b = b + 1
        if (badWords[b] != undefined){
            if (c.includes( badWords[b].toLowerCase())){
                bot.deleteMessage({
                    channelID: newMsgData.channel_id,
                    messageID: newMsgData.id
                })
                bot.sendMessage({
                    to: newMsgData.channel_id,
                    message: 'You monster with a dirty mind. **Never ever say those dirty dirty words!** Please refrain from that and only use unicycles.'})
            }
        }
    }
})
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
        b = new Date()
        invited = Object.keys(bot.servers).length
        bot.sendMessage({
            to: '532011128633688076',
            embed: {
                title: 'Ice Bot has been activated.',
                color: 305071,
                timestamp: b}})
        bot.setPresence({
            game: {
                type: 0,
                name: 'in ' + invited + ' servers'}})
        activate = 1
    }
    if (silence.includes(channelID) && userID != '520039060660682771'){
        bot.deleteMessage({
            channelID: channelID,
            messageID: evt.d.id})
    }
    b = -1
    c = 0
    d = ''
    while (c < message.length){
        c = c + 1
        if (characters.includes(message.substring(c - 1, c))){
            d = d + message.substring(c - 1, c).toLowerCase()
        }
    }
    while (b < badWords.length){
        b = b + 1
        if (badWords[b] != undefined){
            if (d.toLowerCase().includes(badWords[b].toLowerCase())){
                bot.deleteMessage({
                    channelID: channelID,
                    messageID: evt.d.id})
                output = 'You monster with a dirty mind. **Never ever say those dirty dirty words!** Please refrain from that and only use unicycles.'
            }
        }
    }
    b = -1
    while (b < keywords.length){
        b = b + 1
        if (message.toLowerCase().includes(keywords[b]) && bot.users[userID].bot != true){
            output = responses[b]
        }
    }
    if (Object.keys(bot.servers).length != invited){
        b = new Date()
        bot.sendMessage({
            to: '532011128633688076',
            embed: {
                title: 'Amount of servers has changed from ' + invited + ' to ' + Object.keys(bot.servers).length + '.',
                color: 305071,
                timestamp: b}})
        invited = Object.keys(bot.servers).length
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
        input = message.substring(start.length, message.length)
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
        inputC = input
        input = input.toLowerCase()
        inputB = inputB.toLowerCase()
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
                outputC = '`' + commandsC[0] + '`'
                b = 1
                while (commandsC.length > b){
                    outputC = outputC + ' `' + commandsC[b] + '`'
                    b = b + 1
                }
                outputD = '`' + commandsD[0] + '`'
                b = 1
                while (commandsD.length > b){
                    outputD = outputD + ' `' + commandsD[b] + '`'
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
                                name: ':bust_in_silhouette: Creator Only :bust_in_silhouette:',
                                value: outputB,
                            },
                            {
                                name: ':paperclips: Useful :paperclips:',
                                value: outputC,
                            },
                            {
                                name: ':tada: Fun :tada:',
                                value: outputD
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
                    if (b == 4){
                        upper = 'suggest {suggestion}'
                        lower = '< suggestion >\nInsert a suggestion that will be sent to the creators'
                    }
                    if (b == 5){
                        upper = 'report {issue}'
                        lower = '< issue >\nInsert an issue in the process'
                    }
                    if (b == 6){
                        upper = 'feedback {comment}'
                        lower = '< comment >\nThis is where your feedback goes so it can be sent'
                    }
                    if (b == 7){
                        upper = 'link'
                        lower = 'The link to the help server will be sent'
                    }
                    if (b == 8){
                        upper = 'invite'
                        lower = 'The link to invite this bot to other servers will be sent'
                    }
                    if (b == 9){
                        upper = 'stop'
                        lower = 'This will turn off the bot'
                    }
                    if (b == 10){
                        upper = 'rep {message}'
                        lower = '< message >\nThis will repeat the commanded message'
                    }
                    if (b == 11){
                        upper = 'joke'
                        lower = 'This will tell a random joke'
                    }
                    if (b == 12){
                        upper = 'wyr'
                        lower = 'This will give a random would you rather question'
                    }
                    if (b == 13){
                        upper = 'update {message}'
                        lower = '< message >\nThis will update the news'
                    }
                    if (b == 14){
                        upper = 'news'
                        lower = 'This will tell you the current news'
                    }
                    if (b == 15){
                        upper = 'alert {message}'
                        lower = '< message >\nThis will update the private news'
                    }
                    if (b == 16){
                        upper = '8ball {message}'
                        lower = '< message >\nThis will give a random answer to your question'
                    }
                    if (b == 17){
                        upper = 'ship {@user1} {@user2}'
                        lower = '< user1 >\nThis is the first lover\n< user2 >\nThis is the second lover'
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
            if (a == 4 || a == 5 || a == 6){
                if (a == 4){
                    b = 'Suggestion'
                    d = '532890871570497552'
                }
                if (a == 5){
                    b = 'Issue'
                    d = '532890982652575754'
                }
                if (a == 6){
                    b = 'Feedback'
                    d = '532890805371797504'
                }
                output = 'Your message was successfully sent. Thank you for your contribution.'
                c = new Date()
                bot.sendMessage({
                    to: d,
                    embed: {
                        author: {
                            name: bot.users[userID].username,
                            icon_url: 'https://cdn.discordapp.com/avatars/' + userID + '/' + bot.users[userID].avatar + '.png?size=32'},
                        title: b,
                        color: 305071,
                        timestamp: c,
                        footer: {
                            text: 'Created on'
                        },
                        fields: [
                            {
                                name: 'React Below to Vote',
                                value: message.substring(start.length + inputB.length + 1, message.length)
                            }]}}, function(err, res){
                    c = res.id
                    bot.addReaction({
                        channelID: d,
                        messageID: c,
                        reaction: '😀'}, function(err, res){
                        b = 0
                        while (b < 10000){
                            b = b + 0.001
                        }
                        bot.addReaction({
                            channelID: d,
                            messageID: c,
                            reaction: '🙂'}, function(err, res){
                            b = 0
                            while (b < 10000){
                                b = b + 0.001
                            }
                            bot.addReaction({
                                channelID: d,
                                messageID: c,
                                reaction: '😐'}, function(err, res){
                                b = 0
                                while (b < 10000){
                                    b = b + 0.001
                                }
                                bot.addReaction({
                                    channelID: d,
                                    messageID: c,
                                    reaction: '🙁'}, function(err, res){
                                    b = 0
                                    while (b < 10000){
                                        b = b + 0.001
                                    }
                                    bot.addReaction({
                                        channelID: d,
                                        messageID: c,
                                        reaction: '😩'}, function(err, res){
                                        b = 0
                                        while (b < 10000){
                                            b = b + 0.001
                                        }
                                        bot.addReaction({
                                            channelID: d,
                                            messageID: c,
                                            reaction: '🔄'}, function(err, res){
                                            b = 0
                                            while (b < 10000){
                                                b = b + 0.001
                                            }
                                            bot.addReaction({
                                                channelID: d,
                                                messageID: c,
                                                reaction: '🚩'})})})})})})})})
            }
            if (a == 7){
                output = 'https://discord.gg/SbrNgrq'
            }
            if (a == 8){
                output = 'https://discordapp.com/oauth2/authorize?&client_id=520039060660682771&scope=bot&permissions=8'
            }
            if (a == 9){
                output = 'Ice Bot is no longer running.'
                b = new Date()
                bot.sendMessage({
                    to: '532011128633688076',
                    embed: {
                        title: 'Ice Bot has been deactivated.',
                        color: 305071,
                        timestamp: b}})
                bot.disconnect()
            }
            if (a == 10){
                output = inputC
            }
            if (a == 11){
                output = jokes[Math.floor(Math.random()*(jokes.length-1))]
            }
            if (a == 12){
                output = 'Would you rather ' + wyr[Math.floor(Math.random()*(wyr.length-1))] + '?'
            }
            if (a == 13){
                current = input
                output = 'Annoncement has been received. Check `' + start + 'news` to see it.'
            }
            if (a == 14){
                output = '**The current news is below:**\n' + current
                if (access.includes(userID)){
                    output = output + '\n**The private news is below:**\n' + currentB
                }
            }
            if (a == 15){
                currentB = input
                output = 'Private annoncement has been received. Check `' + start + 'news` to see it.'
            }
            if (a == 16){
                b = eightBall[Math.floor((eightBall.length - 1)*Math.random())]
                if (eightBallA.includes(b)){
                    c = 255
                }
                if (eightBallB.includes(b)){
                    c = 16711680
                }
                if (eightBallC.includes(b)){
                    c = 65280
                }
                bot.sendMessage({
                    to: channelID,
                    embed: {
                        title: bot.users[userID].username + ' asked:',
                        color: c,
                        fields: [
                            {
                                name: inputC,
                                value: b + '.'}]}})
            }
            if (a == 17){
                if (evt.d.mentions[1].id != undefined){
                    b = evt.d.mentions[0].username
                    c = evt.d.mentions[1].username
                    output = ':hearts:**' + b + ' :revolving_hearts: ' + c + ' = ' + b.substring(0, Math.floor(0.5*b.length)) + c.substring(Math.floor(0.5*c.length), c.length) + '**:hearts:'
                }
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
