use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

// Basic health check to verify service is running
async fn health_check() -> impl Responder {
    HttpResponse::Ok().body("Autonomi service is running")
}

// Define structure for health records
#[derive(Serialize, Deserialize)]
struct HealthRecord {
    id: Option<String>,
    owner_id: String,
    record_type: String,
    title: String,
    content: String,
    date: String,
}

// Note: These handlers are placeholders that will be connected to Autonomi later
async fn store_record(record: web::Json<HealthRecord>) -> impl Responder {
    // We'll implement actual Autonomi storage here in a future step
    println!("Received record: {}", record.title);
    
    // Return a mock ID for now
    let response = serde_json::json!({
        "status": "success",
        "message": "Record received (not yet stored on Autonomi)",
        "data": {
            "id": "mock-id-12345"
        }
    });
    
    HttpResponse::Ok().json(response)
}

async fn get_record(path: web::Path<String>) -> impl Responder {
    let record_id = path.into_inner();
    
    // We'll implement actual Autonomi retrieval here in a future step
    let mock_record = HealthRecord {
        id: Some(record_id),
        owner_id: "user123".to_string(),
        record_type: "bloodwork".to_string(),
        title: "Mock Record".to_string(),
        content: "This is a placeholder record".to_string(),
        date: "2025-04-15".to_string(),
    };
    
    HttpResponse::Ok().json(mock_record)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting Autonomi microservice on http://127.0.0.1:8088");
    
    HttpServer::new(|| {
        App::new()
            .route("/health", web::get().to(health_check))
            .route("/records", web::post().to(store_record))
            .route("/records/{id}", web::get().to(get_record))
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}