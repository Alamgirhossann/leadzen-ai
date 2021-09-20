import requests
import os
import gzip
import time

url = "http://127.0.0.1:8000/contacts/upload/json"

delay = 0
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

        #response = requests.request("POST", url, headers=headers, data=payload, files=(files))
        response = s.post(url,files=files)

        print(response.text)
        time.sleep(delay)
except Exception as e:
    print(f"Exception:" + str(e))
    
