import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardColumns, CardDeck, CardGroup, Col,Row,Container} from 'react-bootstrap'
import TopNavigation from "../Navigation/TopNavigation";
import {battleBasedOnLocation,battleBasedOnTypes,battleBasedOnKings,search} from '../actions/battleData';
import {Link} from 'react-router-dom';
import attack from '../icons/attack.png';
import defend from '../icons/defend.png';


class HomePage extends React.Component {

    state = {
        location:null,
        isLoading :false,
        battles:[],
        king:null,
        type:null,
        searchBattle:[]
    }

    componentWillMount() {
        // if (JSON.parse(localStorage.getItem("location")) === null){
        this.setState({location:null})
        // }
        // if (JSON.parse(localStorage.getItem("king")) === null){
        this.setState({king:null})
        // }
        // if (JSON.parse(localStorage.getItem("location")) === null){
        this.setState({type:null})
        console.log(this.state.searchBattle)
        //}
        // this.setState(prevState=>({
        //     location: prevState.location
        // }))

    }

    componentDidUpdate(){

        const  params = new URLSearchParams(window.location.search)
        if(this.state.isLoading===true && (params.has('king'))){
            this.updateState()
            console.log("url")
            if(params.has('type') && params.has('location')){
                this.props.search({king:params.get('king'),type:params.get('type'),location:params.get('location')}).then(battles=>{
                    this.setState({searchBattle:battles})
                    localStorage.setItem('searchBattle',battles)
                })
            }else{
                this.props.search({king:params.get('king')}).then(battles=>{
                    this.setState({searchBattle:battles})
                    localStorage.setItem('searchBattle',battles)
                })

            }
            localStorage.removeItem('king')
            localStorage.removeItem('type')
            localStorage.removeItem('location')
            this.updateState()
            console.log(this.props.isSearchBattle)
        }
        if (this.state.isLoading===true && JSON.parse(localStorage.getItem("location")) !== null) {
            this.setState({searchBattle: []})
            this.props.battleBasedOnLocation(JSON.parse(localStorage.getItem("location")))
                .then(battles => {
                    this.setState({battles: battles, location: JSON.parse(localStorage.getItem("location"))})
                })
            this.updateState()
        }
        if (this.state.isLoading===true && JSON.parse(localStorage.getItem("type")) !== null) {

            this.props.battleBasedOnTypes(JSON.parse(localStorage.getItem("type")))
                .then(battles => {
                    this.setState({battles: battles, type: JSON.parse(localStorage.getItem("type"))})
                })
            this.updateState()
        }

        if (this.state.isLoading===true && JSON.parse(localStorage.getItem("king")) !== null) {

            this.props.battleBasedOnKings(JSON.parse(localStorage.getItem("king")))
                .then(battles => {
                    this.setState({battles: battles, king: JSON.parse(localStorage.getItem("king"))})
                })
            this.updateState()
        }
        if (this.state.isLoading===true && JSON.parse(localStorage.getItem("type")) !== null) {

            this.props.battleBasedOnTypes(JSON.parse(localStorage.getItem("type")))
                .then(battles => {
                    this.setState({battles: battles, location: JSON.parse(localStorage.getItem("type"))})
                })
            this.updateState()
        }
    }

    updateState(){
        this.setState({isLoading :!this.state.isLoading})
    }
    createBattleCards(battles){
        var html=[]
        battles.forEach(battle=>{
            html.push(
                <Link to={"/battleDetail/?battleName="+battle.name} >
                    <Card bg="dark" text="white"  style={{"width": "100%"}} className="text-center p-3">
                        <Card.Title>{battle.name}</Card.Title>
                        <Card.Subtitle>{battle.region}</Card.Subtitle>

                        <Card.Body>
                            <Card.Text>
                                <Row>
                                    <Col xs={2}><img className="cardIcon" src={attack}></img></Col><Col xs={10}>{" "+battle.attacker_king}</Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col xs={2}><img className="cardIcon" src={defend}></img></Col><Col xs={10}>{" "+battle.defender_king}</Col>
                                </Row>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>

            )
        })
        return html;
    }
    render() {
        const {isLocation,isSearchBattle} = this.props
        const {location,battles,king,type,searchBattle} = this.state
        return (

            <div>
                <TopNavigation updateParent={this.updateState.bind(this)}/>
                <div  className="ui container " style={{"width":"800px"}}>

                    <br/>
                    {

                        (JSON.parse(localStorage.getItem("location")) === null && location === null)
                        &&  (JSON.parse(localStorage.getItem("type")) === null &&  type === null)
                        &&  (JSON.parse(localStorage.getItem("king")) === null &&  king === null)
                        &&
                        <div >
                            <Container >
                                <CardGroup>
                                    <CardDeck style={{"font-family": "Game of Thrones"}} >
                                        <CardColumns>
                                            <Card style={{"width" : "690px", "height":"125px"}} bg="dark" text="white"  className="text-center p-3">
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0 card-body">
                                                        <Card.Text>
                                                            Welcome to
                                                        </Card.Text>
                                                    </blockquote>
                                                </Card.Body>
                                            </Card>
                                        </CardColumns>
                                        <CardColumns>

                                            <Card style={{"width" : "690px", "height":"100px"}}  bg="danger" text="white" className="text-center p-3">
                                                <Card.Body>
                                                    <Card.Title>
                                                        Game Of Thrones
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </CardColumns>
                                        <CardColumns>
                                            <Card style={{"width" : "690px", "height":"125px"}} bg="dark" text="white"  className="text-center p-3">
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0 card-body">
                                                        <Card.Text>
                                                            Battle App
                                                        </Card.Text>
                                                    </blockquote>
                                                </Card.Body>
                                            </Card>
                                        </CardColumns>
                                    </CardDeck>
                                </CardGroup>
                            </Container>
                        </div>
                    }
                    {
                        (JSON.parse(localStorage.getItem("location")) !== null &&  location !== null) && <div>
                            <CardGroup>
                                <CardDeck style={{"font-family": "Game of Thrones"}} >
                                    <CardColumns>
                                        {this.createBattleCards(battles)}
                                    </CardColumns>
                                </CardDeck>
                            </CardGroup>
                        </div>
                    }
                    {!isSearchBattle &&
                    <CardGroup>
                        <CardDeck style={{"font-family": "Game of Thrones"}} >
                            <CardColumns>
                                {this.createBattleCards(searchBattle)}
                            </CardColumns>
                        </CardDeck>
                    </CardGroup>}
                    {console.log((JSON.parse(localStorage.getItem("king")) !== null &&  king !== null))}
                    {

                        (JSON.parse(localStorage.getItem("king")) !== null &&  king !== null) && <div>
                            <CardGroup>
                                <CardDeck style={{"font-family": "Game of Thrones"}} >
                                    <CardColumns>
                                        {this.createBattleCards(battles)}
                                    </CardColumns>
                                </CardDeck>
                            </CardGroup>
                        </div>
                    }
                    {
                        (JSON.parse(localStorage.getItem("type")) !== null &&  type !== null) && <div>
                            <CardGroup>
                                <CardDeck style={{"font-family": "Game of Thrones"}} >
                                    <CardColumns>
                                        {this.createBattleCards(battles)}
                                    </CardColumns>
                                </CardDeck>
                            </CardGroup>
                        </div>
                    }
                </div>
            </div>)
    }
};


HomePage.propTypes = {
    isLocation: PropTypes.bool.isRequired,
    battleBasedOnLocation: PropTypes.func.isRequired,
    battleBasedOnKings: PropTypes.func.isRequired,
    battleBasedOnTypes: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    isSearchBattle: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isLocation: !!state.location,
        isSearchBattle : !! (state.searchBattle || localStorage.getItem('searchBattle')!=="null")
    }
}


export default connect(mapStateToProps,{battleBasedOnLocation,battleBasedOnKings,battleBasedOnTypes,search})(HomePage)