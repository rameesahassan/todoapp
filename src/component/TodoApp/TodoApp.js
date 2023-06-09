import React, { Component } from "react";

import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    editIndex: -1,
    editedInput: "",
  };
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input, items, editIndex } = this.state;
    if (editIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[editIndex] = input;

      this.setState({
        items: updatedItems,
        editIndex: -1,
        input: "",
      });
    } else {
      this.setState((prevState) => ({
        items: [...prevState.items, input],
        input: "",
      }));
    }
  };

  /* const allItems=this.state.items;
   allItems.push(input);
   this.setState({
    items : allItems,
    input: ""
   })
  }*/

  /*deleteItem = key =>{
    const allItems=this.state.items;
    allItems.splice(key, 1)
    this.setState({
      items:allItems
    })
  };*/
  deleteItem = (index) => {
    const { items } = this.state;
    const updatedItems = [...items];
    updatedItems.splice(index, 1);

    this.setState({
      items: updatedItems,
    });
  };
  editItem = (index) => {
    const { items } = this.state;
    this.setState({
      editIndex: index,
      input: items[index],
    });
  };

  render() {
    const { input, items, editIndex } = this.state;
    console.log(items);
    return (
      <div className="todo-container">
        <h1>Todo App</h1>
        <form className="input-section" onSubmit={this.storeItems}>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter Items..."
          />
          <button type="submit">{editIndex !== -1 ? "Update" : "Add"}</button>
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {editIndex === index ? (
                <input type="text" value={input} onChange={this.handleChange} />
              ) : (
                <span>{data}</span>
              )}
              <i
                className="fa-solid fa-pen"
                onClick={() => this.editItem(index)}
              ></i>
              <i
                className="fa-sharp fa-solid fa-trash-can"
                onClick={() => this.deleteItem(index)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
