file_path = "../five_letter_words.txt"
contents = ""
words = []
with open(file_path, "r", encoding="utf-8") as file:
    contents = file.read()
    words = contents.split()

