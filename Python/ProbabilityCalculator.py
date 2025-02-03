import random
import copy
import math

class Hat:
    def __init__(self, **kwargs):
        """Initialize the hat with a dictionary of ball colors and their count."""
        self.contents = []
        for color, count in kwargs.items():
            self.contents.extend([color] * count)

    def draw(self, num_balls):
        """Randomly draws `num_balls` from the hat, removing them from contents."""
        if num_balls >= len(self.contents):
            draw_balls = self.contents
            self.contents = []
            return draw_balls  # Return all balls if num_balls exceeds available
        
        drawn_balls = random.sample(self.contents, num_balls)  # Randomly select balls
        for ball in drawn_balls:
            self.contents.remove(ball)  # Remove drawn balls
        return drawn_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    """Runs an experiment to estimate the probability of drawing the expected balls."""
    successful_experiments = 0

    for _ in range(num_experiments):
        color_counts = {}
        for color in hat.contents:
            color_counts[color] = color_counts.get(color, 0) + 1
        new_hat = Hat(**color_counts)
        drawn = new_hat.draw(num_balls_drawn)
        draw_counts = {}
        for color in drawn:
            draw_counts[color] = draw_counts.get(color, 0) + 1
        success = True
        for color, count in expected_balls.items():
            if draw_counts.get(color, 0) < count:
                success = False
                break
        
        if success:
            successful_experiments += 1
    
    return successful_experiments/num_experiments


hat = Hat(black=6, red=4, green=3)
probability = experiment(hat=hat,
                  expected_balls={'red':2,'green':1},
                  num_balls_drawn=5,
                  num_experiments=2000)

print(probability)