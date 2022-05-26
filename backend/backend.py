from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi import Depends, FastAPI
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from routers import users, auth, post, profile

app = FastAPI()
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(post.router)
app.include_router(profile.router)

#Set the icon for the tab localhost:8000
@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse('dn.ico')

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3001/create",
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