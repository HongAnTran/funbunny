import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "@thaddeusjiang/react-sortable-list/dist/index.css";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {  Droppable, Draggable } from "react-beautiful-dnd";
import { addDocController } from "controllers/common";
import { TaskItem } from "types/main";

const grid = 6
const getItemStyle = (isDragging : boolean, draggableStyle : any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color:'#B6C2CF',
  borderRadius:10,
  // change background colour if dragging
  background: '#22272B',
  // styles we need to apply on draggables
  ...draggableStyle
});
export default function CardTask({el} : { el:any}) {
  const [isAddItem, setIsAddItem] = React.useState<boolean>(false);
  const [ value , setValue] = React.useState<string>('')
  // const [items, setItems] = React.useState<any>([
  //   // { id: '1', name: 'Item 1' },
  //   // { id: '2', name: 'Item 2' },
  //   // { id: '3', name: 'Item 3' },
  // ]);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => {
    if(isAddItem){
      textAreaRef.current?.focus()
    }
  }, [isAddItem]);

function  handlerBlurAddItem(){
  setIsAddItem(false)
  setValue('')

}

function cancelAddItem(){
  setIsAddItem(false)
  setValue('')
}

function handlerAddItem(){
  if(value){
      addDocController<TaskItem>('taskItem' , {
        idList:el.id,
        title:value,
        order:el.list.length,
        createdAt:new Date()
      })
  }else{
    cancelAddItem()
  }
}
  return (
    <Card
      style={{
        backgroundColor: "#101204",
        width: 320,
        maxHeight:480
      }}
    >
      <CardHeader
        style={{
          padding: 14,
        }}
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={el.title}
      />
      <CardContent
        style={{
          padding: 8,
          maxHeight:420-128,
          overflow:'auto'
        }}
      >
        <MenuList>
  
            <Droppable  droppableId={`${el.id}`}>
              {(provided : any, snapshot : any) => (
                <div
                  ref={provided.innerRef}
              
                  {...provided.droppableProps}
                >
                    
                  {el.list.map((item : any, index : number) => (
                  
                  <div>

                
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided : any, snapshot : any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                            className="item-card"
                            // onMouseOver={()=>{console.log(item.content)}}
                          >
                            {item.title}

                            {/* <EditIcon></EditIcon> */}
                        
                          </div>
                        </div>
                      )}
                    </Draggable>
                    </div>
                   
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
             
      
        </MenuList>
      </CardContent>
      <CardActions style={{padding:8}}>
        {isAddItem ? (
          <Stack spacing={2} direction="column" style={{width:'100%'}} >
            <TextareaAutosize placeholder="nhập tiêu đề cho thẻ này..." 
            ref={textAreaRef}
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              // onBlur={handlerBlurAddItem}
            minRows='3' style={{resize:'none', height: 55  ,padding:6 , color:'black'}}  />
            <Stack spacing={2} direction="row" alignItems="center">
              <Button variant="contained" onClick={handlerAddItem}>
                Thêm thẻ
              </Button>
              <IconButton onClick={cancelAddItem}>
              <CloseIcon />

              </IconButton>
            </Stack>
          </Stack>
        ) : (
          <MenuItem style={{ width: "100%" }}
          onClick={() => {
            setIsAddItem(true)
          }}
          >
            <IconButton
              aria-label="add to favorites"
             
            >
              <AddIcon />
            </IconButton>
            <span>Thêm thẻ</span>
          </MenuItem>
        )}
      </CardActions>
    </Card>
  );
}
