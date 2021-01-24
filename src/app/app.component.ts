import { Component, OnInit } from '@angular/core';
import { apiService } from './service/api.service';
import { Comments } from './model/comments.model';
import { Sales } from './model/sales.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lstcomments: Comments[];
  comments_keys = [];
  comments_values = [];
  comments_review = [];
  lstsales: Sales[];
  sales_keys = [];
  sales_fiction = [];
  sales_non_fiction = [];
  colors = [];
  title: any;
  chart;
  pie: any;
  doughnut: any;

  constructor(private _apiService: apiService) { }
  ngOnInit() {
    this._apiService.getBookSaleData().subscribe(data => {

      this.lstcomments = data;
      //data from bookdataset api
      data.forEach((element) => {
        this.comments_keys.push(element.Author);
        this.comments_values.push(element.UserRating);
        this.comments_review.push(element.Review);
        console.log(this.comments_keys, this.comments_review, this.comments_values);
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        this.colors.push(color);
      });
    });
    this._apiService.getYearlySaleData().subscribe(data => {

      this.lstsales = data;
      //data from books api
      data.forEach((element) => {
        this.sales_keys.push(element.Year);
        this.sales_fiction.push(element.Fiction);
        this.sales_non_fiction.push(element.Nonfiction);
      });
    });

    console.log(this.sales_keys, this.sales_fiction, this.sales_non_fiction)
    //bar chart for fiction and non fiction count 
    this.chart = new Chart('bar', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Book for sales'
        },
      },
      data: {
        labels: this.sales_keys,
        datasets: [
          {
            type: 'bar',
            label: 'Fiction',
            data: this.sales_fiction,
            backgroundColor: 'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)',
            fill: false,
          },
          {
            type: 'bar',
            label: 'Non Fiction',
            data: this.sales_non_fiction,
            backgroundColor: 'rgba(0,0,255,0.4)',
            borderColor: 'rgba(0,0,255,0.4)',
            fill: false,
          }
        ]
      }
    });
    //pie chart for review for books 
    this.pie = new Chart('pie', {
      type: 'pie',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Book Review'
        }, legend: {
          position: 'top',
        }, animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      data: {
        datasets: [{
          data: this.comments_review,
          backgroundColor: this.colors,
          label: 'Dataset 1'
        }],
        labels: this.comments_keys
      }
    })

  }

};