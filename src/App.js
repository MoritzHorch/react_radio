import React, { Component } from 'react';
import { Header, Grid, Button, Icon, Divider, List, Input, GridColumn, Loader } from 'semantic-ui-react';
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
      input: {
        title: '',
        url: '',
      },
      playing: false,
      active: undefined,
      loading: false
    };
  }

  componentDidMount = () => {
    //TODO: Get previously added streams from local storage
  };

  handleNewStreamInput = (event) => {
    //TODO: Add better parsing
    const cpyInput = this.state.input;
    switch (event.target.id) {
      case 'input_title':
        cpyInput.title = event.target.value;
        this.setState({ input: cpyInput });
        break;
      case 'input_url':
        cpyInput.url = event.target.value;
        this.setState({ input: cpyInput });
        break;
      default: break;
    }
  }

  handleStreamAdd = () => {
    const cpyStreams = [...this.state.streams];
    cpyStreams.push({ title: this.state.input.title, url: this.state.input.url });
    this.setState({ streams: cpyStreams, input: { title: '', url: '' } });
  }

  handleStreamPlay = (id) => {
    this.setState({ active: id, playing: false });
    if (this.state.active !== undefined) {
      this.playerRef.current.load();
    }
  }

  handleStreamRemove = (id) => {
    if (id === this.state.active) {  //Check if the stream to delete is currently playing
      this.setState({ active: undefined });
    }
    const cpyStreams = [...this.state.streams];
    cpyStreams.splice(id, 1)
    this.setState({ streams: cpyStreams });
  }

  renderActiveMedia = () => {
    if (this.state.active !== undefined) {
      return (
        <>
          <Header as='h2'>
            <Header.Content>Enjoy listening!</Header.Content>
          </Header>
          <audio ref={this.playerRef} autoPlay onLoadStart={() => this.setState({ loading: true })} onCanPlay={() => this.setState({ loading: false, playing: true })}>
            <source src={this.state.streams[this.state.active].url} />
          </audio>
        </>
      );
    } else {
      return (
        <Header as='h2'>
          <Header.Content>No stream is selected yet!</Header.Content>
        </Header>
      );
    }
  }

  renderMediaButtons = () => {
    if (this.state.loading === false) {
      if (this.state.playing) {
        return (
          <Button icon labelPosition='left' onClick={() => {
            this.playerRef.current.pause();
            this.setState({ playing: false });
          }}>
            <Icon name='pause' />
            Pause
          </Button>
        );
      } else {
        return (
          <Button icon labelPosition='left' onClick={() => {
            this.playerRef.current.play();
            this.setState({ playing: true });
          }}>
            <Icon name='play' />
            Play
          </Button>
        );
      }
    } else {
      return <Loader active>Preparing your entertainment!</Loader>;
    }
  }

  renderStreamList = () => {
    return (
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
    );
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
              {this.renderActiveMedia()}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <GridColumn textAlign='center' mobile={16} tablet={12} computer={8}>
              {this.state.active !== undefined ? (this.renderMediaButtons()) : (null)}
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
              <Input value={this.state.input.title} id='input_title' label='Title' fluid placeholder='Example: BBC Radio One' onChange={(event) => this.handleNewStreamInput(event)} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={6} computer={4}>
              <Input value={this.state.input.url} id='input_url' label='Stream URL' fluid placeholder='Example: http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p' onChange={(event) => this.handleNewStreamInput(event)} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button icon labelPosition='left' onClick={() => this.handleStreamAdd()}>
                <Icon name='music' />
                Add stream
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <GridColumn mobile={16} tablet={12} computer={8}>
              {this.renderStreamList()}
            </GridColumn>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
