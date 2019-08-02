#-*- coding: utf-8 -*-
# Author: setsal Lan

import sys
import flask
from flask import render_template, request, redirect
from werkzeug.utils import secure_filename

app = flask.Flask(__name__)
app.config["DEBUG"] = True

import os

app.config["IMAGE_UPLOADS"] = "/home/setsal/ais3/project/2019_AIS3_NS_project/backend/img/upload"
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["JPEG", "JPG", "PNG"]

def allowed_image(filename):
    if not "." in filename:
        return False

    ext = filename.rsplit(".", 1)[1]

    if ext.upper() in app.config["ALLOWED_IMAGE_EXTENSIONS"]:
        return True
    else:
        return False


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/upload', methods=["GET", "POST"])
def upload():
    if request.method == "POST":
        if request.files:

            image = request.files["image"]

            if image.filename == "":
                print("No filename")
                return redirect(request.url)

            if allowed_image(image.filename):
                filename = secure_filename(image.filename)
                image.save(os.path.join(app.config["IMAGE_UPLOADS"], filename))
                print("Image saved", file=sys.stderr)
                return render_template('result.html', result="hello")
            else:
                print("That file extension is not allowed")
                return redirect(request.url)

    return render_template('result.html', result="hello2")

app.run()