from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/auth", tags=["Auth"])

def ensure_admin_exists(db: Session):
    admin = db.query(models.Admin).filter(models.Admin.username == "admin").first()
    if not admin:
        default_admin = models.Admin(
            username="admin",
            email="admin@maliklotus.com",
            hashed_password=auth.get_password_hash("MalikLotus@2026")
        )
        db.add(default_admin)
        db.commit()

@router.post("/login", response_model=schemas.Token)
def login(login_data: schemas.AdminLogin, db: Session = Depends(get_db)):
    # Auto-create admin account if missing on Vercel cold-start
    ensure_admin_exists(db)

    admin = db.query(models.Admin).filter(models.Admin.username == login_data.username).first()
    if not admin or not auth.verify_password(login_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = auth.create_access_token(data={"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}