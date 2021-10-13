import {Component, OnInit} from '@angular/core';
import { io } from 'socket.io-client';

// for chart
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  // chart variables
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // end

  numTicket: number = 0;
  file = '';
  messages: Array<any> = [];
  socket: any;
  obj:any = new Object();
  locations: Array<any> = [];
  location:any = {};
  // SocketIOClient.Socket;

  constructor() {
    this.socket = io();//connection event
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }

  ngOnInit() {
    this.messages = new Array();
    this.locations =  new Array();
    this.listen2Events();
    this.passTheData();
    this.socket.emit('init',()=>
      console.log("initialize the object from app.js"))

    this.display_chart();
  }

  onSelect(location:any) {
    this.location = location;
  }

  listen2Events() {
    this.socket.on('msg', (data:any) => {
      this.messages.push(data);
    });
  }

  passTheData(){
    this.socket.on('receive_data', (data:any)=>{
    Object.assign(this.obj,data)});
}

  display_chart(){
    Object.keys(this.obj).forEach(function(key){
      if(key = "teams"){
        console.log("find!");
      }
    })
  }


  sendMessage() {
    console.log(this.location.text +"/"+this.numTicket);
    this.socket.emit("newNumber", {num:this.numTicket, location:this.location.text });
    this.location = {};
    this.numTicket = 0;
  }


}