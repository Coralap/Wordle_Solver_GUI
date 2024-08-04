from django.http import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import random
import json


def homepage(request):
    return render(request, "home.html")

def about(request):
    # return HttpResponse("Hello world! im about")
    return render(request, "about.html")

def get_words(request):
    file_path = "./static/data/five_letter_words.txt"
    contents = ""
    words = []
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            contents = file.read()
            words = contents.split()
        # print(words[:10])

        return JsonResponse(words, safe=False)
    except FileNotFoundError:
        return JsonResponse({"error": str(FileNotFoundError)}, status=500)

def get_random(request):
    words_json = get_words(None).content
    words = json.loads(words_json)
    return JsonResponse(random.choice(words), safe=False)
