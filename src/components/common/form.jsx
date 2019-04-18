import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Calendar from "./calendar";
import _ from "lodash";

class Form extends Component {
  state = {};

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    let obj = { [name]: value };
    let schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    localStorage.setItem(input.name, input.value);

    this.setState({ data, errors });
  };

  handleCalendarChange = date => {
    let data = { ...this.state.data };
    const dateFormat = require("dateformat");
    data.dob = dateFormat(date, "mm/dd/yyyy");
    localStorage.setItem("dob", data.dob);
    this.setState({ data });
  };

  handleDateChangeRaw = e => {
    e.preventDefault();
  };

  renderButton(label, disabled = false) {
    return (
      <button
        disabled={disabled}
        className="btn btn-primary"
        style={{ marginTop: 20 }}
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderDatetime(name, label) {
    return (
      <Calendar
        name={name}
        label={label}
        selected={new Date(this.state.data.dob)}
        onCalendarChange={this.handleCalendarChange}
        onChangeRaw={this.handleDateChangeRaw}
      />
    );
  }

  renderList(name, label, data) {
    const { newProfile } = { ...this.state };

    return (
      <div className="form-group" style={{ marginTop: 10 }}>
        <label htmlFor={name}>
          <h5>{label}</h5>
        </label>
        <div>
          {newProfile && <p>No profile available.</p>}
          {!newProfile && (
            <ul className="list-group" name={name} id={name}>
              {Object.keys(data).map(key => {
                return (
                  <li
                    key={key}
                    className="list-group-item"
                    style={{ border: 0, paddingLeft: 0 }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <strong>{key}</strong>: {_.get(data, key)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Form;
