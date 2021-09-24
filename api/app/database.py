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
    sqlalchemy.Column("search_index_2", sqlalchemy.Integer),
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

search_saved = sqlalchemy.Table(
    "search_saved",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("search_type", sqlalchemy.String),
    sqlalchemy.Column("save_list_results", sqlalchemy.String),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime),
)

profile_search = sqlalchemy.Table(
    "profile_search",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.String),
    sqlalchemy.Column("search_type", sqlalchemy.String),
    sqlalchemy.Column("hash_key", sqlalchemy.String),
    sqlalchemy.Column("search_results", sqlalchemy.String),
    sqlalchemy.Column("created_on", sqlalchemy.DateTime),
)


if API_CONFIG_DATABASE_URL.startswith("sqlite"):
    engine = sqlalchemy.create_engine(
        API_CONFIG_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = sqlalchemy.create_engine(API_CONFIG_DATABASE_URL)

metadata.create_all(engine)
