import React,{ Component,useState,useEffect } from "react";
import logo from '../img/logo_1.png';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { render } from "@testing-library/react";
import Table from 'react-bootstrap/Table'
import "bootstrap/dist/css/bootstrap.min.css";

function Filters(props){
  
  const [priorityList, setPriorityList] = useState([{'sys_id':1,'name':'Critical'},{'sys_id':2,'name':'High'},{'sys_id':3,'name':'Moderate'},{'sys_id':4,'name':'Low'}]);
  const [currentDropDownList, setCurrentDropDownList] = useState([]);
  const [currentOptionId, setCurrentOptionId] = useState('');
  const [optionList, setOptionList] = useState([]);
  const [cal_events, setCalEvents] = useState([]);
  const [selectedCalEventsIDs, setSelectedCalEventsIDs] = useState([]);
  const [textSearchData, setTextSearchData] = useState([]);

 

  useEffect(()=>{
    
      //console.log('test dropdown sending data to App.js');
     
      props.currentEventsAfterFilter(cal_events);
      
   

  },[cal_events])


  const handleChange=(event)=>{
    //alert(event.target.value);
    const eventId = event.target.value;
    //console.log('test dropdown, selected option from first drop down :'+eventId+" key value: "+event.target.key);

    setCurrentDropDownListData(eventId);
    setCurrentOptionId(eventId);
    
    
  }

  const setCurrentDropDownListData=(currentId)=>{
    //console.log('test dropdown  : '+currentId)
    const tempList = [{'id':1,'value':props.serviceList,'type':'service'},{'id':2,'value':props.groupList,'type':'assignment_group'},{'id':3,'value':priorityList,'type':'priority'}]
    if(currentId == 0){
      //alert('Current option is SELECT FILTERS');
      setCalEvents(props.permanent_cal_events);
      setSelectedCalEventsIDs([]);
    }else{
      setCalEvents(props.permanent_cal_events);
      setOptionList(tempList)
      tempList.map((ele)=>{
        if(ele.id == currentId){
          //console.log('test dropdown, dropdown list set for  : '+ele.type)
          setCurrentDropDownList(ele.value)
            
            
        }else{
          //console.log("error while drop down");
        }
      })
    }
  }

  const handleDependentChange=(event)=>{
    
    //alert('Change of option in dependent list');
    const currentSysID = event.target.value;
    const fiterAllDataArray = []
    const filterCurrentArray = []
    

    //console.log('test dropdown, option selected on depending list   : '+currentSysID);

    if(currentSysID == 0){
      alert('Current selected option in dependent list is:'+currentSysID);
      setCalEvents(props.permanent_cal_events);
      
    }else{
      optionList.map((ele)=>{
        
        if(ele.id == currentOptionId){
          //alert(event.target.value + " type: "+ele.type);
          if(ele.type==='service'){
            
            //alert('type matched');
            props.pass_events_data.map((srvc)=>{
              const filterService = {}
              const collectAllData = {}
              //console.log("srvc : "+srvc.number +" " +srvc.service)
              if(srvc.service===currentSysID){
                filterService.title = srvc.number+" "+srvc.title
                filterService.start = srvc.start;
                filterService.end = srvc.end;

                collectAllData.sys_id = srvc.sys_id
                


                
                //alert("current objcet : "+filterService.title+" "+filterService.start+" "+filterService.end)
                filterCurrentArray.push(filterService);
                fiterAllDataArray.push(collectAllData)

              }
              
            })
            setCalEvents(filterCurrentArray);
            setSelectedCalEventsIDs(fiterAllDataArray);
            
          }
          else if(ele.type==='assignment_group'){
            //alert('type matched');
            props.pass_events_data.map((assgn_group)=>{
              const filterGroup = {}
              const collectGroupData = {}
              //console.log("assgn_group : "+assgn_group.number +" " +assgn_group.assignment_group)
              if(assgn_group.assignment_group===currentSysID){
                filterGroup.title = assgn_group.number+" "+assgn_group.title
                filterGroup.start = assgn_group.start;
                filterGroup.end = assgn_group.end;

                collectGroupData.sys_id = assgn_group.sys_id

                filterCurrentArray.push(filterGroup);
                fiterAllDataArray.push(collectGroupData)

              }
              
            })
            
            setCalEvents(filterCurrentArray);
            setSelectedCalEventsIDs(fiterAllDataArray);
            
          }else if(ele.type==='priority'){
            //console.log('test dropdown,type matched : '+ele.type);
            props.pass_events_data.map((prty)=>{
              const prtyEvent = {}
              const collectPriorityData = {}
              //console.log("prty : "+prty.number +" " +prty.priority+" currentSysID: "+currentSysID)
              if(prty.priority==currentSysID){
                prtyEvent.title = prty.number+" "+prty.title
                prtyEvent.start = prty.start;
                prtyEvent.end = prty.end;

                //console.log("test dropdown, priority objcet : "+prtyEvent.title+" "+prtyEvent.start+" "+prtyEvent.end)

                collectPriorityData.sys_id = prty.sys_id

                filterCurrentArray.push(prtyEvent);
                fiterAllDataArray.push(collectPriorityData)

              }
              
            })
           
            setCalEvents(filterCurrentArray);
            setSelectedCalEventsIDs(fiterAllDataArray);

          }



        }
      })
      
    }
    
    
  }

  const handleTextSearch = (event)=>{
    //alert('Testing text search');
    const searched_text = [];
    
    //if(Object(cal_events).length==0){
      //alert('cal_events is empty');
      //console.log('cal_events is empty AND textSearchData: '+textSearchData);
      
      props.pass_events_data.map((searchObject)=>{
        
        //console.log('textSearchData title check : '+searchObject.title+"  "+textSearchData);
        if(searchObject.number.includes(textSearchData.toUpperCase())){
          const tempObject = {};

          //console.log('search item matched with number: '+searchObject.number+" start date: "+searchObject.start);
          //console.log('textSearchData matched: '+searchObject.title+" "+searchObject.number);
          tempObject.title = searchObject.number+" "+searchObject.title
          tempObject.start = searchObject.start
          tempObject.end = searchObject.end

          searched_text.push(tempObject)
        }
        if(searchObject.title.toLowerCase().includes(textSearchData.toLowerCase())){
          const tempObject = {};

          //console.log('search item matched with title: '+searchObject.number+" start date: "+searchObject.start);
          tempObject.title = searchObject.number+" "+searchObject.title
          tempObject.start = searchObject.start
          tempObject.end = searchObject.end

          searched_text.push(tempObject)

        }
       
        if(searchObject.priority!="" || searchObject.priority!=="undefined"){
          if(searchObject.priority_name.toLowerCase()===(textSearchData.toLowerCase())){
            const tempObject = {};
            //console.log('priorityEle.name:->>>'+searchObject.priority_name.toLowerCase()+", number :"+searchObject.number+", Search text:=>"+textSearchData.toLowerCase()+", Service name: ->"+searchObject.service);
            //console.log('search priority matched: '+searchObject.number+" start date: "+searchObject.start);
            
            tempObject.title = searchObject.number+" "+searchObject.title
            tempObject.start = searchObject.start
            tempObject.end = searchObject.end
  
            searched_text.push(tempObject)
  
            
          }
        }
        

        if(searchObject.service!="" || searchObject.service!=="undefined"){
          if(searchObject.service_name.toLowerCase().includes(textSearchData.toLowerCase())){
            const tempObject = {};
  
            //console.log('search matched with service name: '+searchObject.number+" start date: "+searchObject.start);
  
            tempObject.title = searchObject.number+" "+searchObject.title
            tempObject.start = searchObject.start
            tempObject.end = searchObject.end
  
            searched_text.push(tempObject)
            
          }
        }

        if(searchObject.assignment_group!="" || searchObject.assignment_group!=="undefined"){
          if(searchObject.assignment_group_name.toLowerCase().includes(textSearchData.toLowerCase())){
            const tempObject = {};
  
            //console.log('search matched with service name: '+searchObject.number+" start date: "+searchObject.start);
  
            tempObject.title = searchObject.number+" "+searchObject.title
            tempObject.start = searchObject.start
            tempObject.end = searchObject.end
  
            searched_text.push(tempObject)
            
          }
        }
        
        
      })
      
      setCalEvents(searched_text)

  }

  const logout = () => {
    //window.open("http://localhost:3004/auth/logout", "_self");
    window.open("https://change-request-calendar-backnd.herokuapp.com/auth/logout", "_self");
  };

  return(
      <div className="row">
        <nav className="navbar navbar-light bg-light">
        <div className="col-md-3">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" width="300" height="40" className="d-inline-block align-text-top"/>
          </a>

        </div>
        <div className="col-md-7">
          <div className="row">
            
            <div className="form-group col-md-3">
          
              <select className="form-control" onChange={(e)=>handleChange(e)}>
                <option key="0" value="0">--Select filter--</option>
                <option key="1" value="1">Service</option>
                <option key="2" value="2">Assignment Group</option>
                <option key="3" value="3">Priority</option>
                <option key="4" value="4">text</option>

              </select>
            </div>
              <div className="form-group col-md-4" >
              {
                currentOptionId!=4 ?
              
              <select className="form-control" onChange={(e)=>handleDependentChange(e)}>
                { <option value="0">--dependent filter--</option> }
                  {
                    currentDropDownList.map((option,i)=>(
                      <option key={i} value={option.sys_id}>{option.name}</option>
                    ))
                  
                    
                  }
              </select>:
              
              <div className="row">
                <div className="col-md-10">
                  {/* <input type="text" placeholder="Serach" className="form-control" onChange={(e)=>setTextSearchData(e.target.value)} /> */}
                  <form className="form-inline mr-auto mb-4">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={(e)=>setTextSearchData(e.target.value)}/>
                    
                  </form>
                </div>
                 <div className="col-md-2">
                  {/*<button type="submit" onClick={(e)=>handleTextSearch(e)}><i className="bi bi-search"></i></button> */}
                  <button className="btn btn-secondary btn-rounded" type="submit" onClick={(e)=>handleTextSearch(e)}>Search</button>
                </div>
              </div>
                
              }
               
            </div>
            
          </div>
          
        </div>
        <div className="logout" onClick={logout}>Logout</div>
        </nav>
        
      </div> 

  )
}

export default Filters;