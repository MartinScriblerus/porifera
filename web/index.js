const game = {};

game.user = game.user || {};
game.room = game.room || {};
game.animation = game.animation || {};
game.user.id = game.user.id || {};
game.room.id = game.room.id || {};
game.user = game.user || {};

game.room.id.delta = game.room.id.delta || 0;
game.user.samplesArr = game.user.samplesArr || [];

game.user.id.latestPitch = game.user.id.latestPitch || {};

// game.user.id.audioDevice = game.user.id.audioDevice || '';
game.audioInputMode = game.audioInputMode || "midi";
game.user.id.audioDevice = game.user.id.audioDevice || {};
game.gameMode = game.gameMode || "Practice";

game.user.id.isPlaying = game.user.id.isPlaying || false;
game.user.id.timeRecordingStart = game.user.id.timeRecordingStart || 0;
game.user.id.timeRecordingStart = window.__emscripten_date_now(); 

game.room.id.startGameTick = game.room.id.startGameTick || null;
game.room.id.previousTick = game.room.id.previousTick || window.__emscripten_date_now();

game.room.id.analysisTimeBucket = game.room.id.analysisTimeBucket || 0;
game.room.id.targetOctaveRange = game.room.id.targetOctaveRange || 4;
game.room.id.targetOctave = game.room.id.targetOctave || 4
game.room.id.targetKey = game.room.id.targetKey|| "C";
game.room.id.targetScale = game.room.id.targetScale|| "Major";
game.room.id.scalePosition = game.room.id.scalePosition || null;
game.room.id.bpm = game.room.id.bpm || 120;

game.user.id.toPy = game.user.id.toPy || undefined;

game.oneCount = game.oneCount || false;
game.twoCount = game.twoCount || false;
game.threeCount = game.threeCount || false;
game.fourCount = game.fourCount || false;

window.onscroll = () => { window.scroll(0, 0); };
console.log("we do hit index.js even though nothing is here **** ");



