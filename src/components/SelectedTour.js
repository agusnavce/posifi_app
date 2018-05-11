import React, {Component} from 'react';
import {
    Text, 
    View, 
    Image, 
    ImageBackground,
    StyleSheet, 
    ScrollView, 
    Dimensions,
    TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
    audioPlaying, 
    audioTime, 
    audioError, 
    audioPaused,
    audioSetTime,
    audioCurrentTime,
    audioPlayerViewWidth
} from '../actions';
import AudioPlayer from 'react-native-play-audio';
import ProgressBar from './ProgressBar';

class SelectedTour extends Component {

    _audioPlay = (url) => {
        console.log('pressed');

        setInterval(() => {
            AudioPlayer.getCurrentTime((currentTime) => {
            console.log('current time::::: is :::: ', currentTime);
            this.props.audioCurrentTime(currentTime);
            });
        }, 1000);

        if (this.props.isPlaying === false && this.props.isPaused === false) {
        AudioPlayer.prepare(url, () => {
            this.props.audioPlaying(true);
            AudioPlayer.play();

            AudioPlayer.getDuration((duration) => {
                this.props.audioTime(duration);
                console.log(duration);
            });
        });
        } else {
            this.props.audioPlaying(true);
            AudioPlayer.play();
        }
    }

    _audioPause = (url) => {
        console.log('paused')
        this.props.audioPlaying(false);
        this.props.audioPaused(true);
        AudioPlayer.pause();
    }

    _audioForward = (url) => {
        console.log('forward');

        let currentTime = AudioPlayer.getCurrentTime((currentTime) => {
            console.log('current time::::: is :::: ', currentTime);
            // this.props.audioSetTime(currentTime);

            let forwardedTime = (currentTime + 10);
            console.log('forwarded time is :::::: ', forwardedTime);

            this.props.audioSetTime(forwardedTime);

            AudioPlayer.setTime(this.props.setTime);
        });
    }

    _audioRewind = (url) => {
        console.log('rewind');

        let currentTime = AudioPlayer.getCurrentTime((currentTime) => {
            console.log('current time::::: is :::: ', currentTime);
            // this.props.audioSetTime(currentTime);

            let rewoundTime = (currentTime - 10);
            console.log('rewound time is :::::: ', rewoundTime);

            this.props.audioSetTime(rewoundTime);

            if (currentTime < 10) {
                AudioPlayer.setTime(0);
            } else {
            AudioPlayer.setTime(this.props.setTime);
            }
        });
    }

    audioPlayPauseToggle = (url) => {

        if (this.props.isPlaying === true) {
            return (
                <TouchableOpacity style={styles.audioBtn} onPress={() => this._audioPause(url)}>
                    <Image style={styles.audioImg} source={require('../assets/img/audioPause.png')} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.audioBtn} onPress={() => this._audioPlay(url)}>
                    <Image style={styles.audioImg} source={require('../assets/img/audioPlay.png')} />
                </TouchableOpacity>
            );
        }
    }

    audioRewindTouchableToggle = (url) => {
        if (this.props.currentTime < 10 || this.props.currentTime === this.props.totalTime) {
            return (
            <TouchableOpacity style={styles.audioBtn} disabled={true} onPress={() => this._audioRewind(url)}>
                <Image style={styles.audioImg} source={require('../assets/img/10sec_backward-256.png')} />
            </TouchableOpacity>
            );
        } else {
            return (
            <TouchableOpacity style={styles.audioBtn} onPress={() => this._audioRewind(url)}>
                <Image style={styles.audioImg} source={require('../assets/img/10sec_backward-256.png')} />
            </TouchableOpacity>
            );
        }
    }

    audioForwardTouchableToggle = (url) => {
        const limit = (this.props.totalTime - 10);
        console.log(limit);
        if (this.props.currentTime > (this.props.totalTime - 10)) {
            return (
            <TouchableOpacity style={styles.audioBtn} disabled={true} onPress={() => this._audioForward(url)}>
                <Image style={styles.audioImg} source={require('../assets/img/10sec_forward-128.png')} />
            </TouchableOpacity>
            );
        } else {
            return (
            <TouchableOpacity style={styles.audioBtn} onPress={() => this._audioForward(url)}>
                <Image style={styles.audioImg} source={require('../assets/img/10sec_forward-128.png')} />
            </TouchableOpacity>
            );
        }
    }

    _findDimensions = (layout) => {
        const {x, y, width, height} = layout;
        console.log(x);
        console.log(y);
        console.log(width);
        console.log(height);

        this.props.audioPlayerViewWidth(width);
    }

    componentWillUnmount = () => {
        this.props.audioCurrentTime(0);
        this.props.audioPlaying(false);
        this.props.audioPaused(false);
        this.props.audioSetTime(0);
        this.props.audioTime(0);
        AudioPlayer.stop();

        console.log('component unmounted');
    } 

    renderImages = () => {
        console.log('floorGallery array? ', this.props.floorGallery);
        return this.props.floorGallery.map(image => 
            <ImageBackground style={styles.selectedTourImg} source={{ uri: image }}/>
        );
    }

    render() {
        console.log(this.props);
    
        const url = this.props.audioLinkName;

        return (
            <View style={styles.selectedTour}>
                
                <ScrollView horizontal={true}>
                    <View style={styles.tourImgBox}>
                        {this.renderImages()}
                    </View>
                </ScrollView>

                <View style={styles.selectedTourAudioInfoBox} onLayout={(event) => { this._findDimensions(event.nativeEvent.layout) }}>
                    <View style={styles.audioControls}>
                        <View style={styles.audioBtnBoxRewind}>
                            {this.audioRewindTouchableToggle(url)}
                        </View>
                        <View style={styles.audioBtnBox}>
                            {this.audioPlayPauseToggle(url)}
                        </View>
                        <View style={styles.audioBtnBoxForward}>
                            {this.audioForwardTouchableToggle(url)}
                        </View>
                    </View>
                    <View style={styles.audioProgressBarBox}>
                        <ProgressBar
                            row
                            progress={this.props.currentTime}
                            duration={500} 
                            fillColor={'blue'}
                            maxValue={this.props.totalTime}
                        />
                    </View>
                </View>


                <ScrollView>
                    <View style={styles.selectedTourTextBox}>
                        <Text style={styles.selectedTourText}>
                            {this.props.tourText}
                        </Text>
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    // CONTAINER
    selectedTour: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'red',
        margin: 10,
        height: 'auto'
    },

    // 3 PARTS OF CONTAINER
    tourImgBox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        // height: 350,
        width: 500
        // margin: 5
    },
    selectedTourAudioInfoBox: {
        flex: .5,
        backgroundColor: 'lightgrey',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedTourTextBox: {
        flex: 1,
        backgroundColor: 'white'
    },

    // IMG STYLING 
    tourImgBoxContainer: {
        backgroundColor: 'yellow'
    },
    selectedTourImg: {
        flex: 1,
        backgroundColor: 'lightblue',
        height: null,
        width: null,
        margin: 2
        // resizeMode: 'cover'
        // height: 250
    },

    // AUDIO CONTROL STYLING
    audioControls: {
        flex: .8,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'purple'
    },
    audioBtnBox: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    audioBtnBoxForward: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    audioBtnBoxRewind: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    audioBtn: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 50,
        height: 60,
        width: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    audioImg: {
        padding: 10,
        height: 70,
        width: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    audioProgressBarBox: {
        flex: .2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    audioProgressBar: {
        flex: 1
    },

    // TEXT BOX STYLING 
    selectedTourText: {
        fontSize: 24,
        padding: 10
    }
});

const mapStateToProps = state => {
    return {
        totalTime: state.audio.totalTime,
        isPlaying: state.audio.isPlaying,
        isPaused: state.audio.isPaused,
        setTime: state.audio.setTime,
        currentTime: state.audio.currentTime,
        viewWidth: state.audio.viewWidth,
        error: state.audio.error
    }
}

export default connect(mapStateToProps, { 
    audioPlaying, 
    audioTime, 
    audioError, 
    audioPaused,
    audioSetTime,
    audioCurrentTime,
    audioPlayerViewWidth
})(SelectedTour);