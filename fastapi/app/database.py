import datetime
import uuid

import databases
import sqlalchemy

from app.config import API_CONFIG_DATABASE_URL

metadata = sqlalchemy.MetaData()
database = databases.Database(API_CONFIG_DATABASE_URL)


profile_credit_history = sqlalchemy.Table(
    "profile_credit_history",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("search_id", sqlalchemy.String),
    sqlalchemy.Column("phone_number", sqlalchemy.String),
    sqlalchemy.Column("search_index", sqlalchemy.Integer),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime),
)

email_credit_history = sqlalchemy.Table(
    "email_credit_history",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("search_id", sqlalchemy.String),
    sqlalchemy.Column("email_address", sqlalchemy.String),
    sqlalchemy.Column("search_index", sqlalchemy.Integer),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime),
)

search_history = sqlalchemy.Table(
    "search_history",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("search_type", sqlalchemy.String),
    sqlalchemy.Column("search_term", sqlalchemy.String),
    sqlalchemy.Column("search_results", sqlalchemy.String),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime),
)

engine = sqlalchemy.create_engine(
    API_CONFIG_DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)