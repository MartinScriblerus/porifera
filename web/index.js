const game = {};

game.user = game.user || {};
game.room = game.room || {};
game.animation = game.animation || {};
game.user.id = game.user.id || {};
game.room.id = game.room.id || {};
game.user = game.user || {};


game.user.samplesArr = game.user.samplesArr || [];

game.room.id.delta = game.room.id.delta || 0;

game.room.id.isPaused = game.room.id.isPaused || false;

game.user.id.player = game.user.id.player || {};

game.user.id.latestPitch = game.user.id.latestPitch || {};
game.user.id.latestPitch.noteHz = game.user.id.latestPitch.noteHz || null;
game.user.id.latestPitch.noteLetter = game.user.id.latestPitch.noteHz || null;
game.user.id.latestOctave = game.user.id.latestOctave || {};
game.user.id.latestOctave.octave = game.user.id.latestOctave.octave || null;
game.user.id.latestMingusNumNote = game.user.id.latestMingusNumNote || null;
game.user.id.latestKeyNotePiano = game.user.id.latestKeyNotePiano || null;
game.user.id.latestKeyNoteOrgan = game.user.id.latestKeyNoteOrgan || null;
game.user.id.latestMidiNoteNumber = game.user.id.latestMidiNoteNumber || null;
game.room.id.lowestNoteOnScreen = game.room.id.lowestNoteOnScreen || 0;
game.room.id.highestNoteOnScreen = game.room.id.highestNoteOnScreen || 0;

game.room.id.previousTick = game.room.id.previousTick || window.__emscripten_date_now();
game.room.id.nextTick = game.room.id.delta + game.room.id.previousTick;
game.room.id.startGameTick = game.room.id.startGameTick || null;
game.room.id.expectedDelta = game.room.id.expectedDelta || 1000;
game.room.id.lastDiff = game.room.id.lastDiff || 0;
game.room.id.previousMeasureTick = game.room.id.previousMeasureTick || null;
game.room.id.measure = game.room.id.measure || 0;
game.room.id.measureBegin = game.room.id.measureBegin || null;

game.room.id.intervalTickBoxes = game.room.id.intervalTickBoxes || [];
game.room.id.timeGroup = game.room.id.timeGroup || 0;

// game.room.id.timeTickMeasureStart = game.room.id.timeTickMeasureStart || null;
// game.room.id.timeTickNext =  game.room.id.timeTickMeasureStart * (4 * (game.room.id.bpmInverted/120)) || game.room.id.expectedDelta/4;

game.room.id.timeTick2 = game.room.id.timeTick2 || false;
game.room.id.timeTick3 = game.room.id.timeTick3 || false;

game.room.id.analysisTimeBucket = game.room.id.analysisTimeBucket || 0;
game.room.id.targetOctaveRange = game.room.id.targetOctaveRange || 4;
game.room.id.targetOctave = game.room.id.targetOctave || 4
game.room.id.targetKey = game.room.id.targetKey|| "C";
game.room.id.targetNote = game.room.id.targetNote|| game.room.id.targetKey;
game.room.id.targetScale = game.room.id.targetScale|| "Major";
game.room.id.scalePosition = game.room.id.scalePosition || 0;
game.room.id.bpmInverted = game.room.id.bpmInverted || 120;
game.room.id.boxAnimationAcrossScreen =  game.room.id.boxAnimationAcrossScreen || ((60/(120 *120/game.room.id.bpmInverted)) * 4000);

game.room.id.recommendationsScale = game.room.id.recommendationsScale || {};
// game.room.id.recommendationsScale.basic_keys_ascending = game.room.id.recommendationsScale.basic_keys_ascending || {};
// game.room.id.recommendationsScale.basic_keys_ascending.basic_keys = game.room.id.recommendationsScale.basic_keys_ascending.basic_keys || []; 
game.room.id.recommendationsScale.ascending = game.room.id.recommendationsScale.ascending || [];
game.room.id.recommendationsScale.descending = game.room.id.recommendationsScale.descending || []; 
// game.room.id.recommendationsScale.ascending = game.room.id.recommendationsScale.ascending || [];
// game.room.id.recommendationsScale.descending = game.room.id.recommendationsScale.descending || []; 
// game.user.id.audioDevice = game.user.id.audioDevice || '';
game.audioInputMode = game.audioInputMode || "midi";
game.user.id.audioDevice = game.user.id.audioDevice || {};
game.gameMode = game.gameMode || "Practice";

game.user.id.isPlaying = game.user.id.isPlaying || false;
game.user.id.timeRecordingStart = game.user.id.timeRecordingStart || 0;
game.user.id.timeRecordingStart = window.__emscripten_date_now(); 

game.user.id.toPy = game.user.id.toPy || undefined;


game.countNumerator = game.countNumerator || 4;
game.countDenominator = game.countDenominator || 4;
game.currentCount = game.currentCount || 0;

window.onscroll = () => { window.scroll(0, 0); };
console.log("we do hit index.js even though nothing is here **** ");



