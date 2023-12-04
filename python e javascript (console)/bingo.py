import random

class BingoCard:
    def __init__(self, name):
        self.name = name
        self.card = self.generate_card()

    def generate_card(self):
        card = {
            'B': random.sample(range(1, 16), 5),
            'I': random.sample(range(16, 31), 5),
            'N': random.sample(range(31, 46), 4),
            'G': random.sample(range(46, 61), 5),
            'O': random.sample(range(61, 76), 5)
        }
        return card

def display_card(card):
    print(f"=== {card.name}'s Bingo Card ===")
    for letter, numbers in card.card.items():
        print(f"{letter}: {numbers}")

def generate_players():
    num_players = int(input("Quantos jogadores? (Mínimo 2): "))
    players = []
    for _ in range(num_players):
        name = input("Digite o nome do jogador: ")
        player = BingoCard(name)
        players.append(player)
    return players

def draw_number(used_numbers):
    while True:
        number = random.randint(1, 75)
        if number not in used_numbers:
            used_numbers.add(number)
            return number

def play_game(players):
    used_numbers = set()
    while True:
        input("Pressione Enter para sortear um número: ")
        drawn_number = draw_number(used_numbers)
        print(f"Número sorteado: {drawn_number}")
        
        for player in players:
            display_card(player)
            if check_bingo(player.card, drawn_number):
                print(f"Parabéns, {player.name}! Você completou o Bingo!")
                return

def check_bingo(card, drawn_number):
    for numbers in card.values():
        if drawn_number not in numbers:
            return False
    return True

if __name__ == "__main__":
    players = generate_players()

    if len(players) < 2:
        print("Pelo menos 2 jogadores são necessários para jogar.")
    else:
        play_game(players)
