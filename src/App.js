import React, { Component } from 'react';
import { Header, Grid, Button, Icon, Divider, List, Input, GridColumn } from 'semantic-ui-react';
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
      loading: false
    };
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
      this.setState({ active: null });
    }
    const cpyStreams = [...this.state.streams];
    cpyStreams.splice(id, 1)
    this.setState({ streams: cpyStreams });
  }

  render() {
    return (
      <div className='App'>
        <Grid centered>
          <Grid.Row textAlign='center'>
            <Grid.Column mobile={16} tablet={12} computer={12}>
              <Header as='h1' className='App-header'>
                <Header.Content >React Radio</Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>

          { /* Player */}
          <Grid.Row >
            <Grid.Column textAlign='center' mobile={16} tablet={12} computer={12}>
              {this.state.active != null ? (
                <audio ref={this.playerRef} autoPlay onLoadStart={() => this.setState({ loading: true })} onCanPlay={() => this.setState({ loading: false })}>
                  <source src={this.state.streams[this.state.active].url} />
                </audio>
              ) : (
                  'No Stream selected yet!'
                )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <GridColumn textAlign='center' mobile={16} tablet={12} computer={8}>
              {this.state.playing ? (
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
            </GridColumn>
          </Grid.Row>

          { /* Streams */}
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <Divider horizontal>Your streams</Divider>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={6} computer={4}>
              <Input label='Title' fluid placeholder='Example: BBC Radio One' />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={4}>
              <Input label='Stream URL' fluid placeholder='Example: http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button icon labelPosition='left'>
                <Icon name='music' />
                Add stream
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <GridColumn mobile={16} tablet={12} computer={8}>
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
            </GridColumn>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
