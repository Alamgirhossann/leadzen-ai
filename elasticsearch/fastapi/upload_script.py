import requests
import os
import gzip
import time
import logging

url = "http://65.1.86.28/contacts/upload/json"

delay = 0
logger=logging.getLogger()
s = requests.session()
file_path = input("Enter File Path: ")
file_list = os.listdir(f"{file_path}")
try:
    for file_name in file_list:
        print(file_name)
        
        payload={}
        
        if file_name.endswith(".gz"):
            files={
            'file':gzip.open(f'{file_path}/{file_name}','rb')
            }
            delay = 1800
        else:
            files={
            'file':open(f'{file_path}/{file_name}','rb')
            }
            delay = 900
        headers = {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        }

        response = s.post(url,files=files)

        print(response.text)
        time.sleep(delay)
        logger.success(f"Succesfully Added File:{file_name}")
except Exception as e:
    print(f"Exception:" + str(e))
    logger.critical(f"Failed Adding File:{file_name}")
    
