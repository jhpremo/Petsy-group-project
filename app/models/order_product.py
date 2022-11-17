from .db import db, environment, SCHEMA, add_prefix_for_prod
from .product import Product
from .order import Order


class OrderProduct(db.Model):
    __tablename__ = 'order_products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = add_prefix_for_prod(db.Column(db.Integer, db.ForeignKey(Product.id)))
    order_id = add_prefix_for_prod(db.Column(db.Integer, db.ForeignKey(Order.id)))
    item_price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    product = db.relationship('Product', back_populates='order_products')
    order = db.relationship('Order', back_populates='order_products')
