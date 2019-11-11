from dotenv import load_dotenv, set_key
import os
from shutil import copyfile
import mysql.connector
import random
import string

# Functions
def random_string(string_length=32):
    letters_digits = string.ascii_lowercase + string.digits
    return ''.join(random.choice(letters_digits) for i in range(string_length))

# COPY .env.example to .env
current_path = os.getcwd()
example_file = current_path + "/.env.example"
new_file = current_path + "/.env"
try:
    copyfile(example_file, new_file)
except:
    print("Unable to copy .env file")
    exit(1)

# Loading .env
set_key('.env', 'APP_KEY', random_string())
set_key('.env', 'JWT_SECRET', random_string())
load_dotenv()

# Initializing mysql environment variables
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
database = os.getenv("DB_DATABASE")
username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")

test_database = os.getenv("TEST_DATABASE")

# Running connection to drop and create database
try:
    connection = mysql.connector.connect(
        host=host,
        user=username,
        passwd=password
    )
    cursor = connection.cursor()
    cursor.execute("DROP DATABASE IF EXISTS "+database+";")
    cursor.execute("CREATE DATABASE "+database+";")
    cursor.execute("DROP DATABASE IF EXISTS "+test_database+";")
    cursor.execute("CREATE DATABASE "+test_database+";")
    connection.close()
except:
    print("Unnable to connect to mysql")
    exit(1)
