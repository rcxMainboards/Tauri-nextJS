// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod wmi_querys {
    pub mod wmi_q;
}

mod windows_native {
    pub mod wifi_test;
}

use tauri::Manager;
use windows_native::wifi_test::test_connection;
use wmi_querys::wmi_q::wmi_query_class;

// #[tauri::command]
// fn greet(name: &str) -> String {
//    format!("Hello, {}! From Rust Tauri", name)
// }

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![wmi_query_class, test_connection])
        .run(tauri::generate_context!("./tauri.conf.json"))
        .expect("error while running tauri application");
}
