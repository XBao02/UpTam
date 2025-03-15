from flask import Flask, request, jsonify
from supabase import create_client, Client
import uuid

app = Flask(__name__)

# Initialize Supabase client
url = "https://ktucmljjpnywvkjbinib.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dWNtbGpqcG55d3ZramJpbmliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTE3NDgzNSwiZXhwIjoyMDU2NzUwODM1fQ.y0k0o6orChQ-Ng1cdsPWSvFlPtmh1tZDZrWWoUFuPm8"
supabase: Client = create_client(url, key)

@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    user_id = str(uuid.uuid4())
    response = supabase.table('users').insert({
        "id": user_id,
        "email": data['email'],
        "password": data['password']
    }).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-profile', methods=['POST'])
def save_profile():
    data = request.json
    response = supabase.table('profiles').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-education', methods=['POST'])
def save_education():
    data = request.json
    response = supabase.table('education').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-experience', methods=['POST'])
def save_experience():
    data = request.json
    response = supabase.table('experience').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-skill', methods=['POST'])
def save_skill():
    data = request.json
    response = supabase.table('skills').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-language', methods=['POST'])
def save_language():
    data = request.json
    response = supabase.table('languages').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-certificate', methods=['POST'])
def save_certificate():
    data = request.json
    response = supabase.table('certificates').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-prize', methods=['POST'])
def save_prize():
    data = request.json
    response = supabase.table('prizes').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-project', methods=['POST'])
def save_project():
    data = request.json
    response = supabase.table('projects').insert(data).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/load-profile', methods=['GET'])
def load_profile():
    user_id = request.args.get('user_id')
    response = supabase.table('profiles').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data[0]) if response.data else jsonify({}), 200

@app.route('/api/load-education', methods=['GET'])
def load_education():
    user_id = request.args.get('user_id')
    response = supabase.table('education').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data) if response.data else jsonify([]), 200

@app.route('/api/load-experience', methods=['GET'])
def load_experience():
    user_id = request.args.get('user_id')
    response = supabase.table('experience').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data) if response.data else jsonify([]), 200

@app.route('/api/load-skill', methods=['GET'])
def load_skill():
    user_id = request.args.get('user_id')
    response = supabase.table('skills').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data) if response.data else jsonify([]), 200

@app.route('/api/load-language', methods=['GET'])
def load_language():
    user_id = request.args.get('user_id')
    response = supabase.table('languages').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data) if response.data else jsonify([]), 200

@app.route('/api/load-certificate', methods=['GET'])
def load_certificate():
    user_id = request.args.get('user_id')
    response = supabase.table('certificates').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data) if response.data else jsonify([]), 200

@app.route('/api/load-prize', methods=['GET'])
def load_prize():
    user_id = request.args.get('user_id')
    response = supabase.table('prizes').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data) if response.data else jsonify([]), 200

@app.route('/api/load-project', methods=['GET'])
def load_project():
    user_id = request.args.get('user_id')
    response = supabase.table('projects').select('*').eq('user_id', user_id).execute()
    return jsonify(response.data) if response.data else jsonify([]), 200

@app.route('/api/save-avatar', methods=['POST'])
def save_avatar():
    data = request.json
    user_id = data['user_id']
    avatar_url = data['avatar']
    response = supabase.table('profiles').update({'avatar': avatar_url}).eq('user_id', user_id).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/save-cover', methods=['POST'])
def save_cover():
    data = request.json
    user_id = data['user_id']
    cover_url = data['cover']
    response = supabase.table('profiles').update({'cover': cover_url}).eq('user_id', user_id).execute()
    return jsonify(response.data), response.status_code

@app.route('/api/reset-profile', methods=['POST'])
def reset_profile():
    user_id = request.json['user_id']
    default_data = {
        'full_name': 'Your Name',
        'introduction': 'Introduce yourself',
        'current_position': 'Job Position',
        'education': [],
        'location': '',
        'contact_info': '',
        'profile_url': '',
        'email': '',
        'phone_number': '',
        'address': '',
        'birthday': None,
        'avatar': 'default-avatar-url',
        'cover': 'default-cover-url'
    }
    response = supabase.table('profiles').update(default_data).eq('user_id', user_id).execute()
    return jsonify(response.data), response.status_code

if __name__ == '__main__':
    app.run(debug=True)