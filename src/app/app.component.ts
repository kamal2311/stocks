import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'The Stocks App';
  company = null;
  apiKey: string = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    const storedKey = sessionStorage.getItem("stocksApiKey");
    if (storedKey) {
      this.apiKey = storedKey;
    }
  }

  fetchData(symbol: string): void {
    this.fetStocksDataFromAPI(symbol);
  }

  private fetStocksDataFromAPI(symbol: string) {

    const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${this.apiKey}`;
    const handleData = (data: Object): void => {

      if (data[0]) {
        this.company = data[0];
      }
      else {
        this.showSnackBar("No data found or API Key is invalid");
      }
    };
    const handleErrors: (error: any) => void =
      error => {
        this.showSnackBar("There was an error fetching data.");
      };
    this.http.get(url)
      .subscribe(handleData,
        handleErrors
      );
  }

  setApiKey(key: string) {

    sessionStorage.setItem('stocksApiKey', key);
    if (!this.apiKey) {
      this.apiKey = key;
      this.showSnackBar("API Key is set");
    }

  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss",
      {
        duration: 3000,
        verticalPosition: 'top'
      });
  }
}
