import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
  ],

  providers: [
    TaskService
  ]
})
export class AppModule { }
