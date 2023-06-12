import React, {useEffect, useState} from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
    .then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  }, [])

    function handleSelectActivity(id: string){
      setSelectedActivity(activities.find(x => x.id === id)); //finds the activity with this id
    }

    function handleCancelSelectActivity(){
      setSelectedActivity(undefined) //cancels selection by setting selected id to undefined
    }

    function handleFormOpen(id?: string) {
      id ? handleSelectActivity(id) : handleCancelSelectActivity(); 
      setEditMode(true);
      
      /*if id is not null, find activity with right id and open the form by 
      setting edit mode to true, else invoke cancel function*/
    }

    function handleFormClose(){
      setEditMode(false); //if edit mode is false, the form will not be open
    }

      function handleCreateOrEditActivity(activity: Activity){
        setSubmitting(true);
        if(activity.id){
          agent.Activities.update(activity).then(() => {
            setActivities([...activities.filter(x => x.id !== activity.id), activity])
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
          })
        }else{
          activity.id = uuid();
          agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity])
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
        })
      
      }
        


        /* The handleCreateOrEditActivity function is responsible for managing the creation or editing of an activity. 
        It takes an activity object as a parameter. If the activity has an id, indicating that it already 
        exists and needs to be edited, the function updates the activities array by replacing the existing 
        activity with the updated one. If the activity does not have an id, indicating that it is a new activity 
        that needs to be created, the function adds a new activity to the activities array. 
        It generates a unique id for the new activity using the uuid() function. After updating the activities array, 
        the function sets the editMode to false and updates the selectedActivity state variable to the newly created 
        or updated activity.*/
      }

        function handleDeleteActivity(id: string){
          setSubmitting(true);
          agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]) 
            setSubmitting(false)
          })
            
            //it deletes an activity by creating a new array that features everything except the activity with that specific id
        }

        if (loading) return <LoadingComponent content="Loading app" />

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
        />

      </Container>
       
      
    </>
  );
}

export default App;
