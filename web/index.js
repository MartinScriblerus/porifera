const game = {};
game.user = game.user || {};
game.user.audioDevice = game.user.audioDevice || '';
game.user.timeRecordingStart = game.user.timeRecordingStart || 0;
game.user.timeRecordingStart = window.__emscripten_date_now(); 
game.user.isPlaying = game.user.isPlaying || false;
window.onscroll = () => { window.scroll(0, 0); };
console.log("we do hit index.js even though nothing is here **** ");

async function main(){
    console.log("hit this MAIN!_______________ !!!");
};