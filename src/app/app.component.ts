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

    const url = this.buildUrl(symbol);

    const handleData = (data: Object): void => {

      if (data[0]) {
        this.company = data[0];
      }
      else if (data["Error Message"]){
        this.showSnackBar(data["Error Message"]);
      }
      else {
        this.showSnackBar("No data found");
      }
    };

    const handleErrors: (error: any) => void =
      error => {
        console.error(error);
        this.showSnackBar("There was an error fetching data");
      };

    this.http.get(url)
      .subscribe(handleData,
        handleErrors
      );
  }  

  private buildUrl(symbol: string) {
    return `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${this.apiKey}`;
  }

  setApiKey(key: string = "") {

    if (key.length !== 32) {
      this.showSnackBar("API Key seems to be invalid");
      return;
    }

    this.apiKey = key;
    sessionStorage.setItem('stocksApiKey', key);
    this.showSnackBar("API Key is set");

  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss",
      {
        duration: 3000,
        verticalPosition: 'top'
      });
  }
}
