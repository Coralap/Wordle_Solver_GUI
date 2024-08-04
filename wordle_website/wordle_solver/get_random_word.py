import random
from contents import contents

def get_random():

    words = contents.split()

    return random.choice(words)

