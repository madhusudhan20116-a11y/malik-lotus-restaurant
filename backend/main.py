import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
import models, auth
from routers import menu, orders, offers, gallery, restaurant, auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Malik Lotus Restaurant API",
    description="Backend API for Malik Lotus Restaurant, Kurnool",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(menu.router)
app.include_router(orders.router)
app.include_router(offers.router)
app.include_router(gallery.router)
app.include_router(restaurant.router)

@app.on_event("startup")
def seed_initial_data():
    db = SessionLocal()
    try:
        admin = db.query(models.Admin).filter(models.Admin.username == "admin").first()
        if not admin:
            default_admin = models.Admin(
                username="admin",
                email="admin@maliklotus.com",
                hashed_password=auth.get_password_hash("MalikLotus@2026")
            )
            db.add(default_admin)
            db.commit()

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
                ),
                models.MenuItem(
                    name="Chicken 555",
                    description="Crispy chicken strips tossed in a spicy, creamy, garlic-infused signature sauce.",
                    price=310.0,
                    is_vegetarian=False,
                    is_popular=True,
                    category_id=starters_cat.id if starters_cat else 3,
                    image_url="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
                ),
                models.MenuItem(
                    name="Chicken Achari Kabab",
                    description="Juicy chicken pieces marinated in tangy pickle spices and grilled over charcoals.",
                    price=320.0,
                    is_vegetarian=False,
                    is_popular=True,
                    category_id=grills_cat.id if grills_cat else 5,
                    image_url="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
                ),
                models.MenuItem(
                    name="Paneer Butter Masala",
                    description="Cottage cheese cubes simmered in a rich, buttery tomato gravy with Indian herbs.",
                    price=260.0,
                    is_vegetarian=True,
                    is_popular=True,
                    category_id=veg_cat.id if veg_cat else 9,
                    image_url="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
                ),
                models.MenuItem(
                    name="Curd Rice",
                    description="Comforting seasoned rice mixed with fresh yogurt, tempered with mustard seeds, curry leaves, and green chilies.",
                    price=140.0,
                    is_vegetarian=True,
                    is_popular=True,
                    category_id=rice_cat.id if rice_cat else 10,
                    image_url="https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80"
                )
            ]
            db.add_all(popular_items)
            db.commit()

    finally:
        db.close()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
