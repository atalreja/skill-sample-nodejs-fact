'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.43f30033-a5a3-4b70-a8d8-a64af9b8d9f2";

var SKILL_NAME = "Stoic Quotes";
var GET_FACT_MESSAGE = "Here's a quote you might like: ";
var HELP_MESSAGE = "You can say tell me a quote, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
    "You have power over your mind - not outside events. Realize this, and you will find strength.",
    "The happiness of your life depends upon the quality of your thoughts.",
    "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
    "Waste no more time arguing about what a good man should be. Be one.",
    "When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love.",
    "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.",
    "The best revenge is to be unlike him who performed the injury.",
    "It is not death that a man should fear, but he should fear never beginning to live.",
    "Our life is what our thoughts make it.",
    "The soul becomes dyed with the colour of its thoughts.",
    "If someone is able to show me that what I think or do is not right, I will happily change, for I seek the truth, by which no one was ever truly harmed. It is the person who continues in his self-deception and ignorance who is harmed.",
    "If it is not right do not do it; if it is not true do not say it.",
    "Very little is needed to make a happy life; it is all within yourself in your way of thinking.",
    "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.",
    "The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.",
    "I have often wondered how it is that every man loves himself more than all the rest of men, but yet sets less value on his own opinion of himself than on the opinion of others.",
    "Reject your sense of injury and the injury itself disappears.",
    "Whenever you are about to find fault with someone, ask yourself the following question: What fault of mine most nearly resembles the one I am about to criticize?",
    "When another blames you or hates you, or people voice similar criticisms, go to their souls, penetrate inside and see what sort of people they are. You will realize that there is no need to be racked with anxiety that they should hold any particular opinion about you.",
    "The first rule is to keep an untroubled spirit. The second is to look things in the face and know them for what they are.",
    "How much more grievous are the consequences of anger than the causes of it.",
    "Do not act as if you were going to live ten thousand years. Death hangs over you. While you live, while it is in your power, be good.",
    "Begin each day by telling yourself: Today I shall be meeting with interference, ingratitude, insolence, disloyalty, ill-will, and selfishness – all of them due to the offenders’ ignorance of what is good or evil.",
    "Look well into thyself; there is a source of strength which will always spring up if thou wilt always look.",
    "How much time he gains who does not look to see what his neighbour says or does or thinks, but only at what he does himself, to make it just and holy.",
    "What we do now echoes in eternity.",
    "For it is in your power to retire into yourself whenever you choose.",
    "Do not indulge in dreams of having what you have not, but reckon up the chief of the blessings you do possess, and then thankfully remember how you would crave for them if they were not yours.",
    "Remember that very little is needed to make a happy life.",
    "A man’s worth is no greater than the worth of his ambitions.",
    "Think of yourself as dead. You have lived your life. Now, take what's left and live it properly. What doesn't transmit light creates its own darkness.",
    "Nothing happens to anybody which he is not fitted by nature to bear.",
    "How ridiculous and how strange to be surprised at anything which happens in life",
    "Humans have come into being for the sake of each other, so either teach them, or learn to bear them.",
    "Though you break your heart, men will go on as before.",
    "Whoever does wrong, wrongs himself; whoever does injustice, does it to himself, making himself evil.",
    "Live a good life. If there are gods and they are just, then they will not care how devout you have been, but will welcome you based on the virtues you have lived by. If there are gods, but unjust, then you should not want to worship them. If there are no gods, then you will be gone, but will have lived a noble life that will live on in the memories of your loved ones.",
    "If any man despises me, that is his problem. My only concern is not doing or saying anything deserving of contempt.",
    "Because a thing seems difficult for you, do not think it impossible for anyone to accomplish.",
    "Nowhere can man find a quieter or more untroubled retreat than in his own soul.",
    "If you are pained by external things, it is not they that disturb you, but your own judgement of them. And it is in your power to wipe out that judgement now.",
    "Or is it your reputation that's bothering you? But look at how soon we're all forgotten. The abyss of endless time that swallows it all. The emptiness of those applauding hands. The people who praise us; how capricious they are, how arbitrary. And the tiny region it takes place. The whole earth a point in space - and most of it uninhabited.",
    "Wealth consists not in having great possessions, but in having few wants.",
    "There is only one way to happiness and that is to cease worrying about things which are beyond the power or our will.",
    "Don't just say you have read books. Show that through them you have learned to think better, to be a more discriminating and reflective person. Books are the training weights of the mind. They are very helpful, but it would be a bad mistake to suppose that one has made progress simply by having internalized their contents.",
    "If you want to improve, be content to be thought foolish and stupid.",
    "He who laughs at himself never runs out of things to laugh at.",
    "Any person capable of angering you becomes your master; he can anger you only when you permit yourself to be disturbed by him.",
    "Other people's views and troubles can be contagious. Don't sabotage yourself by unwittingly adopting negative, unproductive attitudes through your associations with others.",
    "It is impossible for a man to learn what he thinks he already knows.",
    "Nature hath given men one tongue but two ears, that we may hear from others twice as much as we speak.",
    "First learn the meaning of what you say, and then speak.",
    "You become what you give your attention to.",
    "Nothing great comes into being all at once, for that is not the case even with a bunch of grapes or a fig. If you tell me now, 'I want a fig,' I’ll reply, 'That takes time.'",
    "Sometimes even to live is an act of courage.",
    "Luck is what happens when preparation meets opportunity.",
    "All cruelty springs from weakness.",
    "Religion is regarded by the common people as true, by the wise as false, and by rulers as useful.",
    "Difficulties strengthen the mind, as labor does the body.",
    "here is no easy way from the earth to the stars",
    "If a man knows not to which port he sails, no wind is favorable.",
    "Begin at once to live, and count each separate day as a separate life.",
    "It is not the man who has too little, but the man who craves more, that is poor.",
    "No man was ever wise by chance",
    "He suffers more than necessary, who suffers before it is necessary.",
    "If you really want to escape the things that harass you, what you’re needing is not to be in a different place but to be a different person.",
    "A gift consists not in what is done or given, but in the intention of the giver or doer.",
    "We learn not in the school, but in life.",
    "If you live in harmony with nature you will never be poor; if you live according what others think, you will never be rich.",
    "Often a very old man has no other proof of his long life than his age.",
    "Whatever can happen at any time can happen today.",
    "For many men, the acquisition of wealth does not end their troubles, it only changes them",
    "There is no enjoying the possession of anything valuable unless one has someone to share it with",
    "It's not that we have little time, but more that we waste a good deal of it.",
    "The bravest sight in the world is to see a great man struggling against adversity."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};