use neon::prelude::*;
use wasm_bindgen::prelude::*;

// use pyo3::prelude::*;

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
