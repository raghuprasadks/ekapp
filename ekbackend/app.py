'''
https://www.kite.com/blog/python/flask-restful-api-tutorial/
https://medium.com/@balramchavan/angular-python-flask-full-stack-demo-27192b8de1a3
'''

import flask
from flask import request, jsonify
import sqlite3
from flask_cors import CORS, cross_origin



app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


@app.route('/api/register', methods=['POST'])
def register():
    print('request param ',request.json)
    conn = sqlite3.connect('ekaushalya.db')
    name = request.json['name']        
    email = request.json['email']
    mobilenumber = request.json['mobilenumber']
    password=request.json['password']
    #conn.row_factory = dict_factory
    regdata = (name,email,mobilenumber,password)
    print("registration data" ,regdata)
    cur = conn.cursor()
    sql='insert into registration(name,email,mobilenumber,password) values (?,?,?,?)'
    cur.execute(sql,regdata)
    conn.commit()
    regid = cur.lastrowid
    message={"id":regid,"status":"success"}
    print('message',message)
    return jsonify(message)

@app.route('/api/login', methods=['POST'])
def login():
    #print('request param ',request.json)
    print('login',request.json)
    print(request.headers.get('Authorization'))
    conn = sqlite3.connect('ekaushalya.db')
    conn.row_factory = dict_factory
    email = request.json['email']
    password=request.json['password']
    loginparam = (email,password)
    print('loginparam ',loginparam)
    cur = conn.cursor()
    sql='select name,email,mobilenumber,password from  registration where email=? and password=? '
    record =cur.execute(sql,loginparam).fetchall()
    print('login : record ',record)
    '''
    name=''
    
    for r in record:
        print(r)
        name = r[0]
    if(len(name)>1):
        message={"name":name,"status":"success"}
    else:
        message={"name":name,"status":"failed"}
    '''
    return jsonify(record)



@app.route('/api/registereduser', methods=['GET'])
def registereduser():
    
    conn = sqlite3.connect('ekaushalya.db')
    cur = conn.cursor()
    sql='select name,email,mobile from registration'
    regusers = cur.execute(sql).fetchall()
    return jsonify(regusers)

@app.route('/api/getCrashCourse', methods=['GET'])
def getCrashCourse():
    
    print('getCrashCourse')
    print(request.headers.get('Authorization'))
    conn = sqlite3.connect('ekaushalya.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    sql='select id,name,description,videourl,status from crashcourse'
    crashcourse = cur.execute(sql).fetchall()
    return jsonify(crashcourse)

@app.route('/api/getMyCourses',methods=['GET'])
def getMyCourses():
    print('getMyCourses')
    query_parameter = request.args
    email = query_parameter.get('email')
    print('query string ',email)
    email = email.replace('"','').strip()
    print('email str::repalceAfter ',email)
    print('request values ',request.values['email'].replace('"',''))
    print('request json ',request.json)
    
    conn = sqlite3.connect('ekaushalya.db')
    '''
    select courses.id,courses.name,courses.description from registration,mycourses,courses
    where registration.id = mycourses.userid AND
    mycourses.courseid= courses.id and 
    registration.email='prasadraghuks@gmail.com';
    '''
    
    conn.row_factory = dict_factory
    cur = conn.cursor()
    query="""select courses.id,courses.name,courses.description from registration,mycourses,courses
    where registration.id = mycourses.userid AND
    mycourses.courseid= courses.id and 
    registration.email=?"""
    results = cur.execute(query, (email,)).fetchall()
    print('results ',results)

    return jsonify(results)

@app.route('/api/getMyCourseVideos',methods=['GET'])
def getMyCourseVideos():
    print('getMyCourses')
    query_parameter = request.args
    print('getMyCourseVideos ',query_parameter)
    email = query_parameter.get('email').replace('"','').strip()
    courseid = query_parameter.get('courseid').replace('"','').strip()
    conn = sqlite3.connect('ekaushalya.db')
    '''
    select courses.id,courses.name,courseVideos.sectionid,courseVideos.sectionname,courseVideos.videourl from registration,mycourses,courseVideos,courses 
    where registration.id=mycourses.userid AND
    mycourses.courseid = courseVideos.courseid and 
    courses.id=courseVideos.courseid and
    email='prasadraghuks@gmail.com' AND
    courses.id = 1
    '''
    
    conn.row_factory = dict_factory
    cur = conn.cursor()
    query="""select courses.id,courses.name,courseVideos.sectionid,courseVideos.sectionname,courseVideos.videourl from registration,mycourses,courseVideos,courses 
    where registration.id=mycourses.userid AND
    mycourses.courseid = courseVideos.courseid and 
    courses.id=courseVideos.courseid and
    email=? and
    courses.id = ?
    """
    results = cur.execute(query, (email,courseid)).fetchall()

    return jsonify(results)



@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    conn = sqlite3.connect('books.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    all_books = cur.execute('SELECT * FROM books;').fetchall()

    return jsonify(all_books)




@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


@app.route('/api/v1/resources/books', methods=['GET'])
def api_filter():
    query_parameters = request.args

    id = query_parameters.get('id')
    published = query_parameters.get('published')
    author = query_parameters.get('author')

    query = "SELECT * FROM books WHERE"
    to_filter = []

    if id:
        query += ' id=? AND'
        to_filter.append(id)
    if published:
        query += ' published=? AND'
        to_filter.append(published)
    if author:
        query += ' author=? AND'
        to_filter.append(author)
    if not (id or published or author):
        return page_not_found(404)

    query = query[:-4] + ';'

    conn = sqlite3.connect('books.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()

    results = cur.execute(query, to_filter).fetchall()

    return jsonify(results)

app.run()