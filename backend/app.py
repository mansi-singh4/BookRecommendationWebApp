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

    matched = df[df["book_title"].str.lower() == book.lower()]

    if matched.empty:
        return {"book": None, "recommendations": []}

    book_data = matched.iloc[0]

    results = recommend(book)

    return {
        "book": {
            "title": book_data["book_title"],
            "author": book_data["book_authors"],
            "image": book_data["image_url"],
            "description": book_data["book_desc"],
            "rating": book_data["book_rating"]
        },
        "recommendations": results
    }


@app.get("/search")

def search_books(query: str):

    titles = df["book_title"].tolist()

    matches = process.extract(
        query,
        titles,
        limit=10
    )

    return [m[0] for m in matches]