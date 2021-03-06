import React,{ Component,useState,useEffect,useRef } from "react";
import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import DateRangePicker from "./DateRangePicker";
import "../Cal.css"

const SideBar = (props)=>{
    // const[inactive,setInactive] = useState(false)
    // const[activeSideBar,setActiveSideBar]= useState(true);
    const [priorityList, setPriorityList] = useState([{'sys_id':1,'name':'Critical','color':'red'},{'sys_id':2,'name':'High','color':'darkred'},{'sys_id':3,'name':'Moderate','color':'orange'},{'sys_id':4,'name':'Low','color':'CornflowerBlue'}]);
    const [currentDropDownList, setCurrentDropDownList] = useState([]);
    const [currentOptionId, setCurrentOptionId] = useState('');
    const [optionList, setOptionList] = useState([]);
    const [cal_events, setCalEvents] = useState([]);
    const [selectedCalEventsIDs, setSelectedCalEventsIDs] = useState([]);
    const [textSearchData, setTextSearchData] = useState([]);
    const [currentUserList, setCurrentUserList] = useState([]);
    const [assignmentGroupInUse, setAssignmentGroupInUse] = useState(false);
    
    //const [dimensions, setDimensions]=useState({width:500,height:500});
    

 

  useEffect(()=>{
    
      //console.log('test dropdown sending data to App.js');
     
      props.currentEventsAfterFilter(cal_events);
      
   

  },[cal_events]);

  // useEffect(()=>{
    
  //     handleTextSearch(textSearchData);
  // },[textSearchData])



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

  const handleServiceList = (event)=>{
    
    const currentSysID = event.target.value;
    const fiterAllDataArray = []
    const filterCurrentArray = []
    //console.log("select key : "+event.target.key);

    if(currentSysID==1){
      setCalEvents(props.permanent_cal_events);
    }else{
      props.pass_events_data.map((srvc)=>{
        const filterService = {}
        const collectAllData = {}
        //console.log("srvc : "+srvc.number +" " +srvc.service +" and current sys id: "+currentSysID);
        if(srvc.service===currentSysID){
          filterService.title = srvc.number+" "+srvc.title
          filterService.start = srvc.start;
          filterService.end = srvc.end;
          filterService.color = srvc.color;
  
          collectAllData.sys_id = srvc.sys_id
          
  
  
          
          //alert("current objcet : "+filterService.title+" "+filterService.start+" "+filterService.end)
          filterCurrentArray.push(filterService);
          fiterAllDataArray.push(collectAllData)
  
        }
        
      })
      setCalEvents(filterCurrentArray);
      setSelectedCalEventsIDs(fiterAllDataArray);

    }

    
  }

  const handleAssignmentGroupList = (event)=>{
    const currentSysID = event.target.value;
    const fiterAllDataArray = []
    const filterCurrentArray = []

    if(currentSysID==2){
      setAssignmentGroupInUse(false);
      setCalEvents(props.permanent_cal_events);

    }else{
      setAssignmentGroupInUse(true);
      handleUserGroupDependency(currentSysID);
      props.pass_events_data.map((assgn_group)=>{
        const filterGroup = {}
        const collectGroupData = {}
        //console.log("assgn_group : "+assgn_group.number +" " +assgn_group.assignment_group)
        if(assgn_group.assignment_group===currentSysID){
          filterGroup.title = assgn_group.number+" "+assgn_group.title
          filterGroup.start = assgn_group.start;
          filterGroup.end = assgn_group.end;
          filterGroup.color = assgn_group.color
  
          collectGroupData.sys_id = assgn_group.sys_id
  
          filterCurrentArray.push(filterGroup);
          fiterAllDataArray.push(collectGroupData)
  
        }
        
      })
      
      setCalEvents(filterCurrentArray);
      setSelectedCalEventsIDs(fiterAllDataArray);
    }

    
  }

  const handleAssignedToList = (event)=>{
    const currentSysID = event.target.value;
    const fiterAllDataArray = []
    const filterCurrentArray = []

    if(currentSysID==3){
      setCalEvents(props.permanent_cal_events);

    }else{

      props.pass_events_data.map((assgnd_to)=>{
        const filterUser = {}
        const collectUserData = {}
        //console.log("assgnd_to : "+assgnd_to.number +" " +assgnd_to.assigned_to);
        if(assgnd_to.assigned_to===currentSysID){
          filterUser.title = assgnd_to.number+" "+assgnd_to.title
          filterUser.start = assgnd_to.start;
          filterUser.end = assgnd_to.end;
          filterUser.color = assgnd_to.color
  
          collectUserData.sys_id = assgnd_to.sys_id
  
          //console.log("title: "+filterUser.title+" start: "+filterUser.start+" end: "+filterUser.end+" color: "+filterUser.color);
  
          filterCurrentArray.push(filterUser);
          fiterAllDataArray.push(collectUserData)
  
        }
        
      })
      
      setCalEvents(filterCurrentArray);
      setSelectedCalEventsIDs(fiterAllDataArray);

    }

    
  }

  const handlePriorityList = (event)=>{
    const currentSysID = event.target.value;
    const fiterAllDataArray = []
    const filterCurrentArray = []
    if(currentSysID==4){
      setCalEvents(props.permanent_cal_events);
    }else{
      props.pass_events_data.map((prty)=>{
        const prtyEvent = {}
        const collectPriorityData = {}
        //console.log("prty : "+prty.number +" " +prty.priority+" currentSysID: "+currentSysID)
        if(prty.priority==currentSysID){
          prtyEvent.title = prty.number+" "+prty.title
          prtyEvent.start = prty.start;
          prtyEvent.end = prty.end;
          prtyEvent.color = prty.color
  
          //console.log("test dropdown, priority objcet : "+prtyEvent.title+" "+prtyEvent.start+" "+prtyEvent.end+" "+prtyEvent.color)
  
          collectPriorityData.sys_id = prty.sys_id
  
          filterCurrentArray.push(prtyEvent);
          fiterAllDataArray.push(collectPriorityData)
  
        }
        
      })
     
      setCalEvents(filterCurrentArray);
      setSelectedCalEventsIDs(fiterAllDataArray);
    }

    

  }

  const handleUserGroupDependency = (group_sys_id)=>{
    let i=0;
    const selectedUserList = [];
    props.groupMemberList.map((grmem)=>{
      if(grmem.group_sys_id===group_sys_id){
        props.usersList.map((ele)=>{
          const selectedUsers = {};
          if(ele.sys_id===grmem.user_sys_id){
            selectedUsers.sys_id = ele.sys_id;
            selectedUsers.name = ele.name;
            selectedUserList.push(selectedUsers);
          }
        })
      }
    })
    setCurrentUserList(selectedUserList);

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
                filterService.color = srvc.color;

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
                filterGroup.color = assgn_group.color

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
                prtyEvent.color = prty.color

                console.log("test dropdown, priority objcet : "+prtyEvent.title+" "+prtyEvent.start+" "+prtyEvent.end+" "+prtyEvent.color)

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

  // const handleTextSearch = (event)=>{
  //   //alert('Testing text search');
  //   const searched_text = [];
    
  //     props.pass_events_data.map((searchObject)=>{
        
  //       //console.log('textSearchData title check : '+searchObject.title+"  "+textSearchData);
  //       if(searchObject.number.includes(textSearchData.toUpperCase())){
  //         const tempObject = {};

  //         //console.log('search item matched with number: '+searchObject.number+" start date: "+searchObject.start);
  //         //console.log('textSearchData matched: '+searchObject.title+" "+searchObject.number);
  //         tempObject.title = searchObject.number+" "+searchObject.title
  //         tempObject.start = searchObject.start
  //         tempObject.end = searchObject.end
  //         tempObject.color = searchObject.color

  //         searched_text.push(tempObject)
  //       }
  //       if(searchObject.title.toLowerCase().includes(textSearchData.toLowerCase())){
  //         const tempObject = {};

  //         //console.log('search item matched with title: '+searchObject.number+" start date: "+searchObject.start);
  //         tempObject.title = searchObject.number+" "+searchObject.title
  //         tempObject.start = searchObject.start
  //         tempObject.end = searchObject.end
  //         tempObject.color = searchObject.color

  //         searched_text.push(tempObject)

  //       }
       
  //       if(searchObject.priority!="" || searchObject.priority!=="undefined"){
  //         if(searchObject.priority_name.toLowerCase()===(textSearchData.toLowerCase())){
  //           const tempObject = {};
  //           //console.log('priorityEle.name:->>>'+searchObject.priority_name.toLowerCase()+", number :"+searchObject.number+", Search text:=>"+textSearchData.toLowerCase()+", Service name: ->"+searchObject.service);
  //           //console.log('search priority matched: '+searchObject.number+" start date: "+searchObject.start);
            
  //           tempObject.title = searchObject.number+" "+searchObject.title
  //           tempObject.start = searchObject.start
  //           tempObject.end = searchObject.end
  //           tempObject.color = searchObject.color
  
  //           searched_text.push(tempObject)
  
            
  //         }
  //       }
        

  //       if(searchObject.service!="" || searchObject.service!=="undefined"){
  //         if(searchObject.service_name.toLowerCase().includes(textSearchData.toLowerCase())){
  //           const tempObject = {};
  
  //           //console.log('search matched with service name: '+searchObject.number+" start date: "+searchObject.start);
  
  //           tempObject.title = searchObject.number+" "+searchObject.title
  //           tempObject.start = searchObject.start
  //           tempObject.end = searchObject.end
  //           tempObject.color = searchObject.color
  
  //           searched_text.push(tempObject)
            
  //         }
  //       }

  //       if(searchObject.assignment_group!="" || searchObject.assignment_group!=="undefined"){
  //         if(searchObject.assignment_group_name.toLowerCase().includes(textSearchData.toLowerCase())){
  //           const tempObject = {};
  
  //           //console.log('search matched with service name: '+searchObject.number+" start date: "+searchObject.start);
  
  //           tempObject.title = searchObject.number+" "+searchObject.title
  //           tempObject.start = searchObject.start
  //           tempObject.end = searchObject.end
  //           tempObject.color = searchObject.color
  
  //           searched_text.push(tempObject)
            
  //         }
  //       }
        
        
  //     })
      
  //     setCalEvents(searched_text)

  // }

  const logout = () => {
    window.open("http://localhost:3004/auth/logout", "_self");
    //window.open("https://change-request-calendar-backnd.herokuapp.com/auth/logout", "_self");
  };

  const handleSelectedDateRange=(selectedFromDate, selectedToDate)=>{
    const temp_date_info = [];
    selectedFromDate = new Date(selectedFromDate);
    
    const fromDatedate = selectedFromDate.getDate();
    const fromDateMonth = selectedFromDate.getMonth()+1;
    const fromDateYear = selectedFromDate.getFullYear();
    

    const fromDate_temp = fromDateMonth+"/"+fromDatedate+"/"+fromDateYear;
    const fromDate = Date.parse(fromDate_temp);

    selectedToDate = new Date(selectedToDate);
    
    const toDatedate = selectedToDate.getDate();
    const toDateMonth = selectedToDate.getMonth()+1;
    const toDateYear = selectedToDate.getFullYear();
    

    const toDate_temp = toDateMonth+"/"+toDatedate+"/"+toDateYear
    const toDate = Date.parse(toDate_temp);

    //console.log("fromDate: "+fromDate+" toDate: "+toDate);
    props.pass_events_data.map((eventInfo)=>{
      const tempObject = {};
      const event_start_date = (new Date(eventInfo.start).getMonth()+1)+"/"+new Date(eventInfo.start).getDate()+"/"+new Date(eventInfo.start).getFullYear();
      const event_end_date = (new Date(eventInfo.end).getMonth()+1)+"/"+new Date(eventInfo.end).getDate()+"/"+new Date(eventInfo.end).getFullYear();
      
      const event_date_start = Date.parse(event_start_date);
      const event_date_end = Date.parse(event_end_date);
      if((event_date_start <= toDate && event_date_start >= fromDate)) {
        //console.log("event date lies between selected start and end date -1:"+eventInfo.title);
        
          tempObject.title = eventInfo.number+" "+eventInfo.title
          tempObject.start = eventInfo.start
          tempObject.end = eventInfo.end
          tempObject.color = eventInfo.color

          temp_date_info.push(tempObject)

      }else if(event_date_end <= toDate && event_date_end >= fromDate){
        //console.log("event date lies between selected start and end date -2:"+eventInfo.title);
        tempObject.title = eventInfo.number+" "+eventInfo.title
        tempObject.start = eventInfo.start
        tempObject.end = eventInfo.end
        tempObject.color = eventInfo.color

        temp_date_info.push(tempObject)
      }
    
    })

     setCalEvents(temp_date_info);



  }

  const handleFilterReset = ()=>{
    //handleServiceList("1");
    setCalEvents(props.permanent_cal_events);

  }

  return(
    <div>
      <div className="main-menu">
        <ul>
          <div className="col">
            <div className="row mt-5">
              <div className="dropdown-wrapper">
              <div className="form-group" >
                <select className="form-control form-control-sm" onChange={(e)=>handleServiceList(e)}>
                  <option key="0" value="1">Service</option>
                    { props.serviceList.map((option,i)=>(
                      <option key={i} value={option.sys_id}>{option.name}</option>
                      ))
                    }  
                </select>
                
              </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group">
                <select className="form-control form-control-sm" placeholder="Assignment Group" onChange={(e)=>handleAssignmentGroupList(e)}>
                  <option key="0" value="2">Assignment Group</option>
                    { props.groupList.map((option,i)=>(
                      <option key={i} value={option.sys_id}>{option.name}</option>
                      ))
                    }  
                </select>
                
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group">
                <select className="form-control form-control-sm" onChange={(e)=>handleAssignedToList(e)}>
                  <option key="0" value="3">Assiged To</option>
                  {assignmentGroupInUse?currentUserList.map((membr, j)=>(
                    <option key={j} value={membr.sys_id}>{membr.name}</option>
                    )):
                    props.usersList.map((option,i)=>(
                      <option key={i} value={option.sys_id}>{option.name}</option>
                      ))
                    
                  }  
                </select>
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group">
                <select className="form-control form-control-sm" onChange={(e)=>handlePriorityList(e)}>
                  <option key="0" value="4">Priority</option>
                    { priorityList.map((option,i)=>(
                      <option key={i} value={option.sys_id}>{option.name}</option>
                      ))
                    }  
                </select>
              </div>
            </div>
            <div className="row mt-4">
              <div className="date-picker">
                <div className="form-control datepicker col-sm-4">                    
                
                  <DateRangePicker selectedDateInfo={(e,y)=>handleSelectedDateRange(e,y)}/>
                </div> 
              </div>
            </div>
            <div className="row mt-5">
              <div className="form-group">
                <div className="form-control form-control-sm">
                  
                  <button className="submit-filters" type="submit" onClick={handleFilterReset}>Reset</button>
                </div>
              </div>
            </div>
        </div>
      </ul>
    </div>  
  </div>
)

    

}

export default SideBar;