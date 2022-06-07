use wasm_bindgen::prelude::*;
use neon::prelude::*;
mod utils;


use pitch_detection::detector::mcleod::McLeodDetector;
use pitch_detection::detector::PitchDetector;
use pitch_detection::detector::{autocorrelation::AutocorrelationDetector};


// const SAMPLE_RATE : usize = 44100;
// const SIZE : usize = 1024;
// const PADDING : usize = SIZE / 2;
// const POWER_THRESHOLD : f64 = 5.0;
// const CLARITY_THRESHOLD : f64 = 0.7;

// // Signal coming from some source (microphone, generated, etc...)
// let signal = vec![0.0; SIZE];
// let mut detector = McLeodDetector::new(SIZE, PADDING);

// let pitch = detector.get_pitch(&signal, SAMPLE_RATE, POWER_THRESHOLD, CLARITY_THRESHOLD).unwrap();

// println!("Frequency: {}, Clarity: {}", pitch.frequency, pitch.clarity);

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub struct WasmPitchDetector {
  sample_rate: usize,
  fft_size: usize,
  detector: McLeodDetector<f32>,
}

#[wasm_bindgen]
impl WasmPitchDetector {
  pub fn new(sample_rate: usize, fft_size: usize) -> WasmPitchDetector {
    utils::set_panic_hook();

    let fft_pad = fft_size / 2;

    WasmPitchDetector {
      sample_rate,
      fft_size,
      detector: McLeodDetector::<f32>::new(fft_size, fft_pad),
    }
  }

  pub fn detect_pitch(&mut self, audio_samples: Vec<f32>) -> f32 {
    if audio_samples.len() < self.fft_size {
      panic!("Insufficient samples passed to detect_pitch(). Expected an array containing {} elements but got {}", self.fft_size, audio_samples.len());
    }

    // Include only notes that exceed a power threshold which relates to the
    // amplitude of frequencies in the signal. Use the suggested default
    // value of 5.0 from the library.
    const POWER_THRESHOLD: f32 = 5.0;

    // The clarity measure describes how coherent the sound of a note is. For
    // example, the background sound in a crowded room would typically be would
    // have low clarity and a ringing tuning fork would have high clarity.
    // This threshold is used to accept detect notes that are clear enough
    // (valid values are in the range 0-1).
    const CLARITY_THRESHOLD: f32 = 0.6;

    let optional_pitch = self.detector.get_pitch(
      &audio_samples,
      self.sample_rate,
      POWER_THRESHOLD,
      CLARITY_THRESHOLD,
    );

    match optional_pitch {
      Some(pitch) => pitch.frequency,
      None => 0.0,
    }
  }
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}


fn get_num_cpus(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(num_cpus::get() as f64))
}

fn get_hello(mut cx: FunctionContext) -> JsResult<JsString> {
    let greeting = "hello !!!!!";

    Ok(cx.string(greeting))
}

fn get_js_nums(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(690.00 as f64))
}



// pub fn get_alert(_cx: FunctionContext) -> Result<(), wasm_bindgen::JsValue> {
//     let window = window().unwrap();
//     window.alert_with_message("Hello from WASM!")
//   }
// // /// Formats the sum of two numbers as string.
// #[pyfunction]
// fn sum_as_string(a: usize, b: usize) -> PyResult<String> {
//     Ok((a + b).to_string())
// }

// // /// A Python module implemented in Rust.
// #[pymodule]
// fn string_sum(py: Python<'_>, m: &PyModule) -> PyResult<()> {
//     m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
//     Ok(())
// }




#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("get", get_num_cpus)?;
    cx.export_function("getNum", get_js_nums)?;
    cx.export_function("getHello", get_hello)?;




    Ok(())
}
