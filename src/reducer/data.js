const data = {
  all_category: [],
};

export default (state = data, action = []) => {
  switch (action.type) {
    case "CATEGORY_ADDED":
      return {
        ...state,
        all_category: [...state.all_category, action.category],
      };
    case "CATEGORY_UPDATE":
      var new_cat = state.all_category.map(function (item) {
        if (item.id == action.category.id) {
          return action.category;
        } else {
          return item;
        }
      });
      return {
        ...state,
        all_category: [...new_cat],
      };
    case "CATEGORY_MARK_COMPLETE":
      var new_cat = state.all_category.map(function (item) {
        if (item.id == action.category.id) {
          return {
            id: action.category.id, 
            name: action.category.name, 
            status: action.category.status?false:true,
            isEdit:action.category.isEdit
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        all_category: [...new_cat],
      };
    case "CATEGORY_REMOVE":
      var new_cat = state.all_category.filter(function (item) {
        return item.id != action.category.id;
      });
      return {
        ...state,
        all_category: [...new_cat],
      };
    case "CATEGORY_COMPLETE_REMOVE":
      var new_cat = state.all_category.filter(function (item) {
        return item.status;
      });
      return {
        ...state,
        all_category: [...new_cat],
      };
    default:
      return state;
  }
};
