import "./index.js";

game.noteToNumberConverter = (noteLetter) => {
    
    // if(latestPitch !== undefined && latestPitch !== "NaN"){
    //     game.user.id.latestPitch.noteHz = latestPitch + " ";
    //   }
    //   let latestPitchNote;
    //   let latestOctaveNote;

    //   let pitchLetterDisplayDOM = document.getElementById("pitchDisplayLetter");
    //   let pitchOctaveDisplayDOM = document.getElementById("pitchDisplayOctave");
    let convertedobject = {
        mingusNumNote: null,
        keyNotePiano: null,
        keyNoteOrgan: null,
        midiNoteNumber: null
    }
    switch (noteLetter) {
        case "C_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 0;
            break;
        case "C#_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 1;
            break;
        case"D_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 2;
            break;
        case "D#_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 3;
            break;
        case "E_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 4;
            break;  
        case "F_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 5;
            break;
        case "F#_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 6;
            break;
        case "G_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 7;
            break; 
        case "G#_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 8;
            break;
        case "A_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 9;
            break;
        case "A#_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 10;
            break;
        case "B_-1":
            convertedobject.mingusNumNote = undefined;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 11;
            break;
        case "C_0":
            convertedobject.mingusNumNote = 0;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 12;
            break;
        case "C#_0":
            convertedobject.mingusNumNote = 1;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 13;
            break;
        case "D_0":
            convertedobject.mingusNumNote = 2;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 14;
            break;
        case "D#_0":
            convertedobject.mingusNumNote = 3;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 15;
            break;
        case "E_0":
            convertedobject.mingusNumNote = 4;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 16;
            break;
        case "F_0":
            convertedobject.mingusNumNote = 5;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 17;
            break;
        case "F#_0":
            convertedobject.mingusNumNote = 6;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 18;
            break;
        case "G_0":
            convertedobject.mingusNumNote = 7;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 19;
            break;
        case "G#_0":
            convertedobject.mingusNumNote = 8;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 20;
            break;
        case "A_0":
            convertedobject.mingusNumNote = 9;
            convertedobject.keyNotePiano = 1;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 21;
            break;
        case "A#_0":
            convertedobject.mingusNumNote = 10;
            convertedobject.keyNotePiano = 2;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 22;
            break;
        case "B_0":
            convertedobject.mingusNumNote = 11;
            convertedobject.keyNotePiano = 3;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber= 23;
            break;
        case "C_1":
            convertedobject.mingusNumNote = 12;
            convertedobject.keyNotePiano = 4;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 24;
            break;
        case "C#_1":
            convertedobject.mingusNumNote = 13;
            convertedobject.keyNotePiano = 5;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 25;
            break;
        case "D_1":
            convertedobject.mingusNumNote = 14;
            convertedobject.keyNotePiano = 6;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 26;
            break;
        case "D#_1":
            convertedobject.mingusNumNote = 15;
            convertedobject.keyNotePiano = 7;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 27;
            break;
        case "E_1":
            convertedobject.mingusNumNote = 16;
            convertedobject.keyNotePiano = 8;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 28;
            break;
        case "F_1":
            convertedobject.mingusNumNote = 17;
            convertedobject.keyNotePiano = 9;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 29;
            break;
        case "F#_1":
            convertedobject.mingusNumNote = 18;
            convertedobject.keyNotePiano = 10;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 30;
            break;
        case "G_1":
            convertedobject.mingusNumNote = 19;
            convertedobject.keyNotePiano = 11;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 31;
            break;
        case "G#_1":
            convertedobject.mingusNumNote = 20;
            convertedobject.keyNotePiano = 12;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 32;
            break;
        case "A_1":
            convertedobject.mingusNumNote = 21;
            convertedobject.keyNotePiano = 13;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 33;
            break;
        case "A#_1":
            convertedobject.mingusNumNote = 22;
            convertedobject.keyNotePiano = 14;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 34;
            break;
        case "B_1":
            convertedobject.mingusNumNote = 23;
            convertedobject.keyNotePiano = 15;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 35;
            break;
        case "C_2":
            convertedobject.mingusNumNote = 24;
            convertedobject.keyNotePiano = 16;
            convertedobject.keyNoteOrgan = 1;
            convertedobject.midiNoteNumber = 36;
            break;
        case "C#_2":
            convertedobject.mingusNumNote = 25;
            convertedobject.keyNotePiano = 17;
            convertedobject.keyNoteOrgan = 2;
            convertedobject.midiNoteNumber = 37;
            break;
        case "D_2":
            convertedobject.mingusNumNote = 26;
            convertedobject.keyNotePiano = 18;
            convertedobject.keyNoteOrgan = 3;
            convertedobject.midiNoteNumber = 38;
            break;
        case "D#_2":
            convertedobject.mingusNumNote = 27;
            convertedobject.keyNotePiano = 19;
            convertedobject.keyNoteOrgan = 4;
            convertedobject.midiNoteNumber = 39;
            break;
        case "E_2":
            convertedobject.mingusNumNote = 28;
            convertedobject.keyNotePiano = 20;
            convertedobject.keyNoteOrgan = 5;
            convertedobject.midiNoteNumber = 40;
            break;
        case "F_2":
            convertedobject.mingusNumNote = 29;
            convertedobject.keyNotePiano = 21;
            convertedobject.keyNoteOrgan = 6;
            convertedobject.midiNoteNumber = 41;
            break;
        case "F#_2":
            convertedobject.mingusNumNote = 30;
            convertedobject.keyNotePiano = 22;
            convertedobject.keyNoteOrgan = 7;
            convertedobject.midiNoteNumber = 42;
            break;
        case "G_2":
            convertedobject.mingusNumNote = 31;
            convertedobject.keyNotePiano = 23;
            convertedobject.keyNoteOrgan = 8;
            convertedobject.midiNoteNumber = 43;
            break;
        case "G#_2":
            convertedobject.mingusNumNote = 32;
            convertedobject.keyNotePiano = 24;
            convertedobject.keyNoteOrgan = 9;
            convertedobject.midiNoteNumber = 44;
            break;
        case "A_2":
            convertedobject.mingusNumNote = 33;
            convertedobject.keyNotePiano = 25;
            convertedobject.keyNoteOrgan = 10;
            convertedobject.midiNoteNumber = 45;
            break;
        case "A#_2":
            convertedobject.mingusNumNote = 34;
            convertedobject.keyNotePiano = 26;
            convertedobject.keyNoteOrgan = 11;
            convertedobject.midiNoteNumber = 46;
            break;
        case "B_2":
            convertedobject.mingusNumNote = 35;
            convertedobject.keyNotePiano = 27;
            convertedobject.keyNoteOrgan = 12;
            convertedobject.midiNoteNumber = 47;
            break;
        case "C_3":
            convertedobject.mingusNumNote = 36;
            convertedobject.keyNotePiano = 28;
            convertedobject.keyNoteOrgan = 13;
            convertedobject.midiNoteNumber = 48;
            break;
        case "C#_3":
            convertedobject.mingusNumNote = 37;
            convertedobject.keyNotePiano = 29;
            convertedobject.keyNoteOrgan = 14;
            convertedobject.midiNoteNumber = 49;
            break;
        case "D_3":
            convertedobject.mingusNumNote = 38;
            convertedobject.keyNotePiano = 30;
            convertedobject.keyNoteOrgan = 15;
            convertedobject.midiNoteNumber = 50;
            break;
        case "D#_3":
            convertedobject.mingusNumNote = 39;
            convertedobject.keyNotePiano = 31;
            convertedobject.keyNoteOrgan = 16;
            convertedobject.midiNoteNumber = 51;
            break;
        case "E_3":
            convertedobject.mingusNumNote = 40;
            convertedobject.keyNotePiano = 32;
            convertedobject.keyNoteOrgan = 17;
            convertedobject.midiNoteNumber = 52;
            break;
        case "F_3":
            convertedobject.mingusNumNote = 41;
            convertedobject.keyNotePiano = 33;
            convertedobject.keyNoteOrgan = 18;
            convertedobject.midiNoteNumber = 53;
            break;
        case "F#_3":
            convertedobject.mingusNumNote = 42;
            convertedobject.keyNotePiano = 34;
            convertedobject.keyNoteOrgan = 19;
            convertedobject.midiNoteNumber = 54;
            break;
        case "G_3":
            convertedobject.mingusNumNote = 43;
            convertedobject.keyNotePiano = 35;
            convertedobject.keyNoteOrgan = 20;
            convertedobject.midiNoteNumber = 55;
        break;
        case "G#_3":
            convertedobject.mingusNumNote = 44;
            convertedobject.keyNotePiano = 36;
            convertedobject.keyNoteOrgan = 21;
            convertedobject.midiNoteNumber = 56;
            break;
        case "A_3":
            convertedobject.mingusNumNote = 45;
            convertedobject.keyNotePiano = 37;
            convertedobject.keyNoteOrgan = 22;
            convertedobject.midiNoteNumber = 57;
            break;
        case "A#_3":
            convertedobject.mingusNumNote = 46;
            convertedobject.keyNotePiano = 38;
            convertedobject.keyNoteOrgan = 23;
            convertedobject.midiNoteNumber = 58;
            break;
        case "B_3":
            convertedobject.mingusNumNote = 47;
            convertedobject.keyNotePiano = 39;
            convertedobject.keyNoteOrgan = 24;
            convertedobject.midiNoteNumber = 59;
            break;
    
        case "C_4":
            convertedobject.mingusNumNote = 48;
            convertedobject.keyNotePiano = 40;
            convertedobject.keyNoteOrgan = 25;
            convertedobject.midiNoteNumber = 60;
            break;
        case "C#_4":
            convertedobject.mingusNumNote = 49;
            convertedobject.keyNotePiano = 41;
            convertedobject.keyNoteOrgan = 26;
            convertedobject.midiNoteNumber = 61;
            break;
        case "D_4":
            convertedobject.mingusNumNote = 50;
            convertedobject.keyNotePiano = 42;
            convertedobject.keyNoteOrgan = 27;
            convertedobject.midiNoteNumber = 62;
            break;
        case "D#_4":
            convertedobject.mingusNumNote = 51;
            convertedobject.keyNotePiano = 43;
            convertedobject.keyNoteOrgan = 28;
            convertedobject.midiNoteNumber = 63;
            break;
        case "E4":
            convertedobject.mingusNumNote = 52;
            convertedobject.keyNotePiano = 44;
            convertedobject.keyNoteOrgan = 29;
            convertedobject.midiNoteNumber = 64;
            break;
        case "F_4":
            convertedobject.mingusNumNote = 53;
            convertedobject.keyNotePiano = 45;
            convertedobject.keyNoteOrgan = 30;
            convertedobject.midiNoteNumber = 65;
            break;
        case "F#_4":
            convertedobject.mingusNumNote = 54;
            convertedobject.keyNotePiano = 46;
            convertedobject.keyNoteOrgan = 31;
            convertedobject.midiNoteNumber = 66;
            break;
        case "G_4":
            convertedobject.mingusNumNote = 55;
            convertedobject.keyNotePiano = 47;
            convertedobject.keyNoteOrgan = 32;
            convertedobject.midiNoteNumber = 67;
            break;
        case "G#_4":
            convertedobject.mingusNumNote = 56;
            convertedobject.keyNotePiano = 48;
            convertedobject.keyNoteOrgan = 33;
            convertedobject.midiNoteNumber = 68;
            break;
        case "A_4":
            convertedobject.mingusNumNote = 57;
            convertedobject.keyNotePiano = 49;
            convertedobject.keyNoteOrgan = 34;
            convertedobject.midiNoteNumber = 69;
            break;
        case "A#_4":
            convertedobject.mingusNumNote = 58;
            convertedobject.keyNotePiano = 50;
            convertedobject.keyNoteOrgan = 35;
            convertedobject.midiNoteNumber = 70;
            break;
        case "B_4":
            convertedobject.mingusNumNote = 59;
            convertedobject.keyNotePiano = 51;
            convertedobject.keyNoteOrgan = 36;
            convertedobject.midiNoteNumber = 71;
            break;
        case "C_5":
            convertedobject.mingusNumNote = 60;
            convertedobject.keyNotePiano = 52;
            convertedobject.keyNoteOrgan = 37;
            convertedobject.midiNoteNumber = 72;
            break;
        case "C#_5":
            convertedobject.mingusNumNote = 61;
            convertedobject.keyNotePiano = 53;
            convertedobject.keyNoteOrgan = 38;
            convertedobject.midiNoteNumber = 73;
            break;
        case "D_5":
            convertedobject.mingusNumNote = 62;
            convertedobject.keyNotePiano = 54;
            convertedobject.keyNoteOrgan = 39;
            convertedobject.midiNoteNumber = 74;
            break;
        case "D#_5":
            convertedobject.mingusNumNote = 63;
            convertedobject.keyNotePiano = 55;
            convertedobject.keyNoteOrgan = 40;
            convertedobject.midiNoteNumber = 75;
            break;
        case "E_5":
            convertedobject.mingusNumNote = 64;
            convertedobject.keyNotePiano = 56;
            convertedobject.keyNoteOrgan = 41;
            convertedobject.midiNoteNumber = 76;
            break;
        case "F_5":
            convertedobject.mingusNumNote = 65;
            convertedobject.keyNotePiano = 57;
            convertedobject.keyNoteOrgan = 42;
            convertedobject.midiNoteNumber = 77;
            break;
        case "F#_5":
            convertedobject.mingusNumNote = 66;
            convertedobject.keyNotePiano = 58;
            convertedobject.keyNoteOrgan = 43;
            convertedobject.midiNoteNumber = 78;
            break;
        case "G_5":
            convertedobject.mingusNumNote = 67;
            convertedobject.keyNotePiano = 59;
            convertedobject.keyNoteOrgan = 44;
            convertedobject.midiNoteNumber = 79;
            break;
        case "G#_5":
            convertedobject.mingusNumNote = 68;
            convertedobject.keyNotePiano = 60;
            convertedobject.keyNoteOrgan = 45;
            convertedobject.midiNoteNumber = 80;
            break;
        case "A_5":
            convertedobject.mingusNumNote = 69;
            convertedobject.keyNotePiano = 61;
            convertedobject.keyNoteOrgan = 46;
            convertedobject.midiNoteNumber = 81;
            break;
        case "A#_5":
            convertedobject.mingusNumNote = 70;
            convertedobject.keyNotePiano = 62;
            convertedobject.keyNoteOrgan = 47;
            convertedobject.midiNoteNumber = 82;
            break;
        case "B_5":
            convertedobject.mingusNumNote = 71;
            convertedobject.keyNotePiano = 63;
            convertedobject.keyNoteOrgan = 48;
            convertedobject.midiNoteNumber = 83;
            break;
        case "C_6":
            convertedobject.mingusNumNote = 72;
            convertedobject.keyNotePiano = 64;
            convertedobject.keyNoteOrgan = 49;
            convertedobject.midiNoteNumber = 84;
            break;
        case "C#_6":
            convertedobject.mingusNumNote = 73;
            convertedobject.keyNotePiano = 65;
            convertedobject.keyNoteOrgan = 50;
            convertedobject.midiNoteNumber = 85;
            break;
        case "D_6":
            convertedobject.mingusNumNote = 74;
            convertedobject.keyNotePiano = 66;
            convertedobject.keyNoteOrgan = 51;
            convertedobject.midiNoteNumber = 86;
            break;
        case "D#_6":
            convertedobject.mingusNumNote = 75;
            convertedobject.keyNotePiano = 67;
            convertedobject.keyNoteOrgan = 52;
            convertedobject.midiNoteNumber = 87;
            break;
        case "E_6":
            convertedobject.mingusNumNote = 76;
            convertedobject.keyNotePiano = 68;
            convertedobject.keyNoteOrgan = 53;
            convertedobject.midiNoteNumber = 88;
            break;
        case "F_6":
            convertedobject.mingusNumNote = 77;
            convertedobject.keyNotePiano = 69;
            convertedobject.keyNoteOrgan = 54;
            convertedobject.midiNoteNumber = 89;
            break;
        case "F#_6":
            convertedobject.mingusNumNote = 78;
            convertedobject.keyNotePiano = 70;
            convertedobject.keyNoteOrgan = 55;
            convertedobject.midiNoteNumber = 90;
            break;
        case "G_6":
            convertedobject.mingusNumNote = 79;
            convertedobject.keyNotePiano = 71;
            convertedobject.keyNoteOrgan = 56;
            convertedobject.midiNoteNumber = 91;
            break;
        case "G#_6":
            convertedobject.mingusNumNote = 80;
            convertedobject.keyNotePiano = 72;
            convertedobject.keyNoteOrgan = 57;
            convertedobject.midiNoteNumber = 92;
            break;
        case "A_6":
            convertedobject.mingusNumNote = 81;
            convertedobject.keyNotePiano = 73;
            convertedobject.keyNoteOrgan = 58;
            convertedobject.midiNoteNumber = 93;
            break;
        case "A#_6":
            convertedobject.mingusNumNote = 82;
            convertedobject.keyNotePiano = 74;
            convertedobject.keyNoteOrgan = 59;
            convertedobject.midiNoteNumber = 94;
            break;
        case "B_6":
            convertedobject.mingusNumNote = 83;
            convertedobject.keyNotePiano = 75;
            convertedobject.keyNoteOrgan = 60;
            convertedobject.midiNoteNumber = 95;
            break;
        case "C_7":
            convertedobject.mingusNumNote = 84;
            convertedobject.keyNotePiano = 76;
            convertedobject.keyNoteOrgan = 61;
            convertedobject.midiNoteNumber = 96;
            break;
        case "C#_7":
            convertedobject.mingusNumNote = 85;
            convertedobject.keyNotePiano = 77;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 97;
            break;
        case "D_7":
            convertedobject.mingusNumNote = 86;
            convertedobject.keyNotePiano = 78;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 98;
            break;
        case "D#_7":
            convertedobject.mingusNumNote = 87;
            convertedobject.keyNotePiano = 79;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 99;
            break;
        case "E_7":
            convertedobject.mingusNumNote = 88;
            convertedobject.keyNotePiano = 80;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 100;
            break;
        case "F_7":
            convertedobject.mingusNumNote = 89;
            convertedobject.keyNotePiano = 81;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 101;
            break;
        case "F#_7":
            convertedobject.mingusNumNote = 90;
            convertedobject.keyNotePiano = 82;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 102;
            break;
        case "G_7":
            convertedobject.mingusNumNote = 91;
            convertedobject.keyNotePiano = 83;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 103;
            break;
        case "G#_7":
            convertedobject.mingusNumNote = 92;
            convertedobject.keyNotePiano = 84;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 104;
            break;
        case "A_7":
            convertedobject.mingusNumNote = 93;
            convertedobject.keyNotePiano = 85;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 105;
            break;
        case "A#_7":
            convertedobject.mingusNumNote = 94;
            convertedobject.keyNotePiano = 86;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 106;
            break;
        case "B_7":
            convertedobject.mingusNumNote = 95;
            convertedobject.keyNotePiano = 87;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 107;
            break;
        case "C_8":
            convertedobject.mingusNumNote = 96;
            convertedobject.keyNotePiano = 88;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 108;
            break;
        case "C#_8":
            convertedobject.mingusNumNote = 97;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 109;
            break;
        case "D_8":
            convertedobject.mingusNumNote = 98;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 110;
            break;
        case "D#_8":
            convertedobject.mingusNumNote = 99;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 111;
            break;
        case "E_8":
            convertedobject.mingusNumNote = 100;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 112;
            break;
        case "F_8":
            convertedobject.mingusNumNote = 101;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 113;
            break;
        case "F#_8":
            convertedobject.mingusNumNote = 102;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 114;
            break;
        case "G_8":
            convertedobject.mingusNumNote = 103;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 115;
            break;
        case "G#_8":
            convertedobject.mingusNumNote = 104;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 116;
            break;
        case "A_8":
            convertedobject.mingusNumNote = 105;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 117;
            break;
        case "A#_8":
            convertedobject.mingusNumNote = 106;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 118;
            break;
        case "B_8":
            convertedobject.mingusNumNote = 107;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 119;
            break;
        case "C_9":
            convertedobject.mingusNumNote = 108;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 120;
            break; 
        case "C#_9":
            convertedobject.mingusNumNote = 109;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 121;
            break;
        case "D_9":
            convertedobject.mingusNumNote = 110;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 122;
            break;
        case "D#_9":
            convertedobject.mingusNumNote = 111;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 123;
            break;
        case "E_9":
            convertedobject.mingusNumNote = 112;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 124;
            break;
        case "F_9":
            convertedobject.mingusNumNote = 113;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 125;
            break;
        case "F#_9":
            convertedobject.mingusNumNote = 114;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 126;
            break;
        case "G_9":
            convertedobject.mingusNumNote = 115;
            convertedobject.keyNotePiano = undefined;
            convertedobject.keyNoteOrgan = undefined;
            convertedobject.midiNoteNumber = 127;
            break;
        default:
            // convertedobject.mingusNumNote = undefined;
            // convertedobject.keyNotePiano = undefined;
            // convertedobject.keyNoteOrgan = undefined;
            // convertedobject.midiNoteNumber = undefined;
      }
      return convertedobject;
};