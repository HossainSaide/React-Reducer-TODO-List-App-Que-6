import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import {
  CategoryUpdate,
  CategoryAdded,
  CategoryDelete,
  CategoryCompleteDelete,
  CategoryMarkComplete,
} from "../actions/crud";

import { connect } from "react-redux";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      edit_name: "",
      update_id: 0,
      deleteID: 0,
      all_data: [],
      all_category: [],
      type: 1, //All:1, Active: 2, Completed:3
    };
  }
  componentDidMount = () => {
    this.setState({
      all_data: this.props.all_category,
      all_category: this.props.all_category,
    });
  };
  handleClose = () => {
    this.setState(() => ({
      category_name: "",
      edit_name: "",
      update_id: 0,
      deleteID: 0,
    }));
  };
  editInput = (item) => {
    this.setState(() => ({
      edit_name: item.name,
      update_id: item.id,
    }));
  };
  closeInput = (item) => {
    var submit_data = {
      id: item.id,
      name: item.name,
      status: item.status,
    };
    this.props.CategoryUpdate(submit_data);
    this.setState(() => ({
      edit_name: "",
      update_id: 0,
      deleteID: 0,
    }));
  };
  saveData = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      var submit_data = {
        id: Date.now(),
        name: this.state.category_name,
        status: true,
      };
      this.props.CategoryAdded(submit_data);
      this.setState(() => ({
        category_name: "",
        edit_name: "",
        update_id: 0,
        deleteID: 0,
      }));

      return false;
    }
  };

  updateType = (id) => {
    this.setState(() => ({
      type: id,
      category_name: "",
      edit_name: "",
      update_id: 0,
      deleteID: 0,
    }));
  };

  deleteButton = (id) => {
    this.setState(() => ({
      deleteID: id,
    }));
  };

  updateData = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      var submit_data = {
        id: this.state.update_id,
        name: this.state.edit_name,
        status: true,
      };
      this.props.CategoryUpdate(submit_data);
      this.setState(() => ({
        category_name: "",
        edit_name: "",
        update_id: 0,
        deleteID: 0,
      }));
      return false;
    }
  };

  removeData = (item) => {
    this.props.CategoryDelete(item);
    this.setState(() => ({
      category_name: "",
      edit_name: "",
      update_id: 0,
      deleteID: 0,
    }));
  };

  markAsComplete = (item) => {
    this.props.CategoryMarkComplete(item);
    this.setState(() => ({
      category_name: "",
      edit_name: "",
      update_id: 0,
      deleteID: 0,
    }));
  };

  clearComplete = () => {
    this.props.CategoryCompleteDelete();
    this.setState(() => ({
      category_name: "",
      edit_name: "",
      update_id: 0,
      deleteID: 0,
    }));
  };

  handleShow = () => {
    this.setState(() => ({
      update_id: 0,
      deleteID: 0,
      edit_name: "",
      category_name: "",
    }));
  };
  handleChangeText = (e) => {
    const { value } = e.target;
    this.setState({ category_name: value });
  };
  handleEditText = (e) => {
    const { value } = e.target;
    this.setState({ edit_name: value });
  };

  render() {
    const { all_category } = this.props;
    const item_active = this.props.all_category.filter(function (item) {
      return item.status;
    });
    const item_complete = this.props.all_category.filter(function (item) {
      return !item.status;
    });

    const { category_name, update_id, deleteID, type, edit_name } = this.state;
    const all_data =
      type == 3 ? item_complete : type == 2 ? item_active : all_category;
    return (
      <Container style={{ marginTop: "100px" }}>
        <h1 className="text-center text-danger" style={{ fontSize: "42px" }}>
          todos
        </h1>
        <Card
          className="text-left"
          style={{ margin: "10px 150px", textAlign: "left" }}
        >
          <Card.Header>
            <Form>
              <Form.Group>
                <Form.Control
                  onChange={this.handleChangeText}
                  onKeyDown={this.saveData}
                  type="text"
                  value={category_name}
                  placeholder="What needs to be done?"
                  style={{ height: "65px", fontSize: "20px" }}
                />
              </Form.Group>
            </Form>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush" style={{ fontSize: "20px" }}>
              {all_data.map((item, i) => (
                <ListGroup.Item key={i}>
                  {item.id == update_id ? (
                    <Form.Group>
                      <Form.Control
                        onChange={this.handleEditText}
                        type="text"
                        value={edit_name}
                        onKeyDown={this.updateData}
                        //onMouseLeave={()=>this.closeInput(item)}
                      />
                    </Form.Group>
                  ) : item.status == false ? (
                    <Form.Group
                      id="formGridCheckbox"
                      onMouseEnter={() => this.deleteButton(item.id)}
                    >
                      <div
                        className="form-check"
                        style={{ position: "absolute", height: "20px" }}
                      >
                        <input
                          type="checkbox"
                          onClick={() => this.markAsComplete(item)}
                          checked={true}
                          className="form-check-input position-static"
                        />
                      </div>

                      <del
                        style={{ marginLeft: "20px" }}
                        onClick={() => this.editInput(item)}
                      >
                        {item.name}
                      </del>
                      {deleteID == item.id && (
                        <span
                          className="pull-right"
                          style={{ float: "right", marginRight: "150px" }}
                        >
                          <button
                            className="btn  text-danger"
                            onClick={() => this.removeData(item)}
                          >
                            X
                          </button>
                        </span>
                      )}
                    </Form.Group>
                  ) : (
                    <Form.Group
                      id="formGridCheckbox"
                      onMouseEnter={() => this.deleteButton(item.id)}
                    >
                      {/* <Form.Check
                        onClick={() => this.markAsComplete(item)}
                        type="checkbox"
                        
                      /> */}
                      <div
                        className="form-check"
                        style={{ position: "absolute", height: "20px" }}
                      >
                        <input
                          type="checkbox"
                          onClick={() => this.markAsComplete(item)}
                          checked={false}
                          className="form-check-input position-static"
                        />
                      </div>
                      <span
                        style={{ marginLeft: "20px" }}
                        onClick={() => this.editInput(item)}
                      >
                        {item.name}
                      </span>
                      {deleteID == item.id && (
                        <span
                          className="pull-right"
                          style={{ float: "right", marginRight: "150px" }}
                        >
                          <button
                            className="btn text-danger"
                            onClick={() => this.removeData(item)}
                          >
                            X
                          </button>
                        </span>
                      )}
                    </Form.Group>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
          {all_category.length > 0 && (
            <Card.Footer className="text-muted">
              <div className="row">
                <div className="col-sm-4">{item_active.length} item left</div>
                <div className="col-sm-8">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-sm-4">
                          <button
                            className={type == 1 ? "btn active" : "btn"}
                            onClick={() => this.updateType(1)}
                          >
                            All
                          </button>
                        </div>
                        <div className="col-sm-4">
                          <button
                            className={type == 2 ? "btn active" : "btn"}
                            onClick={() => this.updateType(2)}
                          >
                            Active
                          </button>
                        </div>
                        <div className="col-sm-4">
                          <button
                            className={type == 3 ? "btn active" : "btn"}
                            onClick={() => this.updateType(3)}
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2 pull-right"></div>
                    <div className="col-sm-4 pull-right">
                      {item_complete.length > 0 && (
                        <button
                          className="pull-right"
                          onClick={() => this.clearComplete()}
                        >
                          Clear completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Footer>
          )}
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  all_posts: state.data.all_post,
  all_category: state.data.all_category,
});

const mapDispatchToProps = (dispatch) => ({
  CategoryAdded: (requestData) => dispatch(CategoryAdded(requestData)),
  CategoryUpdate: (requestData) => dispatch(CategoryUpdate(requestData)),
  CategoryDelete: (requestData) => dispatch(CategoryDelete(requestData)),
  CategoryMarkComplete: (requestData) =>
    dispatch(CategoryMarkComplete(requestData)),
  CategoryCompleteDelete: () => dispatch(CategoryCompleteDelete()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
