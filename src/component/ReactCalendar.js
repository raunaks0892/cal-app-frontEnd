import "../App.css";
import logo from '../img/logo_2.png';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";

import { Component,useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import enIN from "date-fns/locale/en-IN";
import XMLParser from "react-xml-parser";


import credData from "../config/config";


//import Filters from "./Filters";
//import NavBar from "./NavBar";
import SideBar from "./SideBar";
//import Filter_test from "./Filter_test";
import BackgroundWrapper from 'react-big-calendar/lib/BackgroundWrapper';
import "../Cal.css";

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
      priorityList:[{'sys_id':1,'name':'Critical','color':'red'},{'sys_id':2,'name':'High','color':'darkred'},{'sys_id':3,'name':'Moderate','color':'orange'},{'sys_id':4,'name':'Low','color':'CornflowerBlue'}],
      width: 0,
      inactive:false,
      leftExpand:false,
      contract:true,
      rightExpand:true,
      cal_width:860,
      event_popup_data:[]
    };
  }

  

  componentDidMount() {
    const usrName = credData.username;

    const pasword = credData.password;

    // const width = this.divElement.clientHeight;
    // this.setState({ width:width });
    
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
                    search_event_object.color = ele.color
                    
                    eventObject.color = ele.color
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
    // alert("sidebar is "+!inactive+" now");
    // this.setState({activeSideBar:!inactive})
    
    this.setState({cal_events:events})
  }
  eventStyleGenerator = (event,start, end, isSelected)=>{
    console.log("eventStyleGenerator : "+event.color);
    const eventColor = event.color;
    const style = {
      backgroundColor:eventColor
    };
    return {
      style: style
    }

  }

  handleclicktoggle = ()=>{
    this.setState({inactive:!this.state.inactive})
    
    this.setState({leftExpand:!this.state.leftExpand})
    
  }
  handleclickrightoggle = ()=>{
    this.setState({contract:!this.state.contract})
    
    this.setState({rightExpand:!this.state.rightExpand})
   
  }

  handleClickOnSlot=(slotInfo)=>{
    console.log("slotInfo:"+slotInfo.action)
    const temp_pop_data = [];
    if(slotInfo.action==='click'){
      console.log("slot timming: "+slotInfo.slots);
      const slot_date = new Date(slotInfo.slots).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
      const clicked_slot_date = (new Date(slot_date).getMonth()+1)+"/"+new Date(slot_date).getDate()+"/"+new Date(slot_date).getFullYear();
      //console.log("slot_date: "+slot_date+" "+new Date(slot_date).getTime());
      
      this.state.permanent_cal_events.map((event)=>{
        
        const event_start_date = (new Date(event.start).getMonth()+1)+"/"+new Date(event.start).getDate()+"/"+new Date(event.start).getFullYear();
        const event_end_date = (new Date(event.end).getMonth()+1)+"/"+new Date(event.end).getDate()+"/"+new Date(event.end).getFullYear();
        //console.log("event_start_date: "+event_start_date+" event_end_date: "+event_end_date);
        if(event_start_date===clicked_slot_date || event_end_date===clicked_slot_date){
          
          const event_popup = clicked_slot_date+" "+event.title;
          console.log("matching with start or end date :"+event_popup);
          temp_pop_data.push(event_popup);

          this.setState({contract:false});
          this.setState({rightExpand:false});

          

        }else if(event_start_date===clicked_slot_date && event_end_date===clicked_slot_date){
          console.log("matching with both start and end date");
        }

      })
      this.setState({event_popup_data:temp_pop_data})

    }
    
  }
  // getWidth = ()=>{
    
  //   if(this.state.leftExpand && this.state.rightExpand){
  //     this.state.cal_width=860
  //   }else if(!this.state.leftExpand && !this.state.rightExpand){
  //     this.state.cal_width=1350

  //   }else if(!this.state.leftExpand && this.state.rightExpand){
  //     this.state.cal_width=1080
  //   }else if(this.state.leftExpand && !this.state.rightExpand){
  //     this.state.cal_width=1150
  //   }
  // }

  render() {
    
    const cal_events = this.state.cal_events;
    const event_data = this.state.pass_events_data;
    const permanent_cal_events = this.state.permanent_cal_events
    
    
    return (
      <div className="main-container">
        <div className="navBar">
          ""
        </div>
        
      
        <div className={`leftside ${this.state.inactive?"inactive":""}`}>
          
          <div className="left-side-toppart">
                <div className="logo">
                    <img src={logo} alt="Stanford"/>
                </div>
                <div className="toggle-menu-btn">
                     <i className="bi bi-arrow-left-square-fill" onClick={this.handleclicktoggle}></i>
                </div>
                <div>
                  <SideBar permanent_cal_events={permanent_cal_events}
                    pass_events_data={event_data}
                    serviceList={this.state.serviceList} 
                    groupList={this.state.groupList}
                    currentEventsAfterFilter = {this.setCurrentEventsData}/>
                </div>
                {/* <pre>
                    inactive:{inactive}
                    width:{dimensions.width}
                    height:{dimensions.height}
                </pre> */}
                
            </div>
        </div>
      
        
      <div>
        <div className={`middlepart ${this.state.leftExpand?"leftExpand":""} ${this.state.rightExpand?"rightExpand":""}`}>
          
          <div>
            <Calendar 
              localizer={localizer}
              events={this.state.cal_events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 688,margin: "10px" }}
              eventPropGetter={this.eventStyleGenerator}
              onSelectSlot={this.handleClickOnSlot}
              selectable={true}
              //width:this.state.cal_width, 
              // eventPropGetter={(event, start, end, isSelected) => ({
              //   event,
              //   start,
              //   end,
              //   isSelected,
              //   style: { backgroundColor: "red" }
              // })}
            />
          </div>
        </div> 
      </div>
      
      <div>
        <div className={`rightside ${this.state.contract?"contract":""}`}>
          
            <div className="right-side">
                <div className="toggle-menu-btn-right">
                    <i className="bi bi-arrow-right-square-fill" onClick={this.handleclickrightoggle}></i>
                </div>
                <div>
                  
                  {
                    this.state.event_popup_data.map((data)=>(
                      <div className="right-data-display">
                          <li>{data}</li>
                      </div>
                      
                    ))
                  }
                </div>
                {/* <pre>
                    inactive:{inactive}
                    width:{dimensions.width}
                    height:{dimensions.height}
                </pre> */}
                  
              </div>
        </div>  
      </div>

    </div>
      
    );
  }
}

export default ReactCalendar;
