from fastapi import FastAPI
from recommender import recommend,df
from rapidfuzz import process
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message":"Book Recommender API"}

@app.get("/recommend/{book}")

def get_recommendations(book: str):

    results = recommend(book)

    return results


@app.get("/search")

def search_books(query: str):

    titles = df["book_title"].tolist()

    matches = process.extract(
        query,
        titles,
        limit=10
    )

    return [m[0] for m in matches]