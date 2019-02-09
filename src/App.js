import React, { Component } from 'react';
import { Header, Grid, Button, Icon, Divider, Segment, Input, List } from 'semantic-ui-react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
    this.state = { 
      streams: [
        {
          title: 'BBC Radio One',
          url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p',
        }, {
          title: 'BBC Radio Two',
          url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio2_mf_p',
        }, {
          title: 'BBC Radio Three',
          url: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio3_mf_p',
        }
      ],
    playing: false,
    active: null,
    loading: false };
  }

  componentDidMount = () => {
    //TODO: Get previously added streams from local storage
  };

  handleStreamAdd = () => {
    //TODO: Handle add of a stream
  }

  handleStreamPlay = (id) => {
    this.setState({ active: id })
    if (this.state.active != null) {
      this.playerRef.current.load();
    }
  }

  handleStreamRemove = (id) => {
    if (id === this.state.active) {  //Check if the stream to delete is currently playing
      this.setState({active: null});
    }
    const cpyStreams = [...this.state.streams];
    cpyStreams.splice(id, 1)
    this.setState({ streams: cpyStreams});
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
              { this.state.active != null ? (
                <audio ref={this.playerRef} autoPlay onLoadStart={() => this.setState({ loading: true })} onCanPlay={() => this.setState({ loading: false })}>
                  <source src={this.state.streams[this.state.active].url} />
                </audio>
              ):(
                'No Stream selected yet!'
              )}
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
          <List divided verticalAlign='middle'>
            {this.state.streams.map((entry, id) => (
              
              <List.Item key={id}>
                <List.Content floated='right'>
                  <Button icon onClick={() => this.handleStreamPlay(id)}>
                    <Icon name='play' />
                  </Button>
                  <Button icon onClick={() => this.handleStreamRemove(id)}>
                    <Icon name='delete' />
                  </Button>
                </List.Content>
                <List.Header>{entry.title}</List.Header>
              </List.Item>
            ))}
          </List>
        </Segment>

      </div>
    );
  }
}

export default App;
