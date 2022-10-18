<!DOCTYPE html>
<html>
  <head>
    <title>Connect-Four-Art</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
    <script defer src="index.js"></script>
  </head>

  <body>
    <div id="app">
      <header id="data">
        <div class="flex fd-row space-around">
          <div>
            <h2 class="heading red">RED:<span id="red-count"></span></h2>
          </div>
          <div>
            <h2 class="heading gold">GOLD:<span id="gold-count"></span></h2>
          </div>
        </div>
        <div class="flex fd-col center">
          <h2 class="heading center-self">Currently Selected: <span id="currently-selected">red<span></span></h2>
          <button id="switch">Switch Color</button>
        </div>
      </header>
      <main id="game-grid">
        <div id="placement-row">
          <div class="placement-col"></div>
          <div class="placement-col"></div>
          <div class="placement-col"></div>
          <div class="placement-col"></div>
          <div class="placement-col"></div>
          <div class="placement-col"></div>
          <div class="placement-col"></div>
        </div>
        <div class="game-row">
          <div class="game-col">
            <div class="game-circle" data-color="red"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
        </div>
        <div class="game-row">
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
        </div>
        <div class="game-row">
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
        </div>
        <div class="game-row">
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
        </div>
        <div class="game-row">
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
        </div>
        <div class="game-row">
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
          <div class="game-col">
            <div class="game-circle"></div>
          </div>
        </div>
      </main>
    </div>

  </body>
</html>
