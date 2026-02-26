const config = require("./config.json")
const mineflayer = require("mineflayer")
const readline = require("readline")

// Register bot
const bot = mineflayer.createBot({
    host: config.host || "localhost",
    port: config.port || 25565,
    username: config.username || "bot",
    version: config.version || "1.21.11"
})

// Log on login
bot.on("login", () => {
    console.log("Logged in!")
})

// Input
// Creates a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.setPrompt("> ")

// Start input on the bot spawn
bot.once("spawn", () => {
    // Prompt the user
    rl.prompt()

    // Listen for input
    rl.on("line", (line) => {
        // Remove any whitespace
        const text = line.trim()

        // Quit command
        if (text === ":q") {
            console.log("Quitting...")
            rl.close()
            return bot.quit()
        }

        // Send the message and repeat
        bot.chat(text)
        rl.prompt()
    })
})

// Output
// Outputs something to the console preserving the user's input
function log(msg) {
  // Clear the current input line
  readline.cursorTo(process.stdout, 0)
  readline.clearLine(process.stdout, 0)

  // Print the message
  console.log(msg)

  // Re-show the prompt and preserve what the user has typed
  rl.prompt(true)
}

// log each message
bot.on("message", (jsonMsg) => {
    log(jsonMsg.toString())
});

