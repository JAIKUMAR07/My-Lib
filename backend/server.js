require("dotenv").config({ quiet: true });
const app = require("./src/app"); // Import the configured app

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
