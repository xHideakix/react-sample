import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { find } from 'lodash';
import { HomeworkService } from '../../services/homeworkService';
import './App.css';
import { ListItem, HomeworkDetails } from '..';

export class App extends Component {
  state = {
    homeworks: [],
    homeworkService: {}
  }

  async componentDidMount() {
    const homeworks = await this.state.homeworkService.fetchList();
    await this.setState({ homeworkService: new HomeworkService()});
    this.setState({ homeworks });
  }

  handleAction = async (action) => {
    switch(action.type) {

      case 'delete':
        try {
          const updateHw = await this.state.homeworkService.deleteOne(action.value.id);
          this.setState({ homeworks: updateHw });
        } catch (ignore) { }
        break;

      case 'update':
        try {
          const newHomeworks = await this.state.homeworkService.updateOne(action.value, this.state.homeworks);
          this.setState({ homeworks: newHomeworks });  
        } catch (ignore) { }
        break;

      default:
        console.log('App click', action);
    }
  }


  render() {
    return (
      <div className="App">
        <header>
          App main page
          <Link to="/"><div>Home</div></Link>
        </header>

        <Route path="/" exact={true}>
          {this.state.homeworks.map((hw) =>
            <ListItem
              key={hw.id}
              id={hw.id}
              title={hw.title}
              number={hw.number}
              onAction={this.handleAction}>
            </ListItem>
          )}
        </Route>

        <Route path="/homeworks/:hwid/" render={({ match }) => {
          const homework = find(this.state.homeworks, { id: match.params.hwid });
          if (!homework) return null;
          return <HomeworkDetails homework={homework} onAction={this.handleAction}></HomeworkDetails>
        }}/>
      </div>
    )
  }
}

