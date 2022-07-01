
/*
Code generated with Faust version 2.40.5
Compilation options: -lang wasm-ib -cn bubble -es 1 -mcd 16 -single -ftz 2 
*/

function getJSONbubble() {
	return '{"name": "bubble","filename": "bubble.dsp","version": "2.40.5","compile_options": "-lang wasm-ib -cn bubble -es 1 -mcd 16 -single -ftz 2","library_list": ["/usr/local/share/faust/stdfaust.lib","/usr/local/share/faust/demos.lib","/usr/local/share/faust/reverbs.lib","/usr/local/share/faust/maths.lib","/usr/local/share/faust/platform.lib","/usr/local/share/faust/filters.lib","/usr/local/share/faust/delays.lib","/usr/local/share/faust/oscillators.lib","/usr/local/share/faust/basics.lib","/usr/local/share/faust/signals.lib"],"include_pathnames": ["/usr/local/share/faust","/usr/local/share/faust","/usr/share/faust",".","/Users/matthewreilly/Desktop/porifera/web"],"size": 848356,"inputs": 0,"outputs": 2,"meta": [ { "basics.lib/name": "Faust Basic Element Library" },{ "basics.lib/version": "0.6" },{ "compile_options": "-lang wasm-ib -cn bubble -es 1 -mcd 16 -single -ftz 2" },{ "copyright": "(c) 2017: Yann Orlarey, GRAME" },{ "delays.lib/name": "Faust Delay Library" },{ "delays.lib/version": "0.1" },{ "demos.lib/name": "Faust Demos Library" },{ "demos.lib/version": "0.1" },{ "description": "Production of a water drop bubble sound." },{ "filename": "bubble.dsp" },{ "filters.lib/allpass_comb:author": "Julius O. Smith III" },{ "filters.lib/allpass_comb:copyright": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/allpass_comb:license": "MIT-style STK-4.3 license" },{ "filters.lib/lowpass0_highpass1": "Copyright (C) 2003-2019 by Julius O. Smith III <jos@ccrma.stanford.edu>" },{ "filters.lib/name": "Faust Filters Library" },{ "filters.lib/version": "0.3" },{ "license": "MIT" },{ "maths.lib/author": "GRAME" },{ "maths.lib/copyright": "GRAME" },{ "maths.lib/license": "LGPL with exception" },{ "maths.lib/name": "Faust Math Library" },{ "maths.lib/version": "2.5" },{ "name": "bubble" },{ "oscillators.lib/name": "Faust Oscillator Library" },{ "oscillators.lib/version": "0.3" },{ "platform.lib/name": "Generic Platform Library" },{ "platform.lib/version": "0.2" },{ "reverbs.lib/name": "Faust Reverb Library" },{ "reverbs.lib/version": "0.2" },{ "signals.lib/name": "Faust Signal Routing Library" },{ "signals.lib/version": "0.1" }],"ui": [ {"type": "vgroup","label": "bubble","items": [ {"type": "hgroup","label": "Freeverb","items": [ {"type": "vgroup","label": "0x00","meta": [{ "0": "" }],"items": [ {"type": "vslider","label": "Damp","address": "/bubble/Freeverb/0x00/Damp","index": 262160,"meta": [{ "0": "" },{ "style": "knob" },{ "tooltip": "Somehow control the         density of the reverb." }],"init": 0.5,"min": 0,"max": 1,"step": 0.025},{"type": "vslider","label": "RoomSize","address": "/bubble/Freeverb/0x00/RoomSize","index": 262152,"meta": [{ "1": "" },{ "style": "knob" },{ "tooltip": "The room size         between 0 and 1 with 1 for the largest room." }],"init": 0.5,"min": 0,"max": 1,"step": 0.025},{"type": "vslider","label": "Stereo Spread","address": "/bubble/Freeverb/0x00/Stereo Spread","index": 586040,"meta": [{ "2": "" },{ "style": "knob" },{ "tooltip": "Spatial         spread between 0 and 1 with 1 for maximum spread." }],"init": 0.5,"min": 0,"max": 1,"step": 0.01}]},{"type": "vslider","label": "Wet","address": "/bubble/Freeverb/Wet","index": 262172,"meta": [{ "1": "" },{ "tooltip": "The amount of reverb applied to the signal         between 0 and 1 with 1 for the maximum amount of reverb." }],"init": 0.3333,"min": 0,"max": 1,"step": 0.025}]},{"type": "vgroup","label": "bubble","items": [ {"type": "hslider","label": "freq","address": "/bubble/bubble/freq","index": 262180,"init": 600,"min": 150,"max": 2000,"step": 1}]},{"type": "button","label": "drop","address": "/bubble/drop","index": 262184}]}]}';
}
function getBase64Codebubble() { return "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cnMubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9iYXNpY3MubGliIiwiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdC9zaWduYWxzLmxpYiJdLCJpbmNsdWRlX3BhdGhuYW1lcyI6IFsiL3Vzci9sb2NhbC9zaGFyZS9mYXVzdCIsIi91c3IvbG9jYWwvc2hhcmUvZmF1c3QiLCIvdXNyL3NoYXJlL2ZhdXN0IiwiLiIsIi9Vc2Vycy9tYXR0aGV3cmVpbGx5L0Rlc2t0b3AvcG9yaWZlcmEvd2ViIl0sInNpemUiOiA4NDgzNTYsImlucHV0cyI6IDAsIm91dHB1dHMiOiAyLCJtZXRhIjogWyB7ICJiYXNpY3MubGliL25hbWUiOiAiRmF1c3QgQmFzaWMgRWxlbWVudCBMaWJyYXJ5IiB9LHsgImJhc2ljcy5saWIvdmVyc2lvbiI6ICIwLjYiIH0seyAiY29tcGlsZV9vcHRpb25zIjogIi1sYW5nIHdhc20taWIgLWNuIGJ1YmJsZSAtZXMgMSAtbWNkIDE2IC1zaW5nbGUgLWZ0eiAyIiB9LHsgImNvcHlyaWdodCI6ICIoYykgMjAxNzogWWFubiBPcmxhcmV5LCBHUkFNRSIgfSx7ICJkZWxheXMubGliL25hbWUiOiAiRmF1c3QgRGVsYXkgTGlicmFyeSIgfSx7ICJkZWxheXMubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgImRlbW9zLmxpYi9uYW1lIjogIkZhdXN0IERlbW9zIExpYnJhcnkiIH0seyAiZGVtb3MubGliL3ZlcnNpb24iOiAiMC4xIiB9LHsgImRlc2NyaXB0aW9uIjogIlByb2R1Y3Rpb24gb2YgYSB3YXRlciBkcm9wIGJ1YmJsZSBzb3VuZC4iIH0seyAiZmlsZW5hbWUiOiAiYnViYmxlLmRzcCIgfSx7ICJmaWx0ZXJzLmxpYi9hbGxwYXNzX2NvbWI6YXV0aG9yIjogIkp1bGl1cyBPLiBTbWl0aCBJSUkiIH0seyAiZmlsdGVycy5saWIvYWxscGFzc19jb21iOmNvcHlyaWdodCI6ICJDb3B5cmlnaHQgKEMpIDIwMDMtMjAxOSBieSBKdWxpdXMgTy4gU21pdGggSUlJIDxqb3NAY2NybWEuc3RhbmZvcmQuZWR1PiIgfSx7ICJmaWx0ZXJzLmxpYi9hbGxwYXNzX2NvbWI6bGljZW5zZSI6ICJNSVQtc3R5bGUgU1RLLTQuMyBsaWNlbnNlIiB9LHsgImZpbHRlcnMubGliL2xvd3Bhc3MwX2hpZ2hwYXNzMSI6ICJDb3B5cmlnaHQgKEMpIDIwMDMtMjAxOSBieSBKdWxpdXMgTy4gU21pdGggSUlJIDxqb3NAY2NybWEuc3RhbmZvcmQuZWR1PiIgfSx7ICJmaWx0ZXJzLmxpYi9uYW1lIjogIkZhdXN0IEZpbHRlcnMgTGlicmFyeSIgfSx7ICJmaWx0ZXJzLmxpYi92ZXJzaW9uIjogIjAuMyIgfSx7ICJsaWNlbnNlIjogIk1JVCIgfSx7ICJtYXRocy5saWIvYXV0aG9yIjogIkdSQU1FIiB9LHsgIm1hdGhzLmxpYi9jb3B5cmlnaHQiOiAiR1JBTUUiIH0seyAibWF0aHMubGliL2xpY2Vuc2UiOiAiTEdQTCB3aXRoIGV4Y2VwdGlvbiIgfSx7ICJtYXRocy5saWIvbmFtZSI6ICJGYXVzdCBNYXRoIExpYnJhcnkiIH0seyAibWF0aHMubGliL3ZlcnNpb24iOiAiMi41IiB9LHsgIm5hbWUiOiAiYnViYmxlIiB9LHsgIm9zY2lsbGF0b3JzLmxpYi9uYW1lIjogIkZhdXN0IE9zY2lsbGF0b3IgTGlicmFyeSIgfSx7ICJvc2NpbGxhdG9ycy5saWIvdmVyc2lvbiI6ICIwLjMiIH0seyAicGxhdGZvcm0ubGliL25hbWUiOiAiR2VuZXJpYyBQbGF0Zm9ybSBMaWJyYXJ5IiB9LHsgInBsYXRmb3JtLmxpYi92ZXJzaW9uIjogIjAuMiIgfSx7ICJyZXZlcmJzLmxpYi9uYW1lIjogIkZhdXN0IFJldmVyYiBMaWJyYXJ5IiB9LHsgInJldmVyYnMubGliL3ZlcnNpb24iOiAiMC4yIiB9LHsgInNpZ25hbHMubGliL25hbWUiOiAiRmF1c3QgU2lnbmFsIFJvdXRpbmcgTGlicmFyeSIgfSx7ICJzaWduYWxzLmxpYi92ZXJzaW9uIjogIjAuMSIgfV0sInVpIjogWyB7InR5cGUiOiAidmdyb3VwIiwibGFiZWwiOiAiYnViYmxlIiwiaXRlbXMiOiBbIHsidHlwZSI6ICJoZ3JvdXAiLCJsYWJlbCI6ICJGcmVldmVyYiIsIml0ZW1zIjogWyB7InR5cGUiOiAidmdyb3VwIiwibGFiZWwiOiAiMHgwMCIsIm1ldGEiOiBbeyAiMCI6ICIiIH1dLCJpdGVtcyI6IFsgeyJ0eXBlIjogInZzbGlkZXIiLCJsYWJlbCI6ICJEYW1wIiwiYWRkcmVzcyI6ICIvYnViYmxlL0ZyZWV2ZXJiLzB4MDAvRGFtcCIsImluZGV4IjogMjYyMTYwLCJtZXRhIjogW3sgIjAiOiAiIiB9LHsgInN0eWxlIjogImtub2IiIH0seyAidG9vbHRpcCI6ICJTb21laG93IGNvbnRyb2wgdGhlICAgICAgICAgZGVuc2l0eSBvZiB0aGUgcmV2ZXJiLiIgfV0sImluaXQiOiAwLjUsIm1pbiI6IDAsIm1heCI6IDEsInN0ZXAiOiAwLjAyNX0seyJ0eXBlIjogInZzbGlkZXIiLCJsYWJlbCI6ICJSb29tU2l6ZSIsImFkZHJlc3MiOiAiL2J1YmJsZS9GcmVldmVyYi8weDAwL1Jvb21TaXplIiwiaW5kZXgiOiAyNjIxNTIsIm1ldGEiOiBbeyAiMSI6ICIiIH0seyAic3R5bGUiOiAia25vYiIgfSx7ICJ0b29sdGlwIjogIlRoZSByb29tIHNpemUgICAgICAgICBiZXR3ZWVuIDAgYW5kIDEgd2l0aCAxIGZvciB0aGUgbGFyZ2VzdCByb29tLiIgfV0sImluaXQiOiAwLjUsIm1pbiI6IDAsIm1heCI6IDEsInN0ZXAiOiAwLjAyNX0seyJ0eXBlIjogInZzbGlkZXIiLCJsYWJlbCI6ICJTdGVyZW8gU3ByZWFkIiwiYWRkcmVzcyI6ICIvYnViYmxlL0ZyZWV2ZXJiLzB4MDAvU3RlcmVvIFNwcmVhZCIsImluZGV4IjogNTg2MDQwLCJtZXRhIjogW3sgIjIiOiAiIiB9LHsgInN0eWxlIjogImtub2IiIH0seyAidG9vbHRpcCI6ICJTcGF0aWFsICAgICAgICAgc3ByZWFkIGJldHdlZW4gMCBhbmQgMSB3aXRoIDEgZm9yIG1heGltdW0gc3ByZWFkLiIgfV0sImluaXQiOiAwLjUsIm1pbiI6IDAsIm1heCI6IDEsInN0ZXAiOiAwLjAxfV19LHsidHlwZSI6ICJ2c2xpZGVyIiwibGFiZWwiOiAiV2V0IiwiYWRkcmVzcyI6ICIvYnViYmxlL0ZyZWV2ZXJiL1dldCIsImluZGV4IjogMjYyMTcyLCJtZXRhIjogW3sgIjEiOiAiIiB9LHsgInRvb2x0aXAiOiAiVGhlIGFtb3VudCBvZiByZXZlcmIgYXBwbGllZCB0byB0aGUgc2lnbmFsICAgICAgICAgYmV0d2VlbiAwIGFuZCAxIHdpdGggMSBmb3IgdGhlIG1heGltdW0gYW1vdW50IG9mIHJldmVyYi4iIH1dLCJpbml0IjogMC4zMzMzLCJtaW4iOiAwLCJtYXgiOiAxLCJzdGVwIjogMC4wMjV9XX0seyJ0eXBlIjogInZncm91cCIsImxhYmVsIjogImJ1YmJsZSIsIml0ZW1zIjogWyB7InR5cGUiOiAiaHNsaWRlciIsImxhYmVsIjogImZyZXEiLCJhZGRyZXNzIjogIi9idWJibGUvYnViYmxlL2ZyZXEiLCJpbmRleCI6IDI2MjE4MCwiaW5pdCI6IDYwMCwibWluIjogMTUwLCJtYXgiOiAyMDAwLCJzdGVwIjogMX1dfSx7InR5cGUiOiAiYnV0dG9uIiwibGFiZWwiOiAiZHJvcCIsImFkZHJlc3MiOiAiL2J1YmJsZS9kcm9wIiwiaW5kZXgiOiAyNjIxODR9XX1dfQ=="; }

/*
 faust2wasm: GRAME 2017-2019
*/

'use strict';

// Monophonic Faust DSP
class bubbleProcessor extends AudioWorkletProcessor {

    // JSON parsing functions
    static parse_ui(ui, obj, callback) {
        for (var i = 0; i < ui.length; i++) {
            bubbleProcessor.parse_group(ui[i], obj, callback);
        }
    }

    static parse_group(group, obj, callback) {
        if (group.items) {
            bubbleProcessor.parse_items(group.items, obj, callback);
        }
    }

    static parse_items(items, obj, callback) {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], obj, callback);
        }
    }

    static parse_item1(item, obj, callback) {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            bubbleProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
            || item.type === "vbargraph") {
            // Nothing
        } else if (item.type === "vslider"
            || item.type === "hslider"
            || item.type === "button"
            || item.type === "checkbox"
            || item.type === "nentry") {
            obj.push({
                name: item.address,
                defaultValue: item.init,
                minValue: item.min,
                maxValue: item.max
            });
        }
    }

    static parse_item2(item, obj, callback) {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            bubbleProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
            || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "soundfile") {
            // Keep soundfile adresses
            obj.soundfile_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "vslider"
            || item.type === "hslider"
            || item.type === "button"
            || item.type === "checkbox"
            || item.type === "nentry") {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        }
    }

    static get parameterDescriptors() {
        // Analyse JSON to generate AudioParam parameters
        var params = [];
        bubbleProcessor.parse_ui(JSON.parse(getJSONbubble()).ui, params, bubbleProcessor.parse_item1);
        return params;
    }

    constructor(options) {
        super(options);
        this.running = true;

        const importObject = {
            env: {
                memoryBase: 0,
                tableBase: 0,

                // Integer version
                _abs: Math.abs,

                // Float version
                _acosf: Math.acos,
                _asinf: Math.asin,
                _atanf: Math.atan,
                _atan2f: Math.atan2,
                _ceilf: Math.ceil,
                _cosf: Math.cos,
                _expf: Math.exp,
                _floorf: Math.floor,
                _fmodf: function (x, y) { return x % y; },
                _logf: Math.log,
                _log10f: Math.log10,
                _max_f: Math.max,
                _min_f: Math.min,
                _remainderf: function (x, y) { return x - Math.round(x / y) * y; },
                _powf: Math.pow,
                _roundf: Math.fround,
                _sinf: Math.sin,
                _sqrtf: Math.sqrt,
                _tanf: Math.tan,
                _acoshf: Math.acosh,
                _asinhf: Math.asinh,
                _atanhf: Math.atanh,
                _coshf: Math.cosh,
                _sinhf: Math.sinh,
                _tanhf: Math.tanh,
                _isnanf: Number.isNaN,
                _isinff: function (x) { return !isFinite(x); },
                _copysignf: function (x, y) { return Math.sign(x) === Math.sign(y) ? x : -x; },

                // Double version
                _acos: Math.acos,
                _asin: Math.asin,
                _atan: Math.atan,
                _atan2: Math.atan2,
                _ceil: Math.ceil,
                _cos: Math.cos,
                _exp: Math.exp,
                _floor: Math.floor,
                _fmod: function (x, y) { return x % y; },
                _log: Math.log,
                _log10: Math.log10,
                _max_: Math.max,
                _min_: Math.min,
                _remainder: function (x, y) { return x - Math.round(x / y) * y; },
                _pow: Math.pow,
                _round: Math.fround,
                _sin: Math.sin,
                _sqrt: Math.sqrt,
                _tan: Math.tan,
                _acosh: Math.acosh,
                _asinh: Math.asinh,
                _atanh: Math.atanh,
                _cosh: Math.cosh,
                _sinh: Math.sinh,
                _tanh: Math.tanh,
                _isnan: Number.isNaN,
                _isinf: function (x) { return !isFinite(x); },
                _copysign: function (x, y) { return Math.sign(x) === Math.sign(y) ? x : -x; },

                table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
            }
        };

        this.bubble_instance = new WebAssembly.Instance(options.processorOptions.wasm_module, importObject);
        this.json_object = JSON.parse(options.processorOptions.json);

        this.output_handler = function (path, value) { this.port.postMessage({ path: path, value: value }); };

        this.ins = null;
        this.outs = null;

        this.dspInChannnels = [];
        this.dspOutChannnels = [];

        this.numIn = parseInt(this.json_object.inputs);
        this.numOut = parseInt(this.json_object.outputs);

        // Memory allocator
        this.ptr_size = 4;
        this.sample_size = 4;
        this.integer_size = 4;

        this.factory = this.bubble_instance.exports;
        this.HEAP = this.bubble_instance.exports.memory.buffer;
        this.HEAP32 = new Int32Array(this.HEAP);
        this.HEAPF32 = new Float32Array(this.HEAP);

        // Warning: keeps a ref on HEAP in Chrome and prevent proper GC
        //console.log(this.HEAP);
        //console.log(this.HEAP32);
        //console.log(this.HEAPF32);

        // bargraph
        this.outputs_timer = 5;
        this.outputs_items = [];

        // input items
        this.inputs_items = [];

        // soundfile items
        this.soundfile_items = [];

        // Start of HEAP index

        // DSP is placed first with index 0. Audio buffer start at the end of DSP.
        this.audio_heap_ptr = parseInt(this.json_object.size);

        // Setup pointers offset
        this.audio_heap_ptr_inputs = this.audio_heap_ptr;
        this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);

        // Setup buffer offset
        this.audio_heap_inputs = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * NUM_FRAMES * this.sample_size);

        // Start of DSP memory : DSP is placed first with index 0
        this.dsp = 0;

        this.pathTable = [];

        // Send output values to the AudioNode
        this.update_outputs = function () {
            if (this.outputs_items.length > 0 && this.output_handler && this.outputs_timer-- === 0) {
                this.outputs_timer = 5;
                for (var i = 0; i < this.outputs_items.length; i++) {
                    this.output_handler(this.outputs_items[i], this.HEAPF32[this.pathTable[this.outputs_items[i]] >> 2]);
                }
            }
        }

        this.initAux = function () {
            var i;

            if (this.numIn > 0) {
                this.ins = this.audio_heap_ptr_inputs;
                for (i = 0; i < this.numIn; i++) {
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((NUM_FRAMES * this.sample_size) * i);
                }

                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }

            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((NUM_FRAMES * this.sample_size) * i);
                }

                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + NUM_FRAMES * this.sample_size) >> 2);
                }
            }

            // Parse UI
            bubbleProcessor.parse_ui(this.json_object.ui, this, bubbleProcessor.parse_item2);

            // Init DSP
            this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
        }

        this.setParamValue = function (path, val) {
            this.HEAPF32[this.pathTable[path] >> 2] = val;
        }

        this.getParamValue = function (path) {
            return this.HEAPF32[this.pathTable[path] >> 2];
        }

        // Init resulting DSP
        this.initAux();
        console.log(this);
    }

    handleMessage(event) {
        var msg = event.data;
        switch (msg.type) {
            case "destroy": this.running = false; break;
        }
    }

    process(inputs, outputs, parameters) {
        var input = inputs[0];
        var output = outputs[0];

        // Check inputs
        if (this.numIn > 0 && (!input || !input[0] || input[0].length === 0)) {
            //console.log("Process input error");
            return true;
        }
        // Check outputs
        if (this.numOut > 0 && (!output || !output[0] || output[0].length === 0)) {
            //console.log("Process output error");
            return true;
        }

        // Copy inputs
        if (input !== undefined) {
            for (var chan = 0; chan < Math.min(this.numIn, input.length); ++chan) {
                var dspInput = this.dspInChannnels[chan];
                dspInput.set(input[chan]);
            }
        }

        /*
        TODO: sample accurate control change is not yet handled
        When no automation occurs, params[i][1] has a length of 1,
        otherwise params[i][1] has a length of NUM_FRAMES with possible control change each sample
        */

        // Update controls
        for (const path in parameters) {
            const paramArray = parameters[path];
            this.setParamValue(path, paramArray[0]);
        }

        // Compute
        try {
            this.factory.compute(this.dsp, NUM_FRAMES, this.ins, this.outs);
        } catch (e) {
            console.log("ERROR in compute (" + e + ")");
        }

        // Update bargraph
        this.update_outputs();

        // Copy outputs
        if (output !== undefined) {
            for (var chan = 0; chan < Math.min(this.numOut, output.length); ++chan) {
                var dspOutput = this.dspOutChannnels[chan];
                output[chan].set(dspOutput);
            }
        }

        return this.running;
    }
}

// Globals
const NUM_FRAMES = 128;
try {
    registerProcessor('bubble', bubbleProcessor);
    console.log("registered BUBBLE PROCESSOR");
} catch (error) {
    console.warn(error);
}
