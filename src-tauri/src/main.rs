use simple_websockets::{Event, Responder, Message};

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![send_to_client])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    unsafe {
        ws_server();
    }
}

static mut CLIENT: Option<(u64, Responder)> = None;

unsafe fn ws_server() {
    let port: u16 = 11117;
    println!("Starting server on port {}", port);
    let event_hub = simple_websockets::launch(port)
        .expect(&format!("failed to listen on port {}", port));
    loop {
        match event_hub.poll_event() {
            Event::Connect(client_id, responder) => {
                println!("A client connected with id #{}", client_id);
                if CLIENT.is_none() {
                    CLIENT = Some((client_id, responder));
                } else {
                    responder.send(Message::Text(String::from("Sorry, the server is full.")));
                }
            },
            Event::Disconnect(client_id) => {
                println!("Client #{} disconnected.", client_id);
                if CLIENT.is_some() && CLIENT.clone().unwrap().0 == client_id {
                    CLIENT = None;
                }
            },
            Event::Message(client_id, message) => {
                println!("Received a message from client #{}: {:?}", client_id, message);
            },
        }
    }
}

#[tauri::command]
fn send_to_client(message: &str) {
    println!("Sending message to client: {}", message);
    unsafe {
        CLIENT.clone().unwrap().1.send(Message::Text(String::from(message)));
    }
}
