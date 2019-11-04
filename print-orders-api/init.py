from dotenv import load_dotenv
import os
from shutil import copyfile
import mysql.connector

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
