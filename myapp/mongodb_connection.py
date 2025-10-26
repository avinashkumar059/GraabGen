from mongoengine import connect, disconnect
from django.conf import settings

def connect_to_mongodb():
    """Connect to MongoDB using settings from Django settings"""
    try:
        mongodb_config = settings.MONGODB_SETTINGS
        
        # Build connection string
        if mongodb_config['username'] and mongodb_config['password']:
            connection_string = f"mongodb://{mongodb_config['username']}:{mongodb_config['password']}@{mongodb_config['host']}:{mongodb_config['port']}/{mongodb_config['db']}"
        else:
            connection_string = f"mongodb://{mongodb_config['host']}:{mongodb_config['port']}/{mongodb_config['db']}"
        
        connect(
            host=connection_string,
            alias='default'
        )
        print(f"Connected to MongoDB: {mongodb_config['db']}")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        # Fallback to local connection
        connect(
            host=f"mongodb://localhost:27017/{mongodb_config['db']}",
            alias='default'
        )

def disconnect_from_mongodb():
    """Disconnect from MongoDB"""
    try:
        disconnect()
        print("Disconnected from MongoDB")
    except Exception as e:
        print(f"Error disconnecting from MongoDB: {e}")
