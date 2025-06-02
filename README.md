# exo-exe // Cybersecurity Portfolio

Welcome to the repository for my personal cybersecurity journey! This site showcases my projects and skills in the cybersecurity landscape. It's designed with a hacker aesthetic and is not just a standard display of my work, but an interactive experience for those curious to look deeper.

**Live Site**: https://exo-exe.github.io/
## About This Project

This portfolio was built in HTML, CSS and JavaScript, featuring:
- A dynamic landing page (index.html) with a boot-up sequence inspired by Hollywoods interpretation of hacking and cybersecurity.

- A main portfolio page (portfolio.html) detailing my about section, projects, and contact information, complete with a Matrix-style raining code background.

- A blog/research page (blog_research.html) to share articles and findings.

- Interactive elements, animations, and a responsive design.

The theme is heavily inspired by hacker culture, cyberpunk aesthetics, and a general love for all things digital and mysterious.
## Hidden Challenges & Easter Eggs

Beyond the surface of the HTML and JavaScript code, it contains several hidden messages, puzzles and Easter eggs. Consider this your **SPOILER WARNING**. Can you find them all?

1. **The Matrix Has you...**
- **Location**: portfolio.html (HTML Head Comments)
- **Description**: Two HTML comments.
    - The first being a direct quote from The Matrix (1999): 
    ```bash
    "This is your last chance. After this, there is no turning back..."
    ```
    - The second is a Base64 encoded string: 
    ```bash
    aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2gdj02cnJQUC1RT0Yzaw==
    ```

- **To Find**: View the page source code of portfolio.html and inspect the <head> section.
- **Decoded**: The Base 64 string decodes to a YouTube URL: https://www.youtube.com/watch?v=6rrPP-QOF3k (You'll have to see what lies here)

2. **The Encrypted Footer**
- **Location**: portfolio.html (Footer Section)
- **Description**:
    - A HTML comment with a quote from V for Vendetta:
    ```bash
    "He hoped to remind the world that fairness, justice, and freedom are more than words. They are perspectives."
    ```
    - A hidden link (<a class="hidden-link">) with the text _hidden_clue_ (styled to be invisible). This link contains data-secret and data-iv attributes, hinting at AES encryption. The challenge lies in working out if this is the key or not!

3. **Words from Mr.Robot**
- **Location**: robots.txt
- **Description**: The entire content of robots.txt is a Base 64 encoded message.
- **To Find**: Navigate directly to the robots.txt file in your browser( eg. https://exo-exe.github.io/robots.txt). Copy the content and decode it using a Base64 decoder.
- **Decoded**: The messafe is a quote from the Mr.Robot about reality and the digital age:
    ```bash
    “Is any of it real? I mean, look at this. Look at it! A world built on fantasy. Synthetic emotions in the form of pills. Psychological warfare in the form of advertising."
    ```

4. **Console Whispers**
- **Location**: js/script.js (triggered on page load, visable in Developer Console)
- **Description**: Several themed messages are logged to the browser's developer console when the main portfolio page loads:
    - System.log: Initiating connection to digital matrix...
    - System.log: Access granted. Keep your eyes open.
    - System.log: Some secrets are not meant for the surface web. Check the source for clues.
- **To Find**: Open your browser's developer tools (usually F12) and check the "Console" tab when portfolio.html is loaded.

5. **The Konami Code**
- **Location**: js/script.js (triggered by keyboard input on most pages)
- **Description**: Entering the classic Konami Code will trigger a pop-up message.
- **To Trigger**: On your keyboard, press the sequence:
    ```bash
    ↑ ↑ ↓ ↓ ← → ← → B A
    ```
- **Ressult**: A model dialog appears with the message:
    ```bash
    // ACCESS GRANTED // Well done finding on finding this easter egg.
    ```

6. **Sitemap Glyphs**
- **Location**: sitemap.xml
- **Description**: An ASCII art picture is embedded within the XML comments of the sitemap.
- **To Find**: Navigate directly to the sitemap.xml (e.g. https://exo-exe.github.io/sitemap.xml) and view its raw source.
- **Content**: A piece of terminal style ASCII art with a subtle message.

7. **Morse Code**
- **Location**: blog_research.html
- **Description**: A HTML comment with a morse code message inside of it.
- **To Find**: Navigate to the blog_research.html and view the source code and find the message in the bottom section of the code. 
- **Results**: Entering the code into a decoder we get the message:
    ```bash
    VENI VIDI VICI
    ```

8. **Encoded Images**
- **Location**: images/img(2).png
- Description: This image is similar but it is hiding a message to those willing enough to pay close attention.
- **To Find**: By downloading the image and by using the AES Key with a website like (https://www.pelock.com/products/steganography-online-codec) you'll get acces to a hidden message.
- **Results**: We get a quote from the 1983 film WarGames:
    ```bash
    "The only winning move is not to play"
    ```
## Tech Stack
- HTML 5
- CSS3
- Vanilla JavaScript (ES6+)
- Vanta.js (Animated background on index.html)
- Three.js (Dependency for Vanta.js)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/exo-exe/exo-exe.github.io
    ```
2. Open index.html or portfolio.html in your browser to view the site locally.
## Contributing

While this is a personal portfolio, if you spot any bugs or have any suggestions for improving the code or adding more fun secrets, feel free to open an issue or submit a pull request.

*exo-exe // System online*
