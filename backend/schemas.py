from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from models import OrderStatus, OrderType, PaymentMethod

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class MenuCategoryBase(BaseModel):
    name: str
    display_order: Optional[int] = 0
    is_active: Optional[bool] = True

class MenuCategoryCreate(MenuCategoryBase):
    pass

class MenuCategoryResponse(MenuCategoryBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[float] = None
    is_vegetarian: Optional[bool] = False
    is_popular: Optional[bool] = False
    is_available: Optional[bool] = True
    image_url: Optional[str] = None
    category_id: int

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemResponse(MenuItemBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int
    unit_price: float

class OrderItemResponse(BaseModel):
    id: int
    menu_item_id: int
    quantity: int
    unit_price: float
    menu_item: Optional[MenuItemResponse] = None
    model_config = ConfigDict(from_attributes=True)

class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    delivery_address: Optional[str] = None
    area: Optional[str] = None
    pincode: Optional[str] = None
    order_type: OrderType
    payment_method: PaymentMethod
    subtotal: float
    delivery_fee: float
    total_amount: float
    items: List[OrderItemCreate]

class OrderStatusUpdate(BaseModel):
    status: OrderStatus

class OrderResponse(BaseModel):
    id: int
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    delivery_address: Optional[str] = None
    area: Optional[str] = None
    pincode: Optional[str] = None
    order_type: OrderType
    payment_method: PaymentMethod
    status: OrderStatus
    subtotal: float
    delivery_fee: float
    total_amount: float
    created_at: datetime
    items: List[OrderItemResponse]
    model_config = ConfigDict(from_attributes=True)

class OfferBase(BaseModel):
    title: str
    description: Optional[str] = None
    banner_url: Optional[str] = None
    is_active: Optional[bool] = True

class OfferCreate(OfferBase):
    pass

class OfferResponse(OfferBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class GalleryBase(BaseModel):
    title: Optional[str] = None
    category: str
    image_url: str

class GalleryCreate(GalleryBase):
    pass

class GalleryResponse(GalleryBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class SettingUpdate(BaseModel):
    value: str
