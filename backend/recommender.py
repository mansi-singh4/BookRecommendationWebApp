import pickle
import pandas as pd

df = pickle.load(open("books.pkl", "rb"))
model = pickle.load(open("knn_model.pkl", "rb"))
tfidf_matrix = pickle.load(open("tfidf_matrix.pkl", "rb"))


def recommend(book_title, top_n=20):

    matches = df[df["book_title"].str.lower() == book_title.lower()]

    if matches.empty:
        return []

    book_index = matches.index[0]

    distances, indices = model.kneighbors(
        tfidf_matrix[book_index],
        n_neighbors=200
    )

    seen = set()
    recommendations = []

    for i in range(1, len(indices[0])):

        idx = indices[0][i]
        title = df.iloc[idx]["book_title"]

        # remove duplicates
        if title in seen:
            continue

        seen.add(title)

        similarity = 1 - distances[0][i]
        popularity = df.iloc[idx]["popularity_norm"]

        final_score = 0.7 * similarity + 0.3 * popularity

        image = df.iloc[idx]["image_url"]

        # fallback image if broken
        if not image or "http" not in str(image):
            image = "https://via.placeholder.com/150"

        recommendations.append({
            "title": title,
            "author": df.iloc[idx]["book_authors"],
            "rating": float(df.iloc[idx]["book_rating"]),
            "image": image,
            "description": str(df.iloc[idx]["book_desc"])[:200],
            "score": final_score
        })

        if len(recommendations) >= top_n:
            break
        if title.lower() == book_title.lower():
            continue

    return recommendations