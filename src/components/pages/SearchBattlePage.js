import React from 'react';
import PropTypes from 'prop-types'

import {connect} from 'react-redux';
import {search} from '../actions/battleData'
import {Card, CardColumns, CardDeck, CardGroup, Col, Row, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import attack from "../icons/attack.png";
import defend from "../icons/defend.png";
import TopNavigation from "../Navigation/TopNavigation";


class SearchBattlePage extends React.Component{
    state={
        searchBattle:null
    }
    componentWillMount() {
        localStorage.setItem('Navigation',"No")
    }
    updateState(){
        this.setState({isLoading: this.setState.isLoading})
    }
    componentDidMount() {

        var token = this.props.match.params.token
        var params= token.split('&')
        localStorage.setItem('params',JSON.stringify(params))
        params  = JSON.parse(localStorage.getItem('params'))
        this.props.search({king:params[0].split('=')[1],type:params[1].split('=')[1],location:params[2].split('=')[1]})
            .then(battles=>{
                console.log(battles)
                this.setState({searchBattle:battles})
                if(battles.length >0)
                    localStorage.setItem('searchBattle',battles)
                else
                    localStorage.removeItem('searchBattle')
                console.log(this.props.isSearchBattle)
        })
    };

    createBattleCards =(battles) =>{
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
        const {searchBattle} = this.state
        const {isSearchBattle} = this.state


        return(<div>
            <TopNavigation updateParent={this.updateState.bind(this)}/>
            <div  className="ui container " style={{"width":"800px"}}>
                <Container>
                {!isSearchBattle && searchBattle!==null &&
                <CardGroup>
                    <CardDeck style={{"fontFamily": "Game of Thrones"}} >
                        <CardColumns>
                            {this.createBattleCards(searchBattle)}
                        </CardColumns>
                    </CardDeck>
                </CardGroup>}
                {!isSearchBattle && searchBattle===null  &&
                <Card bg="dark" text="white"  style={{"width": "100%"}} className="text-center p-3">
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <CardColumns xs={10}>No Battle Found</CardColumns>
                            </Row>
                            <hr/>
                            <Row>
                                <Col xs={10}>This Battle Didn't Occur!</Col>
                            </Row>

                        </Card.Text>
                    </Card.Body>
                </Card>
                }
                </Container>
            </div>
        </div>)
    }

}

SearchBattlePage.propTypes={
    token: PropTypes.shape({
        params: PropTypes.shape({
            token:PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    search:PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isSearchBattle : !! state.searchBattle
    }
}

export default connect(mapStateToProps,{search})(SearchBattlePage)