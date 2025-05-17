import json
import sys
from typing import Dict, Any, List, Optional
import yfinance as yf

def get_stock_info(ticker: str) -> Dict[str, Any]:
    """Get basic information about a stock ticker."""
    stock = yf.Ticker(ticker)
    info = stock.info
    return {
        "symbol": ticker,
        "name": info.get("shortName", ""),
        "price": info.get("currentPrice", 0),
        "previous_close": info.get("previousClose", 0),
        "open": info.get("open", 0),
        "day_high": info.get("dayHigh", 0),
        "day_low": info.get("dayLow", 0),
        "volume": info.get("volume", 0),
        "market_cap": info.get("marketCap", 0),
        "pe_ratio": info.get("trailingPE", 0),
        "dividend_yield": info.get("dividendYield", 0),
    }

def get_historical_data(ticker: str, period: str = "1mo") -> List[Dict[str, Any]]:
    """Get historical data for a stock ticker."""
    stock = yf.Ticker(ticker)
    history = stock.history(period=period)
    
    result = []
    for date, row in history.iterrows():
        result.append({
            "date": date.strftime("%Y-%m-%d"),
            "open": row["Open"],
            "high": row["High"],
            "low": row["Low"],
            "close": row["Close"],
            "volume": row["Volume"],
        })
    
    return result

def get_recommendations(ticker: str) -> List[Dict[str, Any]]:
    """Get analyst recommendations for a stock ticker."""
    stock = yf.Ticker(ticker)
    recommendations = stock.recommendations
    
    if recommendations is None or recommendations.empty:
        return []
        
    result = []
    for date, row in recommendations.iterrows():
        result.append({
            "date": date.strftime("%Y-%m-%d"),
            "firm": row.get("Firm", ""),
            "to_grade": row.get("To Grade", ""),
            "from_grade": row.get("From Grade", ""),
            "action": row.get("Action", ""),
        })
    
    return result

def handle_request(request: Dict[str, Any]) -> Dict[str, Any]:
    """Handle an incoming MCP request."""
    function_name = request.get("function", "")
    args = request.get("arguments", {})
    
    if function_name == "get_stock_info":
        ticker = args.get("ticker", "")
        if not ticker:
            return {"error": "Ticker symbol is required"}
        return {"result": get_stock_info(ticker)}
    
    elif function_name == "get_historical_data":
        ticker = args.get("ticker", "")
        period = args.get("period", "1mo")
        if not ticker:
            return {"error": "Ticker symbol is required"}
        return {"result": get_historical_data(ticker, period)}
    
    elif function_name == "get_recommendations":
        ticker = args.get("ticker", "")
        if not ticker:
            return {"error": "Ticker symbol is required"}
        return {"result": get_recommendations(ticker)}
    
    else:
        return {"error": f"Unknown function: {function_name}"}

def server_manifest() -> Dict[str, Any]:
    """Return the server manifest describing available functions."""
    return {
        "functions": [
            {
                "name": "get_stock_info",
                "description": "Get basic information about a stock ticker",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "ticker": {
                            "type": "string",
                            "description": "The stock ticker symbol (e.g., AAPL, MSFT)"
                        }
                    },
                    "required": ["ticker"]
                }
            },
            {
                "name": "get_historical_data",
                "description": "Get historical price data for a stock ticker",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "ticker": {
                            "type": "string",
                            "description": "The stock ticker symbol (e.g., AAPL, MSFT)"
                        },
                        "period": {
                            "type": "string",
                            "description": "Time period to fetch data for (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)",
                            "default": "1mo"
                        }
                    },
                    "required": ["ticker"]
                }
            },
            {
                "name": "get_recommendations",
                "description": "Get analyst recommendations for a stock ticker",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "ticker": {
                            "type": "string",
                            "description": "The stock ticker symbol (e.g., AAPL, MSFT)"
                        }
                    },
                    "required": ["ticker"]
                }
            }
        ]
    }

def main():
    """Main entry point for the MCP server."""
    # Print the server manifest
    print(json.dumps(server_manifest()))
    sys.stdout.flush()
    
    # Process requests
    for line in sys.stdin:
        try:
            request = json.loads(line)
            response = handle_request(request)
            print(json.dumps(response))
            sys.stdout.flush()
        except json.JSONDecodeError:
            print(json.dumps({"error": "Invalid JSON"}))
            sys.stdout.flush()
        except Exception as e:
            print(json.dumps({"error": str(e)}))
            sys.stdout.flush()

if __name__ == "__main__":
    main() 