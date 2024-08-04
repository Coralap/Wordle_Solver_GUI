from django.http import HttpResponse
from django.shortcuts import render
def homepage(request):
   # return HttpResponse("hello world! im home")
    return render(request,"home.html")

def about(request):
    #return HttpResponse("Hello world! im about")
    return render(request, "about.html")
