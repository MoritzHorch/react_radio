import React, { Component } from 'react';
import { Header, Grid, Button, Icon, Divider, Segment, Input, List } from 'semantic-ui-react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      streams: [
        {
          title: 'BBC Radio One',
          url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p',
          active: true
        }, {
          title: 'BBC Radio Two',
          url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio2_mf_p',
          active: false
        }, {
          title: 'BBC Radio Three',
          url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio3_mf_p',
          active: false
        }
      ],
    playing: false };
  }

  componentDidMount = () => {
    //TODO: Get previously added streams from local storage
  };

  renderStreams = () => {
    
    
  }

  render() {
    return (
      <div className='App'>

        <Header as='h1' >
          <Header.Content className='App-header'>React Radio</Header.Content>
        </Header>

        { /* Player */ }
        <Segment basic>
          <Grid>
            <Grid.Row>
              You are listenting to NAME_HERE!
              <audio autoPlay>
                <source src="http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p"/>
              </audio>
            </Grid.Row>
            <Grid.Row columns={3}>
              { this.state.playing ? (
                <Button icon labelPosition='left'>
                  <Icon name='pause' /> 
                  Pause
                </Button>
              ) : (
                <Button icon labelPosition='left'>
                  <Icon name='play' />
                  Play
                </Button>
              )}
            </Grid.Row>
          </Grid>
        </Segment>
        
        { /* Streams */}
        <Segment basic>
          <Divider horizontal>Your streams</Divider>
          <Input icon={{ name: 'add', circular: false, link: true }} placeholder='Add a stream...' />
          <List divided>
            {this.state.streams.map((entry, id) => (
              <List.Item key={id}>
                <List.Content>
                  <List.Header>{entry.title}</List.Header>
                  <List.Description>{entry.url}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>

      </div>
    );
  }
}

export default App;
