import "../App.css";
import logo from '../img/logo_1.png';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table'
import enIN from "date-fns/locale/en-IN";
import XMLParser from "react-xml-parser";
//require('dotenv').config({ path:'./.env'})

import credData from "../config/config";


import Filters from "./Filters";
//import CustomSearch from "./CustomSearch";



//"en:US": require("date-fns/locale/en-US"),



const locales = {
  "en:IN": enIN
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


class ReactCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cal_events: [],
      permanent_cal_events:[],
      pass_events_data:[],
      serviceList:[],
      groupList:[],
      priorityList:[{'sys_id':1,'name':'Critical'},{'sys_id':2,'name':'High'},{'sys_id':3,'name':'Moderate'},{'sys_id':4,'name':'Low'}],
     
    };
  }

  

  componentDidMount() {
    const usrName = credData.username;

    const pasword = credData.password;
    
    //console.log("User name from config file: "+usrName+" and password: "+pasword);
    
    const fetchApiData= async (url)=>{
      const userName = credData.username;
      const password = credData.password;
      var authToken = 'Basic ' + btoa(userName + ':' + password);
      var configuration = {
        method: "get",
        url: url,
        headers: {
          Authorization: authToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    const response = await axios(configuration);

     let tempData = response.data;
     const resArray = [];
     for(let i=0;i<tempData.result.length;i++){

        let resObject = {};
        let name;
        let sys_id;

        for(let x in tempData.result[i]){
          if(x==="name"){
            resObject.name = tempData.result[i][x];
          }else if(x==="sys_id"){
            resObject.sys_id = tempData.result[i][x];
          }

        }
        //console.log("resObject : "+resObject+" name:"+resObject.name+" sys_id:"+resObject.sys_id);
        resArray.push(resObject);


     }
     return resArray;
  }
  const getAllServices = async ()=>{
    const serviceUrl = credData.service_url;
    const allServices = await fetchApiData(serviceUrl);
    //console.log(" getAllServices length: "+allServices);
    this.setState({serviceList:allServices});
    

  }
  const getAllAssignmentGroup = async ()=>{
    const assignmentGroupUrl = credData.assignment_group_url;
    const allgroups = await fetchApiData(assignmentGroupUrl);
    //console.log(" getAllServices length: "+allgroups);
    this.setState({groupList:allgroups});
    

  }
  
   
  getAllServices();
  getAllAssignmentGroup();
 

    let self = this;
    const userName = credData.username;
    const password = credData.password;
    const url = credData.change_request_url;
    //const url = process.env.REACT_APP_URL;
    //console.log("Start sending request........!!!!!!");
    var authToken = 'Basic ' + btoa(userName + ':' + password);
    //console.log('Basic authToken ' + authToken);
    

    var config = {
      method: "get",
      url: url,
      headers: {
        Authorization: authToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then( function (response) {
        //console.log("response-1: " + response.data +
            //"type of variable: " + typeof response.data +
            //" length of object:" + Object.keys(response.data.result).length
        //);
        let tempData = response.data;
        let eventArray = [];
        let tempEventArray =[];
        

        
        
        
        for(let i=0;i<tempData.result.length;i++){
          let eventObject = {};
          let search_event_object = {};
            let startDate;
            let endDate;
            let work_start_date;
            let work_end_date;
            let number;
           
          for(let x in tempData.result[i]){
            
            //console.log("response-2"+ x +" : " + tempData.result[i][x]);

            eventObject.allday=true;

            if(x==="start_date"){
              startDate =  new Date(tempData.result[i][x]).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});;
              //console.log("start-date"+ x +" : " + startDate);
            }else if(x==="end_date"){
              endDate =  new Date(tempData.result[i][x]).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});;
              //console.log("end-date"+ x +" : " + endDate);
            }else if(x==="work_start"){
              work_start_date = tempData.result[i][x];
            }else if(x==="work_end"){
              work_end_date = tempData.result[i][x];
            }else if(x==="number"){
              number = tempData.result[i][x];
              search_event_object.number = tempData.result[i][x];
            }else if(x==="short_description"){
              eventObject.title=number +" "+ tempData.result[i][x];
              search_event_object.title= tempData.result[i][x];

            }else if(x==="business_service"){
             
              if(tempData.result[i][x]===""){
                search_event_object.service="";
                search_event_object.service_name="";
              }else{
                //console.log("business service not null"+tempData.result[i][x].value);
                self.state.serviceList.map((ele)=>{
                  if(ele.sys_id === tempData.result[i][x].value){
                    search_event_object.service=ele.sys_id
                    search_event_object.service_name=ele.name
                    //console.log("business service :"+search_event_object.service);
                  }
                })
              }
              
            }else if(x==="assignment_group"){
              if(tempData.result[i][x]===""){
                search_event_object.assignment_group=""
                search_event_object.assignment_group_name=""
              }else{
                self.state.groupList.map((ele)=>{
                  if(ele.sys_id === tempData.result[i][x].value){
                    search_event_object.assignment_group=ele.sys_id
                    search_event_object.assignment_group_name=ele.name
                  }
                })
                
              }
            }else if(x==="priority"){
              if(tempData.result[i][x]===""){
                search_event_object.priority=" "
              }else{
                //console.log("prty value:"+tempData.result[i][x]);
                self.state.priorityList.map((ele)=>{
                  if(ele.sys_id == tempData.result[i][x]){
                    search_event_object.priority=ele.sys_id
                    search_event_object.priority_name=ele.name
                    //console.log("prty value name:"+search_event_object.priority);
                  }
                })
              }

            }else if(x==="sys_id"){
              search_event_object.sys_id= tempData.result[i][x];
            }
            
          }
          if(startDate===""){
            eventObject.start=new Date(work_start_date);
            search_event_object.start=new Date(work_start_date);
            //eventObject.start=new Date(2022, 3, 21);
          }else{
            eventObject.start=new Date(startDate);
            search_event_object.start=new Date(startDate);
            //eventObject.start=new Date(2022, 3, 21);
          }
          if(endDate===""){
            eventObject.end=new Date(work_end_date);
            search_event_object.end=new Date(work_end_date);
            //eventObject.end=new Date(2022, 3, 21);
          }else{
            eventObject.end=new Date(endDate);
            search_event_object.end=new Date(endDate);
            //eventObject.end=new Date(2022, 3, 21);
          }
          //console.log("event object : "+eventObject.start+" type of "+typeof(eventObject.start));
          //console.log("number:"+number+" starte date: "+eventObject.start);
          if(search_event_object.service !=="No Service Assigned"  ){
            //console.log("number:"+number+" starte date: "+eventObject.start);
            //console.log("search_event_object.service: "+ search_event_object.service);
          }
          if(eventObject.start!=="Invalid Date"){
            eventArray.push(eventObject);
            tempEventArray.push(search_event_object);
          }else{
            //console.log("Object not pushed in array"+search_event_object.number);
          }
          
          //console.log("event Array : "+eventArray[0].title);
        }

        //console.log("event Array length: "+eventArray.length);

        self.setState({
          cal_events:eventArray
        })
        self.setState({
          permanent_cal_events:eventArray
        })
        self.setState({
          pass_events_data:tempEventArray
        })

        //console.log("cal_events Array length: "+this.state.length);
       
        
      })
      .catch(function (error) {
        console.log(error);
      });

      
  }

  componentDidUpdate(){

  }
  setCurrentEventsData=(events)=>{
    //console.log('test dropdown, data received from filters.js : '+events);
    
    this.setState({cal_events:events})
  }


  render() {
    
    const cal_events = this.state.cal_events;
    const event_data = this.state.pass_events_data;
    const permanent_cal_events = this.state.permanent_cal_events
    
    
    return (
      <div className="container-fluid">
        <Filters permanent_cal_events={permanent_cal_events}
           pass_events_data={event_data}
           serviceList={this.state.serviceList} 
           groupList={this.state.groupList}
           currentEventsAfterFilter = {this.setCurrentEventsData} ></Filters>  
        
        {
          <Calendar
            
            localizer={localizer}
            events={this.state.cal_events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
          />
        }
         
      </div>
    );
  }
}

export default ReactCalendar;
