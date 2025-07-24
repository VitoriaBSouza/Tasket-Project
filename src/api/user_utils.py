import random
import smtplib
import os
from email.mime.text import MIMEText
from urllib.parse import urljoin

def get_random_color():
    return f'{random.randint(0, 0xFFFFFF):06x}'

def get_brightness(hex_color):
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    return (299 * r + 587 * g + 114 * b) / 1000

def generate_placeholder(username):
    first_letter = username[0].upper() if username else "U"
    bg_color = get_random_color()
    brightness = get_brightness(bg_color)
    text_color = "ffffff" if brightness < 125 else "000000"
    return f"https://ui-avatars.com/api/?name={first_letter}&background={bg_color}&color={text_color}"