import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'The Stocks App';  
  company = null;
  apiKey: any;
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar){ }
  
  fetchData(symbol:string): void {

    if (!this.apiKey) {
        this.snackBar.open("Please create and set an API key","Dismiss");
    }   
    
    this.http.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${this.apiKey}`)
      .subscribe( data => {
          this.company = data[0];    
      },
        error => {
          this.snackBar.open("Invalid stock symbol or no data found");
        }
      );
  }

  setApiKey(key: string){
    if (key){
      this.apiKey = key;    
    }
    this.snackBar.open("APIKey set!","Dismiss",
    {
      duration: 2000,
    });
  }
}
