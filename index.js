import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

local proxyURL = "https://your-deployed-proxy.com/update"

app.post("/update", async (req, res) => {
  try {
    const response = await fetch("https://status.roblox.com/data.json");
    const statusData = await response.json();

    const overallStatus = statusData.status.overall; // adjust if needed

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `Roblox API status: ${overallStatus}`,
      }),
    });

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
