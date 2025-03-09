# SpiritX_5_Random_boys_02

------

Spirit11 is an exciting fantasy cricket league developed for the *Inter-University Cricket Tournament, allowing users to create their dream teams from real university players, analyze statistics, and compete on the leaderboard. An **AI-powered Spiriter Chatbot** assists users in making smart team selections.

## Features

- Fantasy Cricket League: Create and manage a team of 11 players.

- Admin Panel: Manage player data, stats, and system logic.

- Leaderboard: Compete against others based on team performance.

- Budget Management: Users start with a budget of Rs.9,000,000.

- Spiriter AI Chatbot: Provides insights and assists in team selection.

- Real-Time Updates: Instant synchronization of player statistics.

- Authentication System: Secure signup and login.

## Technology Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Chatbot**: Flask (Python)

## Installation

#### <u>Prerequisites</u>

- Node.js
- npm or yarn
- MongoDB
- Python 3.x

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/ThejithaR/SpiritX_5_Random_boys_02.git
   cd SpiritX_5_Random_boys_02
   ```

2. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd server
   npm install
   ```

   4.Set up environment variables in .env:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

   5.*Chatbot Setup:*

   ```bash
   cd spirit11\flask-server
   install flask and cors
   pip install flask
   pip install flask-cors
   then run python app.py in the terminal
   ```

4. Install Flask dependencies for the chatbot:

   ```bash
   cd chatbot
   pip install -r requirements.txt
   ```

5. Run the application:

   - Start the client:

     ```bash
     npm run dev
     ```

     Make sure the client runs at http://localhost:5173

   - Start the server:

     

     ```bash
     npm run server
     ```

     

   - Start the Flask chatbot:

     ```bash
     python app.py
     ```

6. Open the application in your browser:

   ```bash
   http://localhost:5173
   ```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-xyz`)
5. Open a pull request