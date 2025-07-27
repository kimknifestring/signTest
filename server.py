from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # templates 폴더에 있는 index.html을 불러옵니다.
    return render_template('index.html')

if __name__ == '__main__':
    # debug=True로 설정하면 코드 변경 시 서버가 자동 재시작됩니다.
    app.run(debug=True, host='0.0.0.0')