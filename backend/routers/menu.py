from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api", tags=["Menu"])

@router.get("/categories", response_model=List[schemas.MenuCategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.MenuCategory).filter(models.MenuCategory.is_active == True).order_by(models.MenuCategory.display_order).all()

@router.post("/categories", response_model=schemas.MenuCategoryResponse)
def create_category(cat: schemas.MenuCategoryCreate, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    db_cat = models.MenuCategory(**cat.model_dump())
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat

@router.get("/menu", response_model=List[schemas.MenuItemResponse])
def get_menu_items(category_id: int = None, popular_only: bool = False, db: Session = Depends(get_db)):
    query = db.query(models.MenuItem).filter(models.MenuItem.is_available == True)
    if category_id:
        query = query.filter(models.MenuItem.category_id == category_id)
    if popular_only:
        query = query.filter(models.MenuItem.is_popular == True)
    return query.all()

@router.get("/menu/{item_id}", response_model=schemas.MenuItemResponse)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Dish not found")
    return item

@router.post("/menu", response_model=schemas.MenuItemResponse)
def create_menu_item(item: schemas.MenuItemCreate, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    db_item = models.MenuItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/menu/{item_id}", response_model=schemas.MenuItemResponse)
def update_menu_item(item_id: int, item_data: schemas.MenuItemCreate, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Dish not found")
    for key, value in item_data.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/menu/{item_id}")
def delete_menu_item(item_id: int, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Dish not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Dish removed successfully"}
