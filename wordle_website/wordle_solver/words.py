from get_random_word import get_random
from contents import words

common_letters = ['ה', "י", "ו", "ר", "ל"]

# https://www.sttmedia.com/characterfrequency-hebrew
def get_letter_percentage(letter):
    match letter:
        case "א":
            return 4.7
        case 'ב':
            return 5.34
        case 'ג':
            return 1.71
        case 'ד':
            return 2.69
        case 'ה':
            return 8.48
        case 'ו':
            return 11.11
        case 'ז':
            return 0.94
        case 'ח':
            return 2.2
        case 'ט':
            return 1.6
        case 'י':
            return 11.67
        case 'כ':
            return 1.96
        case 'ל':
            return 6.27
        case 'מ':
            return 5.11
        case 'נ':
            return 3.65
        case 'ס':
            return 2.16
        case 'ע':
            return 2.72
        case 'פ':
            return 2.22
        case 'צ':
            return 1.31
        case 'ק':
            return 2.55
        case 'ר':
            return 6.52
        case 'ש':
            return 4.33
        case 'ת':
            return 5.49
        case 'ך':
            return 0.39 
        case 'ם':
            return 2.68
        case 'ן':
            return 1.36
        case 'ף':
            return 0.22
        case 'ץ':
            return 0.19
    return 0.00001

def get_letter_count_and_position(word):
    chars = [x for x in word]
    char_count = {}
    char_positions = {}
    for i, char in enumerate(chars):
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
        if char not in char_positions:
            char_positions[char] = [i]
        else:
            char_positions[char].append(i)
    return char_count, char_positions


# we want the word with the most common letters
# we want the word with the most different letters


def get_word_score(word, average_letter_position, guest_result=None):
    score = 0

    # more of the same letter is bad
    # more common is good

    # normalize the word count
    letter_info = get_letter_count_and_position(word)
    letter_positions = letter_info[1]
    letter_count = letter_info[0]

    for k, v in letter_count.items():
        letter_percentage = get_letter_percentage(k)
        score += letter_percentage
        
        score -= v

    return score


def get_most_common_position():
    letter_position = {
        "א": {"appeared": 0, "position": 0},
        "ב": {"appeared": 0, "position": 0},
        "ג": {"appeared": 0, "position": 0},
        "ד": {"appeared": 0, "position": 0},
        "ה": {"appeared": 0, "position": 0},
        "ו": {"appeared": 0, "position": 0},
        "ז": {"appeared": 0, "position": 0},
        "ח": {"appeared": 0, "position": 0},
        "ט": {"appeared": 0, "position": 0},
        "י": {"appeared": 0, "position": 0},
        "כ": {"appeared": 0, "position": 0},
        "ל": {"appeared": 0, "position": 0},
        "מ": {"appeared": 0, "position": 0},
        "נ": {"appeared": 0, "position": 0},
        "ס": {"appeared": 0, "position": 0},
        "ע": {"appeared": 0, "position": 0},
        "פ": {"appeared": 0, "position": 0},
        "צ": {"appeared": 0, "position": 0},
        "ק": {"appeared": 0, "position": 0},
        "ר": {"appeared": 0, "position": 0},
        "ש": {"appeared": 0, "position": 0},
        "ת": {"appeared": 0, "position": 0},
        "ך": {"appeared": 0, "position": 0},
        "ם": {"appeared": 0, "position": 0},
        "ן": {"appeared": 0, "position": 0},
        "ף": {"appeared": 0, "position": 0},
        "ץ": {"appeared": 0, "position": 0},
    }
    words_len = len(words)
    for word in words:
        for i, letter in enumerate(word):
            letter_position[letter]["position"] += i
            letter_position[letter]["appeared"] += 1
    average_letter_position = {
        "א": 0,
        "ב": 0,
        "ג": 0,
        "ד": 0,
        "ה": 0,
        "ו": 0,
        "ז": 0,
        "ח": 0,
        "ט": 0,
        "י": 0,
        "כ": 0,
        "ל": 0,
        "מ": 0,
        "נ": 0,
        "ס": 0,
        "ע": 0,
        "פ": 0,
        "צ": 0,
        "ק": 0,
        "ר": 0,
        "ש": 0,
        "ת": 0,
        "ך": 0,
        "ם": 0,
        "ן": 0,
        "ף": 0,
        "ץ": 0,
    }
    for letter, data in letter_position.items():
        data["position"] /= data["appeared"]
        average_letter_position[letter] = (data["position"])
    return average_letter_position


def best_words(word_list, average_letter_position):
    best_score = -1000000
    # best_word = ''
    best_words = []
    words = word_list
    for word in words:
        score = get_word_score(word, average_letter_position)
            
        if score > best_score:
            best_score = score
            best_words = [word]
            # print(f"New best word: {word} with score {score}")
        elif abs(score - best_score) < 0.001:
            best_words.append(word)
            # print(f"New best words: {best_words}")

    return best_words, best_score


average_letter_position = get_most_common_position()

if __name__ == "__main__":
    print(get_word_score("ויויו", average_letter_position))
# print(get_most_common_position())
    print(best_words(words, average_letter_position))
# print(average_letter_position)
