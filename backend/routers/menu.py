from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api", tags=["Menu"])

# Helper function to seed initial data on-the-fly if DB is empty
def ensure_seeded(db: Session):
    if db.query(models.MenuCategory).count() == 0:
        categories = [
            "MANDI", "BIRYANI", "STARTERS", "ARABIAN SPECIALS", 
            "GRILLS & KEBABS", "CHICKEN", "MUTTON", "SEAFOOD", 
            "VEGETARIAN", "RICE & MEALS", "DESSERTS", "BEVERAGES"
        ]
        for idx, cat_name in enumerate(categories):
            db.add(models.MenuCategory(name=cat_name, display_order=idx + 1))
        db.commit()

    if db.query(models.MenuItem).count() == 0:
        mandi_cat = db.query(models.MenuCategory).filter(models.MenuCategory.name == "MANDI").first()
        biryani_cat = db.query(models.MenuCategory).filter(models.MenuCategory.name == "BIRYANI").first()
        starters_cat = db.query(models.MenuCategory).filter(models.MenuCategory.name == "STARTERS").first()
        grills_cat = db.query(models.MenuCategory).filter(models.MenuCategory.name == "GRILLS & KEBABS").first()
        seafood_cat = db.query(models.MenuCategory).filter(models.MenuCategory.name == "SEAFOOD").first()
        veg_cat = db.query(models.MenuCategory).filter(models.MenuCategory.name == "VEGETARIAN").first()
        rice_cat = db.query(models.MenuCategory).filter(models.MenuCategory.name == "RICE & MEALS").first()

        popular_items = [
            models.MenuItem(
                name="Chicken Mandi",
                description="Tender juicy chicken served over aromatic slow-cooked mandi rice with roasted nuts and authentic Arabian spices.",
                price=380.0,
                is_vegetarian=False,
                is_popular=True,
                category_id=mandi_cat.id if mandi_cat else 1,
                image_url="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80"
            ),
            models.MenuItem(
                name="Mutton Mandi",
                description="Succulent slow-cooked mutton pieces laid over fragrant long-grain mandi rice, served with soup and tomato chutney.",
                price=480.0,
                is_vegetarian=False,
                is_popular=True,
                category_id=mandi_cat.id if mandi_cat else 1,
                image_url="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
            ),
            models.MenuItem(
                name="Chicken Lollipop",
                description="Crispy and flavorful fried chicken drummettes tossed in special Indo-Chinese spicy coating.",
                price=290.0,
                is_vegetarian=False,
                is_popular=True,
                category_id=starters_cat.id if starters_cat else 3,
                image_url="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80"
            ),
            models.MenuItem(
                name="Chicken Platter",
                description="An grand assorted platter featuring chicken tikka, kebabs, and grilled delicacies.",
                price=620.0,
                is_vegetarian=False,
                is_popular=True,
                category_id=grills_cat.id if grills_cat else 5,
                image_url="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
            ),
            models.MenuItem(
                name="Fish Roast",
                description="Fresh fish marinated in regional spices and pan-roasted to crisp perfection.",
                price=340.0,
                is_vegetarian=False,
                is_popular=True,
                category_id=seafood_cat.id if seafood_cat else 8,
                image_url="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
            ),
            models.MenuItem(
                name="Egg Biryani",
                description="Aromatic basmati rice cooked with boiled eggs and richly spiced dum masala.",
                price=220.0,
                is_vegetarian=False,
                is_popular=True,
                category_id=biryani_cat.id if biryani_cat else 2,
                image_url="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
            )
        ]
        db.add_all(popular_items)
        db.commit()

@router.get("/categories", response_model=List[schemas.MenuCategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    ensure_seeded(db)
    return db.query(models.MenuCategory).filter(models.MenuCategory.is_active == True).order_by(models.MenuCategory.display_order).all()

@router.get("/menu", response_model=List[schemas.MenuItemResponse])
def get_menu_items(category_id: int = None, popular_only: bool = False, db: Session = Depends(get_db)):
    ensure_seeded(db)
    query = db.query(models.MenuItem).filter(models.MenuItem.is_available == True)
    if category_id:
        query = query.filter(models.MenuItem.category_id == category_id)
    if popular_only:
        query = query.filter(models.MenuItem.is_popular == True)
    return query.all()

@router.get("/menu/{item_id}", response_model=schemas.MenuItemResponse)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    ensure_seeded(db)
    item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Dish not found")
    return item