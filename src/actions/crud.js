export const CategoryAdded = (requestData) => {
  return (dispatch) => {
    dispatch(Watch_CategoryAdded(requestData));
    return requestData;
  };
};

export const Watch_CategoryAdded = category =>({
    type:'CATEGORY_ADDED',
    category
})

export const CategoryUpdate = (requestData) => {
    return (dispatch) => {
      dispatch(Watch_CategoryUpdate(requestData));
      return requestData;
    };
  };
  
  export const Watch_CategoryUpdate = category =>({
      type:'CATEGORY_UPDATE',
      category
  })

  export const CategoryCompleteDelete = () => {
    return (dispatch) => {
      dispatch(Watch_CategoryCompleteDelete());
    };
  };
  
  export const Watch_CategoryCompleteDelete = () =>({
      type:'CATEGORY_COMPLETE_REMOVE'
  })

  export const CategoryDelete = (requestData) => {
    return (dispatch) => {
      dispatch(Watch_CategoryDelete(requestData));
      return requestData;
    };
  };
  
  export const Watch_CategoryDelete = category =>({
      type:'CATEGORY_REMOVE',
      category
  })

  export const CategoryMarkComplete = (requestData) => {
    return (dispatch) => {
      dispatch(Watch_CategoryMarkComplete(requestData));
      return requestData;
    };
  };
  
  export const Watch_CategoryMarkComplete = category =>({
      type:'CATEGORY_MARK_COMPLETE',
      category
  })