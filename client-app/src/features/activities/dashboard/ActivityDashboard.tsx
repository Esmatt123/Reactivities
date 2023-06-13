import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";




/*
- ActivityDashBoard: This is the whole first page
*/ 

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width="10">
            <ActivityList /> 
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && !editMode &&
                <ActivityDetails />} {/* selected activity needs to be truthy and editmode cant be false*/}
                {editMode && 
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})