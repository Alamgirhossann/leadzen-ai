FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
WORKDIR /app

# copy all required files and install python dependencies
COPY . /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# ensure port 5000 is connectable to outside
EXPOSE 5000
CMD ["uvicorn", "fastapi_app.main:app", "--host", "0.0.0.0", "--port", "5000"]