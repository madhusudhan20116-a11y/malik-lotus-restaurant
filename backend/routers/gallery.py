from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])

@router.get("", response_model=List[schemas.GalleryResponse])
def get_gallery_items(category: str = None, db: Session = Depends(get_db)):
    query = db.query(models.GalleryImage)
    if category and category.upper() != "ALL":
        query = query.filter(models.GalleryImage.category == category.upper())
    return query.all()

@router.post("", response_model=schemas.GalleryResponse)
def add_gallery_image(item: schemas.GalleryCreate, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    db_img = models.GalleryImage(**item.model_dump())
    db.add(db_img)
    db.commit()
    db.refresh(db_img)
    return db_img
