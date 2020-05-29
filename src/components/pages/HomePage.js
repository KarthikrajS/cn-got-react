import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardColumns, CardDeck, CardGroup, Col, Row, Container, Navbar, NavItem, Button, Badge} from 'react-bootstrap'
import TopNavigation from "../Navigation/TopNavigation";
import {battleBasedOnLocation,battleBasedOnTypes,battleBasedOnKings,search} from '../actions/battleData';
import {Link} from 'react-router-dom';
import attack from '../icons/attack.png';
import defend from '../icons/defend.png';
import './HomePage.css'
import {Dropdown} from "semantic-ui-react";



class HomePage extends React.Component {

    state = {
        location:null,
        isLoading :false,
        battles:[],
        king:null,
        type:null,
        searchBattle:[],
        noSearchData: false,
        dataLoaded:false
    }

    componentWillMount() {
        this.setState({location:null})
        this.setState({king:null})
        this.setState({type:null})
        localStorage.removeItem('battlePage')
        localStorage.setItem('Navigation',"Yes")
        this.setState({dataloaded:false})

    }
    componentDidUpdate(prevProps,prevState){
        console.log(this.state.isLoading)
        if(prevState.location === this.state.location || this.state.dataLoaded){
        if ( JSON.parse(localStorage.getItem("location")) !== null) {

            this.props.battleBasedOnLocation(JSON.parse(localStorage.getItem("location")))
                .then(battles => {
                    this.setState({battles: battles, location: JSON.parse(localStorage.getItem("location")),dataLoaded:true})
                    console.log(this.state.location)
                })
        }
        }
        if(prevState.king === this.state.king) {
            if ( JSON.parse(localStorage.getItem("king")) !== null) {

                this.props.battleBasedOnKings(JSON.parse(localStorage.getItem("king")))
                    .then(battles => {
                        this.setState({battles: battles, king: JSON.parse(localStorage.getItem("king")),dataLoaded:true})
                    })
            }
        }
        if(prevState.type === this.state.type){
        if ( JSON.parse(localStorage.getItem("type")) !== null) {

            this.props.battleBasedOnTypes(JSON.parse(localStorage.getItem("type")))
                .then(battles => {
                    this.setState({battles: battles, type: JSON.parse(localStorage.getItem("type")),dataLoaded:true})
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
        const {location,battles,king,type,dataLoaded} = this.state
        return (
            <div>
                <TopNavigation updateParent={this.updateState.bind(this)}/>

                <div  className="ui container" >
                    <br/>
                    {
                        (JSON.parse(localStorage.getItem("location")) === null || location === null)
                        &&  (JSON.parse(localStorage.getItem("type")) === null ||  type === null)
                        &&  (JSON.parse(localStorage.getItem("king")) === null ||  king === null)
                        && !dataLoaded &&
                            <Container >
                                <CardGroup>
                                    <CardDeck style={{"font-family": "Game of Thrones"}} >
                                        <Row lg={12} sm={12}>
                                            <CardColumns>
                                                <Card bg="dark" text="white" id="welcome"  className="text-center p-3 ">
                                                    <Card.Body>
                                                        <blockquote className="blockquote mb-0 card-body">
                                                            <Card.Text>
                                                                Welcome to
                                                            </Card.Text>
                                                        </blockquote>
                                                    </Card.Body>
                                                </Card>
                                            </CardColumns>
                                        </Row>
                                        <Row>

                                            <CardColumns>

                                                <Card id="welcome"   bg="danger" text="white" className="text-center p-3">
                                                    <Card.Body>
                                                        <Card.Title>
                                                            Game Of Thrones
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </CardColumns>
                                        </Row>
                                        <Row>

                                            <CardColumns>
                                                <Card bg="dark" text="white"  id="welcome"   className="text-center p-3">
                                                    <Card.Body>
                                                        <blockquote className="blockquote mb-0 card-body">
                                                            <Card.Text>
                                                                Battle App
                                                            </Card.Text>
                                                        </blockquote>
                                                    </Card.Body>
                                                </Card>
                                            </CardColumns>
                                        </Row>



                                    </CardDeck>
                                </CardGroup>
                            </Container>


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
    isLoaded: PropTypes.bool.isRequired,
    battleBasedOnLocation: PropTypes.func.isRequired,
    battleBasedOnKings: PropTypes.func.isRequired,
    battleBasedOnTypes: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    isSearchBattle: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isSearchBattle : !! (state.searchBattle || localStorage.getItem('searchBattle')!==null)
    }
}


export default connect(mapStateToProps,{battleBasedOnLocation,battleBasedOnKings,battleBasedOnTypes,search})(HomePage)