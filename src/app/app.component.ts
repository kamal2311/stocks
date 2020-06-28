import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'The Stocks App';  
  company = null;
  
  constructor(private http: HttpClient){ }
  
  fetchData(symbol:string): void {
    const personalApiKey = 'bd8b2faefb549144a3744ef43a52e50e';
    
    this.http.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${personalApiKey}`)
      .subscribe( data => {
          this.company = data[0];    
      });
  }
}
