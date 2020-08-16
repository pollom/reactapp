import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    }
  }
  submitNewEvent = (e) => {
    e.preventDefault();
    let errors = {};
    const validEmailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

    var form = new FormData(document.getElementById('event-form'));
    

    document.getElementById('error').innerText = '';
    for (var element of form.entries()) {
      if (element[0] === 'firstname' && (element[1] === '' || element[1].length === 0)) {
        errors["error"] = 'First name is required';
        this.setState({errors: errors});
        return;
      } else if (element[0] === 'lastname' && (element[1] === '' || element[1].length === 0)) {
        errors["error"] = 'Last name is required';
        this.setState({errors: errors});
        return;
      } else if (element[0] === 'email' && (element[1] === '' || validEmailRegex.test(element[1]) === false)) {
        errors["error"] = 'Valid email required.';
        this.setState({errors: errors});
        return;
      } else if (element[0] === 'ev_date' && (element[1] === '' || element[1].length === 0)) {
        errors["error"] = 'Event date is required!';
        this.setState({errors: errors});
        return;
      } else {

      }
    }

    const data = new URLSearchParams();
    for (const pair of form) {
      data.append(pair[0], pair[1]);
    }
      

    //alert("Ouch!");

    fetch("http://localhost:3001/", {
      method: "POST",
      body: data
    });
    
  }


  render() {
    return (
      <div class="container p-3 my-3 bg-dark text-white">
        <h1>Event App</h1>
        <p>&nbsp;</p>
        <span class="text-danger small">* Required</span>
        <p><span class="text-danger large" id="error">{this.state.errors["error"]}</span></p>
        <form onSubmit={this.submitNewEvent} id="event-form">
          <div class="form-group">
            <label for="firstname">First name: &nbsp;<span class="text-danger small">*</span></label>
            <input type="text" class="form-control" id="firstname" name="firstname" placeholder="John" />
          </div>
          <div class="form-group">
            <label for="lastname">Last name: &nbsp;<span class="text-danger small">*</span></label>
            <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Smith" />
          </div>
          <div class="form-group">
            <label for="email">Email: &nbsp;<span class="text-danger small">*</span></label>
            <input type="text" class="form-control" id="email" name="email" placeholder="john.smith123@gmail.com" />
          </div>     
          <div class="form-group">
            <label for="date">Event date: &nbsp;<span class="text-danger small">*</span></label>
            <input type="date" class="form-control" id="ev_date" name="ev_date" />
          </div>     
          <button type="submit" class="btn btn-primary" >Submit</button>          
        </form>
      </div> 
    )
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));


export default App;
