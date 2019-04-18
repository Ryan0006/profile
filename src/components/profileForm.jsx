import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getProfile, saveProfile } from "../services/httpService";
import _ from "lodash";

class ProfileForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      dob: "01/01/1900",
      location: ""
    },
    profile: {
      name: "",
      email: "",
      dob: "01/01/1900",
      location: ""
    },
    newProfile: true,
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .max(50)
      .label("Name"),
    email: Joi.string()
      .email()
      .required()
      .max(50)
      .label("Email"),
    dob: Joi.string()
      .required()
      .label("Date of birth"),
    location: Joi.string()
      .required()
      .max(100)
      .label("Location")
  };

  async componentDidMount() {
    localStorage.clear();
    await this.populateProfile();
  }

  async populateProfile() {
    try {
      const response = await getProfile();
      const profile = this.mapToViewModel(response.data);
      Object.keys(profile).forEach(key => {
        if (key === "id") return;
        const value = _.get(profile, key);
        localStorage.setItem(key, value);
      });
      this.setState({
        data: profile,
        profile: profile
      });

      this.setState({ newProfile: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ newProfile: true });
      }
    }
  }

  mapToViewModel(profile) {
    const dateFormat = require("dateformat");
    return {
      name: profile.name,
      email: profile.email,
      dob: dateFormat(profile.dob, "mm/dd/yyyy"),
      location: profile.location
    };
  }

  mapToRequestModel(profile) {
    const dateFormat = require("dateformat");
    return {
      name: profile.name,
      email: profile.email,
      dob: dateFormat(profile.dob, "yyyy-mm-dd"),
      location: profile.location
    };
  }

  doSubmit = async () => {
    const { data } = { ...this.state };
    await saveProfile(this.mapToRequestModel(data));
  };

  handleDateChangeRaw = e => {
    e.preventDefault();
  };

  getSaveButtonDisabled = () => {
    return this.validate();
  };

  render() {
    const { profile } = { ...this.state };

    return (
      <div className="page-wrap d-flex flex-row align-items-center top">
        <div className="col-8 mx-auto">
          <h2 style={{ marginBottom: 20 }}>Profile App</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderDatetime("dob", "Date of birth")}
            {this.renderInput("location", "Location")}
            {this.renderButton("Save", this.getSaveButtonDisabled())}
            <hr style={{ marginTop: 30 }} />
            {this.renderList("profile", "My profile", profile)}
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
