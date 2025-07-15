from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import random
app = Flask(__name__)
CORS(app)


recipes = {
    'positive': [{'name':'Apple Pie', 'image':'apple-pie.jpg'},
                 {'name':'Chicken Kiev', 'image':'chicken-kiev.jpg'},
                 {'name':'Kyiv Cake', 'image':'kyiv-cake.jpg'}], 
    'negative': [{'name':'Caesar Salad', 'image':'caesar-salad.jpg'},
                 {'name':'Hot Chocolate', 'image': 'hot-chocolate.jpg'},
                 {'name':'Omelette', 'image': 'omelette.jpg'}],
    'neutral': [{'name': 'Cheese Crepes', 'image':'cheese-crepes.jpg'},
                {'name': 'Chocolate Cupcakes', 'image':'chocolate-cupcakes.jpg'},
                {'name': 'Cheesy Spinach Quiche', 'image':'cheese-spinach-quiche.jpg'}]
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
        

    recipe = random.choice(recipes.get(mood, ['Nothing was found']))
    return jsonify({'recipe': recipe['name'],
                    'mood': mood,
                    'image':f'/static/images/{recipe['image']}'})

if __name__ == '__main__':
    app.run(debug=True)