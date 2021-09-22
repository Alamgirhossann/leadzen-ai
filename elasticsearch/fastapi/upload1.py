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
            os.system(f"gunzip -k {file_name}")
            f_name = file_name.replace(".gz","")
            files={
            'file':open(f'{file_path}/{f_name}','rb')
            }
            print("Unzip successful")
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
        if f_name:
            os.remove(f_name)

except Exception as e:
    print(f"Exception:" + str(e))
