#-*- coding: utf-8 -*-
# Author: setsal Lan

import sys
import os
import subprocess
import flask
import json
from flask import render_template, request, redirect, jsonify,  make_response
from werkzeug.utils import secure_filename

app = flask.Flask(__name__)
app.config["DEBUG"] = True

app.config["IMAGE_UPLOADS"] = "/home/setsal/ais3/2019_AIS3_NS_project/backend/img/upload"
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["JPEG", "JPG", "PNG"]



def allowed_image(filename):
    if not "." in filename:
        return False

    ext = filename.rsplit(".", 1)[1]

    if ext.upper() in app.config["ALLOWED_IMAGE_EXTENSIONS"]:
        return True
    else:
        return False

def image_to_string(url, location, cleanup=True, plus=''):
    command = 'wget ' + url + ' -O ' +  location + '.jpg'
    print(command, file=sys.stderr)
    subprocess.check_output('wget ' + url + ' -O ' +  location + '.jpg' )
    # subprocess.check_output('tesseract -l chi_tra ' + img + ' ' + img + ' ' + plus, shell=True)  #create the image txt
    # text = ''
    # with open(img + '.txt', 'r') as f:
    #     text = f.read().strip()
    # if cleanup:
    #     os.remove(img + '.txt')
    text = 'ok'
    return text


@app.route('/', methods=["GET"])
def home():
    return render_template('index.html')

@app.route('/upload', methods=["GET", "POST"])
def upload():
    if request.method == "POST":
        if request.files:

            # image = request.files["image"]

            # if image.filename == "":
            #     print("No filename")
            #     return redirect(request.url)

            # if allowed_image(image.filename):
            #     filename = secure_filename( image.filename )
            #     image.save( os.path.join(app.config["IMAGE_UPLOADS"], filename) )
            #     print("Image saved", file=sys.stderr)
            #     text = image_to_string( os.path.join(app.config["IMAGE_UPLOADS"], filename ), False )
            #     return render_template( 'result.html', result=text )
            # else:
            #     print( "That file extension is not allowed" )
                return redirect(request.url)

    return render_template('result.html', result="hello2")


@app.route('/upload-check', methods=["POST"])
def uploadCheck():
    counter = 1
    url = request.values['url']
    text = image_to_string( url, os.path.join(app.config["IMAGE_UPLOADS"], str(counter) ), False )
    counter = counter + 1 
    # res = make_response(jsonify({"message": "OK"}), 200)
    return "Hello"


app.run()