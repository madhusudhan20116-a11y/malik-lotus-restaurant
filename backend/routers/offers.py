from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/offers", tags=["Offers"])

@router.get("", response_model=List[schemas.OfferResponse])
def get_active_offers(db: Session = Depends(get_db)):
    return db.query(models.Offer).filter(models.Offer.is_active == True).all()

@router.post("", response_model=schemas.OfferResponse)
def create_offer(offer: schemas.OfferCreate, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    db_offer = models.Offer(**offer.model_dump())
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)
    return db_offer
