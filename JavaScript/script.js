//variables
var nbMaxHealthPoints = 29;      // maximum number of health points supported by the user interface (UI)
var maxHP;                       // represents the maximum health of the chosen protagonist
var coinsToOldMan = 0;           // counts the number of coins that the protagonist has given to the old man
var beenIn13 = false;            // tracks whether the protagonist has been in situation 13
var haveHealthPotion = false;    // tracks whether the protagonist has bought the health potion
var correctRiddleAnswer = false; // tracks whether the protagonist has provided the correct answer to the mountain troll
var goldCoins = 2;               // represents the wealth of the protagonist
var situation = 0;               // tracks the progress of the protagonist through the game
var attacker = "";               // during combat, determines whose turn it is to launch an attack
var inCombat = false;            // indicates whether the protagonist is currently in a combat situation
const randomComponent = 4;       // determines the level of randomness during a combat

//sound effects
var umphSound = new sound("soundEffects/umph.mp3");                  // sound to play when the protagonist is hit during a combat
var hissSound = new sound("soundEffects/hiss.wav");                  // sound to play when the goblin or troll is hit during a combat
var chinkSound = new sound("soundEffects/chink.wav");                // sound to play when the protagonist blocks a blow during a combat
var chink2Sound = new sound("soundEffects/chink2.mp3");              // sound to play when the enemy blocks a blow during a combat
var groanSound = new sound("soundEffects/groan.wav");                // sound to play when the goblin or troll dies
var drinkSound = new sound("soundEffects/potionDrink.wav");          // sound to play when the protagonist drinks the health potion
var haltSound = new sound("soundEffects/halt.mp3");                  // sound to play when the protagonist meets the troll
var dragonBreathSound = new sound("soundEffects/dragonBreath.mp3");  // sound to play when protagonist walks in the mountain tunnels
var dragonRoarSound = new sound("soundEffects/dragonRoar.mp3");      // sound to play when the dragon breathes fire
var dragonHurtSound = new sound("soundEffects/dragonHurt.mp3");      // sound to play when the dragon loses a horn

//sound tracks
var introductionSound = new Audio("soundEffects/introduction.mp3");  // track to play when the protagonist is browsing characters to chose from
var battleSound = new Audio("soundEffects/battle.mp3");              // track to play during combats
var songSound = new Audio("soundEffects/song.mp3");                  // track to play when the protagonist sings the song of Izentarth the Red
var finalBattleSound = new sound("soundEffects/finalBattle.mp3");    // track to play during the final battle against Izentarth
var gameOverSound = new sound("soundEffects/gameOver.mp3");          // track to play when the protagonist has died
var myInterval;                                                      // used to fade out the sound tracks

// characteristics of the possible protagonists
// name, health points, agility, attack points, protection points, face.png, weaponName, weapon.png, protectionName, protection.png
var protagonist = ["",0,0,0,0,"blank.png","","blank.png","","blank.png"];                                      // characteristics of the protagonist
var EdrinStoneguard = ["Edrin Stoneguard",29,6,7,5,"EdrinStoneguardFace.png","warhammer","EdrinStoneguardWeapon.png","plate armour","EdrinStoneguardProtection.png"];
var LysaThornwind = ["Lysa Thornwind",22,9,5,4,"LysaThornwindFace.png","bow and arrow","LysaThornwindWeapon.png","leather tunic","LysaThornwindProtection.png"];
var CorinAshgleam = ["Corin Ashgleam",18,7,9,3,"CorinAshgleamFace.png","staff","CorinAshgleamWeapon.png","enchanted robes","CorinAshgleamProtection.png"];
var MiraCoalbrand = ["Mira Coalbrand",24,8,5,4,"MiraCoalbrandFace.png","dual daggers","MiraCoalbrandWeapon.png","leather tunic","MiraCoalbrandProtection.png"];

var Elverin = ["Elverin",20,8,5,3,"elfFace.png","bow & arrow","bow&arrow.png","tunic","elfTunic.png"];
var Brokk = ["Brokk",29,6,7,5,"dwarfFace.png","axe","dwarfAxe.png","shield","dwarfShield.png"];
var Darvyn = ["Darvyn",23,7,5,3,"travellerFace.png","staff","travellerStaff.png","jacket","travellerJacket.png"];
var Erukius = ["Erukius",16,7,9,3,"wizardFace.png","spell book","wizardBook.png","cloak","wizardCloak.png"];

// characteristics of the enemies
//name, health points, agility, attack points, protection points, face.png,weaponName, weapon.png, protectionName, protection.png
var goblin =  ["forest goblin",15,7,6,2,"goblinFace.png","machete","goblinMachete.png","leather armour","goblinLeatherArmour.png"];
var troll =  ["mountain troll",26,7,7,2,"trollFace.png","wooden club","trollClub.png","hardened fur","trollProtection.png"];
var dragon =  ["Izentarth",29,11,9,9,"dragonFace.png","fire breath","dragonFire.png","dragon scales","dragonScales.png"];
var enemy = [];

// shortcuts used while debugging
//situation = 6;
//protagonist = ["Edrin Stoneguard",29,6,7,5,"EdrinStoneguardFace.png","warhammer","EdrinStoneguardWeapon.png","plate armour","EdrinStoneguardProtection.png"];
//protagonist = ["Lysa Thornwind",22,9,5,4,"LysaThornwindFace.png","bow and arrow","LysaThornwindWeapon.png","leather tunic","LysaThornwindProtection.png"];
//protagonist = ["Corin Ashgleam",18,7,9,3,"CorinAshgleamFace.png","staff","CorinAshgleamWeapon.png","enchanted robes","CorinAshgleamProtection.png"];
//protagonist = ["Mira Coalbrand",24,8,5,4,"MiraCoalbrandFace.png","dual daggers","MiraCoalbrandWeapon.png","leather tunic","MiraCoalbrandProtection.png"];
//protagonist = ["Elverin",20,8,5,3,"elfFace.png","bow & arrow","bow&arrow.png","tunic","elfTunic.png"];
//protagonist = ["Brökk",29,6,7,5,"dwarfFace.png","axe","dwarfAxe.png","shield","dwarfShield.png"];
//protagonist = ["Darvyn",23,7,5,3,"travellerFace.png","staff","travellerStaff.png","jacket","travellerJacket.png"];
//protagonist = ["Erukius",16,7,9,3,"wizardFace.png","spell book","wizardBook.png","cloak","wizardCloak.png"];
//protagonist[1] = 3;
//goldCoins = 1;
//protagonist[1] = 10;

const description = [];   // contains the description for every situation
description[0] = "First, you must decide the character that you will incarnate.";
description[1] = "Edrin Stoneguard is the eldest child of the village blacksmith, raised among anvils and steel he is known as the dependable shield of his home. <br><br> - health points: " + EdrinStoneguard[1] + " <br> - agility: " + EdrinStoneguard[2] + "<br> - weapon: warhammer (" + EdrinStoneguard[3] + " attack points) <br> - protection: plate armour (" + EdrinStoneguard[4] + " resistance points)";
description[2] = "Lysa Thornwind is the sharp-eyed daughter of the village hunter, raised tracking game through dense woods and scaling rooftops, making her a swift shadow in any skirmish. <br><br> - health points: " + LysaThornwind[1] + "<br> - agility: " + LysaThornwind[2] + "<br> - weapon: longbow (" + LysaThornwind[3] + " attack points) <br> - protection: leather tunic (" + LysaThornwind[4] + " resistance points)";
description[3] = "Corin Ashgleam is the thoughtful apprentice to the village elder, immersed in ancient scrolls and omens from a young age, channeling his arcane knowledge to support his companions. <br><br> - health points: " + CorinAshgleam[1] + " <br> - agility: " + CorinAshgleam[2] + "<br> - weapon: light staff (" + CorinAshgleam[3] + " attack points) <br> - protection: enchanted robes (" + CorinAshgleam[4] + " resistance points)";
description[4] = "Mira Coalbrand is the street-smart former chimney-sweep and odd-job runner from the village, honed by years of climbing tight spaces and dodging trouble, turning her into a deadly shadow in close-quarters ambushes.<br><br> - health points: " + MiraCoalbrand[1] + " <br> - agility: " + MiraCoalbrand[2] + "<br> - weapon: dual daggers (" + MiraCoalbrand[3] + " attack points) <br> - protection: leather tunic (" + MiraCoalbrand[4] + " resistance points)";
description[5] = "You have been on this quest for so long that you barely remember when it started. After an interminable journey across the Okoto Steppes, you have just reached the sprawling forest of Akkar. You need to cross it. Then, you will have to traverse the nauseous swamps of Kutagul to reach the high mountain of Hastmeuse. There, you must find the cave and follow the tunnel into the depths of the mountain and, if your information is correct, you will find the legendary treasure of Izentarth, the last fire breather.  ";
description[6] = "After a short walk, you meet an old man chopping wood. When he sees you, he stops and asks for alms: 'Hail traveller, could you please spare some money? My wife is ill and I need to buy her medicine from the healer.";
description[8] = "The old man: 'Thank you good lord! You are very generous but you don't seem to be from around here and the forest is treacherous. Take this map, it will help you find your way.'";
description[9] = "The path leads to a twisted tree with bright purple leaves and splits: the main path continues on the right while a small trail starts on the left.";
description[10] = "The path meanders through the forest. After some time, it shrinks to a small trail and you suspect that you are lost.";
description[12] = "The trail follows a capricious course and eventually becomes larger. Hopefully, you are on the right track.";
description[13] = "The game trail leads to a body of stagnant water. A frail wooden footbridge, lit with torches on both ends, extends over the lake.";
description[14] = "As you walk around the lake, a forest goblin jumps out of a bush and attacks you.<br>You don't have time to react so you can't block his blow: his machete slashes your shoulder. <b>You lose 2 health points.</b>";
description[15] = "The fight...";
description[16] = "";
description[17] = "You walk cautiously on the wobbly planks. Directly below, silent whirls and ripples form in the murky water and follow you as you progress along the bridge.<br>You're grateful for that bridge, so convenient and well lit. You do wonder who lit the torches though... ";
description[18] = "As you grow suspicious, a forest goblin appears at the end of the bridge and walks towards you. He holds a ferocious-looking machete. You turn around and see another forest goblin blocking your retreat. It was a trap! You must fight the goblin in front of you.";
description[21] = "You must have walked many miles and you're famished but it seems that there's no end to the forest. However, it seems that the landscape is changing as the forest becomes more humid.<br>You come across a patch of wet moss studded with mushrooms.";
description[22] = "A while ago the ground became soggy. Now the forest floor is turning into a marsh. You need to turn left or right to avoid a bayou.<br>One your left, through the trees, in a distance, you believe that you see a shimmering light.";
description[23] = "As dusk falls, it becomes clear that there is indeed a light some distance away. You follow it and find a derelict cabin at the end of a path.";
description[24] = "A frail old woman opens the door and says:<br>'ooooh, what have we got here? A weak fellow lost in the woods, that is. I tell you, he doesn't look too good, does he, all pale and tired? You know stranger, I can fix that for you. For a gold coin, I can give you a nice health potion of mine. What does he think?'";
description[25] = "The mushrooms taste slightly bitter but it feels good to eat something.<br>Soon, you start to feel dizzy. Then, the forest around you takes improbable colours. Your stomach aches terribly and you fall on your knees, suddenly, feeling very weak. The mushrooms were poisonous. ";
description[26] = "It is now so dark in the forest that you barely see your feet. To make matters worse, the soft rain that started recently is turning into a heavy downpour. Luckily, you find a hollow tree with a cavity big enough to shelter a man. You decide to rest there for the night.<br>Before you sleep, you sing to yourself the song that is at the origin of your quest: Izentarth the Red. The song that you learnt from your father who himself learnt it from his old man...";
description[27] = "Nothing troubled your sleep and you wake up refreshed on a bright morning. By midday, you find your way out of the marsh of Kutagul and the mountain of Hastmeuse, your destination, is in sight. There, you will need to find the entrance of the tunnel that leads to the den of Izentarth, the last fire breather.";
description[28] = "You walk to the foot of the mountain and commence an arduous climb. Hours go by before you spot, on the opposite mountainside, what could be a cave or the entrance to a tunnel. Unfortunately, you cannot reach it from the cliff you are standing on.";
description[29] = "After much exploration, you discover a flight of stairs leading to a wooden bridge that stretches over a ravine. On the other side, is the peak with the entrance to a cave that you saw earlier.";
description[30] = "As soon as you set foot on the stairs, you hear a powerful cry: <font size=6>'Halt!'</font><font size=4><br>A bulky mountain troll jumps down from a recess in the flank of the mountain on your left. He lands with a mighty thud that shakes the ground. Now he stands between you and the bridge, holding an enormous wooden club.</font>";
description[31] = "The troll stops you dead in your tracks with his enormous hand and says in a cavernous voice:<br><font size=5>'Stay therrr. Therr is a rrrule. You muft earrrn yourr way frrough. Fight me...</font><font size=3>(unintelligible) horr anffer </font><font size=1>vuh real'</font>";
description[32] = "<font size=5>'You muft fight me!'</font>";
description[33] = "'Fadly, there is an annoying rrule.<br>You muft fight me orr answerr ther rriddle. <font size=2>And I muft let you paff if you anfer corrrectly.'</font>";
description[34] = "<font size = 5>'I toutf the ground, I toutf the sky,<br>if I touft you, you might die.<br> Who am I?'</font>";
description[37] = "On the bridge, you find a torch and a flint and steel kit. It could come in handy for later.";
description[38] = "<font size=5>'Arrh!... </font><font size=4>You may pass...'</font>";
description[39] = "Higher, on the flank of the mountain, you see the cave entrance that you spotted earlier.";
description[40] = "The cavity in the mountain is the start of a tunnel. Hopefully, this leads to the den of Izentarth!<br>Oddly, in the distance, you can see light reflecting off the wet stone walls.";
description[41] = "As you follow the tunnel, the rough stone walls change to cut stone. A series of torches, placed at regular intervals, provide a flickering light.<br>You walk on for what seems an eternity in this never ending tunnel.";
description[42] = "Suddenly, a rancid gust of air blows out all the torches at once. It is now pitch black inside the tunnel.";
description[43] = "After a short walk, it seems that the tunnel has broadened for you cannot touch the walls anymore. You no longer feel the smooth slabs of the tunnel floor. Instead, the ground seems rocky and makes a rattling sound under your feet.";
description[44] = "The feeble glare of your torch reveals a terrifying sight: you are face to face with a monstruous sleeping dragon. Izentarth the Red! You'd have never thought that he was still alive!<br>The nostrils of the beast start twitching.";
description[45] = "Your right foot sinks into a shallow pit, you lose your balance and, with a clattering noise, you fall face first on a heap of clinking scree. Immediately, a mighty roar echoes through the cave.<br>The room lights up suddenly as you find youself face to face with a collosal dragon that emits a red glow. Izentarth the Red! You'd have never thought that he was still alive!";
description[46] = "Click on the body part of the dragon you want to hit.";
description[47] = "Izentarth could not protect his horn. It breaks under your blow and, as blood splurts out, the dragon shrieks in pain.<br>He rears up and you see a glow forming inside his gorge.";
description[48] = "Izentarth could not protect his horn. It breaks under your blow and, as blood splurts out, the dragon shrieks in pain.<br>He rears up and you see a glow forming inside his gorge.";
description[49] = "Izentarth could not shield his horn from your blow.<br>Large streams of blood run from both horns' stumps.";
description[50] = "";
description[51] = "";
description[52] = "To your surprise, the dragon sways from side to side before tumbling on the heap of gold where he remains inanimate. YOU HAVE SLAIN IZENTARTH THE RED!<br><br>As your catching your breath, you realise the immensity of the treasure. It covers the ground of the entire cave. Mostly made of gold coins, it also contains jewels and many more riches!";
description[53] = "Inside a chest, by the dragon's head, you spot an amber crystal that is emitting a flickering glow. This can only be the ORIGNUNRI, the legendary magic gem of the dwarves.<br>You have successfully completed your quest!";
description[54] = "Press F5 to play again";

// determines the situation that clicking on a button would take the protagonist to
// 0 means the button is not used in this situation and should be hidden
const transitionButton1 = [1,5,5,5,5,6,6,8,9,10,  9,10,9,17,15,15,21,18,19,19,  21,22,23,24,23,22,51,28,29,30,  35,35,35,35,38,35,37,39,37,40,  41,42,43,45,45,46,0,47,48,52, 0,27,53,54,0];
const transitionButton2 = [0,2,1,2,3,0,9,9,0,12,  0,12,0,14,13,0,0,0,0,0,       0,25,26,22,23,0,0,0,0,0,        31,32,33,34,0,0,0,0,0,0,        0,0,0,44,0,0,0,0,0,0,         0,0,0,0,0];
const transitionButton3 = [0,0,3,4,0,0,0,0,0,0,   0,13,0,0,0,0,0,0,0,0,         0,0,0,0,0,0,0,0,0,0,            0,0,0,0,0,0,0,0,0,0,            0,0,0,0,0,0,0,0,0,0,          0,0,0,0,0];

const button1Texts = [];      // determines the text inside the first button
button1Texts[0] = "choose your character";
button1Texts[1] = "choose Edrin Stoneguard";
button1Texts[2] = "choose Lysa Thornwind";
button1Texts[3] = "choose Corin Ashgleam";
button1Texts[4] = "choose Mira Coalbrand";
button1Texts[5] = "enter the forest";
button1Texts[6] = "give the poor man a coin";
button1Texts[8] = "you thank the old man for the map and say goodbye";
button1Texts[9] = "you follow the main path on the right";
button1Texts[10] = "you hope for the best and move forward";
button1Texts[12] = "you keep on walking";
button1Texts[13] = "you cross the lake on the footbridge";
button1Texts[14] = "you fight";
button1Texts[15] = "Fight the forest goblin";
button1Texts[16] = "Collect the gold coin and follow the lake's bank.";
button1Texts[17] = "You proceed further on the bridge...";
button1Texts[18] = "Fight for your life!";
button1Texts[19] = "Fight the forest goblin";
button1Texts[20] = "continue";
button1Texts[21] = "You hurry to find a way out of the forest before dusk";
button1Texts[22] = "Turn left";
button1Texts[23] = "Go to the cabin and knock at the door";
button1Texts[25] = "You get up with difficulty and resume your journey";
button1Texts[26] = "Sing the song of Izentarth the Red";
button1Texts[27] = "Walk to the mountain and start to climb in search of the tunnel's entrance";
button1Texts[28] = "Look for a way to get to the opposite mountainside";
button1Texts[29] = "Climb the stairs";
button1Texts[30] = "You waste no time and attack the troll before he can make his move";
button1Texts[31] = "'Then we shall fight!'";
button1Texts[32] = "'Then let us fight!'";
button1Texts[33] = "'Enough! Let us fight!'";
button1Texts[34] = "'Enough talking. Let us fight!'";
button1Texts[35] = "Fight the mountain troll";
button1Texts[36] = "Go to the bridge";
button1Texts[37] = "Pick up the torch and kit and cross the bridge";
button1Texts[38] = "Go to the bridge";
button1Texts[39] = "Climb to the cave";
button1Texts[40] = "Proceed cautiously towards the light";
button1Texts[41] = "Tread carefully deeper into the mountain";
button1Texts[42] = "Feeling the tunnel walls, you proceed further in the dark";
button1Texts[43] = "Continue walking in the dark";
button1Texts[44] = "You back away slowly and as silently as possible";
button1Texts[45] = "Gather your courage and fight the legendary dragon!";
button1Texts[47] = "Watch out for Izentarth's blow!";
button1Texts[48] = "Watch out for Izentarth's ferocious blow!";
button1Texts[49] = "Get ready for Izentarth's next attack";
button1Texts[51] = "Hit the hay";
button1Texts[52] = "Rummage through the treasure";
button1Texts[53] = "Collect the Orignunri";

const button2Texts = [];       // determines the text inside the second button
button2Texts[1] = "next character";
button2Texts[2] = "previous character";
button2Texts[3] = "previous character";
button2Texts[4] = "previous character";
button2Texts[6] = "you ignore him and walk on";
button2Texts[9] = "you take the small trail on the left";
button2Texts[13] = "you try to find a way around the lake";
button2Texts[14] = "you flee";
button2Texts[21] = "You pick up and eat a few mushrooms";
button2Texts[22] = "Turn right";
button2Texts[23] = "Go back on the path you came from";
button2Texts[30] = "You walk past the troll, up the stairs";
button2Texts[31] = "'Sorry, what did you say?'";
button2Texts[32] = "'But you said something else?'";
button2Texts[33] = "'Tell me the riddle!'";
button2Texts[43] = "Light your torch";

const button3Texts = [];       // determines the text inside the first button
button3Texts[2] = "next character";
button3Texts[3] = "next character";

// defines the controls for the sound effects and sound tracks
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

// fades out the sound tracks
function fadeOut(myMusic) {
  if (myMusic.volume < 0.05) {
    clearInterval(myInterval);
    myMusic.volume = 0;}
  else {myMusic.volume -= 0.05;}
}

// determines whether the protagionist's answer to the mountain troll's riddle is correct or incorrect and the consequences
// if the answer is correct then the protagonist moves to situation 38 (he can access the bridge)
// if the answer is incorrect the protagonist moves to situation 35 (battle against the troll)
function riddleAnswerSubmission() {
  document.getElementById("riddleAnswer").setAttribute("type", "text");
  var answerToRiddle = document.getElementById("riddleAnswer").value;
  answerToRiddle = answerToRiddle.toLowerCase();
  // defines the correct answers to the riddle
  correctRiddleAnswers = ["lightning","lightningbolt","lightning bolt","thunderbolt","thunder bolt","firebolt","fire bolt","bolt","a lightning","a lightningbolt","a lightning bolt","a thunderbolt","a thunder bolt","a firebolt","a fire bolt","a bolt"];
  for (let i = 0; i < correctRiddleAnswers.length; i++) {
    if (answerToRiddle == correctRiddleAnswers[i]) {
      correctRiddleAnswer = true;}
  }
  if (correctRiddleAnswer) {
    situation = 38;
  }
  else {
    situation = 35;
    description[35] = "<font size=6>'HA HA HA! That is the WRRRONG answer! I am going to crrrush you!'</font><br>";
    for (let i = 0; i <= 9; i++)
        {enemy[i] = troll[i];}
      displayEnemyInfo();
      attacker = whoAttacksFirst();
      if (attacker == protagonist[0]) {
        description[35] += "You are more agile than the " + enemy[0] + " so you get to start the fight.";}
      else {
        description[35] += "Your enemy is more agile, so he gets to start the fight.";}
  }
  // hide the text field for the answer to the riddle
  document.getElementById("riddleAnswer").style.visibility = "hidden";
  document.getElementById("riddleAnswerButton").style.visibility = "hidden";

  updatePage();
}

// changes the style or the cursor to a pointer when it hovers over the areas of the dragon that can be attacked 
function showDragonAreas() {
  document.getElementById("leftWing").style.cursor = "pointer";
  document.getElementById("rightWing").style.cursor = "pointer";
  document.getElementById("leftEye").style.cursor = "pointer";
  document.getElementById("rightEye").style.cursor = "pointer";
  document.getElementById("mouth").style.cursor = "pointer";
  document.getElementById("forehead").style.cursor = "pointer";
  document.getElementById("rightArm").style.cursor = "pointer";
  document.getElementById("leftHorn").style.cursor = "pointer";
  document.getElementById("rightHorn").style.cursor = "pointer";
}

// defines the consequences of clicking on the dragon's wings during combats
function hitWings() {
  if (attacker == protagonist[0]) {
    description[situation] = "Your blow bounces straight off the tight scales of Izentarth's wing leaving him unscathed.<br>Now, the dragon's throat starts to glow bright red.";
    button1Texts[situation] = "Try to avoid Izentarth's scorching blast!";
    transitionButton1[situation] = situation;
    attacker = "dragon";
    updatePage();}
}

// defines the consequences of clicking on the dragon's eyes during combats
function hitEyes() {
  if (attacker == protagonist[0]) {
    description[situation] = "The dragon sees the blow coming and protects himself with his wing that he uses like a shield. Your attack bounces off Izentarth's scaly wing leaving him unscathed.<br>The dragon's throat starts radiating red light. He is about to breathe fire!";
    button1Texts[situation] = "Try to avoid Izentarth's scorching blast!";
    transitionButton1[situation] = situation;
    attacker = "dragon";
    updatePage();}
}

// defines the consequences of clicking on the dragon's forehead during combats
function hitForehead() {
  if (attacker == protagonist[0]) {
    description[situation] = "The dragon swings his head to the side and avoids your attack. You have missed your target.<br>You can see heat building up inside Izentarth's gorge!";
    button1Texts[situation] = "Try to avoid Izentarth's scorching blast!";
    transitionButton1[situation] = situation;
    attacker = "dragon";
    updatePage();}
}

// defines the consequences of clicking on the dragon's arm during combats
function hitRightArm() {
  if (attacker == protagonist[0]) {
    description[situation] = "Despite seeing your attack, the dragon doesn't budge. Your shot hits the dragon's arm but is deflected as if it were nothing.<br>Watch out! Izentarth is about to attack!";
    button1Texts[situation] = "Try to avoid Izentarth's scorching blast!";
    transitionButton1[situation] = situation;
    attacker = "dragon";
    updatePage();}
}

// defines the consequences of clicking on the dragon's snout during combats
function hitMouth() {
  if (attacker == protagonist[0]) {
    description[situation] = "Izentarth fends off your attack with his scaly arm. Your shot has no impact on the powerful dragon.<br>Smoke blasts out of his snout.";
    button1Texts[situation] = "Try to avoid the incoming blast!";
    transitionButton1[situation] = situation;
    attacker = "dragon";
    updatePage();}
}

// defines the consequences of clicking on the dragon's left horn during combats
function hitLeftHorn() {
  if (attacker == protagonist[0]) {
    dragonHurtSound.play();
    if (situation == 46) {
      // the dragon has not yet lost his right horn
      document.getElementById("leftHorn").style.cursor = "default";
      situation = 47;
      enemy[1] -= 15;
      button1Texts[situation] = "Try to avoid the incoming blast!";
      attacker = "dragon";
      drawEnemyHealthPoints(nbMaxHealthPoints);
      updatePage();  
    }
    else if (situation == 48){
      // the dragon has lost both horns
      document.getElementById("leftHorn").style.cursor = "default";
      situation = 49;
      enemy[1] = 0;
      drawEnemyHealthPoints(nbMaxHealthPoints);
      updatePage();}
  }
}

// defines the consequences of clicking on the dragon's right horn during combats
function hitRightHorn() {
  if (attacker == protagonist[0]) {
    dragonHurtSound.play();
    if (situation == 46) {
      // the dragon has not lost his left horn
      document.getElementById("rightHorn").style.cursor = "default";
      situation = 48;
      enemy[1] -= 15;
      button1Texts[situation] = "Try to avoid the incoming blast!";
      attacker = "dragon";
      drawEnemyHealthPoints(nbMaxHealthPoints);
      updatePage();  
    }
    else if (situation == 47){
      // the dragon has lost both horns
      document.getElementById("rightHorn").style.cursor = "default";
      situation = 49;
      enemy[1] = 0;
      drawEnemyHealthPoints(nbMaxHealthPoints);
      updatePage();}
  }
}

// displays the protagonist's health points
function drawHealthPoints(nbMaxHP) {
  for (let i = 1; i <= nbMaxHP; i++) {
    var hpNumber = 'hp' + i.toString()
    if (protagonist[1] >= i) {
    document.getElementById(hpNumber).src = "pictures/1hp.jpg";}
  else {
    document.getElementById(hpNumber).src = "pictures/nohp.jpg";}
  }
}

// displays the enemy's health points
function drawEnemyHealthPoints(nbMaxHP) {
  for (let i = 1; i <= nbMaxHP; i++) {
    var hpNumber = 'enemyHp' + i.toString();
    document.getElementById(hpNumber).style.visibility = 'visible';
    if (enemy[1] >= i) {
      document.getElementById(hpNumber).src = "pictures/1hp.jpg";
    }
    else {
      document.getElementById(hpNumber).src = "pictures/nohp.jpg";
    } 
  }
}

// the protagonist drinks the potion
function clickInventoryImg3() {
  if (haveHealthPotion == true) {
    protagonist[1] = maxHP;
    drinkSound.play();
    drawHealthPoints(protagonist[1]);
    haveHealthPotion = false;
    document.getElementById("inventoryImg3").style.visibility = "hidden";}
}

// displays the protagonist's characteristics
function displayCharacterInfo() {
  document.getElementById("characterFace").src = "pictures/" + protagonist[5];
  document.getElementById("characterName").innerHTML = protagonist[0];
  document.getElementById("characterWeapon").src = "pictures/" + protagonist[7];
  document.getElementById("weaponName").innerHTML = protagonist[6] + " (" + protagonist[3] + ")";
  document.getElementById("characterProtection").src = "pictures/" + protagonist[9];
  document.getElementById("protectionName").innerHTML = protagonist[8] + " (" + protagonist[4] + ")";
  document.getElementById("agilityPoints").innerHTML = "       inventory        HP              agility: " + protagonist[2] + " scene:" + situation + "                                                                                                                                                                          ";
  if (inCombat == true) {
    document.getElementById("agilityPoints").innerHTML += "agility: " + enemy[2];}
  //document.getElementById("agilityPoints").innerHTML = "       inventory        HP              agility: " + protagonist[2] + "        situation:" + situation;
}

// displays the enemy's characteristics
function displayEnemyInfo() {
  document.getElementById("enemyFace").src = "pictures/" + enemy[5];
  document.getElementById("enemyName").innerHTML = enemy[0];
  document.getElementById("enemyWeapon").src = "pictures/" + enemy[7];
  document.getElementById("enemyWeaponName").innerHTML = enemy[6] + " (" + enemy[3] + ")";
  document.getElementById("enemyProtection").src = "pictures/" + enemy[9];
  document.getElementById("enemyProtectionName").innerHTML = enemy[8] + " (" + enemy[4] + ")";
  document.getElementById('enemyHpPane').style.visibility = 'visible';
  drawEnemyHealthPoints(nbMaxHealthPoints);
}

// hides the enemy's health points (after a combat)
function hideEnemyHealthPoints() {
  for (let i = 1; i <= nbMaxHealthPoints; i++) {
    var hpNumber = 'enemyHp' + i.toString();
    document.getElementById(hpNumber).style.visibility = 'hidden';}
}

// hides the enemy's characteristics (after a combat)
function hideEnemyInfo() {
  document.getElementById("enemyFace").src = "pictures/blank.png";
  document.getElementById("enemyName").innerHTML = "";
  document.getElementById("enemyWeapon").src = "pictures/blank.png";
  document.getElementById("enemyWeaponName").innerHTML = "";
  document.getElementById("enemyProtection").src = "pictures/blank.png";
  document.getElementById("enemyProtectionName").innerHTML = "";
  document.getElementById('enemyHpPane').style.visibility = 'hidden';
  hideEnemyHealthPoints();
}

// displays the coins contained inside the purse
function mouseOverPurse() {
  document.getElementById("purse").src = "purse/purse" + goldCoins + ".png";
}

// hides the coins contained inside the purse
function mouseOutPurse() {
  document.getElementById("purse").src = "purse/purse.png";
}

// displays the open map in the view division
function mouseOverMap() {
  if (coinsToOldMan == 2) {
   document.getElementById("view").src = "pictures/openMap.png";
  }
}

// removes the map in the view division
function mouseOutMap () {
  if (coinsToOldMan == 2) {
   document.getElementById("view").src = "scenes/scene" + situation + ".jpg";
  }
}

// decides who launches the first assault during a combat
function whoAttacksFirst() {
  if (protagonist[2] >= enemy[2]) {
    return protagonist[0];}
  else {
    return enemy[0];}
}

// manages combats
function combatTurn() {
  var attack;      // determines the strength of the attack
  var block;       // determines the strength of the block
  button1Texts[situation] = "carry on fighting";
  if (attacker == protagonist[0]) {
    //protagonist attacks
    attack = protagonist[2] + Math.floor(Math.random() * randomComponent);
    block = enemy[2] + Math.floor(Math.random() * randomComponent);
    description[situation] = "You attack with " + attack + " attack points.<br>";
    if (attack > block) {
      //the protagonist has hit the enemy
      hissSound.play();
      enemy[1] -= protagonist[3] - enemy[4];
      description[situation] += "The " + enemy[0] + " tries to block with " + block + " defense points.<br> He fails to block your attack";
      if (enemy[1] > 0) {
        description[situation] += " and loses " + (protagonist[3] - enemy[4]) + " health points.";}
      else {
        //the enemy is slain
        inCombat = false;
        groanSound.play();
        myInterval = setInterval(function() {fadeOut(battleSound)}, 200);
        switch (situation) {
          case 15:
            description[15] += " and he collapses with a roar. You have slain the goblin.<br>You find one gold coin by the goblin's purse.";
            break;
          case 19:
            description[19] += ". He collapses with a roar before falling into the water and sinks. You have slain the " + enemy[0] + ". Behind you, the other goblin is approaching fast so you dash to get off the bridge and into the forest. You manage to outrun the goblin.";
            break;
          case 35:
            description[35] += ". He wobbles and falls off the cliff. You have slain the mountain troll.<br>You may now go to the bridge.";
            break;
          default:
          description[situation] += " and collapses on the ground. You have slain the " + enemy[0] + ".";}
        description[situation + 1] = description[situation];
        transitionButton1[situation] = situation + 1;
        button1Texts[situation] = "continue";
      }
    drawEnemyHealthPoints(nbMaxHealthPoints);
    }
    else {
      //the enemy has blocked the attack
      chink2Sound.play();
    description[situation] += "The " + enemy[0] + " tries to block with " + block + " defense points.<br> He successfully blocks your attack.";}  
    attacker = enemy[0];
  }
  else {
    //enemy attacks
    attack = enemy[2] + Math.floor(Math.random() * randomComponent);
    block = protagonist[2] + Math.floor(Math.random() * randomComponent);
    description[situation] = "The " + enemy[0] + " attacks with " + attack + " attack points.<br>";
    if (attack > block) {
      //the enemy has hit the protagonist
      protagonist[1] -= enemy[3] - protagonist[4];
      description[situation] += "You try to block with " + block + " defense points.<br> You fail to block his attack";
      if (protagonist[1] > 0) {
        description[situation] += " and lose " + (enemy[3] - protagonist[4]) + " health points.";
        umphSound.play();}
      else {
        //the protagonist has died
        inCombat = false;
        document.getElementById("pageBackground").style.backgroundColor="#640046";
        document.getElementById("bottomPaneBackground").style.backgroundColor="#640046";
        myInterval = setInterval(function() {fadeOut(battleSound)}, 200);
        gameOverSound.play();
        description[situation] += ". You fall to the ground and all goes black.";
        description[50] = description[situation];
        transitionButton1[situation] = 50;
        button1Texts[situation] = "press here";
      }
    }  
    else {
      //the protagonist has blocked the attack
      chinkSound.play();
      description[situation] += "You try to block with " + block + " defense points.<br> You successfully block his attack.";
    }
  attacker = protagonist[0];
  }
}

// manages the dragon's attack
function dragonAttacks() {
  var attack;    // determines the strength of the dragon's attack
  var dodge;     // determines the quality of the protagonist's dodge
  //dragon attacks
    attack = enemy[2] + Math.floor(Math.random() * randomComponent);
    dodge = protagonist[2] + Math.floor(Math.random() * randomComponent);
    description[46] = "Izentarth attacks with " + attack + " attack points.<br>";
    if (attack > dodge) {
      //the dragon has hit the protagonist
      description[46] += "You try to dodge with " + dodge + " points.<br> You fail to avoid the flames";
      protagonist[1] -= enemy[3] - protagonist[4];
      if (protagonist[1] > 0) {
        description[46] += " and lose " + (enemy[3] - protagonist[4]) + " health points.";
        }
      else {
        //the protagonist has died
        inCombat = false;
        document.getElementById("pageBackground").style.backgroundColor="#640046";
        document.getElementById("bottomPaneBackground").style.backgroundColor="#640046";
        finalBattleSound.stop();
        gameOverSound.play();
        description[situation] += ". You fall to the ground and all goes black.";
        description[50] = description[situation];
        transitionButton1[situation] = 50;
        button1Texts[situation] = "press here";
      }
    }  
    else {
      //the protagonist has dodged the attack
      description[46] += "You try to dodge with " + dodge + " points.<br> You successfully avoid the flames.";
    }
}

// determines what happens when the player clicks on the first button depending on the situation
function actionButton1() {
  switch (situation) {
    case 0:
      document.getElementById('inventory').style.visibility = 'visible';
      document.getElementById('headers').style.visibility = 'visible';
      document.getElementById('hpPane').style.visibility = "visible";
      introductionSound.play();
      for (let i = 0; i <= 9; i++) {
        protagonist[i] = EdrinStoneguard[i];
      }
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      // the user has chosen a character
      document.getElementById("pageBackground").style.backgroundColor="#005e00";
      document.getElementById("bottomPaneBackground").style.backgroundColor="#005e00";
      myInterval = setInterval(function() {fadeOut(introductionSound)}, 400);
      break;
    case 5:
      // we save the protagonist's health points (so that they can be restored when he drinks the health potion)
      maxHP = protagonist[1];
      break;
    case 6:
      // the protagonist gives a first coin to the old man
      goldCoins -= 1;
      coinsToOldMan += 1;
      if (coinsToOldMan == 1) {
        description[6] = "The man bites the coin and quickly pockets it. Then he says: 'My children have not eaten in days, could you please spare another coin?'";
        button1Texts[6] = "give the poor man another coin";}
      else {
        transitionButton1[6] = 8;
        document.getElementById("map").src = "pictures/map.png";
        transitionButton3[9] = 0;
      }  
      break;
    case 8:
      description[9] = "The path leads to a twisted tree with bright purple leaves and splits: the main path continues on the right while a small trail starts on the left.";
      break;
    case 9:
      if (coinsToOldMan == 2) {
        // thanks to the map, the protagonist finds a small game trail
        description[10] = "Thanks to the map, you find the start of a game trail on the right of the path that was almost invisible. ";
        button1Texts[10] = "you stay on the main path";
        button2Texts[10] = "you take the narrow game trail";
        transitionButton2[10] = 13;
      }
    case 10:
      description[9] = "You have been walking for a long time when you find yourself back at the purple tree. You must have been going round in circles!<br>You hear someone chopping wood.";
    case 12:
      if (coinsToOldMan != 2) {
        description[9] = "Here is that purple tree again. You've been going round in circles!<br>You can hear that in the distance someone is chopping wood.";
        transitionButton3[9] = 6;
        button3Texts[9] = "You follow the chopping noise";
      }
      else {
        description[9] = "Here is that purple tree again. You've been going round in circles!";
        transitionButton3[9] = 0;
      }
      break;
    case 14:
      // the protagonist starts a combat against a goblin
      for (let i = 0; i <= 9; i++)
        {enemy[i] = goblin[i];}
      inCombat = true;
      battleSound.play();
      displayEnemyInfo();
      attacker = whoAttacksFirst();
      if (attacker == protagonist[0]) {
        description[15] = "You are more agile than the " + enemy[0] + " so you get to start the fight.";}
      else {
        description[15] = "Your enemy is more agile, so he gets to start the fight.";}
      break;
    case 15:
      combatTurn();
      break;
    case 16:
      // the protagonist takes a coin from the dead goblin
      goldCoins += 1;
      hideEnemyInfo();
      break;
    case 18:
      // the protagonist starts a combat against a goblin
      for (let i = 0; i <= 9; i++)
        {enemy[i] = goblin[i];}
      inCombat = true;
      battleSound.play();
      displayEnemyInfo();
      attacker = whoAttacksFirst();
      if (attacker == protagonist[0]) {
        description[19] = "You are more agile than the " + enemy[0] + " so you get to start the fight.";}
      else {
        description[19] = "Your enemy is more agile, so he gets to start the fight.";}
      break;
    case 19:
      combatTurn();
      break;
    case 20:
      hideEnemyInfo();
      break;
    case 21:
      // change the background to a darker colour because it is nightfall
      document.getElementById("pageBackground").style.backgroundColor="#003200";
      document.getElementById("bottomPaneBackground").style.backgroundColor="#003200";
      break;
    case 22:
      description[22] = "You are back in front of the bayou.";
      break;
    case 23:
      description[23] = "You are outside the cabin.";
      if (goldCoins == 0) {
        button2Texts[24] = "You decline as you have no coins and leave the cabin";
        transitionButton1[24] = 0;}
      else {
        button1Texts[24] = "You buy the health potion from the old woman and leave the cabin";
        button2Texts[24] = "You refuse politely and leave the cabin";
      }
      break;
    case 24:
      // buy a health potion from the witch for one gold coin
      haveHealthPotion = true;
      goldCoins -= 1;
      description[24] = "'Ooh look who's back! Surely he wants some potion...'";
      document.getElementById("inventoryImg3").src = "pictures/healthPotion.png";
      transitionButton1[23] = 0;
      break;
    case 25:
      // change the background colour to a dark green as it is now nightfall
      document.getElementById("pageBackground").style.backgroundColor="#003200";
      document.getElementById("bottomPaneBackground").style.backgroundColor="#003200";
      break;
    case 26:
      // plays the song of Izentarth the Red and displays the lyrics
      songSound.play();
      document.getElementById("imgFrame").style.animation="myslide 120s linear infinite";
      document.getElementById("imgFrame").style.height="1296px";
      document.getElementById("view").style.height="1296px";
      break;
    case 29:
      // the protagonist meets the mountain troll
      haltSound.play();
      if(goldCoins > 0) {
        button3Texts[30] = "You offer the troll a gold coin to let you through";
        transitionButton3[30] = 30;}
        break;
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
      // the protagonist engages in a combat aginst the mountain troll
      for (let i = 0; i <= 9; i++)
        {enemy[i] = troll[i];}
      inCombat = true;
      battleSound.volume = 1;
      battleSound.play();
      displayEnemyInfo();
      attacker = whoAttacksFirst();
      if (attacker == protagonist[0]) {
        description[35] = "You are more agile than the " + enemy[0] + " so you get to start the fight.";}
      else {
        description[35] = "Your enemy is more agile, so he gets to start the fight.";}
      break;
    case 35:
      combatTurn();
      break;
    case 36:
      hideEnemyInfo();
      break;
    case 37:
      // determines where to place the torch in the inventory
      if (haveHealthPotion == true) {
        document.getElementById("inventoryImg4").src = "pictures/torch.png";
        document.getElementById("inventoryImg4").style.visibility = "visible";}
      else {
        document.getElementById("inventoryImg3").src = "pictures/torch.png";
        document.getElementById("inventoryImg3").style.visibility = "visible";}
      break;
    case 39:
      // changes background colour as the protagonist is in a cave
      document.getElementById("pageBackground").style.backgroundColor="#2e2e2e";
      document.getElementById("bottomPaneBackground").style.backgroundColor="#2e2e2e";
      break;
    case 41:
      dragonBreathSound.play();
      break;
    case 43:
      dragonRoarSound.play();
      break;
    case 44:
      dragonRoarSound.play();
      description[45] = "The dragon must have smelt the smoke from your torch because he opens one of his eyes. He turns his head towards you, rises swiftly and releases a formidable roar. Now that he is awake, his scales emit a red glow. You have awaken Izentarth the Red!";
      break;
    case 45:
      // the protagonist engages in the final combat with the dragon 
      document.getElementById('hpPane').style.visibility = "visible";
      for (let i = 0; i <= 9; i++)
        {enemy[i] = dragon[i];}
      inCombat = true;
      finalBattleSound.play();
      displayEnemyInfo();
      showDragonAreas();
      // changes background colour to red
      document.getElementById("pageBackground").style.backgroundColor="#97000F";
      document.getElementById("bottomPaneBackground").style.backgroundColor="#97000F";
      // the protagonist launches the first assault
      attacker = protagonist[0];
      break;
    case 46:
    case 47:
    case 48:
      dragonAttacks();
      if (protagonist[1] > 0)
        {//it is now the protagonist's turn to attack
         description[situation] += "<br><br>Click again on the body part of the dragon you want to hit.";
         transitionButton1[situation] = 0;
         attacker = protagonist[0];}
      else {situation = 50;}
      break;
    case 51:
      // the protagonist wakes up and it is now morning
      myInterval = setInterval(function() {fadeOut(songSound)}, 300);
      document.getElementById("imgFrame").style.animation="";
      document.getElementById("imgFrame").style.height="400px";
      document.getElementById("view").style.height="400px";
      document.getElementById("pageBackground").style.backgroundColor="#0095dd";
      document.getElementById("bottomPaneBackground").style.backgroundColor="#0095dd";
      break;
    case 52:
      inCombat = false;
      break;
  }
  if (situation != 46 && situation != 47 && situation != 48 && situation != 50) {situation = transitionButton1[situation];}
  updatePage();
}

// determines what happens when the player clicks on the second button depending on the situation
function actionButton2() {
  switch (situation) {
    case 2:
      // the user is browsing Edrin Stoneguard
      for (let i = 0; i <= 9; i++) {
        protagonist[i] = EdrinStoneguard[i];
      }
      break;
    case 1:
    case 3:
      // the user is browsing Lysa Thornwind
      for (let i = 0; i <= 9; i++) {
        protagonist[i] = LysaThornwind[i];
      }
      break;
    case 4:
      // the user is browsing Corin Ashgleam
      for (let i = 0; i <= 9; i++) {
        protagonist[i] = CorinAshgleam[i];
      }
      break;
    case 6:
      description[9] = "The path leads to a twisted tree with bright purple leaves and splits: the main path continues on the right while a small trail starts on the left.";
      transitionButton3[9] = 0;
      break;
    case 13:
      // protagonist is ambushed and hit by the forest goblin
      protagonist[1] -= 2;
      umphSound.play();
      break;
    case 14:
      if (protagonist[2] > 5) {
        // the protagonist manages to flee from the goblin 
        description[13] = "The goblin produces a high pitch shriek and follows you but you manage to outrun him. <br>You are now back at the bridge";
        transitionButton2[13] = 0;}
      else {
        // the forest goblin catches up with the protagonist
        description[14] = "The goblin produces a high pitch shriek and runs after you. He catches you and slashes you in the back.<br><b>You lose another health point</b>Now, you must fight the goblin.";
        protagonist[1] -= 1;
        umphSound.play();
        transitionButton2[14] = 15;} 
      break;
    case 21:
      // the protagonist suffers from food poisoning (mushrooms)
      protagonist[1] -= 3;
      if (protagonist[1] <= 0) {
        //protagonist has died (poisoned by mushrooms)
        description[25] += "You were already weak so couldn't survive the poisoning.";
        button1Texts[25] = "Click here";
        transitionButton1[25] = 50;} 
      else {
        //protagonist survives the mushroom poisoning
        description[25] += "<b>You lose 3 health points</b>.";
      }
      break;
    case 24:
      description[24] = "'Ooh look who's back! Surely he wants some potion...'";
      break;
    case 33:
      // displays a text field to allow the user to enter an answer to the troll's riddle
      document.getElementById("riddleAnswer").style.visibility = "visible";
      document.getElementById("riddleAnswerButton").style.visibility = "visible";
      break;
  }
  situation = transitionButton2[situation];
  if (situation == 21) {transitionButton2[21] = 0;}
  updatePage();
}

// determines what happens when the player clicks on the third button depending on the situation
function actionButton3() {
  switch (situation) {
    case 2:
      // the user is browsing Corin Ashgleam
      for (let i = 0; i <= 9; i++) {
        protagonist[i] = CorinAshgleam[i];
      }
    break;
    case 3:
      // the user is browsing Mira Coalbrand
      for (let i = 0; i <= 9; i++) {
        protagonist[i] = MiraCoalbrand[i];
      }
    break;
    case 9:
      // the protagonist meets the old man again
      transitionButton3[9] = 6;
      if (coinsToOldMan == 0) {
        description[6] = "You find the old man hacking at a large stump with his axe: 'Hello again stranger, let me guess: you found a coin in your pocket and came back to give it to me?'";
      }
      else if (coinsToOldMan == 1) {
        description[6] = "Here's the old man chopping a dead willow. He sees you and begs: 'My children...please.'";
      }
    break;
    case 30:
      // the protagonist gives a coin to the troll
      goldCoins -= 1;
      transitionButton3[30] = 0;
      description[30] = "The troll snatches the coin but doesn't budge.";
      button1Texts[30] = "You fume and prepare to fight the troll";
    break;
    }   
  if (situation != 30) {situation = transitionButton3[situation];}
  updatePage();
}

// displays or hides the choice buttons depending on the number of options
function displayButtons() {
  if (transitionButton1[situation] != 0) {
    document.getElementById('btn1').style.visibility = 'visible';
    document.getElementById("btn1").innerHTML = "> " + button1Texts[situation];}
  else {
    document.getElementById('btn1').style.visibility = 'hidden';}
  if (transitionButton2[situation] != 0) {
    document.getElementById('btn2').style.visibility = 'visible';
    document.getElementById("btn2").innerHTML = "> " + button2Texts[situation];}
  else {
    document.getElementById('btn2').style.visibility = 'hidden';}
  if (transitionButton3[situation] != 0) {
    document.getElementById('btn3').style.visibility = 'visible';
    document.getElementById("btn3").innerHTML = "> " + button3Texts[situation];}
  else {
    document.getElementById('btn3').style.visibility = 'hidden';}
  }

// refreshes the page
function updatePage() {
  if (situation != 0) {
    //draw health points
    drawHealthPoints(nbMaxHealthPoints); 
    //update characterInfo
    displayCharacterInfo();
  }

  //update scene
  var sceneName = 'scenes/scene' + situation.toString() + '.jpg';
  document.getElementById("view").src = sceneName;

  //update description
  document.getElementById("paraDesc").innerHTML = description[situation];

  //update menu
  displayButtons();
}

//The main program

document.getElementById('inventory').style.visibility = 'hidden';
document.getElementById('headers').style.visibility = 'hidden';

//hide enemy health points pane (at the start of the game)
document.getElementById('enemyHpPane').style.visibility = 'hidden';

updatePage();