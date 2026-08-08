from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas, auth

router = APIRouter(prefix="/api/restaurant", tags=["Restaurant Info"])

DEFAULT_SETTINGS = {
    "phone": "078420 20777",
    "address": "Plot No.106, Haji Gulam Hussain Arcade Building, First Floor, Park Road, Abdullah Khan Estate Lane, Kurnool, Andhra Pradesh 518001, India",
    "opening_hours": "Opens from 11:30 AM",
    "instagram_handle": "@maliklotusrestaurant",
    "google_maps_url": "https://maps.google.com/?q=R2HQ%2BXQ+Kurnool,+Andhra+Pradesh"
}

@router.get("")
def get_settings(db: Session = Depends(get_db)):
    settings = db.query(models.RestaurantSetting).all()
    result = DEFAULT_SETTINGS.copy()
    for s in settings:
        result[s.key] = s.value
    return result

@router.put("")
def update_setting(key: str, setting_data: schemas.SettingUpdate, db: Session = Depends(get_db), current_admin: models.Admin = Depends(auth.get_current_admin)):
    setting = db.query(models.RestaurantSetting).filter(models.RestaurantSetting.key == key).first()
    if not setting:
        setting = models.RestaurantSetting(key=key, value=setting_data.value)
        db.add(setting)
    else:
        setting.value = setting_data.value
    db.commit()
    return {"message": f"Setting '{key}' updated successfully"}
