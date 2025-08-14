# 🚀 Crypto Dashboard - Real-time Prices

A real-time cryptocurrency dashboard that displays live prices for Bitcoin (BTC) and Ethereum (ETH) along with a comprehensive table of top 10 tokens by volume from Binance.

## 🌟 Features

-   **Real-time Price Updates**: Live BTC and ETH prices from Binance API
-   **Top 10 Tokens Table**: Displays the most traded tokens with their current prices, price changes, and volumes
-   **Customizable Update Intervals**: Choose from 1 second to 1 hour update frequencies
-   **Responsive Design**: Modern, clean UI that works on desktop and mobile devices
-   **Price Change Indicators**: Visual indicators showing price increases/decreases
-   **Volume Formatting**: Human-readable volume display (K, M, B)

## 🛠️ Technologies Used

-   **HTML5**: Structure and semantic markup
-   **CSS3**: Modern styling with animations and responsive design
-   **JavaScript (ES6+)**: Real-time data fetching and DOM manipulation
-   **Binance API**: Real-time cryptocurrency data
-   **WebSocket**: Live price streaming

## 📁 Project Structure

```
chartjs/
├── index.html          # Main HTML file
├── script.js           # JavaScript logic and API calls
├── styles.css          # CSS styling and animations
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari, Edge)
-   Internet connection for API access

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. The dashboard will automatically start fetching real-time data

### Usage

1. **View Real-time Prices**: BTC and ETH prices are displayed prominently at the top
2. **Adjust Update Frequency**: Use the dropdown to change how often data refreshes
3. **Monitor Top Tokens**: Scroll down to see the top 10 tokens by volume
4. **Track Price Changes**: Green/red indicators show price movements

## 📊 Supported Tokens

The dashboard tracks the following top 10 tokens by volume:

-   Bitcoin (BTC)
-   Ethereum (ETH)
-   BNB (BNB)
-   Chainlink (LINK)
-   Solana (SOL)
-   XRP (XRP)
-   Arbitrum (ARB)
-   Dogecoin (DOGE)
-   Aptos (APT)
-   Sui (SUI)

## ⚙️ Configuration

### Update Intervals

You can customize the update frequency:

-   1 second (default)
-   5 seconds
-   10 seconds
-   30 seconds
-   1 minute
-   5 minutes
-   15 minutes
-   1 hour

### API Endpoints

The application uses Binance's public API endpoints:

-   Real-time price data
-   24-hour ticker statistics
-   Volume information

## 🎨 UI Features

-   **Dark/Light Theme**: Automatic theme detection
-   **Smooth Animations**: Price change animations
-   **Responsive Layout**: Works on all screen sizes
-   **Loading States**: Clear feedback during data loading
-   **Error Handling**: Graceful error messages

## 🔧 Customization

### Adding New Tokens

To add new tokens to the dashboard:

1. Edit `script.js`
2. Add the token symbol to the `topTokens` array
3. Add the token name to the `tokenNames` object
4. The dashboard will automatically include the new token

### Styling

Modify `styles.css` to customize:

-   Colors and themes
-   Layout and spacing
-   Animations and transitions
-   Typography

## 🌐 Browser Support

-   Chrome 60+
-   Firefox 55+
-   Safari 12+
-   Edge 79+

## 📱 Mobile Support

The dashboard is fully responsive and optimized for mobile devices with:

-   Touch-friendly interface
-   Optimized layout for small screens
-   Fast loading times

## 🔒 Security

-   Uses Content Security Policy (CSP)
-   No sensitive data stored locally
-   Secure API connections
-   Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

-   Binance for providing the API
-   Chart.js community for inspiration
-   Open source contributors

## 📞 Support

If you encounter any issues or have questions:

-   Check the browser console for error messages
-   Ensure you have a stable internet connection
-   Verify that the Binance API is accessible

---

**Made with ❤️ for the crypto community**
