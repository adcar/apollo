import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import SkipPreviousIcon from "material-ui-icons/SkipPrevious";
import PlayArrowIcon from "material-ui-icons/PlayArrow";
import SkipNextIcon from "material-ui-icons/SkipNext";

const styles = theme => ({
  songArt: {
    height: 120,
    marginRight: theme.spacing.unit * 2
  },
  songLabel: {
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  audio: {
    width: "100%"
  },
  icon: {
    height: 30,
    width: 30,
    color: "#5A5A5A"
  },
  player: {
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: "1"
  },
  card: {
    backgroundColor: "#fafafa"
  },
  cardContent: {marginTop: theme.spacing.unit * 2},
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

class PlaylistPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      currentSource: 0,
      tracks: []
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.tracks.length > 0) {
          this.setState({
            tracks: nextProps.tracks,
            sources: nextProps.tracks.map(track => `https://apolloapi.herokuapp.com/${track.name}/${track.artist}`)
      })
    this.setState({
      currentSource: nextProps.currentTrack
    })
    }

  }
  handlePrev() {
    if (this.state.currentSource > 0) {
      this.setState({
        currentSource: this.state.currentSource - 1
      });
    }
  }
  handleNext() {
    if (this.state.currentSource < this.state.sources.length) {
      this.setState({
        currentSource: this.state.currentSource + 1
      });
    }
  }
  render() {
    const { classes, theme } = this.props;
    
    const image = this.state.tracks[this.state.currentSource] ? (
                  <img
              className={classes.songArt}
              alt="Song Cover Art"
              src={this.state.tracks[this.state.currentSource].image}
            />): (
              <img
              className={classes.songArt}
              alt="Song Cover Art"
              src={'loading'}
            />
              )
              
    const name = this.state.tracks[this.state.currentSource] ? (
      this.state.tracks[this.state.currentSource].name
      ): (
        'Loading'
        )
    const artist = this.state.tracks[this.state.currentSource] ? (
      this.state.tracks[this.state.currentSource].artist
      ): (
        'Loading')
    return (
      <Card className={classes.card}>
        <div>
          <div className={classes.songLabel}>
            {image}
            <CardContent className={classes.cardContent}>
              <div>
                {" "}
                <Typography variant="headline" component="h3" align="right">
                  {name}
                </Typography>
                <Typography variant="subheading" align="right">
                  {artist}
                </Typography>
              </div>
            </CardContent>
          </div>
          <div className={classes.player}>
            <IconButton>
              <SkipPreviousIcon
                className={classes.icon}
                onClick={this.handlePrev.bind(this)}
              />
            </IconButton>

            <audio
              onEnded={this.handleNext.bind(this)}
              onError={(this.handleNext.bind(this))}
              ref={audio => {
                this.audio = audio;
              }}
              autoPlay
              controls
              className={classes.audio}
              src={this.state.sources[this.state.currentSource]}
            />
            <IconButton>
              <SkipNextIcon
                className={classes.icon}
                onClick={this.handleNext.bind(this)}
              />
            </IconButton>
          </div>
        </div>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PlaylistPlayer);
