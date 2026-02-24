from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
import uvicorn

app = FastAPI(title="Agri-Escrow 360 AI Service")

class YieldInput(BaseModel):
    land_area: float
    historical_yield: float = 0
    rainfall: float = 0
    ndvi: float = 0.5

class FraudInput(BaseModel):
    farmer_id: str
    quantity: float
    moisture: float
    historical_avg_quantity: float = 0

class DistressInput(BaseModel):
    farmer_id: str
    payment_delay_days: int
    credit_score: int
    land_area: float

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Agri-AI Microservice"}

@app.post("/predict-yield")
def predict_yield(data: YieldInput):
    # Simulated Yield Prediction Logic
    # Simple linear heuristic for simulation
    base_yield = data.land_area * 500  # 500kg per acre base
    predicted_yield = base_yield * (0.8 + random.random() * 0.4)
    return {
        "predicted_yield_kg": round(predicted_yield, 2),
        "confidence": 0.85
    }

@app.post("/detect-fraud")
def detect_fraud(data: FraudInput):
    # Simulated Fraud Detection
    # Flag if quantity > 120% of historical average or moisture < 10%
    is_fraud = False
    reasons = []

    if data.historical_avg_quantity > 0 and data.quantity > data.historical_avg_quantity * 1.5:
        is_fraud = True
        reasons.append("Quantity significantly higher than historical average")
    
    if data.moisture < 12 or data.moisture > 22:
        is_fraud = True
        reasons.append("Moisture level outside standard range (12%-22%)")

    return {
        "is_fraud": is_fraud,
        "fraud_reasons": reasons,
        "risk_score": 0.8 if is_fraud else 0.1
    }

@app.post("/calculate-distress")
def calculate_distress(data: DistressInput):
    # Simulated Distress Risk (0-100)
    # Higher delay + Lower credit score = Higher distress
    delay_impact = min(data.payment_delay_days * 2, 50)
    credit_impact = max(0, (600 - data.credit_score) // 10)
    
    risk_score = delay_impact + credit_impact
    risk_score = min(max(risk_score, 0), 100)

    category = "Low"
    if risk_score > 70: category = "Critical"
    elif risk_score > 40: category = "Moderate"

    return {
        "risk_score": risk_score,
        "category": category
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
