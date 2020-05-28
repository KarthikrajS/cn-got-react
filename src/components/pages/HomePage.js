import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardColumns, CardDeck, CardGroup, Col, Row, Container, Navbar, NavItem, Button, Badge} from 'react-bootstrap'
import TopNavigation from "../Navigation/TopNavigation";
import {battleBasedOnLocation,battleBasedOnTypes,battleBasedOnKings,search} from '../actions/battleData';
import {Link} from 'react-router-dom';
import attack from '../icons/attack.png';
import defend from '../icons/defend.png';
import {Dropdown} from "semantic-ui-react";


class HomePage extends React.Component {

    state = {
        location:null,
        isLoading :false,
        battles:[],
        king:null,
        type:null,
        searchBattle:[],
        noSearchData: false
    }

    componentWillMount() {
        this.setState({location:null})
        this.setState({king:null})
        this.setState({type:null})
        localStorage.removeItem('battlePage')
        localStorage.setItem('Navigation',"Yes")


    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.location === this.state.location){
        if (this.state.isLoading===true && JSON.parse(localStorage.getItem("location")) !== null) {

            this.props.battleBasedOnLocation(JSON.parse(localStorage.getItem("location")))
                .then(battles => {
                    this.setState({battles: battles, location: JSON.parse(localStorage.getItem("location"))})
                    console.log(this.state.location)
                })
        }
        }
        if(prevState.king === this.state.king) {
            if (this.state.isLoading === true && JSON.parse(localStorage.getItem("king")) !== null) {

                this.props.battleBasedOnKings(JSON.parse(localStorage.getItem("king")))
                    .then(battles => {
                        this.setState({battles: battles, king: JSON.parse(localStorage.getItem("king"))})
                    })
            }
        }
        if(prevState.type === this.state.type){
        if (this.state.isLoading===true && JSON.parse(localStorage.getItem("type")) !== null) {

            this.props.battleBasedOnTypes(JSON.parse(localStorage.getItem("type")))
                .then(battles => {
                    this.setState({battles: battles, type: JSON.parse(localStorage.getItem("type"))})
                })
        }
        }
    }

    updateState(){
        this.setState({isLoading :!this.state.isLoading})
    }
    createBattleCards(battles){
        var html=[]

        battles.forEach(battle=>{
            html.push(
                <Link to={"/battleDetail/"+battle.name} >
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
        const {location,battles,king,type} = this.state
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
        isSearchBattle : !! (state.searchBattle || localStorage.getItem('searchBattle')!==null)
    }
}


export default connect(mapStateToProps,{battleBasedOnLocation,battleBasedOnKings,battleBasedOnTypes,search})(HomePage)