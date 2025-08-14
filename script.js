const btcPriceElement = document.getElementById("btcPrice");
const ethPriceElement = document.getElementById("ethPrice");
const statusElement = document.getElementById("status");
const tokenTableBody = document.getElementById("tokenTableBody");
const timeIntervalSelect = document.getElementById("timeInterval");
const tableIntervalElement = document.getElementById("tableInterval");

// Biến để lưu interval ID
let updateIntervalId = null;

// Top 10 tokens by volume
const topTokens = [
    'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'LINKUSDT', 'SOLUSDT',
    'XRPUSDT', 'ARBUSDT', 'DOGEUSDT', 'APTUSDT', 'SUIUSDT'
];

// Token names mapping
const tokenNames = {
    'BTCUSDT': 'Bitcoin',
    'ETHUSDT': 'Ethereum',
    'BNBUSDT': 'BNB',
    'LINKUSDT': 'Chainlink',
    'SOLUSDT': 'Solana',
    'XRPUSDT': 'XRP',
    'ARBUSDT': 'Arbitrum',
    'DOGEUSDT': 'Dogecoin',
    'APTUSDT': 'Aptos',
    'SUIUSDT': 'Sui'
};

// Token logos mapping
const tokenLogos = {
    'BTCUSDT': 'http://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
    'ETHUSDT': 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    'BNBUSDT': 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    'LINKUSDT': 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    'SOLUSDT': 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    'XRPUSDT': 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    'ARBUSDT': 'http://assets.coingecko.com/coins/images/16547/standard/arb.jpg',
    'DOGEUSDT': 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    'APTUSDT': 'https://assets.coingecko.com/coins/images/26455/large/aptos_round.png',
    'SUIUSDT': 'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg'
};

// Store token data
let tokenData = {};

// Initialize initial data for all tokens
topTokens.forEach(symbol => {
    tokenData[symbol] = {
        lastPrice: '0',
        priceChangePercent: 0,
        volume: '0',
        prevPrice: '0'
    };
});

// Variables to track realtime prices
let lastBTC = null;
let lastETH = null;

// Format volume function
function formatVolume(volume) {
    if (volume >= 1e9) return (volume / 1e9).toFixed(2) + 'B';
    if (volume >= 1e6) return (volume / 1e6).toFixed(2) + 'M';
    if (volume >= 1e3) return (volume / 1e3).toFixed(2) + 'K';
    return volume.toFixed(2);
}

// Format price function
function formatPrice(price) {
    const numPrice = parseFloat(price);
    const options = numPrice >= 1
        ? { minimumFractionDigits: 2, maximumFractionDigits: 4 }
        : { minimumFractionDigits: 4, maximumFractionDigits: 6 };

    return '$' + numPrice.toLocaleString('en-US', options);
}

// Calculate price change percentage function
function calculatePriceChange(currentPrice, previousPrice) {
    if (previousPrice === 0 || previousPrice === '0') return 0;
    return ((currentPrice - previousPrice) / previousPrice) * 100;
}

// Update token table function
function updateTokenTable() {
    const hasData = topTokens.some(symbol => tokenData[symbol] && tokenData[symbol].lastPrice !== '0');

    if (!hasData) {
        tokenTableBody.innerHTML = `
            <tr><td colspan="5" style="text-align: center; padding: 20px;">Loading data...</td></tr>
        `;
        return;
    }

    const rows = topTokens.map((symbol, index) => {
        const data = tokenData[symbol];
        const symbolName = symbol.replace('USDT', '');

        if (!data || data.lastPrice === '0') {
            return `
                <tr>
                    <td class="rank">${index + 1}</td>
                    <td>
                        <div class="token-info">
                            <img src="${tokenLogos[symbol]}" alt="${tokenNames[symbol]}" class="token-logo" onerror="this.style.display='none'">
                            <div class="token-details">
                                <div class="token-symbol">${symbolName}</div>
                                <div class="token-name">${tokenNames[symbol]}</div>
                            </div>
                        </div>
                    </td>
                    <td class="price">--</td>
                    <td class="price-change">--</td>
                    <td class="volume">--</td>
                </tr>
            `;
        }

        const priceChange = data.priceChangePercent;
        const priceChangeClass = priceChange >= 0 ? 'positive' : 'negative';
        const priceChangeSign = priceChange >= 0 ? '+' : '';

        return `
            <tr>
                <td class="rank">${index + 1}</td>
                <td>
                    <div class="token-info">
                        <img src="${tokenLogos[symbol]}" alt="${tokenNames[symbol]}" class="token-logo" onerror="this.style.display='none'">
                        <div class="token-details">
                            <div class="token-symbol">${symbolName}</div>
                            <div class="token-name">${tokenNames[symbol]}</div>
                        </div>
                    </div>
                </td>
                <td class="price">${formatPrice(data.lastPrice)}</td>
                <td class="price-change ${priceChangeClass}">${priceChangeSign}${priceChange.toFixed(2)}%</td>
                <td class="volume">$${formatVolume(parseFloat(data.volume))}</td>
            </tr>
        `;
    }).join('');

    tokenTableBody.innerHTML = rows;

    // Add visual effect when table is updated
    const table = document.querySelector('.token-table');
    table.style.transition = 'opacity 0.3s ease';
    table.style.opacity = '0.8';
    setTimeout(() => {
        table.style.opacity = '1';
    }, 150);
}

// Update prices from WebSocket function
function updatePrices() {
    if (lastBTC) btcPriceElement.textContent = `$${lastBTC.toFixed(2)}`;
    if (lastETH) ethPriceElement.textContent = `$${lastETH.toFixed(2)}`;

    if (lastBTC && lastETH) {
        document.title = `BTC: $${lastBTC.toFixed(0)} | ETH: $${lastETH.toFixed(0)}`;
    }

    // Update table according to interval
    updateTokenTable();

    const intervalText = timeIntervalSelect.options[timeIntervalSelect.selectedIndex].text;
    statusElement.textContent = `Khoảng thời gian cập nhật: ${intervalText} | Cập nhật lần cuối: ${new Date().toLocaleTimeString('vi-VN')}`;
}

// Update prices immediately function (not following interval)
function updatePricesImmediate() {
    if (lastBTC) btcPriceElement.textContent = `$${lastBTC.toFixed(2)}`;
    if (lastETH) ethPriceElement.textContent = `$${lastETH.toFixed(2)}`;

    if (lastBTC && lastETH) {
        document.title = `BTC: $${lastBTC.toFixed(0)} | ETH: $${lastETH.toFixed(0)}`;
    }
}

// Handle WebSocket message for token function
function handleTokenWebSocketMessage(symbol, data) {
    try {
        const currentPrice = parseFloat(data.p);
        const volume = parseFloat(data.q) * currentPrice;
        const prevPrice = tokenData[symbol].lastPrice;

        tokenData[symbol] = {
            lastPrice: currentPrice.toString(),
            priceChangePercent: calculatePriceChange(currentPrice, parseFloat(prevPrice)),
            volume: volume.toString(),
            prevPrice: prevPrice
        };

        // Don't update table immediately, let interval handle it
    } catch (error) {
        console.error(`Error processing WebSocket data for ${symbol}:`, error);
    }
}

// Initialize WebSocket for all tokens function
function initializeTokenWebSockets() {
    console.log('Initializing WebSocket for all tokens...');

    topTokens.forEach(symbol => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            handleTokenWebSocketMessage(symbol, data);
        };

        ws.onerror = (error) => console.error(`WebSocket ${symbol} Error:`, error);
        ws.onclose = () => console.log(`WebSocket ${symbol} connection closed`);
    });

    console.log('WebSocket for all tokens has been initialized');
}

// Initialize initial prices function
function initializePrices() {
    statusElement.textContent = '🔄 Initializing prices...';

    const btcPrice = 46000 + Math.random() * 1000;
    const ethPrice = btcPrice * 0.07;

    btcPriceElement.textContent = `$${btcPrice.toFixed(2)}`;
    ethPriceElement.textContent = `$${ethPrice.toFixed(2)}`;
    document.title = `BTC: $${btcPrice.toFixed(0)} | ETH: $${ethPrice.toFixed(0)}`;

    statusElement.textContent = `✅ Initialization complete: ${new Date().toLocaleTimeString('vi-VN')}`;
}

// Change update interval function
function changeUpdateInterval() {
    const interval = parseInt(timeIntervalSelect.value);
    const intervalText = timeIntervalSelect.options[timeIntervalSelect.selectedIndex].text;

    // Clear old interval if exists
    if (updateIntervalId) {
        clearInterval(updateIntervalId);
        console.log('Old interval cleared');
    }

    // Create new interval
    updateIntervalId = setInterval(updatePrices, interval);
    console.log(`New interval created: ${interval}ms`);

    // Update status with visual effect
    statusElement.textContent = `⚡ Update interval: ${intervalText} | Last update: ${new Date().toLocaleTimeString('vi-VN')}`;

    // Update table title
    tableIntervalElement.textContent = `(${intervalText})`;

    // Add visual effect to let user know it has changed
    statusElement.style.color = '#28a745';
    statusElement.style.fontWeight = 'bold';
    setTimeout(() => {
        statusElement.style.color = '#666';
        statusElement.style.fontWeight = 'normal';
    }, 2000);

    console.log(`Update interval changed to: ${intervalText} (${interval}ms)`);
}

// Initialize
initializePrices();
updateTokenTable();
initializeTokenWebSockets();

// WebSocket for BTC and ETH
const wsBTC = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
const wsETH = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");

wsBTC.onmessage = (event) => {
    const data = JSON.parse(event.data);
    lastBTC = parseFloat(data.p);
    updatePricesImmediate(); // Update prices immediately
};

wsETH.onmessage = (event) => {
    const data = JSON.parse(event.data);
    lastETH = parseFloat(data.p);
    updatePricesImmediate(); // Update prices immediately
};

wsBTC.onerror = (error) => console.error('WebSocket BTC Error:', error);
wsETH.onerror = (error) => console.error('WebSocket ETH Error:', error);
wsBTC.onclose = () => console.log('WebSocket BTC connection closed');
wsETH.onclose = () => console.log('WebSocket ETH connection closed');

// Event listener for select box
timeIntervalSelect.addEventListener('change', changeUpdateInterval);

// Initialize first interval
changeUpdateInterval();
