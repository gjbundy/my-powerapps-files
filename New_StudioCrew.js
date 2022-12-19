
/*
To Make this work you must pass the following from the custom command button as a Javascript Parameters
Parameter 1 - SelectedEntityTypeName
Parameter 2 - PrimaryEntityTypeName
Parameter 3 - FirstPrimaryItemId
Parameter 4 - PrimaryControl (this is where we get the context of the form)
Parameter 5 - SelectedControl (this is the subgrid we are starting from)
Parameter 6 - A number value corresponding to the test_entrytype column in the Crew table
Parameter 7 - A number value corresponding to the test_whichedit column in the Crew table to determine review or final edit. 0=Review, 1=Final
*/

function addNewFromSubgrid(gridEntityName, parentEntityName, parentEntityId, primaryControl, gridControl, entryType, editType) {
    
    if (typeof gridEntityName == "number") gridEntityName = Xrm.Internal.getEntityName(gridEntityName);
    var parameters = {};
    var entityRelationship = gridControl.getRelationship(),
        parentControl = gridControl && gridControl.getParentForm ? gridControl.getParentForm() : Xrm.Page,
        fromEntity = parentControl.data.entity.getEntityReference(),
        openOptions = {
            entityName: gridEntityName,
            createFromEntity: fromEntity,
            useQuickCreateForm: false, //set this to true if you want to use a quick create form (where available)
            relationship: entityRelationship
        };
        parameters["test_entrytype"] = entryType;
        parameters["test_whichedit"] = editType;

    Xrm.Navigation.openForm(openOptions, parameters)
};
