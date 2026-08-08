from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.post("", response_model=schemas.OrderResponse)
def create_order(order_data: schemas.OrderCreate, db: Session = Depends(get_db)):
    order_dict = order_data.model_dump()
    items_data = order_dict.pop("items")
    
    new_order = models.Order(**order_dict)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in items_data:
        order_item = models.OrderItem(order_id=new_order.id, **item)
        db.add(order_item)

    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("", response_model=List[schemas.OrderResponse])
def get_orders(db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    return db.query(models.Order).order_by(models.Order.created_at.desc()).all()

@router.get("/{order_id}", response_model=schemas.OrderResponse)
def get_order_by_id(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}/status", response_model=schemas.OrderResponse)
def update_order_status(order_id: int, status_data: schemas.OrderStatusUpdate, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status_data.status
    db.commit()
    db.refresh(order)
    return order
