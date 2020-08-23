import React, { useState, useEffect, useContext, useReducer } from "react";
import GridDatable from "./shared_components/Grid";
import { GetAllStories, UpdateStoryStatus, CreateStory} from "./services/story_service";
import TableRow from "@material-ui/core/TableRow";
import TableColumn from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import {Store} from "./store";
import Button from "@material-ui/core/Button"
import CloneDeep from "lodash/cloneDeep";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from "@material-ui/core/TextField";
import TextArea from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

const StoryReducer = function(state, action){
    let newState = state;
    newState[action.type] = action.payload;
   newState.typeDropdown = {label:"", value: newState.type};
   newState.complexityDropdown = {label:"", value: newState.complexity};
        return newState;
   }

const columns = [
    {
     name: "id",
     label: "ID",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "summary",
     label: "Summary",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "description",
     label: "Description",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "type",
     label: "Type",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
        name: "complexity",
        label: "Complexity",
        options: {
         filter: false,
         sort: true,
        }
       },
       {
        name: "estimatedHrs",
        label: "Estimated time for completion",
        options: {
         filter: false,
         sort: true,
        }
       },
       {
        name: "cost",
        label: "Cost",
        options: {
         filter: false,
         sort: true,
        }
       },
   ];
   const adminColumns = [
    {
     name: "id",
     label: "ID",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "summary",
     label: "Summary",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "description",
     label: "Description",
     options: {
      filter: false,
      sort: true,
     }
    },
    {
     name: "type",
     label: "Type",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
        name: "complexity",
        label: "Complexity",
        options: {
         filter: false,
         sort: true,
        }
       },
       {
        name: "estimatedHrs",
        label: "Estimated time for completion",
        options: {
         filter: false,
         sort: true,
        }
       },
       {
        name: "cost",
        label: "Cost",
        options: {
         filter: false,
         sort: true,
        }
       },
       {
        name: "status",
        label: "Actions",
        options: {
         filter: false,
         sort: false,
        }
       },
   ]

export default function(){
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState([]);
      const {state} = useContext(Store);
      const [open, setOpen] = React.useState(false);
      const [storyData, setStoryData] = useReducer(StoryReducer,{type:"",complexity:""});

      const createStory = async()=>{
          let storyToAdd =  {};
          storyToAdd.complexity = storyData.complexity;
          storyToAdd.cost=  parseInt(storyData.cost||"0");
          storyToAdd.estimatedHrs=  parseInt(storyData.estimatedHrs||"0");
          storyToAdd.summary=  storyData.summary;
          storyToAdd.description=  storyData.description;
          storyToAdd.type=  storyData.type;
        let response = await CreateStory(storyToAdd);

        let dataToUpdate =CloneDeep(data);
        dataToUpdate.push(response);
        setData(dataToUpdate);
        setOpen(false);
      }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

       useEffect(()=>{
           (async()=>{
              setData(await GetAllStories());
              setIsLoading(false);
           })()
       },[])

       const  CustomToolbar = ()=>{
           
           return  <React.Fragment>
           <Tooltip title={"Add Story"}>
             <IconButton onClick={handleClickOpen}>
               <AddIcon />
             </IconButton>
           </Tooltip>
         </React.Fragment>
       }

       const UpdateStory = async(id, status,index)=>{
           await UpdateStoryStatus(id, status);
           let dataToUpdate =CloneDeep(data);
           dataToUpdate[index].status = status;
           setData(dataToUpdate);
       }

       const RowTemplate = ({rowData, dataIndex, rowIndex})=>{
           const columnStyle = { color:(rowData[7]==="accepted")?"green":(rowData[7]==="rejected")?"red":"black"};
           return <TableRow key={rowIndex} >
               <TableColumn style={columnStyle}>{rowData[0]}</TableColumn>
               <TableColumn style={columnStyle}>{rowData[1]}</TableColumn>
               <TableColumn style={columnStyle}>{rowData[2]}</TableColumn>
               <TableColumn style={columnStyle}>{rowData[3]}</TableColumn>
               <TableColumn style={columnStyle}>{rowData[4]}</TableColumn>
               <TableColumn style={columnStyle}>{rowData[5]}</TableColumn>
               <TableColumn style={columnStyle}>{rowData[6]}</TableColumn>
               {state && state.user && state.user.role==="Admin" && !rowData[7] &&<React.Fragment> 
                   <TableColumn><Button variant="contained" size="small" color="primary" onClick={async()=>{ await UpdateStory(rowData[0],"accepted",dataIndex)}} >
          Accept
        </Button>
        <Button variant="contained" size="small" color="secondary"  style={{marginLeft:"2px"}} onClick={async()=>{ await UpdateStory(rowData[0],"rejected",dataIndex)}}>
          Reject
        </Button>
        </TableColumn>
        </React.Fragment>}
        {state && state.user && state.user.role==="Admin" && rowData[7] &&<React.Fragment><TableColumn style={columnStyle}>{rowData[7]}</TableColumn></React.Fragment>}
               </TableRow>;
       }
    
       const options = {
        filter:true,
         filterType: 'dropdown',
         responsive:"vertical",
         viewColumns:false,
         download:false,
         print:false,
         search:false,
         fixedHeader: true,
         fixedSelectColumn: true,
         selectableRows:"none",
         customRowRender:(data, dataIndex, rowIndex)=>{   return <RowTemplate key={rowIndex} rowData={data} dataIndex={dataIndex} rowIndex={rowIndex}></RowTemplate>},
         customToolbar:()=>{
            return (
            <React.Fragment>
            {state && state.user && state.user.role!=="Admin" && <CustomToolbar/>}
            </React.Fragment>
            )
         },
         tableBodyMaxHeight:"400px"
       };
       
       return (
       <div className="storieslist-contianer">
       <GridDatable
         title="Stories"
         data={data}
         columns={state && state.user && state.user.role==="Admin"? adminColumns: columns}
         options={options}
         isLoading ={isLoading}
       />
<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Story</DialogTitle>
        <DialogContent>
        <div>
    <div className="row">
        <div className="col-sm-12">
    <Input id="Summary" name="Summary" label="Summary"  style={{width:"300px"}} onChange={(event)=>{setStoryData({type:"summary", payload: event.target.value }) }}/>
    </div>
    </div>
    <div className="row">
        <div className="col-sm-12">
    <TextArea id="Description" name="Description" style={{width:"300px"}} label="Description" onChange={(event)=>{setStoryData({type:"description", payload: event.target.value }) }}/>
    </div>
    </div>
    <div className="row">
        <div className="col-sm-12">
    <FormControl>
    <InputLabel htmlFor="Type">Type</InputLabel>
    <Select labelId="Type"  value={storyData.typeDropdown} style={{width:"300px"}} onChange={(event)=>{setStoryData({type:"type", payload: event.target.value }) }}>
  
         <MenuItem value={"enhancement"}>enhancement</MenuItem>
          <MenuItem value={"bugfix"}>bugfix</MenuItem>
          <MenuItem value={"development"}>development</MenuItem>
          <MenuItem value={"qa"}>qa</MenuItem>
    </Select>
    </FormControl>
    </div>
    </div>
    <div className="row">
        <div className="col-sm-12">
        <FormControl>
    <InputLabel htmlFor="Complexity">Complexity</InputLabel>
    <Select labelId="Complexity" value={storyData.complexityDropdown} style={{width:"300px"}} onChange={(event)=>{setStoryData({type:"complexity", payload: event.target.value }) }}>
       <MenuItem value="" ></MenuItem>
        <MenuItem value="low" >low</MenuItem>
        <MenuItem value="medium">medium</MenuItem>
        <MenuItem value="high">high</MenuItem>
    </Select>
    </FormControl>
    </div>
    </div>
    <div className="row">
        <div className="col-sm-12">
    <Input id="EstimatedHrs" name="EstimatedHrs" label="Estimated Hours"  style={{width:"300px"}} onChange={(event)=>{setStoryData({type:"estimatedHrs", payload: event.target.value }) }}/>
    </div>
    </div>
    <div className="row">
        <div className="col-sm-12">
    <Input id="Cost" name="Cost" label="Cost($)" type="number" style={{width:"300px"}} onChange={(event)=>{setStoryData({type:"cost", payload: event.target.value }) }}/>
    </div>
    </div>
    </div>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createStory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
       </div>)
}