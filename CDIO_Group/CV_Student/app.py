from flask import Flask, request, render_template, redirect, url_for, session
import mysql.connector
import bcrypt
import os

# Đảm bảo thư mục cần thiết tồn tại
os.makedirs('static/images/img_log', exist_ok=True)

app = Flask(__name__, static_folder='static')
app.secret_key = 'your_secret_key'  # Khóa bí mật cho session

# Kết nối MySQL
mysql_db = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="220204",  
    database="account",
    port=3306
)

# Trang đăng ký
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        if not all([name, email, password, confirm_password]):
            return render_template('register.html', message='Vui lòng nhập đầy đủ thông tin!')

        if password != confirm_password:
            return render_template('register.html', message='Mật khẩu xác nhận không khớp!')

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Kiểm tra email trong MySQL
        mysql_cursor = mysql_db.cursor(dictionary=True)
        mysql_cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if mysql_cursor.fetchone():
            return render_template('register.html', message='Email này đã được sử dụng!')

        mysql_cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                           (name, email, hashed_password))
        mysql_db.commit()
        
        return redirect(url_for('login'))

    return render_template('register.html')


# Trang đăng nhập
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        if not all([email, password]):
            return render_template('login.html', message='Vui lòng nhập đầy đủ thông tin!')

        # Kiểm tra trong MySQL
        mysql_cursor = mysql_db.cursor(dictionary=True)
        mysql_cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = mysql_cursor.fetchone()

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            session['user'] = user['name']  # Lưu user vào session
            return redirect(url_for('dashboard'))
        return render_template('login.html', message='Email hoặc mật khẩu không đúng!')

    return render_template('login.html')


# Trang dashboard sau khi đăng nhập thành công
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('dashboard.html', user=session['user'])


# Đăng xuất
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))


# Chạy server
if __name__ == '__main__':
    app.run(debug=True )