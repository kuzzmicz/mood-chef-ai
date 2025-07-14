from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

recipes = {
    'positive': 'Apple pie', 
    'negative': 'Hot chocolate',
    'neutral': 'Caesar salad'
}

#POST ANALYZE
@app.route('/analyze', methods=['POST'])
def analyze_mood():
    data = request.get_json()
    text = data.get('text', '')

    if not text:
        return jsonify({'error':'The text is missing'}), 400
    
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity > 0:
        mood = 'positive'
    elif polarity < 0:
        mood = 'negative'
    else: 
        mood = 'neutral'

    recipe = recipes.get(mood, 'Nothing was found')

    return jsonify({'recipe': recipe})

if __name__ == '__main__':
    app.run(debug=True)