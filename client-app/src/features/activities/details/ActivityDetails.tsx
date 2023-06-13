import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponents";



/**
 * ActivityDetails: This is the small box to the right
 * 
 */

export default function ActivityDetails(){
    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    if(!activity) return <LoadingComponent />

    return (
        <Card>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
       {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group width="2">
        <Button onClick={() => openForm(activity.id)} basic color="blue" content="Edit"/>
        <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel"/>
     </Button.Group>
    </Card.Content>
  </Card>
    )
}