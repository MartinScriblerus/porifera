const game = {};

game.user = game.user || {};
game.room = game.room || {};
game.animation = game.animation || {};
game.user.id = game.user.id || {};
game.room.id = game.room.id || {};
game.user = game.user || {};


game.user.samplesArr = game.user.samplesArr || [];

game.room.id.delta = game.room.id.delta || 0;

game.user.id.latestPitch = game.user.id.latestPitch || {};
game.user.id.latestPitch.noteHz = game.user.id.latestPitch.noteHz || null;
game.user.id.latestPitch.noteLetter = game.user.id.latestPitch.noteHz || null;
game.user.id.latestOctave = game.user.id.latestOctave || {};
game.user.id.latestOctave.octave = game.user.id.latestOctave.octave || null;
game.user.id.latestMingusNumNote = game.user.id.latestMingusNumNote || null;
game.user.id.latestKeyNotePiano = game.user.id.latestKeyNotePiano || null;
game.user.id.latestKeyNoteOrgan = game.user.id.latestKeyNoteOrgan || null;
game.user.id.latestMidiNoteNumber = game.user.id.latestMidiNoteNumber || null;

game.room.id.previousTick = game.room.id.previousTick || window.__emscripten_date_now();
game.room.id.nextTick = game.room.id.delta + game.room.id.previousTick;
game.room.id.startGameTick = game.room.id.startGameTick || null;

game.room.id.intervalTickBoxes = game.room.id.intervalTickBoxes || [];
game.room.id.timeGroup = game.room.id.timeGroup || 0;

game.room.id.analysisTimeBucket = game.room.id.analysisTimeBucket || 0;
game.room.id.targetOctaveRange = game.room.id.targetOctaveRange || 4;
game.room.id.targetOctave = game.room.id.targetOctave || 4
game.room.id.targetKey = game.room.id.targetKey|| "C";
game.room.id.targetScale = game.room.id.targetScale|| "Major";
game.room.id.scalePosition = game.room.id.scalePosition || 0;
game.room.id.bpm = game.room.id.bpm || 120;
game.room.id.boxAnimationAcrossScreen =  game.room.id.boxAnimationAcrossScreen || ((60/(120 *120/game.room.id.bpm)) * 4000);

game.room.id.recommendationsScale = game.room.id.recommendationsScale || {};
game.room.id.recommendationsScale.ascending = game.room.id.recommendationsScale.ascending || [];
game.room.id.recommendationsScale.descending = game.room.id.recommendationsScale.descending || []; 
// game.user.id.audioDevice = game.user.id.audioDevice || '';
game.audioInputMode = game.audioInputMode || "midi";
game.user.id.audioDevice = game.user.id.audioDevice || {};
game.gameMode = game.gameMode || "Practice";

game.user.id.isPlaying = game.user.id.isPlaying || false;
game.user.id.timeRecordingStart = game.user.id.timeRecordingStart || 0;
game.user.id.timeRecordingStart = window.__emscripten_date_now(); 

game.user.id.toPy = game.user.id.toPy || undefined;

game.countNominator = game.countNominator || 4;
game.countDenominator = game.countDenominator || 4;
game.currentCount = game.currentCount || 0;

window.onscroll = () => { window.scroll(0, 0); };
console.log("we do hit index.js even though nothing is here **** ");



