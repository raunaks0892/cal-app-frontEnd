import React,{ Component,useState,useEffect,useRef } from "react";
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import DateRangePicker from "./DateRangePicker";
import "../Cal.css"

const TextSearch = (props)=>{

    const [cal_events, setCalEvents] = useState([]);
    const [selectedCalEventsIDs, setSelectedCalEventsIDs] = useState([]);
    const [textSearchData, setTextSearchData] = useState([]);
    const [assignedToName, setAssignedToName]= useState('');


    useEffect(()=>{       
        props.currentEventsAfterTextSearch(cal_events);
    },[cal_events]);

    useEffect(()=>{
    
       handleTextSearch(textSearchData);
    },[textSearchData])

    const findUserName = (userSysId)=>{
        props.usersList.map((usr)=>{
            if(usr.sys_id===userSysId){
                setAssignedToName(usr.name);
                return;
            }
        })

    }


    const handleTextSearch = (event)=>{
        //alert('Testing text search');
        const searched_text = [];
        
        props.pass_events_data.map((searchObject)=>{
            var assigned_name = ""
            
            console.log("text assignment group"+searchObject.assignment_group+" , "+searchObject.assignment_group_name);
            //console.log('textSearchData title check : '+searchObject.title+"  "+textSearchData);
            if(searchObject.number.includes(textSearchData.toUpperCase())){
                const tempObject = {};

                //console.log('search item matched with number: '+searchObject.number+" start date: "+searchObject.start);
                //console.log('textSearchData matched: '+searchObject.title+" "+searchObject.number);
                tempObject.title = searchObject.number+" "+searchObject.title
                tempObject.start = searchObject.start
                tempObject.end = searchObject.end
                tempObject.color = searchObject.color

                searched_text.push(tempObject)

                props.usersList.map((ele)=>{
                    if(ele.sys_id==searchObject.assigned_to){
                        assigned_name= ele.name;

                    }
                })
            }
            else if(searchObject.title.toLowerCase().includes(textSearchData.toLowerCase())){
                const tempObject = {};

                //console.log('search item matched with title: '+searchObject.number+" start date: "+searchObject.start);
                tempObject.title = searchObject.number+" "+searchObject.title
                tempObject.start = searchObject.start
                tempObject.end = searchObject.end
                tempObject.color = searchObject.color

                searched_text.push(tempObject)

            }
            
            //else if(searchObject.priority){ 
                else if(searchObject.priority_name.toLowerCase().includes(textSearchData.toLowerCase())){
                    const tempObject = {};
                    console.log('priorityEle.name:->>>'+searchObject.priority_name.toLowerCase()+", number :"+searchObject.number+", Search text:=>"+textSearchData.toLowerCase()+", Service name: ->"+searchObject.service);
                    //console.log('search priority matched: '+searchObject.number+" start date: "+searchObject.start);
                    
                    tempObject.title = searchObject.number+" "+searchObject.title
                    tempObject.start = searchObject.start
                    tempObject.end = searchObject.end
                    tempObject.color = searchObject.color
            
                    searched_text.push(tempObject)
    
                
                //}
            }
            //else if(searchObject.service){
                //console.log("text serach in service : "+searchObject.service)
                else if(searchObject.service_name.toLowerCase().includes(textSearchData.toLowerCase())){
                    const tempObject = {};
            
                    //console.log('search matched with service name: '+searchObject.number+" start date: "+searchObject.start);
            
                    tempObject.title = searchObject.number+" "+searchObject.title
                    tempObject.start = searchObject.start
                    tempObject.end = searchObject.end
                    tempObject.color = searchObject.color
            
                    searched_text.push(tempObject)
                
                //}
            }
            else if(searchObject.assignment_group){
                //console.log("text search for assignment group");
                 if(searchObject.assignment_group_name.toLowerCase().includes(textSearchData.toLowerCase())){
                    const tempObject = {};
            
                    //console.log('search matched with service name: '+searchObject.number+" start date: "+searchObject.start);
            
                    tempObject.title = searchObject.number+" "+searchObject.title
                    tempObject.start = searchObject.start
                    tempObject.end = searchObject.end
                    tempObject.color = searchObject.color
            
                    searched_text.push(tempObject)
                
                }
            }
            // else if(searchObject.assigned_to){
            //     //console.log("text search for assignment group");
            else if(assigned_name.toLowerCase().includes(textSearchData.toLowerCase())){
                const tempObject = {};
        
                //console.log('search matched with service name: '+searchObject.number+" start date: "+searchObject.start);
        
                tempObject.title = searchObject.number+" "+searchObject.title
                tempObject.start = searchObject.start
                tempObject.end = searchObject.end
                tempObject.color = searchObject.color
        
                searched_text.push(tempObject)
                
                //}
            }
            

            
        })
        
        setCalEvents(searched_text)

      }

      return(
        <div className="search-area">
            <form className="">
                <input className="form-control mr-sm-2" type="text" placeholder="Search..." aria-label="Search" onChange={(e)=>setTextSearchData(e.target.value)}/>
            </form>
        </div>
      )



}

export default TextSearch;