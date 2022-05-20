from fastapi import FastAPI, Depends
from fastapi.responses import HTMLResponse
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from routers import users, auth

app = FastAPI()
app.include_router(users.router)
app.include_router(auth.router)

#Set the icon for the tab localhost:8000
@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse('dn.ico')

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8000/docs#"
]
#allow any of the origins listed above to send requests to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def landing():
    html_content = """ 
    <html>
        <head>
            <title>HTML Video embed</title>
        </head>
        <body>
        <center>
            <iframe width="1600" height="900" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow='autoplay' allowfullscreen></iframe>
        </center>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)

